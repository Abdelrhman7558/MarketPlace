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
                'amz-lift': '0 8px 25px -5px rgba(0,0,0,.15)',
                'amz-glow': '0 0 20px rgba(254,189,105,.3)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out both',
                'fade-in-up': 'fadeInUp 0.6s ease-out both',
                'fade-in-down': 'fadeInDown 0.6s ease-out both',
                'fade-in-left': 'fadeInLeft 0.6s ease-out both',
                'fade-in-right': 'fadeInRight 0.6s ease-out both',
                'slide-down': 'slideDown 0.3s ease-out',
                'slide-up': 'slideUp 0.4s ease-out both',
                'scale-in': 'scaleIn 0.4s ease-out both',
                'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68,-0.55,0.27,1.55) both',
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s infinite linear',
                'count-up': 'countUp 1s ease-out both',
                'wiggle': 'wiggle 1s ease-in-out',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
                'marquee': 'marquee 20s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-4px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                bounceIn: {
                    '0%': { opacity: '0', transform: 'scale(0.3)' },
                    '50%': { transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                countUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(-3deg)' },
                    '75%': { transform: 'rotate(3deg)' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 5px rgba(254,189,105,.2)' },
                    '50%': { boxShadow: '0 0 20px rgba(254,189,105,.5)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
