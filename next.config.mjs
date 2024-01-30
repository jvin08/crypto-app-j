// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      loader: 'default',
      path: '/_next/image',
      domains: ['assets.coingecko.com'], // Add the domain of the remote server
    },
  };
  
export default nextConfig;
  