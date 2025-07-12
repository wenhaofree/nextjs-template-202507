import { NextResponse } from 'next/server';

/**
 * 测试忘记密码API的简化版本
 * 用于诊断JSON解析错误
 */
export async function POST(request: Request) {
  console.log('🧪 Test forgot password API called');
  
  try {
    // 1. 测试请求解析
    console.log('📝 Parsing request body...');
    const body = await request.json();
    console.log('📝 Request body:', body);
    
    const { email, locale = 'en' } = body;
    
    // 2. 基本验证
    if (!email) {
      console.log('❌ Email validation failed');
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }
    
    console.log(`📧 Processing request for email: ${email}`);
    
    // 3. 检查环境变量
    console.log('🔧 Checking environment variables...');
    const hasApiKey = !!process.env.RESEND_API_KEY;
    const hasFromEmail = !!process.env.NEXT_PUBLIC_FROM_EMAIL;
    
    console.log(`   RESEND_API_KEY: ${hasApiKey ? 'Set' : 'Not set'}`);
    console.log(`   NEXT_PUBLIC_FROM_EMAIL: ${hasFromEmail ? 'Set' : 'Not set'}`);
    
    if (!hasApiKey || !hasFromEmail) {
      console.log('❌ Email service not configured');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service not configured',
          debug: {
            hasApiKey,
            hasFromEmail
          }
        },
        { status: 500 }
      );
    }
    
    // 4. 测试Resend导入
    console.log('📦 Testing Resend import...');
    try {
      const { Resend } = await import('resend');
      console.log('✅ Resend imported successfully');
      
      const resend = new Resend(process.env.RESEND_API_KEY);
      console.log('✅ Resend client created successfully');
      
    } catch (importError) {
      console.error('❌ Resend import/initialization failed:', importError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service initialization failed',
          debug: {
            error: importError instanceof Error ? importError.message : 'Unknown error'
          }
        },
        { status: 500 }
      );
    }
    
    // 5. 测试数据库连接
    console.log('🗄️ Testing database connection...');
    try {
      const { prisma } = await import('@/lib/prisma');
      
      // 简单的数据库查询测试
      const userCount = await prisma.user.count();
      console.log(`✅ Database connected, user count: ${userCount}`);
      
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Database connection failed',
          debug: {
            error: dbError instanceof Error ? dbError.message : 'Unknown error'
          }
        },
        { status: 500 }
      );
    }
    
    // 6. 返回成功响应（不实际发送邮件）
    console.log('✅ All checks passed');
    return NextResponse.json(
      {
        success: true,
        message: 'Test completed successfully - all systems operational',
        debug: {
          email,
          locale,
          timestamp: new Date().toISOString(),
          checks: {
            requestParsing: true,
            environmentVariables: true,
            resendImport: true,
            databaseConnection: true
          }
        }
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('💥 Test API error:', error);
    
    // 确保返回有效的JSON响应
    return NextResponse.json(
      {
        success: false,
        message: 'Test API failed',
        debug: {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : 'No stack trace',
          timestamp: new Date().toISOString()
        }
      },
      { status: 500 }
    );
  }
}
