import { NextRequest, NextResponse } from 'next/server'

interface WebVitalsMetric {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

export async function POST(request: NextRequest) {
  try {
    const metric: WebVitalsMetric = await request.json()
    
    // 验证数据
    if (!metric.id || !metric.name || typeof metric.value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid metric data' },
        { status: 400 }
      )
    }

    // 获取请求信息
    const userAgent = request.headers.get('user-agent') || ''
    const referer = request.headers.get('referer') || ''
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // 构建分析数据
    const analyticsData = {
      ...metric,
      timestamp: new Date().toISOString(),
      userAgent,
      referer,
      ip: ip.split(',')[0].trim(), // 取第一个IP
      url: new URL(referer).pathname,
    }

    // 这里可以发送到你的分析服务
    // 例如：Google Analytics, Mixpanel, 自定义数据库等
    
    // 示例：发送到控制台（开发环境）
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals Metric:', analyticsData)
    }

    // 示例：发送到外部分析服务
    if (process.env.ANALYTICS_ENDPOINT) {
      try {
        await fetch(process.env.ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.ANALYTICS_API_KEY}`,
          },
          body: JSON.stringify(analyticsData),
        })
      } catch (error) {
        console.error('Failed to send to analytics service:', error)
      }
    }

    // 示例：保存到数据库
    // if (process.env.DATABASE_URL) {
    //   await prisma.webVitals.create({
    //     data: analyticsData
    //   })
    // }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Web Vitals API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
