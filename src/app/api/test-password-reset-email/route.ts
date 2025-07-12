import { NextResponse } from 'next/server';
import { sendPasswordResetEmail, isEmailServiceConfigured } from '@/lib/email';
import { createPasswordResetToken } from '@/lib/password-reset';

/**
 * 测试密码重置邮件发送的API端点
 * 仅用于开发环境测试，包含详细的日志记录
 */
export async function POST(request: Request) {
  // 只在开发环境允许访问
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development' },
      { status: 403 }
    );
  }

  try {
    const { email, locale = 'en' } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('\n🧪 ===== TESTING PASSWORD RESET EMAIL =====');
    console.log(`📧 Test Email: ${email}`);
    console.log(`🌐 Locale: ${locale}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);

    // 1. 检查邮件服务配置
    console.log('\n📋 Step 1: Checking email service configuration...');
    if (!isEmailServiceConfigured()) {
      console.error('❌ Email service not configured');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email service not configured',
          details: {
            hasApiKey: !!process.env.RESEND_API_KEY,
            hasFromEmail: !!process.env.NEXT_PUBLIC_FROM_EMAIL
          }
        },
        { status: 500 }
      );
    }
    console.log('✅ Email service configuration OK');

    // 2. 生成测试token
    console.log('\n📋 Step 2: Generating password reset token...');
    let resetToken;
    try {
      resetToken = await createPasswordResetToken(email);
      console.log(`✅ Token generated: ${resetToken.substring(0, 8)}...`);
    } catch (tokenError) {
      console.error('❌ Failed to generate token:', tokenError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to generate reset token',
          details: { tokenError: tokenError instanceof Error ? tokenError.message : 'Unknown error' }
        },
        { status: 500 }
      );
    }

    // 3. 发送邮件
    console.log('\n📋 Step 3: Sending password reset email...');
    const emailStartTime = Date.now();
    
    try {
      const emailResult = await sendPasswordResetEmail(email, resetToken, locale);
      const emailDuration = Date.now() - emailStartTime;

      console.log('\n✅ ===== EMAIL SENT SUCCESSFULLY =====');
      console.log(`📧 Email ID: ${emailResult.messageId}`);
      console.log(`⏱️ Total Duration: ${emailDuration}ms`);
      console.log(`📧 Email Result:`, JSON.stringify(emailResult, null, 2));
      console.log('✅ ===== TEST COMPLETED SUCCESSFULLY =====\n');

      return NextResponse.json(
        {
          success: true,
          message: 'Password reset email sent successfully',
          details: {
            email,
            locale,
            messageId: emailResult.messageId,
            duration: emailDuration,
            timestamp: new Date().toISOString(),
            emailResult
          }
        },
        { status: 200 }
      );

    } catch (emailError) {
      const emailDuration = Date.now() - emailStartTime;
      
      console.error('\n❌ ===== EMAIL SENDING FAILED =====');
      console.error(`⏱️ Duration: ${emailDuration}ms`);
      console.error(`💥 Error:`, emailError);
      console.error('❌ ===== TEST FAILED =====\n');

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send password reset email',
          details: {
            email,
            locale,
            duration: emailDuration,
            error: emailError instanceof Error ? emailError.message : 'Unknown error',
            stack: emailError instanceof Error ? emailError.stack : 'No stack trace',
            timestamp: new Date().toISOString()
          }
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('\n💥 ===== CRITICAL TEST ERROR =====');
    console.error('Error:', error);
    console.error('💥 ===== TEST CRASHED =====\n');
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Test endpoint error',
        details: {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : 'No stack trace',
          timestamp: new Date().toISOString()
        }
      },
      { status: 500 }
    );
  }
}
