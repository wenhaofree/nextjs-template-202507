import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { PaymentMethodsDisplay } from '@/components/ui/payment-methods-display';
import { getEnabledPaymentMethods } from '@/lib/stripe-config';

interface PaymentMethodsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params
}: PaymentMethodsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PaymentMethods' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PaymentMethodsPage({ params }: PaymentMethodsPageProps) {
  const { locale } = await params;
  const region = locale === 'zh' ? 'cn' : 'global';
  const supportedMethods = getEnabledPaymentMethods('usd', region);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            {locale === 'zh' ? '支付方式' : 'Payment Methods'}
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {locale === 'zh' 
              ? '我们支持多种安全便捷的支付方式，让您的购买体验更加顺畅'
              : 'We support multiple secure and convenient payment methods for a smooth purchasing experience'
            }
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div className="max-w-4xl mx-auto mb-16">
          <PaymentMethodsDisplay currency="usd" />
        </div>

        {/* Additional Information */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6">
              {locale === 'zh' ? '支付安全保障' : 'Payment Security'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-white">
                      {locale === 'zh' ? 'SSL 加密传输' : 'SSL Encrypted'}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {locale === 'zh' 
                        ? '所有支付数据均通过 256 位 SSL 加密传输'
                        : 'All payment data is transmitted with 256-bit SSL encryption'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-white">
                      {locale === 'zh' ? 'PCI DSS 合规' : 'PCI DSS Compliant'}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {locale === 'zh' 
                        ? '符合支付卡行业数据安全标准'
                        : 'Compliant with Payment Card Industry Data Security Standards'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-white">
                      {locale === 'zh' ? '实时欺诈检测' : 'Real-time Fraud Detection'}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {locale === 'zh' 
                        ? 'Stripe 先进的机器学习算法保护您的交易'
                        : 'Advanced machine learning algorithms protect your transactions'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-white">
                      {locale === 'zh' ? '24/7 监控' : '24/7 Monitoring'}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {locale === 'zh' 
                        ? '全天候安全监控，确保支付环境安全'
                        : 'Round-the-clock security monitoring for safe payment environment'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6">
              {locale === 'zh' ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-white mb-2">
                  {locale === 'zh' ? '支付宝支付是否安全？' : 'Is Alipay payment secure?'}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {locale === 'zh' 
                    ? '是的，支付宝支付通过 Stripe 处理，享受与信用卡支付同等级别的安全保护。您的支付信息不会存储在我们的服务器上。'
                    : 'Yes, Alipay payments are processed through Stripe with the same level of security as credit card payments. Your payment information is not stored on our servers.'
                  }
                </p>
              </div>

              <div>
                <h3 className="font-medium text-zinc-900 dark:text-white mb-2">
                  {locale === 'zh' ? '支付失败怎么办？' : 'What if my payment fails?'}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {locale === 'zh' 
                    ? '如果支付失败，请检查您的支付方式是否有足够余额，或尝试使用其他支付方式。如问题持续，请联系我们的客服团队。'
                    : 'If your payment fails, please check if your payment method has sufficient balance or try using an alternative payment method. Contact our support team if the issue persists.'
                  }
                </p>
              </div>

              <div>
                <h3 className="font-medium text-zinc-900 dark:text-white mb-2">
                  {locale === 'zh' ? '是否支持退款？' : 'Do you support refunds?'}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {locale === 'zh' 
                    ? '我们支持在购买后 30 天内申请退款。退款将原路返回到您的原始支付方式。'
                    : 'We support refund requests within 30 days of purchase. Refunds will be returned to your original payment method.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
