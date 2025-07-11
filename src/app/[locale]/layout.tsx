import type { ReactNode } from 'react';
import { i18n } from '@/lib/i18n';
import { RootProvider } from 'fumadocs-ui/provider';
import type { Translations } from 'fumadocs-ui/i18n';
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <RootProvider
          i18n={{
            locale,
            locales,
            translations: { zh }[locale],
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return i18n.languages.map((locale) => ({ locale }));
}