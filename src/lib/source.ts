// .source folder will be generated when you run `next dev`
import { docs, meta, blog as blogPosts } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { i18n } from '@/lib/i18n';
import { icons } from 'lucide-react';
import { createElement } from 'react';

// Fumadocs returns a lazy loader; materialise the virtual file lists so the
// downstream loader always receives an array (avoids runtime `.map` errors in builds).
function materializeSource<S extends { files: any }>(source: S) {
  const files = typeof source.files === 'function' ? source.files() : source.files;
  return {
    ...source,
    files,
  } as Omit<S, 'files'> & { files: typeof files };
}

const docsSource = materializeSource(createMDXSource(docs, meta));
const blogSource = materializeSource(createMDXSource(blogPosts, []));

// Documentation source
export const source = loader({
  baseUrl: '/docs',
  source: docsSource,
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
  source: blogSource,
  i18n,
});
