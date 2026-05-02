/**
 * [US3] 強制格式化 CSV 工具
 * 解決 undefined 字串與欄位偏移問題
 */
export const convertToCSV = (data: any[], headers: string[]) => {
  // 建立標題列
  const headerRow = headers.join(',');
  
  // 建立數據列
  const rows = data.map(obj => {
    return headers.map(header => {
      const rawVal = obj[header];
      // 關鍵修復：確保 null/undefined 變成長度為 0 的空字串，而非 "undefined" 字串
      const safeVal = (rawVal === undefined || rawVal === null) ? '' : rawVal;
      // 處理內容中的引號，防止 CSV 格式崩潰
      return `"${String(safeVal).replace(/"/g, '""')}"`;
    }).join(',');
  });

  // 加入 UTF-8 BOM (\ufeff) 確保 Excel 正常讀取中文
  return '\ufeff' + [headerRow, ...rows].join('\n');
};
