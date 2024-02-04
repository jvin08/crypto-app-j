// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: '**.coingecko.com',
            port: '',
        }
    ]
    },
  };
  
export default nextConfig;
  