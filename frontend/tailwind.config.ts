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
                    navy: '#0a0e27',
                    'navy-light': '#141937',
                    blue: '#1e3a8a',
                    'blue-light': '#3b82f6',
                    orange: '#F97316',
                    'orange-hover': '#EA580C',
                    red: '#dc2626',
                    'red-hover': '#b91c1c',
                    green: '#10B981',
                    gold: '#F59E0B',
                    light: '#F8FAFC',
                    white: '#FFFFFF',
                    gray: '#F1F5F9',
                },
                dark: {
                    bg: '#0a0e27',
                    surface: '#141937',
                    card: '#1a2142',
                    border: '#2a3563',
                    'border-light': '#3a4573',
                },
                status: {
                    success: '#10B981',
                    warning: '#F59E0B',
                    error: '#EF4444',
                    info: '#3B82F6',
                },
                text: {
                    primary: '#0F172A',
                    secondary: '#64748B',
                    muted: '#94A3B8',
                },
                border: {
                    light: '#E2E8F0',
                    DEFAULT: '#CBD5E1',
                },
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'card': '0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)',
                'card-hover': '0 0 0 1px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.1)',
                'float': '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
                'glow-orange': '0 0 20px rgba(249, 115, 22, 0.3)',
                'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
                'glow-red': '0 0 20px rgba(220, 38, 38, 0.3)',
                'neon': '0 0 5px rgba(249, 115, 22, 0.5), 0 0 20px rgba(249, 115, 22, 0.2)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-hero': 'linear-gradient(135deg, #0a0e27 0%, #141937 30%, #1a2142 60%, #0a0e27 100%)',
                'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                'gradient-orange': 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                'gradient-blue': 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
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
