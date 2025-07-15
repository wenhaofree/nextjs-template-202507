/**
 * Currency utilities for Stripe payments
 * Stripe 支付货币工具
 */

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  nameZh: string;
  decimals: number;
  exchangeRate: number; // 相对于 USD 的汇率
}

/**
 * Supported currencies configuration
 * 支持的货币配置
 */
export const CURRENCIES: Record<string, CurrencyConfig> = {
  usd: {
    code: 'usd',
    symbol: '$',
    name: 'US Dollar',
    nameZh: '美元',
    decimals: 2,
    exchangeRate: 1.0,
  },
  cny: {
    code: 'cny',
    symbol: '¥',
    name: 'Chinese Yuan',
    nameZh: '人民币',
    decimals: 2,
    exchangeRate: 7.2, // 1 USD = 7.2 CNY (生产环境建议从汇率 API 获取)
  },
  eur: {
    code: 'eur',
    symbol: '€',
    name: 'Euro',
    nameZh: '欧元',
    decimals: 2,
    exchangeRate: 0.85,
  },
  gbp: {
    code: 'gbp',
    symbol: '£',
    name: 'British Pound',
    nameZh: '英镑',
    decimals: 2,
    exchangeRate: 0.75,
  },
  hkd: {
    code: 'hkd',
    symbol: 'HK$',
    name: 'Hong Kong Dollar',
    nameZh: '港币',
    decimals: 2,
    exchangeRate: 7.8,
  },
  sgd: {
    code: 'sgd',
    symbol: 'S$',
    name: 'Singapore Dollar',
    nameZh: '新加坡元',
    decimals: 2,
    exchangeRate: 1.35,
  },
};

/**
 * Convert price from USD to target currency
 * 将价格从美元转换为目标货币
 */
export function convertCurrency(
  amountUSD: number,
  targetCurrency: string
): number {
  const currency = CURRENCIES[targetCurrency.toLowerCase()];
  if (!currency) {
    console.warn(`Unsupported currency: ${targetCurrency}, falling back to USD`);
    return amountUSD;
  }

  const convertedAmount = amountUSD * currency.exchangeRate;
  
  // 根据货币的小数位数进行四舍五入
  if (currency.decimals === 0) {
    return Math.round(convertedAmount);
  }
  
  return Math.round(convertedAmount * Math.pow(10, currency.decimals)) / Math.pow(10, currency.decimals);
}

/**
 * Convert amount to Stripe's smallest currency unit (cents)
 * 将金额转换为 Stripe 的最小货币单位（分）
 */
export function toStripeAmount(amount: number, currency: string): number {
  const currencyConfig = CURRENCIES[currency.toLowerCase()];
  if (!currencyConfig) {
    return Math.round(amount * 100); // 默认使用 2 位小数
  }

  return Math.round(amount * Math.pow(10, currencyConfig.decimals));
}

/**
 * Convert from Stripe's smallest currency unit to regular amount
 * 从 Stripe 的最小货币单位转换为常规金额
 */
export function fromStripeAmount(stripeAmount: number, currency: string): number {
  const currencyConfig = CURRENCIES[currency.toLowerCase()];
  if (!currencyConfig) {
    return stripeAmount / 100; // 默认使用 2 位小数
  }

  return stripeAmount / Math.pow(10, currencyConfig.decimals);
}

/**
 * Format currency amount for display
 * 格式化货币金额用于显示
 */
export function formatCurrency(
  amount: number,
  currency: string,
  locale: string = 'en'
): string {
  const currencyConfig = CURRENCIES[currency.toLowerCase()];
  if (!currencyConfig) {
    return `$${amount.toFixed(2)}`;
  }

  try {
    return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: currencyConfig.decimals,
      maximumFractionDigits: currencyConfig.decimals,
    }).format(amount);
  } catch (error) {
    // 如果 Intl.NumberFormat 失败，使用简单格式
    return `${currencyConfig.symbol}${amount.toFixed(currencyConfig.decimals)}`;
  }
}

/**
 * Get currency symbol
 * 获取货币符号
 */
export function getCurrencySymbol(currency: string): string {
  const currencyConfig = CURRENCIES[currency.toLowerCase()];
  return currencyConfig ? currencyConfig.symbol : '$';
}

/**
 * Get currency name
 * 获取货币名称
 */
export function getCurrencyName(currency: string, locale: string = 'en'): string {
  const currencyConfig = CURRENCIES[currency.toLowerCase()];
  if (!currencyConfig) return 'US Dollar';
  
  return locale === 'zh' ? currencyConfig.nameZh : currencyConfig.name;
}

/**
 * Check if currency is supported
 * 检查是否支持该货币
 */
export function isCurrencySupported(currency: string): boolean {
  return currency.toLowerCase() in CURRENCIES;
}

/**
 * Get all supported currencies
 * 获取所有支持的货币
 */
export function getSupportedCurrencies(): string[] {
  return Object.keys(CURRENCIES);
}


