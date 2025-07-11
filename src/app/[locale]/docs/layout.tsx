import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';

export default async function Layout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Get the page tree for the specific locale
  const pageTree = source.pageTree[locale] || source.pageTree;

  return (
    <DocsLayout tree={pageTree} {...baseOptions(locale)}>
      {children}
    </DocsLayout>
  );
}