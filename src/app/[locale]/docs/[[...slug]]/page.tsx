import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export default async function Page(props: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const params = await props.params;

  // 使用正确的 i18n API 获取页面
  const page = source.getPage(params.slug, params.locale);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.locale);

  if (!page) notFound();

  const title = `${page.data.title} | ShipSaaS Documentation`;
  const description = page.data.description || (params.locale === 'zh'
    ? 'ShipSaaS 文档 - 学习如何使用 ShipSaaS 构建 SaaS 应用程序'
    : 'ShipSaaS Documentation - Learn how to build SaaS applications with ShipSaaS');

  const keywords = params.locale === 'zh'
    ? ['shipsaas 文档', 'saas 文档', 'nextjs 文档', 'saas 开发指南', page.data.title]
    : ['shipsaas documentation', 'saas docs', 'nextjs docs', 'saas development guide', page.data.title];

  return generateSEOMetadata({
    title,
    description,
    keywords,
    canonical: `https://shipsaas.net/${params.locale}/docs/${params.slug?.join('/') || ''}`,
    locale: params.locale,
    type: 'article',
  });
}