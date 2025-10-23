/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"], // Add this
  },
};

module.exports = nextConfig;
