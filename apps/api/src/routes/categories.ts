import express from 'express';
import prisma from '../../../../packages/core/src/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { name: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: '無法獲取分類清單' });
  }
});

export default router;
