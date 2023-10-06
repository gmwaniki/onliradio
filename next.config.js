/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: { domains: ['localhost'], unoptimized: true },
};

module.exports = nextConfig;
