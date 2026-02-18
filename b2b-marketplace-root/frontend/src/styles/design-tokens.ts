export const tokens = {
    colors: {
        primary: {
            DEFAULT: '#0F172A', // Deep Navy (Slate 900)
            light: '#1E293B',   // Slate 800
            dark: '#020617',    // Slate 950
        },
        accent: {
            DEFAULT: '#F97316', // Amazon Orange (Orange 500)
            hover: '#EA580C',   // Orange 600
            light: '#FFEDD5',   // Orange 100
        },
        background: {
            main: '#F8FAFC',    // Slate 50 (Page BG)
            card: '#FFFFFF',    // White
            subtle: '#F1F5F9',  // Slate 100
        },
        text: {
            main: '#0F172A',    // Slate 900
            secondary: '#64748B', // Slate 500
            muted: '#94A3B8',   // Slate 400
            inverse: '#FFFFFF',
        },
        status: {
            success: '#10B981', // Emerald 500
            warning: '#F59E0B', // Amber 500
            error: '#EF4444',   // Red 500
            info: '#3B82F6',    // Blue 500
        },
        border: {
            default: '#E2E8F0', // Slate 200
            hover: '#CBD5E1',   // Slate 300
        }
    },
    spacing: {
        // B2B Compact Scale
        xs: '0.25rem',  // 4px
        sm: '0.5rem',   // 8px
        md: '1rem',     // 16px
        lg: '1.5rem',   // 24px
        xl: '2rem',     // 32px
        section: '4rem', // 64px
    },
    shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    },
    borderRadius: {
        sm: '0.25rem', // 4px
        md: '0.5rem',  // 8px
        lg: '0.75rem', // 12px (Card Standard)
        full: '9999px',
    },
    zIndex: {
        toast: 50,
        modal: 40,
        overlay: 30,
        dropdown: 20,
        sticky: 10,
        base: 0,
    },
    transition: {
        fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
        normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
        slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    }
} as const;
