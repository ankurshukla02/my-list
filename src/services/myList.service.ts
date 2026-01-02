import { MyListRepository } from '../repositories/myList.repository';
import { Movie } from '../models/movie.model';
import { TVShow } from '../models/tvShow.model';
import { CONTENT_TYPE, ContentType } from '../constants/contentType';
import { ConflictError, NotFoundError } from '../errors/domainError';

export interface PaginatedResult<T> {
  items: T[];
  total: number;
}

export interface MyListItemWithContent {
  id: number;
  contentId: string;
  contentType: ContentType;
  addedAt: Date;
  content: {
    id: string;
    title: string;
    description: string;
    genres: string[];
    releaseDate?: string;
    director?: string;
    actors?: string[];
  };
}

export class MyListService {
  /**
   * Add item to user's My List
   */
  static async addItem(
    userId: string,
    contentId: string,
    contentType: ContentType
  ) {
    // 1️⃣ Check content existence
    await this.ensureContentExists(contentId, contentType);

    // 2️⃣ Check duplicate
    const exists = await MyListRepository.exists(
      userId,
      contentId,
      contentType
    );

    if (exists) {
      throw new ConflictError('Item already exists in My List');
    }

    // 3️⃣ Add item
    return MyListRepository.addItem(userId, contentId, contentType);
  }

  /**
   * Remove item from My List
   */
  static async removeItem(
    userId: string,
    contentId: string,
    contentType: ContentType
  ) {
    const deletedCount = await MyListRepository.removeItem(
      userId,
      contentId,
      contentType
    );

    if (deletedCount === 0) {
      throw new NotFoundError('Item not found in My List');
    }
  }

  /**
   * List user's My List items with content details
   */
  static async listItems(
    userId: string,
    page = 1,
    limit = 20
  ): Promise<PaginatedResult<MyListItemWithContent>> {
    const offset = (page - 1) * limit;

    const result = await MyListRepository.listItemsWithContent(
      userId,
      limit,
      offset
    );

    return {
      items: result.items.map(item => ({
        id: item.id,
        contentId: item.content_id,
        contentType: item.content_type as ContentType,
        addedAt: item.created_at,
        content: this.formatContent(item.content, item.content_type as ContentType),
      })),
      total: result.total,
    };
  }

  /**
   * Ensure Movie / TV Show exists
   */
  private static async ensureContentExists(
    contentId: string,
    contentType: ContentType
  ) {
    let exists = false;

    if (contentType === CONTENT_TYPE.MOVIE) {
      exists = !!(await Movie.findByPk(contentId));
    }

    if (contentType === CONTENT_TYPE.TV_SHOW) {
      exists = !!(await TVShow.findByPk(contentId));
    }

    if (!exists) {
      throw new NotFoundError('Content not found');
    }
  }

  /**
   * Format content data consistently
   */
  private static formatContent(content: any, contentType: ContentType) {
    const parseJson = (value: any) => {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch {
          return [];
        }
      }
      return value || [];
    };

    if (contentType === CONTENT_TYPE.MOVIE) {
      return {
        id: content.id,
        title: content.title,
        description: content.description,
        genres: parseJson(content.genres),
        releaseDate: content.release_date,
        director: content.director,
        actors: parseJson(content.actors),
      };
    } else {
      const episodes = parseJson(content.episodes);
      return {
        id: content.id,
        title: content.title,
        description: content.description,
        genres: parseJson(content.genres),
        releaseDate: episodes?.[0]?.releaseDate,
        actors: episodes?.[0]?.actors || [],
      };
    }
  }
}
