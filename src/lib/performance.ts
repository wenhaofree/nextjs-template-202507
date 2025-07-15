/**
 * Performance monitoring utilities for Stripe payment optimization
 * Stripe 支付性能监控工具
 */

interface PerformanceMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  operation: string;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetrics> = new Map();

  /**
   * Start timing an operation
   * 开始计时操作
   */
  start(operationId: string, operation: string, metadata?: Record<string, any>): void {
    this.metrics.set(operationId, {
      startTime: Date.now(),
      operation,
      metadata,
    });
  }

  /**
   * End timing an operation and return duration
   * 结束计时操作并返回持续时间
   */
  end(operationId: string): number | null {
    const metric = this.metrics.get(operationId);
    if (!metric) {
      console.warn(`Performance metric not found for operation: ${operationId}`);
      return null;
    }

    const endTime = Date.now();
    const duration = endTime - metric.startTime;

    metric.endTime = endTime;
    metric.duration = duration;

    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ Performance: ${metric.operation} took ${duration}ms`, {
        operationId,
        duration,
        metadata: metric.metadata,
      });
    }

    // Clean up
    this.metrics.delete(operationId);

    return duration;
  }

  /**
   * Measure async operation
   * 测量异步操作
   */
  async measure<T>(
    operationId: string,
    operation: string,
    fn: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> {
    this.start(operationId, operation, metadata);
    try {
      const result = await fn();
      this.end(operationId);
      return result;
    } catch (error) {
      this.end(operationId);
      throw error;
    }
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Decorator for measuring function performance
 * 用于测量函数性能的装饰器
 */
export function measurePerformance(operation: string) {
  return function <T extends (...args: any[]) => Promise<any>>(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<T>
  ) {
    const method = descriptor.value!;

    descriptor.value = (async function (this: any, ...args: any[]) {
      const operationId = `${operation}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      return performanceMonitor.measure(operationId, operation, () => method.apply(this, args));
    }) as T;
  };
}

/**
 * Utility to create performance-optimized fetch wrapper
 * 创建性能优化的 fetch 包装器
 */
export async function performantFetch(
  url: string,
  options: RequestInit = {},
  operationName: string = 'fetch'
): Promise<Response> {
  const operationId = `${operationName}-${Date.now()}`;
  
  return performanceMonitor.measure(
    operationId,
    `HTTP ${options.method || 'GET'} ${url}`,
    async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    },
    { url, method: options.method || 'GET' }
  );
}

/**
 * Database query performance wrapper
 * 数据库查询性能包装器
 */
export async function measureDatabaseQuery<T>(
  queryName: string,
  queryFn: () => Promise<T>
): Promise<T> {
  const operationId = `db-${queryName}-${Date.now()}`;
  return performanceMonitor.measure(operationId, `Database: ${queryName}`, queryFn);
}

/**
 * Stripe API call performance wrapper
 * Stripe API 调用性能包装器
 */
export async function measureStripeCall<T>(
  operation: string,
  stripeFn: () => Promise<T>
): Promise<T> {
  const operationId = `stripe-${operation}-${Date.now()}`;
  return performanceMonitor.measure(operationId, `Stripe: ${operation}`, stripeFn);
}
