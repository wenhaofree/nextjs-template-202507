import { Resend } from 'resend';
import { logEmailAttempt } from './email-status';

// 初始化Resend客户端
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * 发送密码重置邮件
 */
export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
  locale: string = 'en'
) {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';
  const resetUrl = `${baseUrl}/${locale}/auth/reset-password?token=${resetToken}`;
  
  // 根据语言设置邮件内容
  const isZh = locale === 'zh';
  
  const subject = isZh ? '重置您的密码' : 'Reset Your Password';
  
  const htmlContent = isZh ? `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>重置密码</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #4F46E5;">重置您的密码</h2>
        <p>您好，</p>
        <p>我们收到了重置您账户密码的请求。如果这是您本人操作，请点击下面的链接重置密码：</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            重置密码
          </a>
        </div>
        <p>或者复制以下链接到浏览器地址栏：</p>
        <p style="word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 4px;">
          ${resetUrl}
        </p>
        <p><strong>重要提醒：</strong></p>
        <ul>
          <li>此链接将在 <strong>1小时</strong> 后失效</li>
          <li>如果您没有请求重置密码，请忽略此邮件</li>
          <li>为了您的账户安全，请不要将此链接分享给他人</li>
        </ul>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">
          此邮件由系统自动发送，请勿回复。<br>
          如有疑问，请联系我们的客服团队。
        </p>
      </div>
    </body>
    </html>
  ` : `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Reset Your Password</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #4F46E5;">Reset Your Password</h2>
        <p>Hello,</p>
        <p>We received a request to reset your account password. If this was you, please click the link below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 4px;">
          ${resetUrl}
        </p>
        <p><strong>Important:</strong></p>
        <ul>
          <li>This link will expire in <strong>1 hour</strong></li>
          <li>If you didn't request a password reset, please ignore this email</li>
          <li>For your security, don't share this link with anyone</li>
        </ul>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">
          This email was sent automatically. Please do not reply.<br>
          If you have any questions, please contact our support team.
        </p>
      </div>
    </body>
    </html>
  `;

  try {
    console.log('📧 Attempting to send password reset email...');
    console.log(`   📍 To: ${email}`);
    console.log(`   📍 From: ${process.env.NEXT_PUBLIC_FROM_EMAIL || 'noreply@yourdomain.com'}`);
    console.log(`   📍 Subject: ${subject}`);
    console.log(`   📍 Locale: ${locale}`);
    console.log(`   📍 API Key: ${process.env.RESEND_API_KEY ? 'Set (***' + process.env.RESEND_API_KEY.slice(-4) + ')' : 'Not set'}`);

    const startTime = Date.now();
    const { data, error } = await resend.emails.send({
      from: process.env.NEXT_PUBLIC_FROM_EMAIL || 'noreply@yourdomain.com',
      to: [email],
      subject,
      html: htmlContent,
    });
    const duration = Date.now() - startTime;

    // 详细记录API响应
    console.log(`📊 Resend API Response (${duration}ms):`);
    console.log(`   📧 Data:`, data ? JSON.stringify(data, null, 2) : 'null');
    console.log(`   📧 Error:`, error ? JSON.stringify(error, null, 2) : 'null');

    if (error) {
      console.error('❌ Failed to send password reset email:');
      console.error('   📧 Error details:', JSON.stringify(error, null, 2));
      console.error('   📧 Error type:', typeof error);
      console.error('   📧 Error message:', error.message || 'No error message');
      console.error('   📧 Status code:', (error as any).statusCode || 'No status code');
      console.error('   📧 Error name:', error.name || 'No error name');
      console.error(`   📧 Email: ${email}`);
      console.error(`   📧 Subject: ${subject}`);
      console.error(`   📧 Duration: ${duration}ms`);
      console.error(`   📧 Timestamp: ${new Date().toISOString()}`);

      // 记录失败的日志
      logEmailAttempt('password-reset', email, false, {
        error: error.message || 'Unknown error',
        statusCode: (error as any).statusCode,
        errorName: error.name,
        locale,
        duration,
        timestamp: new Date().toISOString(),
        fullError: error
      });

      throw new Error(`Failed to send email: ${error.message || 'Unknown error'}`);
    }

    if (data && data.id) {
      console.log('✅ Password reset email sent successfully!');
      console.log(`   📧 Email ID: ${data.id}`);
      console.log(`   📧 To: ${email}`);
      console.log(`   📧 Subject: ${subject}`);
      console.log(`   📧 Duration: ${duration}ms`);
      console.log(`   📧 Timestamp: ${new Date().toISOString()}`);
      console.log(`   📧 Full response:`, JSON.stringify(data, null, 2));

      // 记录成功发送的日志
      logEmailAttempt('password-reset', email, true, {
        messageId: data.id,
        locale,
        duration,
        timestamp: new Date().toISOString(),
        fullResponse: data
      });

      return {
        success: true,
        messageId: data.id,
        duration,
        timestamp: new Date().toISOString()
      };
    } else {
      console.warn('⚠️ Unexpected response from Resend API:');
      console.warn('   📧 Data:', data);
      console.warn('   📧 Expected data.id but got:', typeof data?.id);
      console.warn(`   📧 Email: ${email}`);
      console.warn(`   📧 Duration: ${duration}ms`);

      // 记录警告日志
      logEmailAttempt('password-reset', email, false, {
        error: 'Unexpected API response format',
        responseData: data,
        locale,
        duration,
        timestamp: new Date().toISOString()
      });

      throw new Error('Unexpected response format from email service');
    }
  } catch (error) {
    console.error('💥 Critical error sending password reset email:');
    console.error('   📧 Error:', error);
    console.error('   📧 Stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('   📧 Email:', email);
    console.error('   📧 Timestamp:', new Date().toISOString());

    // 记录失败的日志
    logEmailAttempt('password-reset', email, false, {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      locale,
      timestamp: new Date().toISOString()
    });

    throw error;
  }
}

/**
 * 检查邮件服务是否配置正确
 */
export function isEmailServiceConfigured(): boolean {
  return !!(process.env.RESEND_API_KEY && process.env.NEXT_PUBLIC_FROM_EMAIL);
}
