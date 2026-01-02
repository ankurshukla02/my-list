"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listItemsSchema = exports.removeItemSchema = exports.addItemSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const contentType_1 = require("../constants/contentType");
exports.addItemSchema = joi_1.default.object({
    contentId: joi_1.default.string().required(),
    contentType: joi_1.default.number()
        .valid(contentType_1.CONTENT_TYPE.MOVIE, contentType_1.CONTENT_TYPE.TV_SHOW)
        .required(),
});
exports.removeItemSchema = joi_1.default.object({
    contentId: joi_1.default.string().required(),
    contentType: joi_1.default.number()
        .valid(contentType_1.CONTENT_TYPE.MOVIE, contentType_1.CONTENT_TYPE.TV_SHOW)
        .required(),
});
exports.listItemsSchema = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1),
    limit: joi_1.default.number().integer().min(1).max(100).default(20),
});
