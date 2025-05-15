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
    // Enables the styled-components SWC transform
    styledComponents: false,
    // Remove all console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
};

module.exports = nextConfig;