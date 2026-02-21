'use client';

import Link from 'next/link';
import { Star, Check, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

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
    rating?: number;
    reviews?: number;
}

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
    const [isAdded, setIsAdded] = useState(false);
    const { addItem } = useCart();

    // Simulated Amazon-style metrics
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

    const wholePrice = Math.floor(product.price);
    const fractionalPrice = Math.round((product.price - wholePrice) * 100);

    return (
        <div className="bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
            <Link href={`/products/${product.id}`} className="flex flex-col flex-1 p-4">
                {/* Badges */}
                <div className="h-6 mb-2">
                    {isBestSeller && (
                        <span className="bg-[#E67A00] text-white text-[12px] font-bold px-2 py-1 rounded-r-sm -ml-4 inline-block shadow-sm">
                            Best Seller
                        </span>
                    )}
                </div>

                {/* Product Image */}
                <div className="relative h-48 mb-4 flex items-center justify-center overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    {!product.inStock && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded">OUT OF STOCK</span>
                        </div>
                    )}
                </div>

                {/* Brand & Name */}
                <div className="space-y-1 mb-2">
                    <p className="text-xs text-blue-600 font-medium hover:underline">{product.brand}</p>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-[#C45500]">
                        {product.name}
                    </h3>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                                key={s}
                                className={cn(
                                    "w-3.5 h-3.5",
                                    s <= Math.floor(rating) ? "fill-[#FFA41C] text-[#FFA41C]" : "text-gray-300"
                                )}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-blue-600">{reviews}</span>
                </div>

                {/* Price & Unit */}
                <div className="mb-2">
                    <div className="flex items-start">
                        <span className="text-xs font-medium mt-1 mr-0.5">$</span>
                        <span className="text-2xl font-bold leading-none">{wholePrice}</span>
                        <span className="text-xs font-medium mt-1 ml-0.5">{fractionalPrice.toString().padStart(2, '0')}</span>
                        <span className="text-sm text-gray-500 ml-2 self-end mb-0.5">/ {product.unit}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium">
                        Min Order: {product.minOrder} units
                    </p>
                </div>

                {/* Bulk Info */}
                <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-1 text-[11px] text-green-700 font-bold">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Supplier
                    </div>
                    {product.bulkSave && (
                        <div className="text-[11px] text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded-sm inline-block">
                            Bulk Save Available
                        </div>
                    )}
                </div>
            </Link>

            {/* Action Footer */}
            <div className="p-4 pt-0 mt-auto">
                <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAdded}
                    className={cn(
                        "w-full py-2 rounded-full text-sm font-medium transition-all shadow-sm border",
                        isAdded
                            ? "bg-green-600 border-green-700 text-white"
                            : "bg-[#FFD814] border-[#FCD200] hover:bg-[#F7CA00] text-black"
                    )}
                >
                    {isAdded ? (
                        <span className="flex items-center justify-center gap-1">
                            <Check className="w-4 h-4" /> Added
                        </span>
                    ) : product.inStock ? (
                        "Add to Cart"
                    ) : (
                        "Out of Stock"
                    )}
                </button>
            </div>
        </div>
    );
}
