'use client';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideUp } from '@/lib/motion';

interface MobileStickyPurchaseBarProps {
    price: number;
    stock: number;
}

export default function MobileStickyPurchaseBar({ price, stock }: MobileStickyPurchaseBarProps) {
    if (stock === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-sticky md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-bold uppercase">Total Price</span>
                    <span className="text-xl font-bold text-slate-900">${price.toFixed(2)}</span>
                </div>
                <button className="flex-1 bg-accent text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
                    <ShoppingCart size={20} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
