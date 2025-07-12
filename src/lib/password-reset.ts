import { randomBytes } from 'crypto';
import { prisma } from '@/lib/prisma';

/**
 * 生成密码重置token
 */
export function generateResetToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * 创建密码重置token记录
 */
export async function createPasswordResetToken(email: string): Promise<string> {
  const token = generateResetToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1小时后过期

  // 更新用户的重置token
  await prisma.user.updateMany({
    where: {
      email,
      signinProvider: 'credentials',
      isDeleted: false,
    },
    data: {
      resetToken: token,
      resetTokenExpiresAt: expiresAt,
    } as any, // 使用any绕过类型检查
  });

  return token;
}

/**
 * 验证密码重置token
 */
export async function validatePasswordResetToken(token: string): Promise<{
  valid: boolean;
  email?: string;
  error?: string;
}> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        signinProvider: 'credentials',
        isDeleted: false,
      }
    });

    if (!user) {
      return { valid: false, error: 'Token not found' };
    }

    if (!user.resetTokenExpiresAt) {
      return { valid: false, error: 'Token has no expiration' };
    }

    if (user.resetTokenExpiresAt < new Date()) {
      return { valid: false, error: 'Token expired' };
    }

    return { valid: true, email: user.email };
  } catch (error) {
    console.error('Error validating reset token:', error);
    return { valid: false, error: 'Database error' };
  }
}

/**
 * 清除用户的重置token（标记为已使用）
 */
export async function clearResetToken(email: string): Promise<void> {
  await prisma.user.updateMany({
    where: {
      email,
      signinProvider: 'credentials',
      isDeleted: false,
    },
    data: {
      resetToken: null,
      resetTokenExpiresAt: null,
    } as any, // 使用any绕过类型检查
  });
}

/**
 * 清理过期的token
 */
export async function cleanupExpiredTokens(): Promise<void> {
  await prisma.user.updateMany({
    where: {
      resetTokenExpiresAt: { lt: new Date() }
    },
    data: {
      resetToken: null,
      resetTokenExpiresAt: null,
    } as any, // 使用any绕过类型检查
  });
}
