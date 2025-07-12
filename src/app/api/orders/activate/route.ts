import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { orderNo } = await request.json();

    if (!orderNo) {
      return NextResponse.json(
        { error: 'Order number is required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
        isDeleted: false,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Find order
    const order = await prisma.order.findFirst({
      where: {
        orderNo,
        userUuid: user.uuid,
        isDeleted: false,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Check if order is paid
    if (order.status !== 'paid') {
      return NextResponse.json(
        { error: 'Order is not paid yet' },
        { status: 400 }
      );
    }

    // Here you can add your activation logic
    // For example: grant access to GitHub repository, activate subscription, etc.
    
    console.log(`Activating order ${orderNo} for user ${user.email}`);

    // Update order status to activated (you might want to add this status to your schema)
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        // You can add an 'activated' status or use orderDetail to track activation
        orderDetail: JSON.stringify({
          activated: true,
          activatedAt: new Date().toISOString(),
          activatedBy: user.email,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Order activated successfully',
      orderNo,
    });
  } catch (error) {
    console.error('Order activation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
