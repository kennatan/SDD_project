import { Router } from 'express';
import { mockRecords, mockCategories } from '../utils/mockStore.js';

const router = Router();

/**
 * [Mock] 提交報修紀錄
 * 修正點：從 req.body 讀取與前端一致的 problemDescription 欄位
 */
router.post('/', (req, res) => {
  const { categoryId, problemDescription, handling, extension, location } = req.body;
  const category = mockCategories.find(c => c.id === categoryId) || { name: '其他' };
  
  const newRecord = {
    id: `rec-${Date.now()}`,
    extension: extension || '',
    location: location || '',
    categoryId,
    category,
    problemDescription: problemDescription || '', 
    handling: handling || '',
    createdAt: new Date().toISOString()
  };
  
  mockRecords.unshift(newRecord);
  res.status(201).json(newRecord);
});

/**
 * [Mock] 獲取歷史紀錄
 */
router.get('/', (req, res) => {
  const query = (req.query.q as string || '').toLowerCase();
  const filtered = mockRecords.filter(r => 
    (r.extension && r.extension.toLowerCase().includes(query)) || 
    (r.location && r.location.toLowerCase().includes(query)) ||
    (r.problemDescription && r.problemDescription.toLowerCase().includes(query))
  );
  res.json(filtered);
});

export default router;
