'use client';

import { ToastProvider } from "@/components/ui/ToastProvider";
import { CartProvider } from "@/lib/cart";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CartProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </CartProvider>
    );
}
