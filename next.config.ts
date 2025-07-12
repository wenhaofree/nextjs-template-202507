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
    domains: ['bcalabs.org'],
  },
  /* config options here */
};

export default withNextIntl(withMDX(nextConfig));
