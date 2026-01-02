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

  (req as any).user = { id: userId };
  next();
}
