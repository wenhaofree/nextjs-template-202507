"use client";

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { getEnabledPaymentMethods, type PaymentMethodConfig } from '@/lib/stripe-config';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PaymentMethodsDisplayProps {
  currency?: string;
  className?: string;
  showTitle?: boolean;
  compact?: boolean;
}

export function PaymentMethodsDisplay({ 
  currency = 'usd', 
  className,
  showTitle = true,
  compact = false
}: PaymentMethodsDisplayProps) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const region = locale === 'zh' ? 'cn' : 'global';
  const t = useTranslations('PaymentMethods');
  
  const supportedMethods = getEnabledPaymentMethods(currency, region);

  if (supportedMethods.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {showTitle && (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {locale === 'zh' ? '支持的支付方式' : 'Supported Payment Methods'}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            {locale === 'zh' 
              ? '选择您喜欢的支付方式，安全便捷' 
              : 'Choose your preferred payment method, secure and convenient'
            }
          </p>
        </div>
      )}

      <div className={cn(
        "grid gap-3",
        compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      )}>
        {supportedMethods.map((method, index) => (
          <PaymentMethodCard 
            key={method.id} 
            method={method} 
            locale={locale}
            compact={compact}
            index={index}
          />
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {locale === 'zh' 
            ? '所有支付均通过 Stripe 安全处理' 
            : 'All payments are securely processed by Stripe'
          }
        </p>
      </div>
    </div>
  );
}

interface PaymentMethodCardProps {
  method: PaymentMethodConfig;
  locale: string;
  compact: boolean;
  index: number;
}

function PaymentMethodCard({ method, locale, compact, index }: PaymentMethodCardProps) {
  const name = locale === 'zh' ? method.nameZh : method.name;
  const description = locale === 'zh' ? method.descriptionZh : method.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={cn(
        "relative group",
        "bg-white dark:bg-zinc-800",
        "border-2 border-zinc-200 dark:border-zinc-700",
        "rounded-lg p-4",
        "transition-all duration-200",
        "hover:border-blue-300 dark:hover:border-blue-600",
        "hover:shadow-md",
        compact && "p-3"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "flex-shrink-0 text-2xl",
          compact && "text-xl"
        )}>
          {method.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={cn(
            "font-medium text-zinc-900 dark:text-white",
            compact ? "text-sm" : "text-base"
          )}>
            {name}
          </h4>
          
          {!compact && (
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* 支持的货币标识 */}
        <div className="flex-shrink-0">
          <div className={cn(
            "flex items-center gap-1",
            compact && "hidden sm:flex"
          )}>
            {method.supportedCurrencies.slice(0, 3).map((curr) => (
              <span
                key={curr}
                className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded"
              >
                {curr.toUpperCase()}
              </span>
            ))}
            {method.supportedCurrencies.length > 3 && (
              <span className="text-xs text-zinc-500">
                +{method.supportedCurrencies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 特殊标识 - 仅在中文地区显示支付宝和微信支付热门标识 */}
      {(method.id === 'alipay' || method.id === 'wechat_pay') && locale === 'zh' && (
        <div className="absolute -top-1 -right-1">
          <div className={`text-white text-xs px-2 py-0.5 rounded-full ${
            method.id === 'alipay' ? 'bg-blue-500' : 'bg-green-500'
          }`}>
            热门
          </div>
        </div>
      )}
    </motion.div>
  );
}

// 紧凑版本，用于在定价卡片中显示
export function CompactPaymentMethods({ 
  currency = 'usd',
  className 
}: { 
  currency?: string;
  className?: string;
}) {
  return (
    <PaymentMethodsDisplay 
      currency={currency}
      className={className}
      showTitle={false}
      compact={true}
    />
  );
}

// 内联版本，显示支付方式图标
export function InlinePaymentMethods({ 
  currency = 'usd',
  className 
}: { 
  currency?: string;
  className?: string;
}) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const region = locale === 'zh' ? 'cn' : 'global';
  
  const supportedMethods = getEnabledPaymentMethods(currency, region);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-sm text-zinc-600 dark:text-zinc-400">
        {locale === 'zh' ? '支持：' : 'Accepts:'}
      </span>
      <div className="flex items-center gap-1">
        {supportedMethods.map((method) => (
          <span 
            key={method.id}
            className="text-lg"
            title={locale === 'zh' ? method.nameZh : method.name}
          >
            {method.icon}
          </span>
        ))}
      </div>
    </div>
  );
}
