/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['localhost'], unoptimized: true },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
