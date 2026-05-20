import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * 獲取報修佔比數據 (圓餅圖)
 */
export const getCategoryStats = async () => {
  return await prisma.taskRecord.groupBy({
    by: ["categoryId"],
    _count: { id: true },
  });
};

/**
 * 偵測量能激增 (Spike Detection)
 * 邏輯：檢查過去 1 小時內，各類別報修數是否超過主管設定之 alertThreshold
 */
export const detectSpikes = async () => {
  const oneHourAgo = new Date(Date.now() - 3600000);

  // 1. 獲取過去 1 小時的統計
  const recentStats = await prisma.taskRecord.groupBy({
    by: ["categoryId"],
    where: { createdAt: { gte: oneHourAgo } },
    _count: { id: true }
  });

  // 2. 獲取所有分類的閾值設定
  const categories = await prisma.category.findMany({
    where: { alertThreshold: { gt: 0 } },
    select: { id: true, name: true, alertThreshold: true }
  });

  // 3. 比對並找出超標類別
  const spikes = categories.filter(cat => {
    const stat = recentStats.find(s => s.categoryId === cat.id);
    return stat ? stat._count.id >= cat.alertThreshold : false;
  }).map(cat => ({
    name: cat.name,
    count: recentStats.find(s => s.categoryId === cat.id)?._count.id,
    threshold: cat.alertThreshold
  }));

  return spikes;
};

/**
 * 獲取趨勢數據 (按小時聚合)
 */
export const getTaskTrend = async () => {
  // 正式環境會使用資料庫特定的日期格式化函數
  return await prisma.taskRecord.findMany({
    take: 100,
    orderBy: { createdAt: "asc" },
    select: { createdAt: true }
  });
};
