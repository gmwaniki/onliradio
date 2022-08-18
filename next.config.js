/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['localhost'] },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
// module.exports = ;

(module.exports = withPlugins([withBundleAnalyzer({})])), nextConfig;
