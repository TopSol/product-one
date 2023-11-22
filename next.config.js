/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  }
};
// module.exports = {
//   reactStrictMode: true,
//   env: {
//     BASE_URL: process.env.BASE_URL,
//   }
// }
