import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, UserIcon, ClockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogPost {
  url: string;
  data: {
    title: string;
    description?: string;
    author: string;
    date: string;
    tags?: string[];
    image?: string;
    excerpt?: string;
  };
}

interface BlogCardProps {
  post: BlogPost;
  locale: string;
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
}

export function BlogCard({ post, locale, className, variant = 'default' }: BlogCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (variant === 'featured') {
    return (
      <article className={cn(
        "group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg",
        className
      )}>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          {post.data.image && (
            <div className="aspect-[16/9] md:aspect-auto overflow-hidden">
              <img
                src={post.data.image}
                alt={post.data.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col justify-center p-8">
            {/* Tags */}
            {post.data.tags && post.data.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.data.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h2 className="mb-4 text-2xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
              <Link href={post.url} className="after:absolute after:inset-0">
                {post.data.title}
              </Link>
            </h2>

            {/* Description */}
            {post.data.description && (
              <p className="mb-6 text-muted-foreground leading-relaxed">
                {post.data.description}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <UserIcon className="h-4 w-4" />
                <span>{post.data.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <time dateTime={post.data.date}>
                  {formatDate(post.data.date)}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                <span>{estimateReadingTime(post.data.excerpt || post.data.description || '')} {locale === 'zh' ? '分钟阅读' : 'min read'}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className={cn(
        "group flex gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md",
        className
      )}>
        {/* Image */}
        {post.data.image && (
          <div className="aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md">
            <img
              src={post.data.image}
              alt={post.data.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="mb-2 font-semibold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            <Link href={post.url} className="after:absolute after:inset-0">
              {post.data.title}
            </Link>
          </h3>

          {/* Excerpt */}
          {post.data.excerpt && (
            <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
              {post.data.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{post.data.author}</span>
            <span>•</span>
            <time dateTime={post.data.date}>
              {formatDate(post.data.date)}
            </time>
          </div>
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article className={cn(
      "group relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md",
      className
    )}>
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
              {formatDate(post.data.date)}
            </time>
          </div>
        </div>
      </div>
    </article>
  );
}
