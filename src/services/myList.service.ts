import { MyListRepository } from '../repositories/myList.repository';
import { Movie } from '../models/movie.model';
import { TVShow } from '../models/tvShow.model';
import { CONTENT_TYPE, ContentType } from '../constants/contentType';
import { ConflictError, NotFoundError } from '../errors/domainError';

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

    return true;
  }

  /**
   * List user's My List items
   */
  static async listItems(
    userId: string,
    page = 1,
    limit = 20
  ) {
    const offset = (page - 1) * limit;

    return MyListRepository.listItems(userId, limit, offset);
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
}
