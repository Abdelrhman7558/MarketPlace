'use client';

import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '../context/CartContext';
import { ProductProvider } from '../context/ProductContext';
import { ThemeProvider } from '../context/ThemeContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider>
                <ProductProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </ProductProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
