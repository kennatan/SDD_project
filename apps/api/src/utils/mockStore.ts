// 共享的模擬數據存儲
export const mockRecords = [
  {
    id: 'rec-1',
    extension: '8801',
    location: '門診 205',
    category: { name: '網路連接異常' },
    categoryId: '1',
    problemDescription: '診間網路突然斷線，無法讀取病歷。',
    handling: '已更換網路線，恢復通訊。',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  }
];

export const mockCategories = [
  { id: '1', name: '網路連接異常', color: '#2f5869' },
  { id: '2', name: '硬體設備維修', color: '#0e7490' },
  { id: '3', name: '軟體系統權限', color: '#a3cce1' },
  { id: '4', name: '其他報修事項', color: '#cbd5e1' }
];
