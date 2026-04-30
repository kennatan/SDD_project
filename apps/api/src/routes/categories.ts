import { Router } from 'express';
import { getAllCategories, createCategory, softDeleteCategory, updateCategory } from '@sdd/core/services/categoryService';
import { authorize, Role } from '@sdd/core/auth';

const router = Router();

/**
 * 獲取可用分類 (全體可用)
 */
router.get('/', async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * [US2] 新增分類 (限主管)
 */
router.post('/', authorize([Role.SUPERVISOR]), async (req, res) => {
  try {
    const category = await createCategory(req.body.name, req.body.alertThreshold);
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * [US2] 修改分類與閾值 (限主管)
 */
router.put('/:id', authorize([Role.SUPERVISOR]), async (req, res) => {
  try {
    const updated = await updateCategory(req.params.id, req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * [US2] 軟刪除分類 (限主管)
 */
router.delete('/:id', authorize([Role.SUPERVISOR]), async (req, res) => {
  try {
    await softDeleteCategory(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
