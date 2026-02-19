'use client';

import Link from 'next/link';
import { Star, ShoppingCart, Plus, Check, Eye } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/cart';

export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    unit: string;
    minOrder: number;
    image: string;
    inStock: boolean;
    category: string;
    bulkSave?: boolean;
}

const BRAND_COLORS: Record<string, string> = {
    'Coca-Cola': 'from-red-500 to-red-700',
    'Pepsi': 'from-blue-500 to-blue-700',
    'Red Bull': 'from-yellow-500 to-blue-600',
    'Monster': 'from-green-500 to-green-700',
    'Lipton': 'from-yellow-400 to-yellow-600',
    'Tropicana': 'from-orange-400 to-orange-600',
    'Nestle': 'from-sky-400 to-sky-600',
};

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
    const [isAdded, setIsAdded] = useState(false);
    const { addItem } = useCart();
    const rating = 4.0 + Math.random();
    const reviewCount = Math.floor(Math.random() * 500) + 50;
    const brandGradient = BRAND_COLORS[product.brand] || 'from-gray-500 to-gray-700';

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
        <Link
            href={`/products/${product.id}`}
            className="group block h-full opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
        >
            <div className="card h-full flex flex-col relative overflow-hidden">
                {/* Top Gradient Accent */}
                <div className={`h-1 w-full bg-gradient-to-r ${brandGradient}`} />

                {/* Badges */}
                <div className="absolute top-4 left-3 z-10 flex flex-col gap-1.5">
                    {product.bulkSave && (
                        <span className="bg-gradient-to-r from-brand-orange to-brand-red text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-md animate-pulse-slow">
                            🔥 BULK SAVE
                        </span>
                    )}
                    {product.inStock ? (
                        <span className="bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                            ✓ IN STOCK
                        </span>
                    ) : (
                        <span className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                            OUT OF STOCK
                        </span>
                    )}
                </div>

                {/* Image */}
                <div className="relative pt-[90%] bg-gradient-to-b from-gray-50 to-white overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-contain p-8 transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/5 transition-colors duration-500" />

                    {/* Quick Actions (Desktop) */}
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-20">
                        <button className="w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-gray-600 hover:text-brand-blue hover:scale-110 transition-all duration-200">
                            <Eye className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className={`w-10 h-10 shadow-lg rounded-xl flex items-center justify-center transition-all duration-300 ${isAdded
                                ? 'bg-green-500 text-white scale-110'
                                : 'bg-brand-orange text-white hover:bg-brand-orange-hover hover:scale-110'
                                } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isAdded ? <Check className="w-4 h-4 animate-scale-in" /> : <Plus className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    {/* Brand */}
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${brandGradient}`} />
                        <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{product.brand}</span>
                    </div>

                    {/* Name */}
                    <h3 className="text-brand-navy font-semibold text-sm leading-snug line-clamp-2 mb-2 group-hover:text-brand-orange transition-colors duration-300">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                            ))}
                        </div>
                        <span className="text-xs text-gray-400 font-medium">({reviewCount})</span>
                    </div>

                    {/* Price & Actions */}
                    <div className="mt-auto pt-3 border-t border-gray-100">
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs font-semibold text-text-muted">$</span>
                                    <span className="text-2xl font-extrabold text-brand-navy">{Math.floor(product.price)}</span>
                                    <span className="text-sm font-bold text-brand-navy">.{((product.price % 1) * 100).toFixed(0).padStart(2, '0')}</span>
                                </div>
                                <span className="text-[10px] text-text-muted">per {product.unit} · Min {product.minOrder}</span>
                            </div>

                            {/* Mobile Add Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ripple-effect ${isAdded
                                    ? 'bg-green-500 text-white'
                                    : 'bg-brand-orange/10 text-brand-orange active:scale-90'
                                    } ${!product.inStock ? 'opacity-50' : ''}`}
                            >
                                {isAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
