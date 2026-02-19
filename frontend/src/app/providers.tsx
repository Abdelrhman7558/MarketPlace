'use client';

import { ToastProvider } from "../components/ui/ToastProvider";
import { CartProvider } from "../lib/cart";
import { AuthProvider } from "../lib/auth";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <CartProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </CartProvider>
        </AuthProvider>
    );
}
