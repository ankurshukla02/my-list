import Joi from 'joi';
import { CONTENT_TYPE } from '../constants/contentType';

export const addItemSchema = Joi.object({
  contentId: Joi.string().required(),
  contentType: Joi.number()
    .valid(CONTENT_TYPE.MOVIE, CONTENT_TYPE.TV_SHOW)
    .required(),
});

export const removeItemSchema = Joi.object({
  contentId: Joi.string().required(),
  contentType: Joi.number()
    .valid(CONTENT_TYPE.MOVIE, CONTENT_TYPE.TV_SHOW)
    .required(),
});

export const listItemsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
});
