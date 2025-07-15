/**
 * Stripe Payment API Route / Stripe 支付 API 路由
 *
 * @description Creates Stripe checkout sessions for payment processing.
 * Handles user authentication, payment validation, and order creation.
 * @description 创建 Stripe 结账会话用于支付处理。
 * 处理用户认证、支付验证和订单创建。
 *
 * @route POST /api/stripe
 * @access Private - Requires user authentication
 * @access 私有 - 需要用户认证
 *
 * @author ShipSaaS.CO
 * @version 1.0.0
 * @since 2024-01-01
 */

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { measureDatabaseQuery, measureStripeCall, performanceMonitor } from '@/lib/performance';
import { getStripePaymentMethodTypes } from '@/lib/stripe-config';
import { toStripeAmount, isCurrencySupported } from '@/lib/currency-utils';

/**
 * Request body interface for Stripe payment creation
 * Stripe 支付创建的请求体接口
 */
interface StripePaymentRequest {
  /** User email address / 用户邮箱地址 */
  email: string;
  /** Product price in USD / 产品价格（美元） */
  price: number;
  /** Success redirect URL / 成功重定向 URL */
  successUrl: string;
  /** Cancel redirect URL / 取消重定向 URL */
  cancelUrl: string;
  /** Optional product name / 可选的产品名称 */
  productName?: string;
  /** Optional currency / 可选的货币类型 */
  currency?: string;
  /** Optional region for payment methods / 可选的支付方式地区 */
  region?: string;
}

/**
 * Success response interface
 * 成功响应接口
 */
interface StripePaymentResponse {
  /** Stripe checkout session URL / Stripe 结账会话 URL */
  url: string;
  /** Stripe checkout session ID / Stripe 结账会话 ID */
  id: string;
}

/**
 * Error response interface
 * 错误响应接口
 */
interface ErrorResponse {
  /** Error message / 错误信息 */
  error: string;
}

// Initialize Stripe with private key and optimized configuration / 使用私钥和优化配置初始化 Stripe
if (!process.env.STRIPE_PRIVATE_KEY) {
  throw new Error('Missing STRIPE_PRIVATE_KEY environment variable');
}

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: '2025-06-30.basil',
  // 优化配置以提高性能
  timeout: 10000, // 10秒超时
  maxNetworkRetries: 2, // 最多重试2次
  telemetry: false, // 禁用遥测以减少开销
});

/**
 * POST /api/stripe
 * Creates a Stripe checkout session for payment processing
 * 创建 Stripe 结账会话用于支付处理
 */
export async function POST(request: Request): Promise<NextResponse<StripePaymentResponse | ErrorResponse>> {
  const requestId = `stripe-payment-${Date.now()}`;
  performanceMonitor.start(requestId, 'Stripe Payment Request');

  try {
    // Get user session / 获取用户会话
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      console.log('Stripe API: 用户未登录');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body / 解析请求体
    const body: StripePaymentRequest = await request.json();
    let {
      email,
      price,
      successUrl,
      cancelUrl,
      productName = 'Product Purchase',
      currency = 'usd',
      region = 'global'
    } = body;

    // Validate required fields / 验证必填字段
    if (!email || !price || !successUrl || !cancelUrl) {
      console.log('Stripe API: 缺少必填字段');
      return NextResponse.json(
        { error: 'Missing required fields: email, price, successUrl, cancelUrl' },
        { status: 400 }
      );
    }

    // Validate price / 验证价格
    if (typeof price !== 'number' || price <= 0) {
      console.log('Stripe API: 价格无效');
      return NextResponse.json(
        { error: 'Invalid price. Must be a positive number.' },
        { status: 400 }
      );
    }

    // Verify user email matches session / 验证用户邮箱与会话匹配
    if (email !== session.user.email) {
      console.log('Stripe API: 邮箱不匹配');
      return NextResponse.json(
        { error: 'Email does not match authenticated user' },
        { status: 403 }
      );
    }

    // 验证货币支持
    if (!isCurrencySupported(currency)) {
      currency = 'usd';
    }

    // 获取支持的支付方式
    const supportedPaymentMethods = getStripePaymentMethodTypes(currency, region);

    // 如果是中国地区且使用人民币，确保支付宝可用
    if (region === 'cn' && currency === 'cny' && !supportedPaymentMethods.includes('alipay')) {
      supportedPaymentMethods.push('alipay');
    }

    // Find user in database with optimized query / 使用优化查询在数据库中查找用户
    const user = await measureDatabaseQuery('findUser', () =>
      prisma.user.findFirst({
        where: {
          email,
          isDeleted: false,
        },
        select: {
          uuid: true,
          email: true,
          isDeleted: true,
        },
      })
    );

    if (!user) {
      console.log('Stripe API: 用户不存在');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Generate order number / 生成订单号
    const orderNo = `ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

    // Convert price to Stripe amount (smallest currency unit) / 将价格转换为 Stripe 金额（最小货币单位）
    const amountInCents = toStripeAmount(price, currency);

    console.log('Stripe API: 创建 Stripe 结账会话');

    // 使用性能监控创建 Stripe 会话（支持多种支付方式包括支付宝）
    const stripeSession = await measureStripeCall('createCheckoutSession', () =>
      stripe.checkout.sessions.create({
        // 动态支持多种支付方式：信用卡、支付宝等
        payment_method_types: supportedPaymentMethods as Stripe.Checkout.SessionCreateParams.PaymentMethodType[],
        line_items: [
          {
            price_data: {
              currency: currency,
              product_data: {
                name: productName,
                description: `Purchase for ${email}`,
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: email,
        metadata: {
          orderNo,
          userUuid: user.uuid,
          userEmail: email,
          productName,
        },
      })
    );


    // 创建订单记录（使用性能监控）
    await measureDatabaseQuery('createOrder', () =>
      prisma.order.create({
        data: {
          orderNo,
          userUuid: user.uuid,
          userEmail: email,
          amount: amountInCents, // Store in cents / 以分为单位存储
          currency: 'usd',
          status: 'pending',
          stripeSessionId: stripeSession.id,
          credits: 0, // Default credits / 默认积分
          productName,
          validMonths: 1, // Default 1 month / 默认1个月
        },
      })
    );

    // Return Stripe checkout URL and session ID / 返回 Stripe 结账 URL 和会话 ID

    // 记录总体性能
    performanceMonitor.end(requestId);

    return NextResponse.json({
      url: stripeSession.url!,
      id: stripeSession.id
    });

  } catch (error) {
    // 记录错误时的性能
    performanceMonitor.end(requestId);
    console.error('Stripe API Error:', error);
    
    // Handle Stripe-specific errors / 处理 Stripe 特定错误
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe error: ${error.message}` },
        { status: 400 }
      );
    }

    // Handle database errors / 处理数据库错误
    if (error instanceof Error && error.message.includes('Prisma')) {
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }

    // Generic error / 通用错误
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
