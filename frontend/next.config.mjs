/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: ['images.unsplash.com', 'plus.unsplash.com'],
    },
    async rewrites() {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        if (!apiUrl) {
            // No API URL defined! This will fail in production.
            return [];
        }
        const destination = apiUrl.startsWith('http') ? apiUrl : `https://${apiUrl}`;
        return [
            {
                source: '/api/:path*',
                destination: `${destination.replace(/\/$/, '')}/:path*`, // Ensure no double slashes
            },
        ];
    },
};

export default nextConfig;

