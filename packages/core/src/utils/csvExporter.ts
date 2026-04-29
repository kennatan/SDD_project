/**
 * 生成帶有 BOM 的 CSV 字串 (相容 Excel)
 */
export const convertToCsvWithBom = (data: any[]): string => {
  if (data.length === 0) return '\uFEFF';
  
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => 
    Object.values(row).map(val => `"${val}"`).join(',')
  ).join('\n');

  return '\uFEFF' + headers + '\n' + rows;
};
