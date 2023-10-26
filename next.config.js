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
};
// module.exports = {
//   images: {
//     domains: ["encrypted-tbn0.gstatic.com"], // Add the domain(s) you want to allow
//   },
// };
