import type { ReactNode } from 'react';
import { i18n } from '@/lib/i18n';
import { Providers } from '@/components/providers';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/Footer"

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
        <SiteHeader />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </Providers>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}