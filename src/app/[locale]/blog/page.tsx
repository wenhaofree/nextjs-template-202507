import { blog } from '@/lib/source';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, UserIcon } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { SiteHeader } from '@/components';
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Get posts for the current locale
  const posts = blog.getPages(locale);

  return (
    <>
      {/* Header */}
      <SiteHeader />

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {locale === 'zh' ? 'ShipSaaS 博客' : 'ShipSaaS Blog'}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            {locale === 'zh'
              ? '探索 SaaS 开发的最新趋势、技巧和最佳实践。学习如何使用现代技术构建成功的 SaaS 应用程序。'
              : 'Explore the latest trends, tips, and best practices in SaaS development. Learn how to build successful SaaS applications with modern technologies.'
            }
          </p>
        </div>

      {/* Blog Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.url}
              className="group relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
            >
              {/* Image */}
              {post.data.image && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.data.image}
                    alt={post.data.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Tags */}
                {post.data.tags && post.data.tags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {post.data.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h2 className="mb-3 text-xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                  <Link href={post.url} className="after:absolute after:inset-0">
                    {post.data.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                {post.data.excerpt && (
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                    {post.data.excerpt}
                  </p>
                )}

                {/* Meta */}
                <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <UserIcon className="h-3 w-3" />
                    <span>{post.data.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    <time dateTime={post.data.date}>
                      {new Date(post.data.date).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-lg font-semibold text-muted-foreground">
            {locale === 'zh' ? '暂无博客文章' : 'No blog posts yet'}
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            {locale === 'zh' ? '敬请期待更多精彩内容！' : 'Stay tuned for more content!'}
          </p>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="mt-16 rounded-lg bg-muted/50 p-8 text-center border shadow-sm">
        <h3 className="text-2xl font-semibold text-foreground mb-4">
          {locale === 'zh' ? '订阅我们的新闻通讯' : 'Subscribe to our newsletter'}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          {locale === 'zh' 
            ? '获取最新的 SaaS 开发技巧、教程和产品更新，直接发送到您的收件箱。'
            : 'Get the latest SaaS development tips, tutorials, and product updates delivered straight to your inbox.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder={locale === 'zh' ? '输入您的邮箱' : 'Enter your email'}
            className="flex-1 px-4 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-md hover:scale-105">
            {locale === 'zh' ? '订阅' : 'Subscribe'}
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { locale } = await params;

  const title = locale === 'zh'
    ? 'ShipSaaS 博客 - SaaS 开发技巧和教程'
    : 'ShipSaaS Blog - SaaS Development Tips and Tutorials';

  const description = locale === 'zh'
    ? '探索 SaaS 开发的最新趋势、技巧和最佳实践。学习如何使用现代技术构建成功的 SaaS 应用程序，包括 Next.js、AI 集成、支付系统等。'
    : 'Explore the latest trends, tips, and best practices in SaaS development. Learn how to build successful SaaS applications with modern technologies including Next.js, AI integration, payment systems, and more.';

  const keywords = locale === 'zh'
    ? ['shipsaas 博客', 'saas 开发教程', 'nextjs 教程', 'saas 最佳实践', 'ai saas 开发', 'saas 技巧']
    : ['shipsaas blog', 'saas development tutorials', 'nextjs tutorials', 'saas best practices', 'ai saas development', 'saas tips'];

  return generateSEOMetadata({
    title,
    description,
    keywords,
    canonical: locale === 'zh' ? 'https://shipsaas.net/zh/blog' : 'https://shipsaas.net/blog',
    locale,
    type: 'website',
  });
}
