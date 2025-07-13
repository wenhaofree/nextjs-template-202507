export interface BlogPost {
  url: string;
  locale?: string;
  slugs: string[];
  data: {
    title: string;
    description?: string;
    author: string;
    date: string;
    tags?: string[];
    image?: string;
    excerpt?: string;
    body: React.ComponentType;
    toc?: Array<{
      title: string;
      url: string;
      depth: number;
    }>;
  };
}

export interface BlogCardProps {
  post: BlogPost;
  locale: string;
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
}

export interface BlogListProps {
  posts: BlogPost[];
  locale: string;
  className?: string;
  layout?: 'grid' | 'list' | 'masonry';
  featuredPost?: boolean;
}

export interface BlogNewsletterProps {
  locale: string;
  className?: string;
  variant?: 'default' | 'inline' | 'sidebar';
}
