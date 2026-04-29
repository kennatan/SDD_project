import { Request, Response, NextFunction } from 'express';

// 簡單的記憶體快取，正式環境建議使用 Redis
const cache = new Set<string>();

/**
 * 3 秒防抖中介軟體
 */
export const preventDuplicate = (req: Request, res: Response, next: NextFunction) => {
  const key = \\-\\;

  if (cache.has(key)) {
    return res.status(429).json({ 
      error: '重複請求', 
      message: '請稍候 3 秒後再試。' 
    });
  }

  cache.add(key);
  setTimeout(() => cache.delete(key), 3000);
  next();
};
