import { Resend } from 'resend';

/**
 * 检查邮件发送状态
 */
export async function checkEmailStatus(emailId: string) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    console.log(`🔍 Checking email status for ID: ${emailId}`);

    const response = await resend.emails.get(emailId);

    console.log('📧 Email status details:');
    console.log(`   📧 Response:`, JSON.stringify(response, null, 2));

    // 检查响应结构
    if (response && typeof response === 'object') {
      const emailData = response as any; // 使用any来绕过类型检查
      console.log(`   📧 ID: ${emailData.id || 'N/A'}`);
      console.log(`   📧 From: ${emailData.from || 'N/A'}`);
      console.log(`   📧 To: ${emailData.to ? JSON.stringify(emailData.to) : 'N/A'}`);
      console.log(`   📧 Subject: ${emailData.subject || 'N/A'}`);
      console.log(`   📧 Created: ${emailData.created_at || 'N/A'}`);
      console.log(`   📧 Last Event: ${emailData.last_event || 'N/A'}`);
    }

    return response;
  } catch (error) {
    console.error(`❌ Failed to check email status for ID: ${emailId}`);
    console.error('   Error:', error);
    throw error;
  }
}

/**
 * 验证邮件配置
 */
export function validateEmailConfig(): {
  isValid: boolean;
  issues: string[];
  config: {
    apiKey: boolean;
    fromEmail: boolean;
  };
} {
  const issues: string[] = [];
  const config = {
    apiKey: !!process.env.RESEND_API_KEY,
    fromEmail: !!process.env.NEXT_PUBLIC_FROM_EMAIL,
  };

  if (!config.apiKey) {
    issues.push('RESEND_API_KEY is not set');
  }

  if (!config.fromEmail) {
    issues.push('NEXT_PUBLIC_FROM_EMAIL is not set');
  }

  // 验证API密钥格式
  if (config.apiKey && !process.env.RESEND_API_KEY?.startsWith('re_')) {
    issues.push('RESEND_API_KEY format appears invalid (should start with "re_")');
  }

  // 验证邮箱格式
  if (config.fromEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(process.env.NEXT_PUBLIC_FROM_EMAIL!)) {
      issues.push('NEXT_PUBLIC_FROM_EMAIL format appears invalid');
    }
  }

  return {
    isValid: issues.length === 0,
    issues,
    config,
  };
}

/**
 * 记录邮件发送尝试
 */
export function logEmailAttempt(
  type: 'password-reset' | 'test' | 'other',
  recipient: string,
  success: boolean,
  details?: any
) {
  const timestamp = new Date().toISOString();
  const status = success ? '✅ SUCCESS' : '❌ FAILED';

  console.log(`\n📊 ===== EMAIL ATTEMPT LOG =====`);
  console.log(`   📧 Type: ${type}`);
  console.log(`   📧 To: ${recipient}`);
  console.log(`   📧 Status: ${status}`);
  console.log(`   📧 Timestamp: ${timestamp}`);

  if (details) {
    console.log(`   📧 Details:`);

    // 特别处理成功发送的情况
    if (success && details.messageId) {
      console.log(`   ✅ Message ID: ${details.messageId}`);
      console.log(`   ⏱️ Duration: ${details.duration}ms`);
      console.log(`   🌐 Locale: ${details.locale || 'en'}`);

      if (details.fullResponse) {
        console.log(`   📋 Full Resend Response:`, JSON.stringify(details.fullResponse, null, 2));
      }
    }

    // 特别处理失败的情况
    if (!success) {
      console.log(`   ❌ Error: ${details.error || 'Unknown error'}`);
      if (details.statusCode) {
        console.log(`   🔢 Status Code: ${details.statusCode}`);
      }
      if (details.errorName) {
        console.log(`   🏷️ Error Name: ${details.errorName}`);
      }
      if (details.fullError) {
        console.log(`   📋 Full Error:`, JSON.stringify(details.fullError, null, 2));
      }
    }

    // 通用详细信息
    console.log(`   📋 All Details:`, JSON.stringify(details, null, 2));
  }

  console.log(`📊 ===== END EMAIL LOG =====\n`);

  // 在生产环境中，这里可以发送到日志服务
  // 例如：Winston, Pino, 或者外部服务如 LogRocket, Sentry 等

  // 可选：将日志写入文件（开发环境）
  if (process.env.NODE_ENV === 'development') {
    const logEntry = {
      timestamp,
      type,
      recipient,
      success,
      details
    };

    // 这里可以添加文件写入逻辑
    // fs.appendFileSync('email-logs.json', JSON.stringify(logEntry) + '\n');
  }
}
