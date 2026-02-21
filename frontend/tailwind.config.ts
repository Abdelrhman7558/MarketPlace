import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ["class", '[data-theme="dark"]'],
    theme: {
        extend: {
            colors: {
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                success: {
                    DEFAULT: "var(--success)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                },
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
            borderRadius: {
                lg: "8px",
                xl: "12px",
            },
            boxShadow: {
                card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                "card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                glow: "0 0 15px var(--ring)",
            },
            screens: {
                'xs': '475px',
                '2xl': '1400px',
                '3xl': '1600px', // For dense dashboards
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "shimmer": "shimmer 2s infinite linear",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                shimmer: {
                    "100%": { transform: "translateX(100%)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
