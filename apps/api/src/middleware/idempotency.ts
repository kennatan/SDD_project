import { Request, Response, NextFunction } from 'express';

// 簡單的記憶體防抖 (實務上建議用 Redis)
const cache = new Map<string, number>();

/**
 * [SC-001] 3 秒防抖中介軟體
 */
export const checkIdempotency = (req: Request, res: Response, next: NextFunction) => {
  const { extension, categoryId } = req.body;
  const key = `${extension}-${categoryId}`;
  const now = Date.now();

  if (cache.has(key)) {
    const lastTime = cache.get(key)!;
    if (now - lastTime < 3000) {
      return res.status(429).json({ error: '請勿重複提交，請稍候 3 秒。' });
    }
  }

  cache.set(key, now);
  next();
};
