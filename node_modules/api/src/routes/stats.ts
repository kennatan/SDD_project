import { Router } from 'express';
import { getCategoryStats, getTaskTrend } from 'core/src/services/statsService';
import { getRecentRecords } from 'core/src/services/recordService';
import { convertToCsvWithBom } from 'core/src/utils/csvExporter';
import { authorize, Role } from 'core/src/auth';

const router = Router();

// 獲取圖表統計數據
router.get('/dashboard', authorize([Role.SUPERVISOR]), async (req, res) => {
  try {
    const categories = await getCategoryStats();
    const trend = await getTaskTrend('week');
    res.json({ categories, trend });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 匯出 CSV 檔案
router.get('/export', authorize([Role.SUPERVISOR]), async (req, res) => {
  try {
    const data = await getRecentRecords(100);
    const csv = convertToCsvWithBom(data);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
