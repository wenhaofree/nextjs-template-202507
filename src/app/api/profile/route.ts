import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { prisma } from '@/lib/prisma'
import { updateUser } from '@/lib/user'

// GET - 获取用户资料
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // 查找用户
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
        isDeleted: false,
      },
      select: {
        id: true,
        uuid: true,
        email: true,
        nickname: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id.toString(),
        uuid: user.uuid,
        email: user.email,
        name: user.nickname || '',
        image: user.avatarUrl || '',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    })
  } catch (error) {
    console.error('Profile GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - 更新用户资料
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, avatarUrl } = body

    // 验证输入
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length < 3 || name.trim().length > 30) {
        return NextResponse.json(
          { error: 'Name must be between 3 and 30 characters' },
          { status: 400 }
        )
      }
    }

    if (avatarUrl !== undefined && typeof avatarUrl !== 'string') {
      return NextResponse.json(
        { error: 'Invalid avatar URL' },
        { status: 400 }
      )
    }

    // 查找用户
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
        isDeleted: false,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // 准备更新数据
    const updateData: any = {}
    if (name !== undefined) {
      updateData.nickname = name.trim()
    }
    if (avatarUrl !== undefined) {
      updateData.avatarUrl = avatarUrl
    }

    // 更新用户信息
    const updatedUser = await updateUser(user.id, updateData)

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id.toString(),
        uuid: updatedUser.uuid,
        email: updatedUser.email,
        name: updatedUser.nickname || '',
        image: updatedUser.avatarUrl || '',
        updatedAt: updatedUser.updatedAt,
      }
    })
  } catch (error) {
    console.error('Profile PUT error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
