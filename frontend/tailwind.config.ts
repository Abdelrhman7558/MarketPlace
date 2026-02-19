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
                sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                brand: {
                    navy: '#131921',        // Amazon header dark
                    'navy-light': '#232f3e', // Amazon secondary dark
                    blue: '#007185',        // Professional link/action blue
                    'blue-light': '#008296',
                    orange: '#febd69',      // Amazon accent orange (softer)
                    'orange-hover': '#f3a847',
                    red: '#B12704',         // Professional alert red
                    'red-hover': '#9c2304',
                    green: '#067D62',       // Trust green
                    gold: '#F4BF76',        // Subtle gold for premium feel
                    light: '#E3E6E6',       // Light gray background
                    white: '#FFFFFF',
                    gray: '#F0F2F2',        // Amazon-style light gray
                    border: '#D5D9D9',      // Standard border color
                },
                dark: {
                    bg: '#131921',
                    surface: '#232f3e',
                    card: '#fff',           // Cards should generally be white in this design
                    border: '#D5D9D9',
                    'border-light': '#E7E7E7',
                },
                status: {
                    success: '#067D62',
                    warning: '#FFA41C',
                    error: '#B12704',
                    info: '#007185',
                },
                text: {
                    primary: '#0F1111',     // Almost black for high contrast
                    secondary: '#565959',   // Dark gray for secondary text
                    muted: '#8e9096',
                },
                border: {
                    light: '#E7E7E7',
                    DEFAULT: '#D5D9D9',
                },
            },
            boxShadow: {
                'soft': '0 2px 5px rgba(213,217,217,.5)',
                'card': '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
                'card-hover': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                'float': '0 10px 15px -3px rgba(0,0,0,0.1)',
                'input': '0 0 0 3px #c8f3fa, 0 1px 2px rgba(15,17,17,.15) inset',
            },
            backgroundImage: {
                'gradient-hero': 'linear-gradient(to bottom, #232f3e, #131921)', // Clean dark gradient
                'gradient-card': 'linear-gradient(to bottom, #ffffff, #f8f8f8)',
                'gradient-orange': 'linear-gradient(to bottom, #f7dfa5, #f0c14b)', // Button gradient
                'gradient-blue': 'linear-gradient(to bottom, #f7fafa, #e3e6e6)', // Standard button gradient
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
                'slide-in-right': 'slideInRight 0.4s ease-out forwards',
                'slide-in-left': 'slideInLeft 0.4s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'scale-in': 'scaleIn 0.3s ease-out forwards',
                'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
                'shimmer': 'shimmer 2s infinite linear',
                'pulse-slow': 'pulse 3s infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'spin-slow': 'spin 8s linear infinite',
                'gradient-shift': 'gradientShift 8s ease infinite',
                'counter': 'counter 2s ease-out forwards',
                'ripple': 'ripple 0.6s ease-out',
                'wiggle': 'wiggle 0.5s ease-in-out',
                'slide-down': 'slideDown 0.3s ease-out forwards',
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
                slideInRight: {
                    '0%': { transform: 'translateX(100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideInLeft: {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                bounceIn: {
                    '0%': { transform: 'scale(0.3)', opacity: '0' },
                    '50%': { transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.95)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(249, 115, 22, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.6), 0 0 40px rgba(249, 115, 22, 0.3)' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                ripple: {
                    '0%': { transform: 'scale(0)', opacity: '0.5' },
                    '100%': { transform: 'scale(2.5)', opacity: '0' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(-5deg)' },
                    '75%': { transform: 'rotate(5deg)' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
