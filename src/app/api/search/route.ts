import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(source, {
  localeMap: {
    // 为不同语言配置搜索选项
    zh: { language: 'english' }, // 中文使用英文分词器作为后备
    en: { language: 'english' },
  },
});
