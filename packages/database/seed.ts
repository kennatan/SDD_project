import { PrismaClient } from '@prisma/client';
import path from 'path';

/**
 * [Prisma v7 終極注入方案]
 * 透過 __internal 屬性強行注入配置，解決 v7 的所有初始化報錯。
 */
const dbPath = `file:${path.resolve('./dev.db')}`;
const prisma = new PrismaClient({
  // @ts-ignore
  __internal: {
    configOverride: (config: any) => {
      config.datasources = {
        db: { url: dbPath }
      };
      return config;
    }
  }
} as any);

async function main() {
  try {
    await prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        id: 'system-default-user',
        username: 'admin',
        passwordHash: 'dummy',
        role: 'SUPERVISOR'
      }
    });

    const categories = [
      { name: '網路連接異常' }, { name: '硬體維修' }, { name: '軟體權限申請' }, { name: '其他' }
    ];

    for (const cat of categories) {
      await prisma.category.upsert({
        where: { name: cat.name },
        update: {},
        create: { name: cat.name, status: 'ACTIVE' }
      });
    }

    console.log('✅ 通車成功！資料初始化完成！');
  } catch (e) {
    console.error('❌ 初始化失敗:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
