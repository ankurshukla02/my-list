import { MyList } from '../models/myList.model';
import { ContentType } from '../constants/contentType';

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
   * List items for a user (paginated)
   * Uses index on user_id → FAST
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
