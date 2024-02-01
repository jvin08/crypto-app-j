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
    //   domains: ['assets.coingecko.com'], // Add the domain of the remote server
    },
  };
  
export default nextConfig;
  