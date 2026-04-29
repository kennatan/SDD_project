import { PrismaClient, CategoryStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCategories = async (includeDeleted = false) => {
  return await prisma.category.findMany({
    where: includeDeleted ? {} : { status: { not: CategoryStatus.DELETED } },
    orderBy: { name: "asc" }
  });
};

export const createCategory = async (name: string) => {
  return await prisma.category.create({
    data: { name }
  });
};

export const softDeleteCategory = async (id: string) => {
  return await prisma.category.update({
    where: { id },
    data: { status: CategoryStatus.DELETED }
  });
};

export const updateCategoryStatus = async (id: string, status: CategoryStatus) => {
  return await prisma.category.update({
    where: { id },
    data: { status }
  });
};

