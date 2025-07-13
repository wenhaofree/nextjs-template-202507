import { defineDocs, defineCollections } from 'fumadocs-mdx/config';
import { defineConfig } from 'fumadocs-mdx/config';
import { z } from 'zod';

// Define the docs collection with i18n support
export const { docs, meta } = defineDocs({
  dir: 'content/docs',
});

// Define the blog collection with proper schema
export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

// Global MDX configuration
export default defineConfig({
  mdxOptions: {
    // Path to import your mdx-components.tsx
    providerImportSource: '@/mdx-components',
    // Enable syntax highlighting and other features
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
