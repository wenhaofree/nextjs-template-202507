import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from '@/lib/i18n';
import { HomeIcon } from 'lucide-react';

// 使 baseOptions 成为一个函数以支持国际化
export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: locale === 'zh' ? 'ShipSaaS' : 'ShipSaaS',
    },
    links: [
      {
        icon: <HomeIcon />,
        text: locale === 'zh' ? '主页' : 'Home',
        url: `/${locale}`,
        external: true,
      },
    ],
  };
}