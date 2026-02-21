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
            className="group bg-card text-card-foreground rounded-[32px] border border-border/50 hover:border-primary/20 hover:premium-shadow transition-all duration-300 flex flex-col h-full overflow-hidden"
        >
            <div className="relative p-2">
                {/* Image Container */}
                <div className="relative aspect-square rounded-[24px] bg-muted/30 overflow-hidden flex items-center justify-center p-6 transition-colors group-hover:bg-muted/50">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {isBestSeller && (
                            <div className="glass px-3 py-1.5 rounded-xl flex items-center gap-1.5 premium-shadow">
                                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Top Rated</span>
                            </div>
                        )}
                        {product.bulkSave && (
                            <div className="bg-highlight/10 text-highlight backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-highlight/20">
                                Bulk Save
                            </div>
                        )}
                    </div>

                    {!product.inStock && (
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="glass px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest text-foreground">Out of Stock</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col flex-1 p-5 pt-2">
                {/* Brand & Stats */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">{product.brand}</span>
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-secondary text-secondary" />
                        <span className="text-xs font-bold">{rating.toFixed(1)}</span>
                    </div>
                </div>

                {/* Title */}
                <Link href={`/products/${product.id}`} className="group/title">
                    <h3 className="font-heading font-bold text-base leading-snug line-clamp-2 mb-4 group-hover/title:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Price & Min Order */}
                <div className="mt-auto space-y-4">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-heading font-black">${product.price.toFixed(2)}</span>
                        <span className="text-muted-foreground text-xs font-medium">/ {product.unit}</span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Min Order</span>
                            <span className="text-xs font-bold">{product.minOrder} units</span>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock || isAdded}
                            className={cn(
                                "flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 premium-shadow",
                                isAdded
                                    ? "bg-accent text-accent-foreground"
                                    : "bg-primary text-primary-foreground hover:bg-primary/90 btn-hover"
                            )}
                        >
                            {isAdded ? (
                                <Check size={18} className="animate-in zoom-in duration-300" />
                            ) : (
                                <>
                                    <ShoppingCart size={18} />
                                    <span className="text-sm font-bold">Add</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
