import Joi from 'joi';
import { CONTENT_TYPE } from '../constants/contentType';

export const addItemSchema = Joi.object({
  contentId: Joi.string().pattern(/^movie_\d+$|^tv_\d+$/).required()
    .messages({
      'string.pattern.base': 'contentId must be in format movie_XXX or tv_XXX'
    }),
  contentType: Joi.string().valid('movie', 'tvshow').required()
    .messages({
      'any.only': 'contentType must be either "movie" or "tvshow"'
    }),
});

export const removeItemSchema = Joi.object({
  contentId: Joi.string().pattern(/^movie_\d+$|^tv_\d+$/).required()
    .messages({
      'string.pattern.base': 'contentId must be in format movie_XXX or tv_XXX'
    }),
  contentType: Joi.string().valid('movie', 'tvshow').required()
    .messages({
      'any.only': 'contentType must be either "movie" or "tvshow"'
    }),
});

export const listItemsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
});
