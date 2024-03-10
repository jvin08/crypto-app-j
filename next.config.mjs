// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cryptoicons.co'], 
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.coingecko.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: '**.cryptoicons.co',
                port: '',
            },
    ]
    },
  };
  
export default nextConfig;
  