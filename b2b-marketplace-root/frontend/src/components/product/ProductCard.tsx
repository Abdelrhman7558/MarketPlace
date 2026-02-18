'use client';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { hoverLift, buttonClick } from '@/lib/motion';
import { useToast } from '@/components/ui/ToastProvider';
import { useCart } from '@/context/CartContext';
import { twMerge } from 'tailwind-merge';

interface ProductCardProps {
    id: string;
    title: string;
    brand: string;
    price: number;
    image?: string;
    minOrder: number;
    stock: number;
    className?: string; // Allow custom classes
    imageAspect?: string; // Allow custom aspect ratio
}

export default function ProductCard({
    id,
    title,
    brand,
    price,
    image,
    minOrder,
    stock,
    className,
    imageAspect = 'aspect-[4/3]' // Default to 4:3
}: ProductCardProps) {
    const { showToast } = useToast();
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addItem({
            id,
            name: title,
            price,
            quantity: minOrder,
            supplierId: 'sup-1',
        });

        showToast(`Added ${minOrder} x ${title} to cart`, 'success');
    };

    return (
        <motion.div
            variants={hoverLift}
            whileHover="hover"
            className={twMerge(
                "group bg-white rounded-lg border border-slate-200 overflow-hidden relative flex flex-col h-full hover:shadow-lg transition-all duration-300",
                className
            )}
        >
            <Link href={`/products/${id}`} className="flex flex-col h-full">
                {/* Image Area - Dynamic Aspect Ratio */}
                <div className={`relative ${imageAspect} bg-slate-50 overflow-hidden border-b border-slate-100`}>
                    {/* Discount Badge */}
                    {minOrder > 10 && (
                        <div className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                            <TrendingDown size={10} />
                            BULK
                        </div>
                    )}

                    {/* Favorite Button */}
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="absolute top-2 right-2 z-10 p-1.5 bg-white/90 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                    >
                        <Heart size={14} />
                    </button>

                    {image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-3xl select-none bg-slate-100">
                            {brand.substring(0, 2).toUpperCase()}
                        </div>
                    )}

                    {/* Quick Add Overlay Button (Desktop) */}
                    <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/50 to-transparent">
                        <motion.button
                            variants={buttonClick}
                            whileTap="tap"
                            onClick={handleAddToCart}
                            className="w-full bg-white text-slate-900 text-xs font-bold py-2 rounded shadow-md flex items-center justify-center gap-2 hover:bg-slate-50"
                        >
                            <ShoppingCart size={14} />
                            ADD TO CART
                        </motion.button>
                    </div>
                </div>

                {/* Content Area - Compact Padding */}
                <div className="p-3 flex flex-col flex-1">
                    {/* Header: Brand & Title */}
                    <div className="mb-2">
                        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5 truncate">
                            {brand}
                        </div>
                        <h3
                            className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem]"
                            title={title}
                        >
                            {title}
                        </h3>
                    </div>

                    {/* Footer: Price & Meta */}
                    <div className="mt-auto pt-2 border-t border-slate-100 flex items-end justify-between">
                        <div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-base font-bold text-slate-900">${price.toFixed(2)}</span>
                                <span className="text-[10px] text-slate-400 font-medium">/unit</span>
                            </div>
                            <div className="text-[10px] text-slate-500">Min. {minOrder} pcs</div>
                        </div>

                        {/* Stock Indicator */}
                        <div className="text-[10px] font-medium flex items-center pb-1">
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                            <span className={stock > 0 ? 'text-emerald-700' : 'text-red-600'}>
                                {stock > 0 ? 'In Stock' : 'Out'}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
