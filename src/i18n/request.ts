import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

// 静态导入消息文件，避免动态导入的 JSON 解析问题
import enMessages from '../../messages/en.json';
import zhMessages from '../../messages/zh.json';

const messages = {
  en: enMessages,
  zh: zhMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: messages[locale as keyof typeof messages]
  };
});
