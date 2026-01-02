import { Request, Response, NextFunction } from 'express';

export function mockAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.header('x-user-id');

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // attach to request
  (req as any).user = { id: userId };
  next();
}
