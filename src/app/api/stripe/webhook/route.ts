import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

if (!process.env.STRIPE_PRIVATE_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('Missing Stripe environment variables');
}

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: Request) {
  try {
    console.log('Webhook: 接收到Stripe webhook回调');
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.log('Webhook: 缺少signature');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.log('Webhook: signature验证失败', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('Webhook: 事件类型', event.type);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Webhook: 支付成功', session.id);
        
        // Update order status to paid
        await prisma.order.updateMany({
          where: {
            stripeSessionId: session.id,
          },
          data: {
            status: 'paid',
            paidAt: new Date(),
            paidEmail: session.customer_email || undefined,
            paidDetail: JSON.stringify({
              sessionId: session.id,
              paymentStatus: session.payment_status,
              amountTotal: session.amount_total,
              currency: session.currency,
            }),
          },
        });
        
        console.log('Webhook: 订单状态已更新为已支付');
        break;

      case 'checkout.session.expired':
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        console.log('Webhook: 支付会话过期', expiredSession.id);
        
        // Update order status to expired
        await prisma.order.updateMany({
          where: {
            stripeSessionId: expiredSession.id,
          },
          data: {
            status: 'expired',
            expiredAt: new Date(),
          },
        });
        
        console.log('Webhook: 订单状态已更新为过期');
        break;

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Webhook: 支付失败', paymentIntent.id);
        
        // Find order by payment intent and update status
        const failedOrder = await prisma.order.findFirst({
          where: {
            stripeSessionId: {
              contains: paymentIntent.id,
            },
          },
        });
        
        if (failedOrder) {
          await prisma.order.update({
            where: {
              id: failedOrder.id,
            },
            data: {
              status: 'failed',
              paidDetail: JSON.stringify({
                paymentIntentId: paymentIntent.id,
                lastPaymentError: paymentIntent.last_payment_error,
              }),
            },
          });
          
          console.log('Webhook: 订单状态已更新为失败');
        }
        break;

      default:
        console.log(`Webhook: 未处理的事件类型 ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook处理错误:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
