import { Router } from 'express';
import { getAllCategories, createCategory, softDeleteCategory } from 'core/src/services/categoryService';
import { authorize, Role } from 'core/src/auth';

const router = Router();

// 所有人皆可獲取分類 (用於錄入選單)
router.get('/', async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 僅限主管新增分類
router.post('/', authorize([Role.SUPERVISOR]), async (req, res) => {
  try {
    const category = await createCategory(req.body.name);
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// 僅限主管軟刪除分類
router.delete('/:id', authorize([Role.SUPERVISOR]), async (req, res) => {
  try {
    await softDeleteCategory(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
