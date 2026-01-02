import { MyList } from '../models/myList.model';
import { Movie } from '../models/movie.model';
import { TVShow } from '../models/tvShow.model';
import { ContentType } from '../constants/contentType';
import { Sequelize } from 'sequelize';

export interface MyListWithContent {
  id: number;
  content_id: string;
  content_type: number;
  created_at: Date;
  content: Movie | TVShow;
}

export interface PaginatedMyListResult {
  items: MyListWithContent[];
  total: number;
}

export class MyListRepository {
  /**
   * Add item to My List
   * Duplicate prevention handled by UNIQUE constraint
   */
  static async addItem(
    userId: string,
    contentId: string,
    contentType: ContentType
  ): Promise<MyList> {
    return MyList.create({
      user_id: userId,
      content_id: contentId,
      content_type: contentType,
    });
  }

  /**
   * Remove item from My List
   */
  static async removeItem(
    userId: string,
    contentId: string,
    contentType: ContentType
  ): Promise<number> {
    return MyList.destroy({
      where: {
        user_id: userId,
        content_id: contentId,
        content_type: contentType,
      },
    });
  }

  /**
   * List items for a user with content details (paginated)
   * Uses index on user_id → FAST
   */
  static async listItemsWithContent(
    userId: string,
    limit: number,
    offset: number
  ): Promise<PaginatedMyListResult> {
    const { rows: items, count: total } = await MyList.findAndCountAll({
      where: { user_id: userId },
      include: [
        {
          model: Movie,
          as: 'movie',
          required: false,
          where: Sequelize.literal('my_list.content_type = 1'),
        },
        {
          model: TVShow,
          as: 'tvShow',
          required: false,
          where: Sequelize.literal('my_list.content_type = 2'),
        },
      ],
      order: [['created_at', 'DESC']],
      limit,
      offset,
      attributes: [
        'id',
        'content_id',
        'content_type',
        'created_at',
      ],
    });

    // Transform the results to include content
    const transformedItems = items.map(item => ({
      id: item.id,
      content_id: item.content_id,
      content_type: item.content_type,
      created_at: item.created_at,
      content: (item as any).movie || (item as any).tvShow,
    }));

    return {
      items: transformedItems,
      total,
    };
  }

  /**
   * List items for a user (basic - for backward compatibility)
   */
  static async listItems(
    userId: string,
    limit: number,
    offset: number
  ): Promise<MyList[]> {
    return MyList.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
      limit,
      offset,
      attributes: [
        'id',
        'content_id',
        'content_type',
      ],
    });
  }

  /**
   * Check if item already exists
   */
  static async exists(
    userId: string,
    contentId: string,
    contentType: ContentType
  ): Promise<boolean> {
    const count = await MyList.count({
      where: {
        user_id: userId,
        content_id: contentId,
        content_type: contentType,
      },
    });

    return count > 0;
  }
}
