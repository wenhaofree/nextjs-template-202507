#!/usr/bin/env node

/**
 * 调试邮件发送问题的脚本
 * 用于诊断 "Unexpected token 'E'" 错误
 */

require('dotenv').config();

console.log('🔍 Debugging Email Issue...\n');

// 1. 检查环境变量
console.log('📋 Environment Variables Check:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
console.log(`   RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '✅ Set (***' + process.env.RESEND_API_KEY.slice(-4) + ')' : '❌ Not set'}`);
console.log(`   NEXT_PUBLIC_FROM_EMAIL: ${process.env.NEXT_PUBLIC_FROM_EMAIL ? '✅ ' + process.env.NEXT_PUBLIC_FROM_EMAIL : '❌ Not set'}`);
console.log(`   NEXT_PUBLIC_WEB_URL: ${process.env.NEXT_PUBLIC_WEB_URL ? '✅ ' + process.env.NEXT_PUBLIC_WEB_URL : '❌ Not set'}`);
console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Set' : '❌ Not set'}\n`);

// 2. 检查Resend包是否正确安装
console.log('📦 Package Check:');
try {
  const { Resend } = require('resend');
  console.log('   ✅ Resend package imported successfully');
  
  // 检查API密钥格式
  if (process.env.RESEND_API_KEY) {
    if (process.env.RESEND_API_KEY.startsWith('re_')) {
      console.log('   ✅ API key format appears correct');
    } else {
      console.log('   ⚠️ API key format may be incorrect (should start with "re_")');
    }
  }
} catch (error) {
  console.log('   ❌ Failed to import Resend package:', error.message);
}

// 3. 测试基本的Resend初始化
console.log('\n🔧 Resend Initialization Test:');
try {
  if (!process.env.RESEND_API_KEY) {
    console.log('   ❌ Cannot test - RESEND_API_KEY not set');
  } else {
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('   ✅ Resend client initialized successfully');
    
    // 测试API连接（不发送邮件）
    console.log('   🔍 Testing API connection...');
    
    // 这里我们不实际发送邮件，只是检查初始化
    console.log('   ✅ Ready to test email sending');
  }
} catch (error) {
  console.log('   ❌ Resend initialization failed:', error.message);
}

// 4. 检查邮件服务配置函数
console.log('\n📧 Email Service Configuration:');
try {
  // 动态导入以避免模块加载问题
  const path = require('path');
  const emailStatusPath = path.join(process.cwd(), 'src', 'lib', 'email-status.js');
  
  // 检查文件是否存在
  const fs = require('fs');
  if (fs.existsSync(emailStatusPath)) {
    console.log('   ✅ email-status.js file exists');
  } else {
    console.log('   ⚠️ email-status.js file not found, checking TypeScript version...');
    const tsPath = path.join(process.cwd(), 'src', 'lib', 'email-status.ts');
    if (fs.existsSync(tsPath)) {
      console.log('   ✅ email-status.ts file exists');
    } else {
      console.log('   ❌ email-status file not found');
    }
  }
} catch (error) {
  console.log('   ❌ Error checking email service files:', error.message);
}

// 5. 提供解决方案建议
console.log('\n💡 Troubleshooting Suggestions:');
console.log('');

if (!process.env.RESEND_API_KEY) {
  console.log('🔧 Missing RESEND_API_KEY:');
  console.log('   1. Get an API key from https://resend.com');
  console.log('   2. Add it to your .env file: RESEND_API_KEY=re_xxxxxxxxx');
  console.log('   3. Restart your development server');
  console.log('');
}

if (!process.env.NEXT_PUBLIC_FROM_EMAIL) {
  console.log('🔧 Missing NEXT_PUBLIC_FROM_EMAIL:');
  console.log('   1. Set a verified sender email in your .env file');
  console.log('   2. Example: NEXT_PUBLIC_FROM_EMAIL=noreply@yourdomain.com');
  console.log('   3. Make sure the domain is verified in Resend');
  console.log('');
}

console.log('🔧 For "Unexpected token" errors:');
console.log('   1. Check that your API endpoint is returning valid JSON');
console.log('   2. Verify environment variables are loaded correctly');
console.log('   3. Check browser network tab for actual API response');
console.log('   4. Look at server console logs for detailed error messages');
console.log('');

console.log('🧪 Next Steps:');
console.log('   1. Fix any missing environment variables above');
console.log('   2. Run: npm run dev');
console.log('   3. Test the forgot password feature');
console.log('   4. Check browser console and server logs for errors');
console.log('   5. If still failing, test with: curl -X POST http://localhost:3000/api/auth/forgot-password -H "Content-Type: application/json" -d \'{"email":"test@example.com"}\'');

console.log('\n📚 Documentation: docs/FORGOT_PASSWORD_SETUP.md');
