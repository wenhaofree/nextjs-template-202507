#!/usr/bin/env node

/**
 * 测试密码重置邮件发送功能
 * 用于验证邮件是否能够成功发送并查看详细日志
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🧪 Password Reset Email Test Tool\n');

// 检查服务器是否运行
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000/api/test-password-reset-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' })
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function testEmailSending(email, locale = 'en') {
  console.log(`\n🚀 Testing password reset email for: ${email}`);
  console.log(`🌐 Locale: ${locale}`);
  console.log('⏳ Sending request...\n');

  try {
    const response = await fetch('http://localhost:3000/api/test-password-reset-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        locale
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ SUCCESS! Email sent successfully');
      console.log(`📧 Message ID: ${result.details.messageId}`);
      console.log(`⏱️ Duration: ${result.details.duration}ms`);
      console.log(`📧 Email: ${result.details.email}`);
      console.log(`🌐 Locale: ${result.details.locale}`);
      console.log(`⏰ Timestamp: ${result.details.timestamp}`);
      
      if (result.details.emailResult) {
        console.log('\n📋 Email Service Response:');
        console.log(JSON.stringify(result.details.emailResult, null, 2));
      }
      
      console.log('\n🎉 Test completed successfully!');
      console.log('📧 Check your email inbox for the password reset message.');
      
    } else {
      console.log('❌ FAILED! Email sending failed');
      console.log(`💥 Error: ${result.error || 'Unknown error'}`);
      
      if (result.details) {
        console.log('\n📋 Error Details:');
        console.log(JSON.stringify(result.details, null, 2));
      }
      
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Check that RESEND_API_KEY is set in your .env.local file');
      console.log('2. Check that NEXT_PUBLIC_FROM_EMAIL is set in your .env.local file');
      console.log('3. Verify your Resend API key is valid');
      console.log('4. Check server console logs for detailed error information');
    }

  } catch (error) {
    console.log('💥 CRITICAL ERROR! Failed to connect to test endpoint');
    console.log(`Error: ${error.message}`);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure your development server is running: npm run dev');
    console.log('2. Check that the server is accessible at http://localhost:3000');
    console.log('3. Verify the test endpoint exists');
  }
}

async function main() {
  console.log('🔍 Checking if development server is running...');
  
  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.log('❌ Development server is not running or not accessible');
    console.log('🚀 Please start your server with: npm run dev');
    console.log('📍 Then run this script again');
    process.exit(1);
  }
  
  console.log('✅ Development server is running');

  rl.question('\n📧 Enter email address to test: ', (email) => {
    if (!email || !email.includes('@')) {
      console.log('❌ Please enter a valid email address');
      rl.close();
      return;
    }

    rl.question('🌐 Enter locale (en/zh) [default: en]: ', async (locale) => {
      const selectedLocale = locale.trim() || 'en';
      
      if (!['en', 'zh'].includes(selectedLocale)) {
        console.log('❌ Please enter either "en" or "zh"');
        rl.close();
        return;
      }

      rl.close();
      
      await testEmailSending(email.trim(), selectedLocale);
    });
  });
}

// 处理 Ctrl+C
rl.on('SIGINT', () => {
  console.log('\n👋 Test cancelled by user');
  process.exit(0);
});

main().catch(error => {
  console.error('💥 Script error:', error);
  process.exit(1);
});
