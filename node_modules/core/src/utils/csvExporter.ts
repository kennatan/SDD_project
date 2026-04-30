/**
 * 生成帶有 BOM 的 CSV 字串 (相容 Excel)
 */
export const convertToCsvWithBom = (data: any[]): string => {
  if (data.length === 0) return '\uFEFF';
  
  // 取出欄位名稱
  const headers = Object.keys(data[0]).join(',');
  
  // 生成資料列 (含引號處理以避免內容逗點破壞格式)
  const rows = data.map(row => 
    Object.values(row).map(val => `"${val}"`).join(',')
  ).join('\n');

  // 拼接 UTF-8 BOM (\uFEFF)
  return '\uFEFF' + headers + '\n' + rows;
};
