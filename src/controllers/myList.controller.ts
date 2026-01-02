import { Request, Response } from 'express';
import { MyListService } from '../services/myList.service';
import {
  addItemSchema,
  removeItemSchema,
  listItemsSchema,
} from '../validations/myList.validation';
import { DomainError } from '../errors/domainError';

export class MyListController {
  static async addItem(req: Request, res: Response) {
    try {
      const { error, value } = addItemSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }

      const userId = (req as any).user.id;
      const { contentId, contentType } = value;

      const item = await MyListService.addItem(
        userId,
        contentId,
        contentType
      );

      // Transform response to use camelCase for API consistency
      const response = {
        success: true,
        data: {
          id: item.id,
          contentId: item.content_id,
          contentType: item.content_type,
        },
      };

      res.status(201).json(response);
    } catch (err) {
      MyListController.handleError(err, res);
    }
  }

  static async removeItem(req: Request, res: Response) {
    try {
      const { error, value } = removeItemSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }

      const userId = (req as any).user.id;
      const { contentId, contentType } = value;

      await MyListService.removeItem(
        userId,
        contentId,
        contentType
      );

      res.status(200).json({
        success: true,
        message: 'Item removed from My List'
      });
    } catch (err) {
      MyListController.handleError(err, res);
    }
  }

  static async listItems(req: Request, res: Response) {
    try {
      const { error, value } = listItemsSchema.validate(req.query);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }

      const userId = (req as any).user.id;
      const { page, limit } = value;

      const result = await MyListService.listItems(
        userId,
        page,
        limit
      );

      res.json({
        success: true,
        data: result.items,
        pagination: {
          page,
          limit,
          total: result.total,
          totalPages: Math.ceil(result.total / limit),
        },
      });
    } catch (err) {
      MyListController.handleError(err, res);
    }
  }

  private static handleError(error: any, res: Response) {
    if (error instanceof DomainError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }

    // Log error for debugging (in production, use proper logging service)
    console.error('Unexpected error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
