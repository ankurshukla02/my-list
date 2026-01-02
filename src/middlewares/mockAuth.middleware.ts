import { Request, Response, NextFunction } from 'express';

export function mockAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.header('x-user-id');

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please provide x-user-id header.'
    });
  }

  // Validate userId format (basic validation)
  if (!/^user_\d+$/.test(userId)) {
    return res.status(401).json({
      success: false,
      message: 'Invalid user ID format. Expected: user_XXX'
    });
  }

  // Attach user to request
  (req as any).user = { id: userId };
  next();
}
