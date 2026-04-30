import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * 建立報修紀錄並更新使用者的智慧記憶
 */
export const createRecord = async (data: {
  cardNumber: string;
  extension: string;
  categoryId: string;
  creatorId: string;
  problemDescription?: string;
}) => {
  // 使用 Transaction 確保原子性
  return await prisma.$transaction(async (tx) => {
    // 1. 建立報修紀錄
    const record = await tx.taskRecord.create({
      data: {
        cardNumber: data.cardNumber,
        extension: data.extension,
        categoryId: data.categoryId,
        creatorId: data.creatorId,
        problemDescription: data.problemDescription
      }
    });

    // 2. 更新使用者的智慧記憶 (Database-based)
    await tx.user.update({
      where: { id: data.creatorId },
      data: { lastUsedExtension: data.extension }
    });

    return record;
  });
};

/**
 * 獲取最近 15 筆紀錄 (分頁基礎)
 */
export const getRecentRecords = async (limit: number = 15) => {
  return await prisma.taskRecord.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { category: true, creator: { select: { username: true } } }
  });
};
