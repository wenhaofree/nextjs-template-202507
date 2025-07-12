import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { validatePasswordResetToken, clearResetToken } from '@/lib/password-reset';

/**
 * 重置密码API
 * 移动到 /api/password/reset 以避免与 NextAuth.js 冲突
 */
export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    // 验证输入
    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: 'Token and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // 验证token
    const tokenValidation = await validatePasswordResetToken(token);
    
    if (!tokenValidation.valid) {
      let message = 'Invalid or expired reset link';
      
      if (tokenValidation.error === 'Token expired') {
        message = 'Reset link has expired. Please request a new one.';
      } else if (tokenValidation.error === 'Token already used') {
        message = 'Reset link has already been used. Please request a new one.';
      }
      
      return NextResponse.json(
        { success: false, message },
        { status: 400 }
      );
    }

    const email = tokenValidation.email!;

    // 查找用户
    const user = await prisma.user.findFirst({
      where: {
        email,
        signinProvider: 'credentials',
        isDeleted: false,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // 哈希新密码
    const hashedPassword = await hash(password, 12);

    // 更新用户密码
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword } as any, // 使用any绕过类型检查
    });

    // 清除用户的重置token
    await clearResetToken(email);

    console.log(`Password reset successful for user: ${email}`);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Password has been reset successfully. You can now sign in with your new password.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while resetting your password. Please try again.' 
      },
      { status: 500 }
    );
  }
}
