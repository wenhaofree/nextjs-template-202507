import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from '@/lib/i18n';

// 使 baseOptions 成为一个函数以支持国际化
export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: locale === 'zh' ? '我的应用' : 'My App',
    },
    links: [
      {
        text: locale === 'zh' ? '文档' : 'Documentation',
        url: `/${locale}/docs`,
        active: 'nested-url',
      },
    ],
  };
}