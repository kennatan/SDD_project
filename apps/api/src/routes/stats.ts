import express from 'express';
import prisma from '../../../../packages/core/src/db.js';
import { getRecords } from '../../../../packages/core/src/services/recordService.js';
import { convertToCSV } from '../../../../packages/core/src/utils/csvExporter.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const totalCount = await prisma.taskRecord.count();
    
    // 獲取所有類別與顏色對應
    const categories = await prisma.category.findMany({
      include: { _count: { select: { records: true } } }
    });

    const breakdown = categories.map((c, i) => ({
      label: c.name,
      percentage: totalCount > 0 ? Math.round((c._count.records / totalCount) * 100) : 0,
      color: ['#2f5869', '#0e7490', '#a3cce1', '#cbd5e1'][i] || '#e2e8f0'
    })).filter(b => b.percentage > 0);

    // [升級] 按類別分層的趨勢數據
    const trends = [
      { hour: '08:00', total: 10, details: [ { color: '#2f5869', count: 6 }, { color: '#0e7490', count: 4 } ] },
      { hour: '10:00', total: 25, details: [ { color: '#2f5869', count: 15 }, { color: '#0e7490', count: 8 }, { color: '#a3cce1', count: 2 } ] },
      { hour: '12:00', total: 5,  details: [ { color: '#2f5869', count: 2 }, { color: '#cbd5e1', count: 3 } ] },
      { hour: '14:00', total: 32, details: [ { color: '#2f5869', count: 20 }, { color: '#0e7490', count: 10 }, { color: '#a3cce1', count: 2 } ] },
      { hour: '16:00', total: 15, details: [ { color: '#2f5869', count: 8 }, { color: '#0e7490', count: 5 }, { color: '#a3cce1', count: 2 } ] },
      { hour: '18:00', total: 20, details: [ { color: '#2f5869', count: 12 }, { color: '#cbd5e1', count: 8 } ] }
    ];

    res.json({ totalCount, trends, breakdown });
  } catch (error) {
    res.status(500).json({ error: '獲取統計失敗' });
  }
});

router.get('/export', async (req, res) => {
  try {
    const records = await getRecords('', 1000);
    const headers = ['時間', '分機', '地點', '分類', '報修內容', '處理方式'];
    const exportData = records.map(r => ({
      '時間': r.createdAt ? new Date(r.createdAt).toLocaleString() : '',
      '分機': r.extension || '',
      '地點': r.location || '',
      '分類': r.category?.name || '',
      '報修內容': r.problemDescription || '',
      '處理方式': r.handling || ''
    }));
    const csvContent = convertToCSV(exportData, headers);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=repair_report.csv');
    res.send(csvContent);
  } catch (error) {
    res.status(500).json({ error: '匯出失敗' });
  }
});

export default router;
