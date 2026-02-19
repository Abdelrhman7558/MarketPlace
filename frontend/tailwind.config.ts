import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Arial', 'sans-serif'],
                amazon: ['"Amazon Ember"', 'Arial', 'sans-serif'],
            },
            colors: {
                // Amazon exact colors
                'amz-dark': '#131921',
                'amz-dark2': '#232f3e',
                'amz-dark3': '#37475a',
                'amz-blue': '#007185',
                'amz-blue-hover': '#c7511f',
                'amz-orange': '#febd69',
                'amz-orange2': '#f3a847',
                'amz-yellow': '#f0c14b',
                'amz-yellow-border': '#a88734',
                'amz-red': '#B12704',
                'amz-green': '#007600',
                'amz-star': '#FFA41C',
                'amz-bg': '#EAEDED',
                'amz-card': '#FFFFFF',
                'amz-border': '#DDD',
                'amz-text': '#0F1111',
                'amz-text2': '#565959',
                'amz-link': '#007185',
            },
            boxShadow: {
                'amz-card': '0 2px 5px 0 rgba(213,217,217,.5)',
                'amz-card-hover': '0 0 3px 2px rgba(228,121,17,.5)',
                'amz-input': '0 0 0 3px #c8f3fa, 0 1px 2px rgba(15,17,17,.15) inset',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-down': 'slideDown 0.2s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-4px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
