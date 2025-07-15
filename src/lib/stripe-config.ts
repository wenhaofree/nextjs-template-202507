/**
 * Stripe Payment Methods Configuration
 * Stripe 支付方式配置
 */

export interface PaymentMethodConfig {
  id: string;
  name: string;
  nameZh: string;
  icon: string;
  description: string;
  descriptionZh: string;
  enabled: boolean;
  supportedCurrencies: string[];
  regions: string[];
}

/**
 * Available payment methods configuration
 * 可用支付方式配置
 */
export const PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    nameZh: '信用卡/借记卡',
    icon: '💳',
    description: 'Pay with Visa, Mastercard, American Express, and more',
    descriptionZh: '支持 Visa、Mastercard、美国运通等信用卡',
    enabled: true,
    supportedCurrencies: ['usd', 'eur', 'gbp', 'cny', 'jpy', 'hkd', 'sgd'],
    regions: ['global'],
  },
  {
    id: 'alipay',
    name: 'Alipay',
    nameZh: '支付宝',
    icon: '🅰️',
    description: 'Pay with Alipay - Popular in China and Asia',
    descriptionZh: '使用支付宝支付 - 中国及亚洲地区流行',
    enabled: true,
    supportedCurrencies: ['usd', 'eur', 'gbp', 'cny', 'hkd', 'sgd'],
    regions: ['cn', 'hk', 'sg', 'my', 'global'],
  },
];

/**
 * Currency configuration for different regions
 * 不同地区的货币配置
 */
export const REGIONAL_CURRENCY_CONFIG = {
  cn: { primary: 'cny', fallback: 'usd' },
  hk: { primary: 'hkd', fallback: 'usd' },
  sg: { primary: 'sgd', fallback: 'usd' },
  eu: { primary: 'eur', fallback: 'usd' },
  global: { primary: 'usd', fallback: 'usd' },
} as const;

/**
 * Get preferred currency for a region
 * 获取地区的首选货币
 */
export function getPreferredCurrency(region: string): string {
  const config = REGIONAL_CURRENCY_CONFIG[region as keyof typeof REGIONAL_CURRENCY_CONFIG];
  return config ? config.primary : 'usd';
}

/**
 * Get enabled payment methods for a specific region and currency
 * 获取特定地区和货币的可用支付方式
 */
export function getEnabledPaymentMethods(
  currency: string = 'usd',
  region: string = 'global'
): PaymentMethodConfig[] {
  return PAYMENT_METHODS.filter(
    (method) =>
      method.enabled &&
      method.supportedCurrencies.includes(currency.toLowerCase()) &&
      (method.regions.includes(region.toLowerCase()) || method.regions.includes('global'))
  );
}

/**
 * Get payment method types for Stripe API
 * 获取 Stripe API 的支付方式类型
 */
export function getStripePaymentMethodTypes(
  currency: string = 'usd',
  region: string = 'global'
): string[] {
  return getEnabledPaymentMethods(currency, region).map((method) => method.id);
}

/**
 * Get payment method configuration by ID
 * 根据 ID 获取支付方式配置
 */
export function getPaymentMethodById(id: string): PaymentMethodConfig | undefined {
  return PAYMENT_METHODS.find((method) => method.id === id);
}

/**
 * Check if a payment method is supported for given currency and region
 * 检查特定货币和地区是否支持某种支付方式
 */
export function isPaymentMethodSupported(
  methodId: string,
  currency: string = 'usd',
  region: string = 'global'
): boolean {
  const method = getPaymentMethodById(methodId);
  if (!method || !method.enabled) return false;

  return (
    method.supportedCurrencies.includes(currency.toLowerCase()) &&
    (method.regions.includes(region.toLowerCase()) || method.regions.includes('global'))
  );
}

/**
 * Default payment method configuration for different regions
 * 不同地区的默认支付方式配置
 */
export const REGIONAL_DEFAULTS = {
  global: ['card'],
  cn: ['card', 'alipay'],
  hk: ['card', 'alipay'],
  sg: ['card', 'alipay'],
  my: ['card', 'alipay'],
} as const;

/**
 * Get default payment methods for a region
 * 获取地区的默认支付方式
 */
export function getRegionalDefaults(region: string): string[] {
  const defaults = REGIONAL_DEFAULTS[region as keyof typeof REGIONAL_DEFAULTS] || REGIONAL_DEFAULTS.global;
  return [...defaults];
}
