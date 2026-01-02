"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyListRepository = void 0;
const myList_model_1 = require("../models/myList.model");
class MyListRepository {
    /**
     * Add item to My List
     * Duplicate prevention handled by UNIQUE constraint
     */
    static async addItem(userId, contentId, contentType) {
        return myList_model_1.MyList.create({
            user_id: userId,
            content_id: contentId,
            content_type: contentType,
        });
    }
    /**
     * Remove item from My List
     */
    static async removeItem(userId, contentId, contentType) {
        return myList_model_1.MyList.destroy({
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
    static async listItems(userId, limit, offset) {
        return myList_model_1.MyList.findAll({
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
    static async exists(userId, contentId, contentType) {
        const count = await myList_model_1.MyList.count({
            where: {
                user_id: userId,
                content_id: contentId,
                content_type: contentType,
            },
        });
        return count > 0;
    }
}
exports.MyListRepository = MyListRepository;
