'use client';

import Link from 'next/link';
import { Star, ShoppingCart, Plus, Check } from 'lucide-react';
import { useState } from 'react';

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

export default function ProductCard({ product }: { product: Product }) {
    const [isAdded, setIsAdded] = useState(false);
    const rating = 4.0 + Math.random();
    const reviewCount = Math.floor(Math.random() * 500) + 50;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <Link href={`/products/${product.id}`} className="group block h-full">
            <div className="card h-full flex flex-col relative overflow-hidden bg-white hover:border-brand-orange/30 transition-all duration-300">

                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {product.bulkSave && (
                        <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                            BULK SAVE
                        </span>
                    )}
                    {product.inStock && (
                        <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                            IN STOCK
                        </span>
                    )}
                </div>

                {/* Image */}
                <div className="relative pt-[100%] bg-gray-50 overflow-hidden border-b border-gray-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-contain p-6 transform group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                    />

                    {/* Quick Add Overlay (Desktop) */}
                    <button
                        onClick={handleAddToCart}
                        className="absolute bottom-4 right-4 bg-white text-brand-orange border border-brand-orange hover:bg-brand-orange hover:text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-20"
                    >
                        {isAdded ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    <div className="mb-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{product.brand}</span>
                    </div>

                    <h3 className="text-brand-navy font-medium text-sm leading-snug line-clamp-2 mb-2 group-hover:text-brand-orange transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                        <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className={`w-3 h-3 ${i <= rating ? 'fill-current' : 'text-gray-200'}`} />
                            ))}
                        </div>
                        <span className="text-xs text-gray-400">({reviewCount})</span>
                    </div>

                    {/* Price & Bulk Info */}
                    <div className="mt-auto pt-3 border-t border-gray-50">
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-xs font-medium text-brand-navy">$</span>
                            <span className="text-xl font-bold text-brand-navy">{Math.floor(product.price)}</span>
                            <span className="text-xs font-medium text-brand-navy">.{((product.price % 1) * 100).toFixed(0).padStart(2, '0')}</span>
                            <span className="text-gray-400 text-xs ml-1">/ {product.unit}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                Min: {product.minOrder} units
                            </span>

                            {/* Mobile Add Button */}
                            <button
                                onClick={handleAddToCart}
                                className="md:hidden bg-brand-orange/10 text-brand-orange p-1.5 rounded-lg active:scale-90 transition-transform"
                            >
                                <ShoppingCart className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
