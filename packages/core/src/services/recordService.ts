import prisma from '../db.js';

export interface CreateRecordInput {
  extension: string;
  location: string;
  categoryId: string;
  description: string;
  handling?: string;
  creatorId: string;
}

/**
 * [FR-001] 建立報修紀錄 (修正資料庫欄位對齊)
 */
export const createRecord = async (input: CreateRecordInput) => {
  return await prisma.taskRecord.create({
    data: {
      extension: input.extension,
      location: input.location,
      categoryId: input.categoryId,
      problemDescription: input.description, // 這裡必須是 problemDescription
      handling: input.handling || '',
      creatorId: input.creatorId
    }
  });
};

/**
 * 獲取歷史紀錄
 */
export const getRecords = async (query: string = '', limit = 15) => {
  return await prisma.taskRecord.findMany({
    where: {
      OR: [
        { extension: { contains: query } },
        { location: { contains: query } },
        { problemDescription: { contains: query } }
      ]
    },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: limit
  });
};
