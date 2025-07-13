import { blog } from '@/lib/source';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, UserIcon, ArrowLeftIcon } from 'lucide-react';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { setRequestLocale } from 'next-intl/server';

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  const page = blog.getPage(slug, locale);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back to Blog */}
      <div className="mb-8">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {locale === 'zh' ? '返回博客' : 'Back to Blog'}
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-12">
        {/* Tags */}
        {page.data.tags && page.data.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {page.data.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
          {page.data.title}
        </h1>

        {/* Description */}
        {page.data.description && (
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {page.data.description}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            <span className="font-medium">{page.data.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <time dateTime={page.data.date}>
              {new Date(page.data.date).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className="text-muted-foreground">
            {/* Reading time estimation */}
            {locale === 'zh' ? '约 8 分钟阅读' : '8 min read'}
          </div>
        </div>
      </header>

      {/* Hero Image */}
      {page.data.image && (
        <div className="mb-12 aspect-[16/9] overflow-hidden rounded-lg">
          <img
            src={page.data.image}
            alt={page.data.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="prose prose-gray dark:prose-invert max-w-none">
        {/* Table of Contents */}
        {page.data.toc && page.data.toc.length > 0 && (
          <div className="mb-8 rounded-lg border bg-muted/50 p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              {locale === 'zh' ? '目录' : 'Table of Contents'}
            </h2>
            <InlineTOC items={page.data.toc} />
          </div>
        )}

        {/* MDX Content */}
        <div className="prose-headings:scroll-mt-20">
          <MDX components={defaultMdxComponents} />
        </div>
      </article>

      {/* Article Footer */}
      <footer className="mt-16 border-t border-border pt-8">
        {/* Author Info */}
        <div className="mb-8 rounded-lg bg-muted/50 p-6">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
              {page.data.author.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {page.data.author}
              </h3>
              <p className="text-muted-foreground text-sm">
                {locale === 'zh' 
                  ? 'ShipSaaS 团队成员，专注于现代 SaaS 开发和最佳实践分享。'
                  : 'ShipSaaS team member focused on modern SaaS development and sharing best practices.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            {locale === 'zh' ? '相关文章' : 'Related Posts'}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {blog.getPages()
              .filter(post => 
                post.url !== page.url && 
                (post.locale === locale || (!post.locale && locale === 'en'))
              )
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.url}
                  href={relatedPost.url}
                  className="group block rounded-lg border bg-card p-4 transition-all hover:shadow-md"
                >
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {relatedPost.data.title}
                  </h4>
                  {relatedPost.data.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.data.excerpt}
                    </p>
                  )}
                  <div className="mt-3 text-xs text-muted-foreground">
                    {new Date(relatedPost.data.date).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-6 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {locale === 'zh' ? '喜欢这篇文章吗？' : 'Enjoyed this article?'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {locale === 'zh' 
              ? '订阅我们的新闻通讯，获取更多 SaaS 开发技巧和教程。'
              : 'Subscribe to our newsletter for more SaaS development tips and tutorials.'
            }
          </p>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            {locale === 'zh' ? '查看更多文章' : 'Read More Articles'}
          </Link>
        </div>
      </footer>
    </div>
  );
}

export async function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: page.slugs,
    locale: page.locale || 'en',
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const page = blog.getPage(slug, locale);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      publishedTime: page.data.date,
      authors: [page.data.author],
      images: page.data.image ? [page.data.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: page.data.image ? [page.data.image] : undefined,
    },
  };
}
