import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['bcalabs.org', 'html.tailus.io', 'images.unsplash.com'],
  },
  /* config options here */
};

export default withNextIntl(nextConfig);
