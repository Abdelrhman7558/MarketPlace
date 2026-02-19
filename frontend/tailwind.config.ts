import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: '#FF6B00',
                    'orange-hover': '#E55F00',
                    red: '#E94560',
                    blue: '#3498DB',
                },
                dark: {
                    bg: '#0D0D1A',
                    surface: '#1A1A2E',
                    card: '#16213E',
                    deeper: '#0A0A15',
                    border: '#2A2A4A',
                    'border-light': '#3A3A5A',
                },
                text: {
                    primary: '#FFFFFF',
                    secondary: '#B0B0C8',
                    muted: '#6B6B8D',
                },
            },
        },
    },
    plugins: [],
};
export default config;
