export const typography = {
    fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],     // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px (Body Small)
        base: ['1rem', { lineHeight: '1.5rem' }],    // 16px (Body Main)
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],  // 20px (Card Title)
        '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px (Section Title)
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px (Hero Title)
    },
    fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },
    letterSpacing: {
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
    }
} as const;
