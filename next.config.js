/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    TOKEN: process.env.TOKEN,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
