import express from 'express';
import { mockRecords, mockCategories } from '../utils/mockStore.js';

const router = express.Router();

/**
 * [Mock] 獲取統計數據
 */
router.get('/', (req, res) => {
  const totalCount = mockRecords.length;
  const breakdown = mockCategories.map(cat => {
    const count = mockRecords.filter(r => r.categoryId === cat.id).length;
    return {
      label: cat.name,
      percentage: totalCount > 0 ? Math.round((count / totalCount) * 100) : 0,
      color: cat.color
    };
  });

  const trends = [
    { hour: '08:00', total: 2, details: [ { color: '#2f5869', count: 2 } ] },
    { hour: '10:00', total: 5, details: [ { color: '#0e7490', count: 5 } ] },
    { hour: '12:00', total: 3, details: [ { color: '#a3cce1', count: 3 } ] },
    { hour: '14:00', total: 8, details: [ { color: '#2f5869', count: 6 }, { color: '#cbd5e1', count: 2 } ] },
    { hour: '16:00', total: totalCount + 5, details: [ { color: '#2f5869', count: totalCount }, { color: '#0e7490', count: 5 } ] }
  ];

  res.json({ totalCount, trends, breakdown });
});

/**
 * [Mock] 終極 CSV 匯出修正
 * 1. 確保 6 欄位絕對對位
 * 2. 處理 Excel 亂碼 (UTF-8 BOM)
 * 3. 處理內容內含逗號或引號的問題
 */
router.get('/export', (req, res) => {
  const headers = ['時間', '分機', '地點', '分類', '報修內容', '處理方式'];
  
  const csvRows = mockRecords.map(r => {
    // 格式化時間 (YYYY-MM-DD HH:mm:ss)
    const time = new Date(r.createdAt).toISOString().replace('T', ' ').substring(0, 19);
    
    // 確保所有內容都經過引號包裹與轉義
    const row = [
      `"${time}"`,
      `"${r.extension || ''}"`,
      `"${r.location || ''}"`,
      `"${r.category?.name || '其他'}"`,
      `"${(r.problemDescription || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`, // 移除換行避免 CSV 崩潰
      `"${(r.handling || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
    ];
    
    return row.join(',');
  });

  // 組合標題與內容，加入 UTF-8 BOM
  const csvContent = '\ufeff' + headers.join(',') + '\n' + csvRows.join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=SDD_Repair_Report.csv');
  res.status(200).send(csvContent);
});

export default router;
