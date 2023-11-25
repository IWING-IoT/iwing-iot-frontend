/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    TOKEN: process.env.TOKEN,
  },
};

module.exports = nextConfig;
