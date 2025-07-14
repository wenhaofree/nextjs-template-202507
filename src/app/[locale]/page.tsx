import { generateMetadata as generateSEOMetadata, generateStructuredData } from "@/lib/seo";
import { ClientHomePage } from "@/app/[locale]/client-page";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;

  const title = locale === 'zh'
    ? 'ShipSaaS - 完整的 Next.js SaaS 样板，集成 AI 功能'
    : 'ShipSaaS - Complete Next.js SaaS Boilerplate with AI Integration';

  const description = locale === 'zh'
    ? '使用 ShipSaaS 在一个周末构建盈利的 SaaS 产品。完整的 Next.js 样板，包含 AI 集成、身份验证、支付、国际化、仪表板、博客、文档等功能。'
    : 'Build profitable SaaS products in a weekend with ShipSaaS. Complete Next.js boilerplate featuring AI integration, authentication, payments, i18n, dashboard, blog, docs, and more.';

  const keywords = locale === 'zh'
    ? ['shipsaas', 'saas 样板', 'nextjs saas', 'ai saas', 'saas 模板', 'nextjs 模板', 'saas 启动器', 'react saas', 'typescript saas', 'saas 开发']
    : ['shipsaas', 'saas boilerplate', 'nextjs saas', 'ai saas', 'saas template', 'nextjs template', 'saas starter', 'react saas', 'typescript saas', 'saas development'];

  return generateSEOMetadata({
    title,
    description,
    keywords,
    canonical: locale === 'zh' ? 'https://shipsaas.net/zh' : 'https://shipsaas.net',
    locale,
    type: 'website',
  });
}

export default async function LocaleHomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // 生成结构化数据
  const structuredData = generateStructuredData({
    title: locale === 'zh' ? 'ShipSaaS - 完整的 Next.js SaaS 样板' : 'ShipSaaS - Complete Next.js SaaS Boilerplate',
    description: locale === 'zh'
      ? '使用 ShipSaaS 快速构建 SaaS 产品'
      : 'Build SaaS products quickly with ShipSaaS',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' }
    ]
  });

  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ClientHomePage />
    </>
  );
}