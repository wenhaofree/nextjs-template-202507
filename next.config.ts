import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';
import createNextIntlPlugin from 'next-intl/plugin';

const withMDX = createMDX({
  configPath: './source.config.ts',

});

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['bcalabs.org', 'html.tailus.io', 'images.unsplash.com'],
  },
  // 开发环境优化配置
  experimental: {
    // 禁用一些可能导致问题的实验性功能
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  /* config options here */
};

export default withNextIntl(withMDX(nextConfig));
