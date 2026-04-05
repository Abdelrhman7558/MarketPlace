/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: ['images.unsplash.com', 'plus.unsplash.com'],
    },
    // Rewrites handled by src/middleware.ts
};

export default nextConfig;

