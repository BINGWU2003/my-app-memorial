/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
