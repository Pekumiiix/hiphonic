import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
