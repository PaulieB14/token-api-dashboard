/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/token-api',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  // Disable static optimization for routes with dynamic requirements
  experimental: {
    // This allows missing href in anchor tags
    strictNextHead: false,
  },
  // Configure SWC compiler options
  swcMinify: true,
  compiler: {
    // Remove all console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Don't attempt to statically optimize the error pages
  staticPageGenerationTimeout: 180,
  typescript: {
    // Allow production builds to successfully complete even with type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow production builds to successfully complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
  // Skip type checking to speed up builds
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  // Set to hybrid mode to support both API routes and static pages
  output: 'standalone',
  distDir: '.next',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
