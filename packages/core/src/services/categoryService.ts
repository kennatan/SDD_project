import { PrismaClient, CategoryStatus } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * 獲取所有分類 (過濾已刪除)
 */
export const getAllCategories = async (includeDeleted = false) => {
  return await prisma.category.findMany({
    where: includeDeleted ? {} : { status: { not: CategoryStatus.DELETED } },
    orderBy: { name: "asc" }
  });
};

/**
 * 建立新分類
 */
export const createCategory = async (name: string, alertThreshold: number = 0) => {
  return await prisma.category.create({
    data: { name, alertThreshold }
  });
};

/**
 * 軟刪除分類
 */
export const softDeleteCategory = async (id: string) => {
  return await prisma.category.update({
    where: { id },
    data: { status: CategoryStatus.DELETED }
  });
};

/**
 * 更新分類狀態與預警閾值 (主管功能)
 */
export const updateCategory = async (id: string, data: {
  name?: string;
  status?: CategoryStatus;
  alertThreshold?: number;
}) => {
  return await prisma.category.update({
    where: { id },
    data
  });
};
