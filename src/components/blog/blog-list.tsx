import { BlogCard } from './blog-card';
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

interface BlogListProps {
  posts: BlogPost[];
  locale: string;
  className?: string;
  layout?: 'grid' | 'list' | 'masonry';
  featuredPost?: boolean;
}

export function BlogList({ 
  posts, 
  locale, 
  className, 
  layout = 'grid',
  featuredPost = false 
}: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-semibold text-muted-foreground">
          {locale === 'zh' ? '暂无博客文章' : 'No blog posts yet'}
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          {locale === 'zh' ? '敬请期待更多精彩内容！' : 'Stay tuned for more content!'}
        </p>
      </div>
    );
  }

  const [firstPost, ...restPosts] = posts;

  if (layout === 'list') {
    return (
      <div className={cn("space-y-6", className)}>
        {posts.map((post) => (
          <BlogCard
            key={post.url}
            post={post}
            locale={locale}
            variant="compact"
          />
        ))}
      </div>
    );
  }

  if (layout === 'masonry') {
    return (
      <div className={cn(
        "columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6",
        className
      )}>
        {posts.map((post) => (
          <div key={post.url} className="break-inside-avoid">
            <BlogCard
              post={post}
              locale={locale}
              variant="default"
            />
          </div>
        ))}
      </div>
    );
  }

  // Grid layout (default)
  return (
    <div className={cn("space-y-12", className)}>
      {/* Featured Post */}
      {featuredPost && firstPost && (
        <div className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {locale === 'zh' ? '精选文章' : 'Featured Post'}
            </h2>
            <p className="text-muted-foreground">
              {locale === 'zh' ? '我们推荐的最新内容' : 'Our latest recommended content'}
            </p>
          </div>
          <BlogCard
            post={firstPost}
            locale={locale}
            variant="featured"
          />
        </div>
      )}

      {/* Regular Posts Grid */}
      {(featuredPost ? restPosts : posts).length > 0 && (
        <div>
          {featuredPost && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {locale === 'zh' ? '最新文章' : 'Latest Posts'}
              </h2>
            </div>
          )}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(featuredPost ? restPosts : posts).map((post) => (
              <BlogCard
                key={post.url}
                post={post}
                locale={locale}
                variant="default"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
