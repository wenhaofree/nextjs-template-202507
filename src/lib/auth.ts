import { auth } from "@/auth"
import { redirect } from "next/navigation"

/**
 * 获取当前用户会话
 */
export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

/**
 * 要求用户登录，如果未登录则重定向到登录页
 */
export async function requireAuth() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/auth/signin')
  }
  
  return session.user
}

/**
 * 检查用户是否已登录
 */
export async function isAuthenticated() {
  const session = await auth()
  return !!session?.user
}

/**
 * 获取完整的会话信息
 */
export async function getSession() {
  return await auth()
}
