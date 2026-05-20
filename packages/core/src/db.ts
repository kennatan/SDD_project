import { PrismaClient } from '@prisma/client';

/**
 * 核心資料庫實例 (Prisma v6 穩定版)
 * 自動從環境變數或 schema.prisma 預設路徑讀取連線
 */
const prisma = new PrismaClient();

export default prisma;
