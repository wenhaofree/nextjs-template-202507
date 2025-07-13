'use client'

import { useEffect } from 'react'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

interface WebVitalsMetric {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

function sendToAnalytics(metric: WebVitalsMetric) {
  // 发送到 Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }

  // 发送到自定义分析服务
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metric),
    }).catch((error) => {
      console.error('Failed to send web vitals:', error)
    })
  }

  // 开发环境下在控制台显示
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric)
  }
}

export function WebVitals() {
  useEffect(() => {
    // Cumulative Layout Shift (CLS)
    onCLS(sendToAnalytics)

    // Interaction to Next Paint (INP) - 替代 FID
    onINP(sendToAnalytics)

    // First Contentful Paint (FCP)
    onFCP(sendToAnalytics)

    // Largest Contentful Paint (LCP)
    onLCP(sendToAnalytics)

    // Time to First Byte (TTFB)
    onTTFB(sendToAnalytics)
  }, [])

  return null
}

// 性能监控 Hook
export function usePerformanceMonitoring() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // 监控页面加载时间
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navigationEntry = entry as PerformanceNavigationTiming
          
          const metrics = {
            dns: navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart,
            tcp: navigationEntry.connectEnd - navigationEntry.connectStart,
            ssl: navigationEntry.secureConnectionStart > 0 ? navigationEntry.connectEnd - navigationEntry.secureConnectionStart : 0,
            ttfb: navigationEntry.responseStart - navigationEntry.requestStart,
            download: navigationEntry.responseEnd - navigationEntry.responseStart,
            domParse: navigationEntry.domContentLoadedEventStart - navigationEntry.responseEnd,
            domReady: navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart,
            onLoad: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
            total: navigationEntry.loadEventEnd - navigationEntry.fetchStart,
          }

          // 发送性能数据
          if (process.env.NODE_ENV === 'production') {
            fetch('/api/analytics/performance', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                url: window.location.pathname,
                metrics,
                userAgent: navigator.userAgent,
                timestamp: Date.now(),
              }),
            }).catch((error) => {
              console.error('Failed to send performance data:', error)
            })
          }

          if (process.env.NODE_ENV === 'development') {
            console.table(metrics)
          }
        }
      }
    })

    observer.observe({ entryTypes: ['navigation'] })

    return () => {
      observer.disconnect()
    }
  }, [])
}

// 图片懒加载优化组件
interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
      {...(placeholder === 'blur' && blurDataURL && {
        style: {
          backgroundImage: `url(${blurDataURL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        },
      })}
    />
  )
}

// 预加载关键资源
export function PreloadResources() {
  useEffect(() => {
    // 预加载关键字体
    const fontPreloads = [
      '/fonts/geist-sans.woff2',
      '/fonts/geist-mono.woff2',
    ]

    fontPreloads.forEach((font) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = font
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })

    // 预加载关键图片
    const imagePreloads = [
      '/app-light.png',
      '/app-dark.png',
      '/logo.png',
    ]

    imagePreloads.forEach((image) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = image
      link.as = 'image'
      document.head.appendChild(link)
    })

    // DNS 预解析
    const dnsPreconnects = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.stripe.com',
    ]

    dnsPreconnects.forEach((domain) => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = domain
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })
  }, [])

  return null
}

// 声明全局 gtag 类型
declare global {
  interface Window {
    gtag: (
      command: 'event',
      action: string,
      parameters: {
        event_category: string
        event_label: string
        value: number
        non_interaction: boolean
      }
    ) => void
  }
}
