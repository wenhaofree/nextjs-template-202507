import { NextRequest, NextResponse } from 'next/server'

interface PerformanceMetrics {
  dns: number
  tcp: number
  ssl: number
  ttfb: number
  download: number
  domParse: number
  domReady: number
  onLoad: number
  total: number
}

interface PerformanceData {
  url: string
  metrics: PerformanceMetrics
  userAgent: string
  timestamp: number
}

export async function POST(request: NextRequest) {
  try {
    const data: PerformanceData = await request.json()
    
    // 验证数据
    if (!data.url || !data.metrics || !data.userAgent) {
      return NextResponse.json(
        { error: 'Invalid performance data' },
        { status: 400 }
      )
    }

    // 获取请求信息
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // 构建分析数据
    const analyticsData = {
      ...data,
      ip: ip.split(',')[0].trim(),
      timestamp: new Date(data.timestamp).toISOString(),
      // 计算性能评分
      performanceScore: calculatePerformanceScore(data.metrics),
    }

    // 发送到分析服务
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Data:', analyticsData)
    }

    // 这里可以保存到数据库或发送到分析服务
    // await savePerformanceData(analyticsData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Performance API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function calculatePerformanceScore(metrics: PerformanceMetrics): number {
  // 基于 Google PageSpeed Insights 的评分标准
  let score = 100
  
  // TTFB 评分 (Time to First Byte)
  if (metrics.ttfb > 600) {
    score -= 20
  } else if (metrics.ttfb > 200) {
    score -= 10
  }
  
  // 总加载时间评分
  if (metrics.total > 3000) {
    score -= 30
  } else if (metrics.total > 1500) {
    score -= 15
  }
  
  // DOM 解析时间评分
  if (metrics.domParse > 1000) {
    score -= 20
  } else if (metrics.domParse > 500) {
    score -= 10
  }
  
  // 下载时间评分
  if (metrics.download > 1000) {
    score -= 15
  } else if (metrics.download > 500) {
    score -= 8
  }
  
  return Math.max(0, score)
}
