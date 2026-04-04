/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: ['images.unsplash.com', 'plus.unsplash.com'],
    },
    async rewrites() {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
        const destination = apiUrl.startsWith('http') ? apiUrl : `https://${apiUrl}`;
        return [
            {
                source: '/api/:path((?!auth).*)',
                destination: `${destination}/:path*`,
            },
        ];
    },
};

export default nextConfig;

