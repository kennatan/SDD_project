import express from 'express';
import { createRecord, getRecords } from '../../../../packages/core/src/services/recordService.js';
import { checkIdempotency } from '../middleware/idempotency.js';

const router = express.Router();

router.post('/', checkIdempotency, async (req, res) => {
  try {
    const { extension, location, categoryId, description, handling } = req.body;
    
    // 使用 Seed 時建立的真實 ID
    const creatorId = 'system-default-user'; 

    const record = await createRecord({
      extension,
      location,
      categoryId,
      description,
      handling,
      creatorId
    });

    res.status(201).json(record);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: '儲存報修紀錄時發生錯誤' });
  }
});

router.get('/', async (req, res) => {
  try {
    const query = req.query.q as string || '';
    const records = await getRecords(query);
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: '獲取紀錄失敗' });
  }
});

export default router;
