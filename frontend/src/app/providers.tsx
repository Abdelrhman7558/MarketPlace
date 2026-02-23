'use client';

import { ThemeProvider } from 'next-themes';
import { ToastProvider } from '@/components/ui/ToastProvider';
import { AuthProvider } from '@/lib/auth';
import { CartProvider } from '@/lib/cart';
import { LanguageProvider } from '@/contexts/LanguageContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToastProvider>
                <AuthProvider>
                    <LanguageProvider>
                        <CartProvider>
                            {children}
                        </CartProvider>
                    </LanguageProvider>
                </AuthProvider>
            </ToastProvider>
        </ThemeProvider>
    );
}
