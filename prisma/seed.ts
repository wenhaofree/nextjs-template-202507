import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 开始数据库种子...')

  // 创建测试用户
  const testPassword = await hash('password123', 12)
  
  const testUser = await prisma.user.upsert({
    where: {
      email_signinProvider: {
        email: 'test@example.com',
        signinProvider: 'credentials',
      },
    },
    update: {},
    create: {
      uuid: uuidv4(),
      email: 'test@example.com',
      password: testPassword,
      nickname: 'Test User',
      signinProvider: 'credentials',
      signinType: 'credentials',
      signinIp: '127.0.0.1',
      isDeleted: false,
    },
  })

  console.log('✅ 创建测试用户:', testUser.email)

  // 创建管理员用户
  const adminPassword = await hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: {
      email_signinProvider: {
        email: 'admin@example.com',
        signinProvider: 'credentials',
      },
    },
    update: {},
    create: {
      uuid: uuidv4(),
      email: 'admin@example.com',
      password: adminPassword,
      nickname: 'Admin User',
      signinProvider: 'credentials',
      signinType: 'credentials',
      signinIp: '127.0.0.1',
      isDeleted: false,
    },
  })

  console.log('✅ 创建管理员用户:', adminUser.email)

  console.log('🎉 数据库种子完成!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ 数据库种子失败:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
