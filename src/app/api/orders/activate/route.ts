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

    // Check if order is already activated
    if (order.status === 'activated') {
      return NextResponse.json(
        { error: 'Order is already activated' },
        { status: 400 }
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

    // Parse existing order detail to preserve GitHub invitation info
    let existingOrderDetail = {};
    try {
      existingOrderDetail = JSON.parse(order.orderDetail || '{}');
    } catch (error) {
      console.warn('Failed to parse existing order detail:', error);
    }

    // Update order status to activated
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: 'activated',
        orderDetail: JSON.stringify({
          ...existingOrderDetail, // Preserve existing data (including GitHub invitation info)
          activated: true,
          activatedAt: new Date().toISOString(),
          activatedBy: user.email,
        }),
        updatedAt: new Date(),
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
