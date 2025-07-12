import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
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

    // Get user's orders
    const orders = await prisma.order.findMany({
      where: {
        userUuid: user.uuid,
        isDeleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        orderNo: true,
        amount: true,
        currency: true,
        status: true,
        productName: true,
        createdAt: true,
        paidAt: true,
        stripeSessionId: true,
      },
    });

    // Convert amount from cents to dollars
    const formattedOrders = orders.map(order => ({
      ...order,
      amount: order.amount / 100, // Convert cents to dollars
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Orders API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
