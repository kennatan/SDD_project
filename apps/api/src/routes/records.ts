import { Router } from 'express';
import { createRecord } from '@sdd/core/services/recordService';
import { preventDuplicate } from '../middleware/idempotency';
import { validateCardNumber, validateExtension } from '@sdd/core/validators';

const router = Router();

/**
 * [US1] 提交報修紀錄
 */
router.post('/', preventDuplicate, async (req, res) => {
  const { cardNumber, extension, categoryId, creatorId, problemDescription } = req.body;

  // 1. 嚴格格式驗證
  if (!validateCardNumber(cardNumber)) {
    return res.status(400).json({ error: "格式錯誤", message: "卡號必須為 1-6 碼數字。" });
  }
  if (!validateExtension(extension)) {
    return res.status(400).json({ error: "格式錯誤", message: "分機必須為 1-10 碼數字。" });
  }

  try {
    const record = await createRecord({
      cardNumber,
      extension,
      categoryId,
      creatorId,
      problemDescription
    });
    res.status(201).json(record);
  } catch (err: any) {
    res.status(500).json({ error: "伺服器錯誤", message: err.message });
  }
});

export default router;
