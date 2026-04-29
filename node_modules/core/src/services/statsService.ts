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
 * 獲取趨勢數據 (折線圖)
 */
export const getTaskTrend = async (range: "day" | "week" | "month") => {
  // 此處為基礎邏輯，正式環境會依據 range 計算日期範圍
  return await prisma.taskRecord.findMany({
    orderBy: { createdAt: "asc" }
  });
};

