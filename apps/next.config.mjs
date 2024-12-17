/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['antd'],
  experimental: {
    optimizeCss: true,
  }
};

export default nextConfig;
