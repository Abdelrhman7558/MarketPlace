'use client';

import Link from 'next/link';
import { Star, Check, ShieldCheck, ShoppingCart, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { type Product } from '@/lib/products';

// Product interface is now imported from @/lib/products

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
    const [isAdded, setIsAdded] = useState(false);
    const { addItem } = useCart();

    const rating = product.rating || (4.2 + (index % 10) / 10);
    const reviews = product.reviews || (120 + (index * 45));
    const isBestSeller = index % 4 === 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isAdded) return;

        addItem({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            unit: product.unit,
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group bg-card text-card-foreground rounded-lg border border-border/60 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden"
        >
            <div className="relative p-4 flex justify-center items-center h-[200px] border-b border-border/30 bg-white">
                <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-[160px] max-w-full object-contain mix-blend-multiply"
                    loading="lazy"
                    decoding="async"
                />

                {/* Floating Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                    {isBestSeller && (
                        <div className="bg-[#E47911] text-white px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider">
                            Top Rated
                        </div>
                    )}
                    {product.bulkSave && (
                        <div className="bg-emerald-600 text-white px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider">
                            Bulk Save
                        </div>
                    )}
                </div>

                {!product.inStock && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="bg-foreground text-background px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-widest">Out of Stock</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-1 p-4">
                {/* Brand & Stats */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary/80">{product.brand}</span>
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#FFA41C] text-[#FFA41C]" />
                        <span className="text-xs text-[#007185] cursor-pointer hover:underline hover:text-[#C45500]">{reviews}</span>
                    </div>
                </div>

                {/* Title */}
                <Link href={`/products/${product.id}`} className="group/title">
                    <h3 className="text-sm font-medium leading-snug line-clamp-2 mb-3 text-foreground hover:text-[#C45500] transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Price & Min Order */}
                <div className="mt-auto space-y-3">
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                        <span className="text-muted-foreground text-xs font-medium">/ {product.unit}</span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Min Order</span>
                            <span className="text-xs font-bold">{product.minOrder} units</span>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock || isAdded}
                            className={cn(
                                "h-9 px-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 text-xs font-bold w-1/2",
                                isAdded
                                    ? "bg-accent text-accent-foreground"
                                    : "bg-[#FFD814] text-black hover:bg-[#F7CA00] border border-[#FCD200]"
                            )}
                        >
                            {isAdded ? (
                                <Check size={14} className="animate-in zoom-in duration-300" />
                            ) : (
                                "Add to Cart"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
