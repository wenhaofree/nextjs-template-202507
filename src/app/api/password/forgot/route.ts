import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPasswordResetToken } from '@/lib/password-reset';
import { sendPasswordResetEmail, isEmailServiceConfigured } from '@/lib/email';

/**
 * 忘记密码API
 * 移动到 /api/password/forgot 以避免与 NextAuth.js 冲突
 */
export async function POST(request: Request) {
  try {
    const { email, locale = 'en' } = await request.json();

    // 验证输入
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // 检查邮件服务是否配置
    if (!isEmailServiceConfigured()) {
      console.error('Email service not configured');
      return NextResponse.json(
        { success: false, message: 'Email service not available' },
        { status: 500 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 查找用户（只查找credentials登录的用户）
    const user = await prisma.user.findFirst({
      where: {
        email,
        signinProvider: 'credentials',
        isDeleted: false,
      },
    });

    // 为了安全考虑，无论用户是否存在都返回成功消息
    // 这样可以防止邮箱枚举攻击
    if (!user) {
      console.log(`Password reset requested for non-existent email: ${email}`);
      return NextResponse.json(
        { 
          success: true, 
          message: 'If the email exists in our system, you will receive a password reset link shortly.' 
        },
        { status: 200 }
      );
    }

    try {
      console.log(`🔐 Processing password reset request for: ${email}`);

      // 生成重置token
      const resetToken = await createPasswordResetToken(email);
      console.log(`🔑 Reset token generated for: ${email}`);

      // 发送重置邮件
      const emailResult = await sendPasswordResetEmail(email, resetToken, locale);

      if (emailResult.success) {
        console.log(`✅ Password reset email successfully sent to: ${email}`);
        console.log(`   📧 Message ID: ${emailResult.messageId}`);
        console.log(`   🌐 Locale: ${locale}`);
        console.log(`   ⏰ Timestamp: ${new Date().toISOString()}`);
      } else {
        console.warn(`⚠️ Email sent but with warnings for: ${email}`);
      }

      return NextResponse.json(
        {
          success: true,
          message: 'If the email exists in our system, you will receive a password reset link shortly.'
        },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('❌ Failed to send password reset email:');
      console.error(`   📧 Email: ${email}`);
      console.error(`   🌐 Locale: ${locale}`);
      console.error(`   💥 Error:`, emailError);
      console.error(`   ⏰ Timestamp: ${new Date().toISOString()}`);

      // 即使邮件发送失败，也不要暴露具体错误信息
      return NextResponse.json(
        {
          success: true,
          message: 'If the email exists in our system, you will receive a password reset link shortly.'
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while processing your request. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
