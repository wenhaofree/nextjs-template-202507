import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { TechStackPage } from "./client-page";

interface TechStackPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TechStackPageProps) {
  const { locale } = await params;

  const title = locale === 'zh'
    ? 'ShipSaaS 技术栈 - 最新前沿技术构建的 SaaS 样板'
    : 'ShipSaaS Tech Stack - Built with Latest Cutting-Edge Technologies';

  const description = locale === 'zh'
    ? '探索 ShipSaaS 使用的最新技术栈：Next.js 15.3、TailwindCSS v4、React 19、TypeScript 5、Prisma 6.11 等前沿技术。为您的 SaaS 项目提供最现代化的开发体验。'
    : 'Explore ShipSaaS cutting-edge tech stack: Next.js 15.3, TailwindCSS v4, React 19, TypeScript 5, Prisma 6.11 and more. Get the most modern development experience for your SaaS project.';

  const keywords = locale === 'zh'
    ? ['shipsaas 技术栈', 'nextjs 15.3', 'tailwindcss v4', 'react 19', 'typescript 5', 'prisma 6.11', '最新技术', 'saas 技术栈', '前沿技术', '现代化开发']
    : ['shipsaas tech stack', 'nextjs 15.3', 'tailwindcss v4', 'react 19', 'typescript 5', 'prisma 6.11', 'latest technology', 'saas tech stack', 'cutting-edge tech', 'modern development'];

  return generateSEOMetadata({
    title,
    description,
    keywords,
    canonical: locale === 'zh' ? 'https://shipsaas.net/zh/tech-stack' : 'https://shipsaas.net/tech-stack',
    locale,
    type: 'website',
  });
}

export default async function TechStackPageRoute({ params }: TechStackPageProps) {
  const { locale } = await params;

  return <TechStackPage locale={locale} />;
}
