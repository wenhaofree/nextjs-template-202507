import { prisma } from '@/lib/prisma'
import { hash, compare } from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

export interface CreateUserData {
  email: string
  password?: string
  nickname?: string
  avatarUrl?: string
  signinProvider: string
  signinOpenid?: string
  signinType?: string
  signinIp?: string
}

export interface UpdateUserData {
  nickname?: string
  avatarUrl?: string
  locale?: string
  signinIp?: string
}

/**
 * 创建新用户
 */
export async function createUser(data: CreateUserData) {
  const hashedPassword = data.password ? await hash(data.password, 12) : null

  return await prisma.user.create({
    data: {
      uuid: uuidv4(),
      email: data.email,
      password: hashedPassword,
      nickname: data.nickname || data.email.split('@')[0],
      avatarUrl: data.avatarUrl,
      signinProvider: data.signinProvider,
      signinOpenid: data.signinOpenid,
      signinType: data.signinType || 'credentials',
      signinIp: data.signinIp || '127.0.0.1',
      isDeleted: false,
    },
  })
}

/**
 * 根据邮箱和提供商查找用户
 */
export async function findUserByEmailAndProvider(email: string, provider: string) {
  return await prisma.user.findFirst({
    where: {
      email,
      signinProvider: provider,
      isDeleted: false,
    },
  })
}

/**
 * 根据UUID查找用户
 */
export async function findUserByUuid(uuid: string) {
  return await prisma.user.findFirst({
    where: {
      uuid,
      isDeleted: false,
    },
  })
}

/**
 * 根据ID查找用户
 */
export async function findUserById(id: number) {
  return await prisma.user.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  })
}

/**
 * 更新用户信息
 */
export async function updateUser(id: number, data: UpdateUserData) {
  return await prisma.user.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  })
}

/**
 * 验证用户密码
 */
export async function verifyPassword(plainPassword: string, hashedPassword: string) {
  return await compare(plainPassword, hashedPassword)
}

/**
 * 更新用户密码
 */
export async function updateUserPassword(id: number, newPassword: string) {
  const hashedPassword = await hash(newPassword, 12)
  
  return await prisma.user.update({
    where: { id },
    data: {
      password: hashedPassword,
      updatedAt: new Date(),
    },
  })
}

/**
 * 软删除用户
 */
export async function deleteUser(id: number) {
  return await prisma.user.update({
    where: { id },
    data: {
      isDeleted: true,
      updatedAt: new Date(),
    },
  })
}

/**
 * 检查邮箱是否已存在
 */
export async function isEmailExists(email: string, provider: string = 'credentials') {
  const user = await prisma.user.findFirst({
    where: {
      email,
      signinProvider: provider,
      isDeleted: false,
    },
  })
  
  return !!user
}
