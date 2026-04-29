import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createRecord = async (data: {
  cardNumber: string;
  extension: string;
  categoryId: string;
  creatorId: string;
  problemDescription?: string;
}) => {
  return await prisma.taskRecord.create({
    data: {
      cardNumber: data.cardNumber,
      extension: data.extension,
      categoryId: data.categoryId,
      creatorId: data.creatorId,
      problemDescription: data.problemDescription
    }
  });
};

export const getRecentRecords = async (limit: number = 15) => {
  return await prisma.taskRecord.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { category: true, creator: { select: { username: true } } }
  });
};

