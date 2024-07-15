// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
            {
                protocol: 'https',
                hostname: 'cryptoicons.co',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'api.alternative.me',
                port: '',
            }
    ]
    },
  };
  
export default nextConfig;
  