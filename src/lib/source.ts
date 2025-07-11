// .source folder will be generated when you run `next dev`
import { docs, meta } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { i18n } from '@/lib/i18n';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
  i18n,
});