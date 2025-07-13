import { Prices } from "@/components/sections/prices"
import { generateMetadata as generateSEOMetadata, generateStructuredData } from "@/lib/seo";

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PricingPageProps) {
  const { locale } = await params;

  const title = locale === 'zh'
    ? 'ShipSaaS 定价 - 选择适合您的 SaaS 开发计划'
    : 'ShipSaaS Pricing - Choose Your SaaS Development Plan';

  const description = locale === 'zh'
    ? '查看 ShipSaaS 的定价计划。从基础版到高级版，选择最适合您 SaaS 项目需求的计划。包含 AI 集成、支付系统、仪表板等功能。'
    : 'View ShipSaaS pricing plans. From Basic to Premium, choose the plan that best fits your SaaS project needs. Includes AI integration, payment systems, dashboard, and more.';

  const keywords = locale === 'zh'
    ? ['shipsaas 定价', 'saas 定价', 'nextjs saas 价格', 'saas 开发成本', 'saas 模板价格']
    : ['shipsaas pricing', 'saas pricing', 'nextjs saas price', 'saas development cost', 'saas template price'];

  return generateSEOMetadata({
    title,
    description,
    keywords,
    canonical: locale === 'zh' ? 'https://shipsaas.net/zh/pricing' : 'https://shipsaas.net/pricing',
    locale,
    type: 'website',
  });
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;

  // 生成结构化数据
  const structuredData = generateStructuredData({
    title: locale === 'zh' ? 'ShipSaaS 定价计划' : 'ShipSaaS Pricing Plans',
    description: locale === 'zh'
      ? 'ShipSaaS 的定价计划和功能对比'
      : 'ShipSaaS pricing plans and feature comparison',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: locale === 'zh' ? '定价' : 'Pricing', url: '/pricing' }
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
      <Prices />
    </>
  );
}