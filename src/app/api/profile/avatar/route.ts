import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { prisma } from '@/lib/prisma'
import { updateUser } from '@/lib/user'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

// POST - 上传头像
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('avatar') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed' },
        { status: 400 }
      )
    }

    // 验证文件大小 (5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB' },
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

    // 生成文件名
    const fileExtension = file.name.split('.').pop()
    const fileName = `${user.uuid}-${uuidv4()}.${fileExtension}`
    
    // 创建上传目录
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'avatars')
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // 目录可能已存在，忽略错误
    }

    // 保存文件
    const filePath = join(uploadDir, fileName)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    await writeFile(filePath, buffer)

    // 生成访问URL
    const avatarUrl = `/uploads/avatars/${fileName}`

    // 更新用户头像URL
    const updatedUser = await updateUser(user.id, { avatarUrl })

    return NextResponse.json({
      success: true,
      message: 'Avatar uploaded successfully',
      avatarUrl,
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
    console.error('Avatar upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
