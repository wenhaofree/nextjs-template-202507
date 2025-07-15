// .source folder will be generated when you run `next dev`
import { docs, meta, blog as blogPosts } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { i18n } from '@/lib/i18n';
import { icons } from 'lucide-react';
import { createElement } from 'react';

// Documentation source
export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
  i18n,
  icon(icon) {
    if (!icon) {
      // Default icon if none specified
      return;
    }

    if (icon in icons) {
      return createElement(icons[icon as keyof typeof icons]);
    }
  },
});

// Blog source
export const blog = loader({
  baseUrl: '/blog',
  source: createMDXSource(blogPosts, []),
  i18n,
});