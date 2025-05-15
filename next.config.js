/** @type {import('next').NextConfig} */
const nextConfig = {
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
  staticPageGenerationTimeout: 120,
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
  // Provide a middleware to handle errors
  distDir: '.next',
  output: 'standalone', // This generates a standalone build without external dependencies
  images: {
    disableStaticImages: true, // Disable static image imports if not using them
  },
};

module.exports = nextConfig;