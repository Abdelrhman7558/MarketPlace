'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';

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

function StarRating({ rating = 4.2, count = 1247 }: { rating?: number; count?: number }) {
    return (
        <div className="flex items-center gap-1 mt-1">
            <div className="amz-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className="w-[14px] h-[14px]"
                        fill={star <= Math.floor(rating) ? '#de7921' : star <= rating + 0.5 ? '#de7921' : 'none'}
                        stroke="#de7921"
                        strokeWidth={1}
                    />
                ))}
            </div>
            <Link href="#" className="text-[#007185] text-xs hover:text-[#c7511f] hover:underline">
                {count.toLocaleString()}
            </Link>
        </div>
    );
}

function formatPrice(price: number) {
    const whole = Math.floor(price);
    const fraction = Math.round((price - whole) * 100).toString().padStart(2, '0');
    return { whole: whole.toLocaleString(), fraction };
}

export default function ProductCard({ product }: { product: Product }) {
    const { whole, fraction } = formatPrice(product.price);
    const hasDiscount = product.bulkSave;
    const originalPrice = hasDiscount ? (product.price * 1.3).toFixed(2) : null;
    const discountPercent = hasDiscount ? 23 : 0;
    const reviewCount = Math.floor(Math.random() * 5000) + 500;
    const rating = 3.5 + Math.random() * 1.5;

    return (
        <Link href={`/products/${product.id}`} className="block">
            <div className="amz-product-card">
                {/* Product Image */}
                <div className="product-image-wrap">
                    <img
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        loading="lazy"
                    />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-[13px] text-[#0f1111] leading-5 line-clamp-2 hover:text-[#c7511f] mb-1">
                        {product.name}
                    </h3>

                    {/* Brand */}
                    <span className="text-xs text-[#565959] mb-1">by {product.brand}</span>

                    {/* Rating */}
                    <StarRating rating={rating} count={reviewCount} />

                    {/* Price */}
                    <div className="mt-2">
                        {hasDiscount && (
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="amz-deal-badge">{discountPercent}% off</span>
                                <span className="amz-limited-deal">Limited time deal</span>
                            </div>
                        )}
                        <div className="amz-price flex items-baseline">
                            <span className="price-symbol">EGP</span>
                            <span className="price-whole">{whole}</span>
                            <span className="price-fraction">{fraction}</span>
                        </div>
                        {hasDiscount && originalPrice && (
                            <div className="text-xs text-[#565959] mt-0.5">
                                List: <span className="line-through">EGP{originalPrice}</span>
                            </div>
                        )}
                    </div>

                    {/* Prime badge */}
                    <div className="mt-1">
                        <span className="amz-prime-badge">
                            <svg viewBox="0 0 72 25" width="53" height="16">
                                <path fill="#146eb4" d="M5.1 14.6C2.3 12.1.6 9.4.1 7.5c-.3-1-.4-1.6-.1-2 .3-.6 1.1-.6 1.7-.2.7.5 1.4 1.6 2.1 3.2.5 1 .9 2.1 1.3 3.3v2.8zM71 11.9c-4.7 3.5-11.7 5.4-17.6 5.4-8.3 0-15.8-3.1-21.5-8.2-.4-.4-.1-.9.5-.6 6.1 3.6 13.7 5.7 21.5 5.7 5.3 0 11.1-1.1 16.4-3.3.8-.4 1.5.5.7 1z" />
                                <path fill="#f90" d="M72.6 10.3c-.6-.7-3.7-.4-5.2-.2-.4.1-.5-.3-.1-.6 2.5-1.8 6.6-1.3 7.1-.7.5.6-.1 4.8-2.5 6.8-.4.3-.7.1-.5-.3.5-1.3 1.7-4.4 1.2-5z" />
                                <path fill="#146eb4" d="M67.4 2V.5c0-.2.2-.4.4-.4h6.8c.2 0 .4.2.4.4V2c0 .2-.2.5-.5.5l-5.9.1" />
                            </svg>
                        </span>
                    </div>

                    {/* Delivery */}
                    <p className="text-xs text-[#0f1111] mt-1">
                        FREE delivery <span className="font-bold">Mon, Feb 24</span>
                    </p>

                    {/* Min Order */}
                    <p className="text-[11px] text-[#565959] mt-1">
                        Min. order: {product.minOrder} units
                    </p>

                    {/* Stock */}
                    {!product.inStock && (
                        <p className="text-[#b12704] text-xs font-bold mt-1">Currently unavailable</p>
                    )}
                </div>
            </div>
        </Link>
    );
}
