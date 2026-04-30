import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * [FR-012] 操作審計日誌中介軟體
 * 強制紀錄敏感操作 (如 CSV 匯出) 的存取軌跡
 */
export const auditLogger = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['x-user-id'] as string;
  const action = `${req.method} ${req.originalUrl}`;

  if (userId) {
    try {
      await prisma.auditLog.create({
        data: {
          userId,
          action,
          ipAddress: req.ip,
          metadata: {
            query: req.query,
            userAgent: req.headers['user-agent']
          }
        }
      });
    } catch (err) {
      console.error('Audit Log failed:', err);
    }
  }
  next();
};
