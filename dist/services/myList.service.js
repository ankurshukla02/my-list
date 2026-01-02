"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyListService = void 0;
const myList_repository_1 = require("../repositories/myList.repository");
const movie_model_1 = require("../models/movie.model");
const tvShow_model_1 = require("../models/tvShow.model");
const contentType_1 = require("../constants/contentType");
const domainError_1 = require("../errors/domainError");
class MyListService {
    /**
     * Add item to user's My List
     */
    static async addItem(userId, contentId, contentType) {
        // 1️⃣ Check content existence
        await this.ensureContentExists(contentId, contentType);
        // 2️⃣ Check duplicate
        const exists = await myList_repository_1.MyListRepository.exists(userId, contentId, contentType);
        if (exists) {
            throw new domainError_1.ConflictError('Item already exists in My List');
        }
        // 3️⃣ Add item
        return myList_repository_1.MyListRepository.addItem(userId, contentId, contentType);
    }
    /**
     * Remove item from My List
     */
    static async removeItem(userId, contentId, contentType) {
        const deletedCount = await myList_repository_1.MyListRepository.removeItem(userId, contentId, contentType);
        if (deletedCount === 0) {
            throw new domainError_1.NotFoundError('Item not found in My List');
        }
        return true;
    }
    /**
     * List user's My List items
     */
    static async listItems(userId, page = 1, limit = 20) {
        const offset = (page - 1) * limit;
        return myList_repository_1.MyListRepository.listItems(userId, limit, offset);
    }
    /**
     * Ensure Movie / TV Show exists
     */
    static async ensureContentExists(contentId, contentType) {
        let exists = false;
        if (contentType === contentType_1.CONTENT_TYPE.MOVIE) {
            exists = !!(await movie_model_1.Movie.findByPk(contentId));
        }
        if (contentType === contentType_1.CONTENT_TYPE.TV_SHOW) {
            exists = !!(await tvShow_model_1.TVShow.findByPk(contentId));
        }
        if (!exists) {
            throw new domainError_1.NotFoundError('Content not found');
        }
    }
}
exports.MyListService = MyListService;
