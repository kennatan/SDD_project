import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
    { name: '網路連接異常' },
    { name: '硬體維修' },
    { name: '軟體權限申請' },
    { name: '其他' }
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: { name: cat.name, status: 'ACTIVE' }
    });
  }

  console.log('✅ 資料初始化完成！');
}

main().catch(console.error).finally(() => prisma.$disconnect());
