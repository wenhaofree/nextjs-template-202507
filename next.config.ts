import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX({
  configPath: './source.config.ts',
  
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['bcalabs.org'],
  },
  /* config options here */
};

export default withMDX(nextConfig);
