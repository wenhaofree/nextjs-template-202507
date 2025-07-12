#!/usr/bin/env node

/**
 * 测试邮件配置脚本
 * 用于验证 Resend 邮件服务配置是否正确
 */

const { validateEmailConfig } = require('../../shipsaas-office/src/lib/email-status');

console.log('🔧 Testing Email Configuration...\n');

// 检查环境变量
console.log('📋 Environment Variables:');
console.log(`   RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '✅ Set (***' + process.env.RESEND_API_KEY.slice(-4) + ')' : '❌ Not set'}`);
console.log(`   NEXT_PUBLIC_FROM_EMAIL: ${process.env.NEXT_PUBLIC_FROM_EMAIL ? '✅ ' + process.env.NEXT_PUBLIC_FROM_EMAIL : '❌ Not set'}`);
console.log(`   NEXT_PUBLIC_WEB_URL: ${process.env.NEXT_PUBLIC_WEB_URL ? '✅ ' + process.env.NEXT_PUBLIC_WEB_URL : '❌ Not set'}`);
console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Set' : '❌ Not set'}`);
console.log(`   AUTH_SECRET: ${process.env.AUTH_SECRET ? '✅ Set' : '❌ Not set'}\n`);

// 验证邮件配置
try {
  const configCheck = validateEmailConfig();
  
  console.log('📧 Email Configuration Validation:');
  console.log(`   Overall Status: ${configCheck.isValid ? '✅ Valid' : '❌ Invalid'}`);
  console.log(`   API Key: ${configCheck.config.apiKey ? '✅ Set' : '❌ Not set'}`);
  console.log(`   From Email: ${configCheck.config.fromEmail ? '✅ Set' : '❌ Not set'}\n`);
  
  if (configCheck.issues.length > 0) {
    console.log('⚠️ Configuration Issues:');
    configCheck.issues.forEach(issue => console.log(`   - ${issue}`));
    console.log('');
  }
  
  if (configCheck.isValid) {
    console.log('🎉 Email configuration is valid! You can now use the forgot password feature.');
    console.log('\n📝 Next Steps:');
    console.log('   1. Start your development server: npm run dev');
    console.log('   2. Navigate to /auth/signin');
    console.log('   3. Click "Forgot password?" to test the feature');
    console.log('   4. Or test email sending with: curl -X POST http://localhost:3000/api/test-send-email -H "Content-Type: application/json" -d \'{"to":"your-email@example.com"}\'');
  } else {
    console.log('❌ Email configuration is invalid. Please fix the issues above.');
    console.log('\n📝 Setup Instructions:');
    console.log('   1. Copy .env.example to .env: cp .env.example .env');
    console.log('   2. Get a Resend API key from https://resend.com');
    console.log('   3. Set RESEND_API_KEY in your .env file');
    console.log('   4. Set NEXT_PUBLIC_FROM_EMAIL to your verified domain email');
    console.log('   5. Run this script again to verify');
  }
  
} catch (error) {
  console.error('💥 Error validating email configuration:');
  console.error('   Error:', error.message);
  console.error('\n📝 Troubleshooting:');
  console.error('   1. Make sure you have a .env file in the project root');
  console.error('   2. Check that all required environment variables are set');
  console.error('   3. Verify your Resend API key is valid');
}

console.log('\n📚 For more information, see docs/FORGOT_PASSWORD_SETUP.md');
