'use client';

import Link from 'next/link';
import { Star, Check } from 'lucide-react';
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
    const isBestSeller = index % 3 === 0;

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
        <Link href={`/products/${product.id}`} className="block hover:no-underline">
            <div className="bg-white p-5 h-full flex flex-col relative group">
                {/* Best Seller Badge */}
                {isBestSeller && (
                    <div className="absolute top-2 left-2 z-10">
                        <span className="bg-[#E67A00] text-white text-[12px] font-bold px-2 py-[2px] rounded-sm">
                            Best Seller
                        </span>
                    </div>
                )}

                {/* Image */}
                <div className="flex items-center justify-center h-[200px] mb-2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                    />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                    {/* Title */}
                    <h2 className="text-[15px] text-amz-link leading-[20px] mb-1 line-clamp-3 group-hover:text-amz-blue-hover group-hover:underline">
                        {product.name}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-1">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                    key={i}
                                    className={`w-[15px] h-[15px] ${i <= rating ? 'text-amz-star fill-amz-star' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <span className="text-amz-link text-[13px]">{reviewCount.toLocaleString()}</span>
                    </div>

                    {/* Price */}
                    <div className="mb-1">
                        <span className="text-[12px] align-top relative top-[2px]">$</span>
                        <span className="text-[28px] font-light text-amz-text leading-none">
                            {Math.floor(product.price)}
                        </span>
                        <span className="text-[12px] align-top relative top-[2px]">
                            {((product.price % 1) * 100).toFixed(0).padStart(2, '0')}
                        </span>
                        <span className="text-[12px] text-amz-text2 ml-1">
                            (${product.price.toFixed(2)}/{product.unit})
                        </span>
                    </div>

                    {/* Bulk Save */}
                    {product.bulkSave && (
                        <div className="text-[12px] text-amz-red font-medium mb-1">
                            Save 5% with Subscribe & Save
                        </div>
                    )}

                    {/* Min Order */}
                    <div className="text-[12px] text-amz-text2 mb-1">
                        Min. order: {product.minOrder} {product.unit}s
                    </div>

                    {/* Delivery */}
                    <div className="text-[12px] text-amz-text2 mb-3">
                        <span className="text-amz-green font-medium">FREE delivery</span>
                        {' '}
                        <span className="font-bold text-amz-text">Tomorrow</span>
                    </div>

                    {/* Add to Cart */}
                    <div className="mt-auto">
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className={`w-full py-[6px] px-3 text-[13px] rounded-[20px] border cursor-pointer transition-colors ${isAdded
                                    ? 'bg-amz-green text-white border-amz-green'
                                    : !product.inStock
                                        ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                                        : 'text-amz-text border-amz-yellow-border hover:bg-[#f5d78e]'
                                }`}
                            style={!isAdded && product.inStock ? {
                                background: 'linear-gradient(to bottom, #f7dfa5, #f0c14b)',
                            } : undefined}
                        >
                            {isAdded ? (
                                <span className="flex items-center justify-center gap-1">
                                    <Check className="w-4 h-4" /> Added to Cart
                                </span>
                            ) : !product.inStock ? (
                                'Out of Stock'
                            ) : (
                                'Add to Cart'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
