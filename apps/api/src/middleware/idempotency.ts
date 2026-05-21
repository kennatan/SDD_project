import { Request, Response, NextFunction } from 'express';

// 記憶體快取 (MVP 階段適用，擴展至多實體時需改用 Redis)
const idempotencyCache = new Map<string, number>();

/**
 * 3 秒防抖中介軟體
 * 規則：同一使用者 (creatorId) 在 3 秒內不得針對同一卡號 (cardNumber) 重複提交
 */
export const preventDuplicate = (req: Request, res: Response, next: NextFunction) => {
  const { cardNumber, creatorId } = req.body;

  if (!cardNumber || !creatorId) {
    return next(); // 交給驗證器處理缺少欄位的錯誤
  }

  const cacheKey = `${creatorId}:${cardNumber}`;
  const now = Date.now();
  const lastRequestTime = idempotencyCache.get(cacheKey);

  if (lastRequestTime && now - lastRequestTime < 3000) {
    return res.status(429).json({ 
      error: '重複提交', 
      message: '系統偵測到重複操作，請稍候 3 秒後再試。' 
    });
  }

  idempotencyCache.set(cacheKey, now);
  
  // 定期清理過期快取 (避免記憶體洩漏)
  setTimeout(() => {
    if (idempotencyCache.get(cacheKey) === now) {
      idempotencyCache.delete(cacheKey);
    }
  }, 3100);

  next();
};
