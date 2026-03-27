/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: ['images.unsplash.com', 'plus.unsplash.com'],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://127.0.0.1:3005/:path*',
            },
        ];
    },
};

export default nextConfig;

