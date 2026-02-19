/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/MarketPlace',
    assetPrefix: '/MarketPlace/',
    images: {
        unoptimized: true,
        domains: ['images.unsplash.com', 'plus.unsplash.com'],
    },
    trailingSlash: true,
};

export default nextConfig;
