import type { ReactNode } from 'react';
import { i18n } from '@/lib/i18n';
import { RootProvider } from 'fumadocs-ui/provider';
import type { Translations } from 'fumadocs-ui/i18n';
import { Providers } from '@/components/providers';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/Footer";
import { WebVitals, PreloadResources } from '@/components/seo/web-vitals';

// 中文翻译
const zh: Partial<Translations> = {
  search: '搜索',
  searchNoResult: '没有找到结果',
  toc: '目录',
  lastUpdate: '最后更新',
  chooseLanguage: '选择语言',
  nextPage: '下一页',
  previousPage: '上一页',
  chooseTheme: '选择主题',
};

// 英文翻译
const en: Partial<Translations> = {
  search: 'Search',
  searchNoResult: 'No results found',
  toc: 'Table of Contents',
  lastUpdate: 'Last updated',
  chooseLanguage: 'Choose language',
  nextPage: 'Next page',
  previousPage: 'Previous page',
  chooseTheme: 'Choose theme',
};

// 可用语言列表
const locales = [
  {
    name: 'English',
    locale: 'en',
  },
  {
    name: '中文',
    locale: 'zh',
  },
];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <Providers>
      <NextIntlClientProvider>
        <RootProvider
          i18n={{
            locale,
            locales,
            translations: { en, zh }[locale],
          }}
        >
          <PreloadResources />
          <WebVitals />
          {/* <SiteHeader /> */}
          {children}
          {/* <Footer /> */}
        </RootProvider>
      </NextIntlClientProvider>
    </Providers>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}