/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable static optimization for routes with dynamic requirements
  experimental: {
    // This allows missing href in anchor tags
    strictNextHead: false,
  },
};

module.exports = nextConfig;