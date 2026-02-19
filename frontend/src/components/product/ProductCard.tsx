'use client';

import Link from 'next/link';
import { Star, ShoppingCart, Plus, Check } from 'lucide-react';
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

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
    const [isAdded, setIsAdded] = useState(false);
    const { addItem } = useCart();
    const rating = 4.0 + Math.random();
    const reviewCount = Math.floor(Math.random() * 5000) + 50;

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
            className="group block h-full"
        >
            <div className="product-card">
                {/* Image Section */}
                <div className="relative pt-[100%] bg-gray-50 overflow-hidden border-b border-gray-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-contain p-6 transform group-hover:scale-105 transition-transform duration-300 ease-out"
                        loading="lazy"
                    />

                    {/* Bestseller Badge (Randomly applied for demo) */}
                    {index % 3 === 0 && (
                        <div className="absolute top-0 left-0">
                            <span className="badge-bestseller rounded-tl-lg rounded-br-lg shadow-sm">
                                #1 Best Seller
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-text-primary text-base font-medium leading-snug line-clamp-3 mb-1 group-hover:text-[#c7511f] transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                        <div className="flex text-[#FFA41C]">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className={`w-4 h-4 ${i <= rating ? 'fill-current' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="text-sm text-brand-blue hover:text-[#c7511f] hover:underline cursor-pointer ml-1">{reviewCount.toLocaleString()}</span>
                    </div>

                    {/* Price Block */}
                    <div className="mt-1 mb-2">
                        <div className="flex items-baseline">
                            <span className="text-xs align-top relative top-0.5">$</span>
                            <span className="text-2xl font-medium text-[#0F1111] leading-none">{Math.floor(product.price)}</span>
                            <span className="text-xs align-top relative top-0.5">{((product.price % 1) * 100).toFixed(0).padStart(2, '0')}</span>
                        </div>
                        {product.bulkSave && (
                            <div className="text-xs text-[#B12704] mt-1 font-medium">
                                Save 5% with bulk order
                            </div>
                        )}
                        <div className="text-xs text-text-secondary mt-1">
                            Min. order: {product.minOrder} {product.unit}s
                        </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="text-xs text-text-secondary mb-3">
                        Get it by <span className="font-bold text-text-primary">Tomorrow, Feb 20</span>
                        <br />
                        <span className="text-brand-green font-bold">FREE Delivery</span> by Marketplace
                    </div>

                    {/* Actions */}
                    <div className="mt-auto">
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className={`w-full py-2 px-4 rounded-full text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 ${isAdded
                                    ? 'bg-brand-green border border-brand-green text-white'
                                    : 'bg-[#e7e9ec] border border-[#f0c14b] text-[#111] hover:bg-[#f3a847]'
                                } ${!product.inStock ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b]'}`}
                        >
                            {isAdded ? (
                                <>
                                    <Check className="w-4 h-4" /> Added
                                </>
                            ) : (
                                <>
                                    Add to Cart
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
