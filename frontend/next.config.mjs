/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: ['images.unsplash.com', 'plus.unsplash.com'],
    },
    async rewrites() {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        if (!apiUrl) {
            return [];
        }
        const destination = apiUrl.startsWith('http') ? apiUrl : `https://${apiUrl}`;
        return {
            beforeFiles: [
                // NextAuth routes are handled by Next.js API route handler — do NOT proxy them
            ],
            afterFiles: [
                {
                    source: '/api/auth/:path*',
                    destination: '/api/auth/:path*', // Keep NextAuth routes local
                },
            ],
            fallback: [
                {
                    source: '/api/:path*',
                    destination: `${destination.replace(/\/$/, '')}/:path*`,
                },
            ],
        };
    },
};

export default nextConfig;

