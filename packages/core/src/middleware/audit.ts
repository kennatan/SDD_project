import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * 操作審計日誌中介軟體
 */
export const auditLogger = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['x-user-id'] as string;
  const action = \\ \\;

  if (userId) {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        ipAddress: req.ip,
        metadata: { body: req.body, query: req.query }
      }
    });
  }
  next();
};
