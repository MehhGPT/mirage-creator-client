/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/uploads/:path*', // Serve images directly
      },
    ];
  },
  images: {
    domains: ['localhost', 'creator.mirage.patel96.live'],
  },
};

module.exports = nextConfig;
