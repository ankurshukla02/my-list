"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyListController = void 0;
const myList_service_1 = require("../services/myList.service");
const myList_validation_1 = require("../validations/myList.validation");
const domainError_1 = require("../errors/domainError");
class MyListController {
    static async addItem(req, res) {
        try {
            const { error, value } = myList_validation_1.addItemSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            const userId = req.user.id;
            const { contentId, contentType } = value;
            const item = await myList_service_1.MyListService.addItem(userId, contentId, contentType);
            // Transform response to use camelCase for API consistency
            const response = {
                id: item.id,
                contentId: item.content_id,
                contentType: item.content_type,
            };
            res.status(201).json(response);
        }
        catch (err) {
            MyListController.handleError(err, res);
        }
    }
    static async removeItem(req, res) {
        try {
            const { error, value } = myList_validation_1.removeItemSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            const userId = req.user.id;
            const { contentId, contentType } = value;
            await myList_service_1.MyListService.removeItem(userId, contentId, contentType);
            res.status(204).send();
        }
        catch (err) {
            MyListController.handleError(err, res);
        }
    }
    static async listItems(req, res) {
        try {
            const { error, value } = myList_validation_1.listItemsSchema.validate(req.query);
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            const userId = req.user.id;
            const { page, limit } = value;
            const items = await myList_service_1.MyListService.listItems(userId, page, limit);
            res.json({
                page,
                limit,
                data: items,
            });
        }
        catch (err) {
            MyListController.handleError(err, res);
        }
    }
    static handleError(error, res) {
        if (error instanceof domainError_1.DomainError) {
            return res.status(400).json({ message: error.message });
        }
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.MyListController = MyListController;
