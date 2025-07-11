import { defineDocs } from 'fumadocs-mdx/config';
import { defineConfig } from 'fumadocs-mdx/config';

// Define the docs collection with i18n support
export const { docs, meta } = defineDocs({
  dir: 'content/docs',
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
