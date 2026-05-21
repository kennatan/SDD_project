import { Router } from 'express';
import { mockCategories } from '../utils/mockStore.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(mockCategories);
});

router.post('/', (req, res) => {
  const { name } = req.body;
  console.log('📡 [API] 收到新增分類請求:', name);
  
  if (!name) return res.status(400).json({ error: '名稱不能為空' });
  
  const newCategory = {
    id: `${Date.now()}`,
    name,
    color: '#' + Math.floor(Math.random()*16777215).toString(16)
  };
  
  mockCategories.push(newCategory);
  console.log('✅ [API] 分類已更新, 目前總數:', mockCategories.length);
  res.status(201).json(newCategory);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log('📡 [API] 收到刪除分類請求, ID:', id);
  
  const index = mockCategories.findIndex(c => c.id === id);
  if (index > -1) {
    mockCategories.splice(index, 1);
    console.log('✅ [API] 分類已刪除');
    res.status(204).send();
  } else {
    console.log('❌ [API] 刪除失敗：找不到該分類');
    res.status(404).json({ error: '分類不存在' });
  }
});

export default router;
