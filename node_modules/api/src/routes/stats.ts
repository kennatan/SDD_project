import { Router } from 'express';
import { getCategoryStats, getTaskTrend, detectSpikes } from '@sdd/core/services/statsService';
import { getRecentRecords } from '@sdd/core/services/recordService';
import { convertToCsvWithBom } from '@sdd/core/utils/csvExporter';
import { authorize, Role } from '@sdd/core/auth';

const router = Router();

/**
 * [US3] 獲取儀表板統計數據
 */
router.get('/dashboard', authorize([Role.SUPERVISOR]), async (req, res) => {
  try {
    const categories = await getCategoryStats();
    const spikes = await detectSpikes();
    const trend = await getTaskTrend();
    res.json({ categories, spikes, trend });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * [US3] 匯出全量資料 CSV
 */
router.get('/export', authorize([Role.SUPERVISOR]), async (req, res) => {
  try {
    const data = await getRecentRecords(1000); // 匯出近期 1000 筆
    const csv = convertToCsvWithBom(data);
    
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=emergency_report.csv');
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
