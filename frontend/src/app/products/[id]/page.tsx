'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Truck, ShieldCheck, RotateCcw, Package, ChevronRight, Minus, Plus, CreditCard, Box } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const product = PRODUCTS.find((p) => p.id === params.id) || PRODUCTS[0];
    const [qty, setQty] = useState(product.minOrder);
    const [activeImage, setActiveImage] = useState(0);

    // Mock multiple images for gallery
    const images = [product.image, product.image, product.image, product.image];

    const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Breadcrumbs */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-wide py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-brand-orange">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/catalog" className="hover:text-brand-orange">Catalog</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href={`/catalog?category=${product.category}`} className="hover:text-brand-orange">{product.category}</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-brand-navy font-medium truncate max-w-[200px]">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="container-wide py-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">

                        {/* Left Column: Images */}
                        <div className="p-6 md:p-8 border-r border-gray-100">
                            <div className="sticky top-24">
                                <div className="aspect-square bg-gray-50 rounded-xl mb-4 relative overflow-hidden group">
                                    <img
                                        src={images[activeImage]}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110 cursor-zoom-in"
                                    />
                                    {product.bulkSave && (
                                        <div className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded shadow-sm">
                                            BULK SAVE AVAILABLE
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(idx)}
                                            className={`aspect-square rounded-lg border-2 p-2 ${activeImage === idx ? 'border-brand-orange bg-brand-orange/5' : 'border-transparent bg-gray-50 hover:border-gray-200'}`}
                                        >
                                            <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Details */}
                        <div className="p-6 md:p-8">
                            <div className="mb-6">
                                <Link href={`/catalog?brand=${product.brand}`} className="text-brand-orange text-sm font-bold tracking-wide uppercase hover:underline mb-2 inline-block">
                                    {product.brand}
                                </Link>
                                <h1 className="text-3xl font-bold text-brand-navy mb-2 leading-tight">{product.name}</h1>

                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex text-yellow-400">
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 text-gray-200" />
                                    </div>
                                    <span className="text-brand-navy font-medium">4.2 (128 Reviews)</span>
                                    <span className="text-gray-300">|</span>
                                    <span className="text-green-600 font-medium flex items-center gap-1">
                                        <Check className="w-4 h-4" /> In Stock
                                    </span>
                                    <span className="text-gray-500">Min Order: {product.minOrder} {product.unit}</span>
                                </div>
                            </div>

                            <hr className="border-gray-100 my-6" />

                            <div className="mb-8">
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-4xl font-bold text-brand-navy">${product.price.toFixed(2)}</span>
                                    <span className="text-gray-500 mb-1">/ {product.unit}</span>
                                </div>
                                <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-lg p-4 mb-6">
                                    <h3 className="text-brand-navy font-bold text-sm mb-3 flex items-center gap-2">
                                        <Box className="w-4 h-4 text-brand-orange" /> Bulk Pricing Tiers
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between items-center pb-2 border-b border-brand-orange/10">
                                            <span className="text-gray-600">1 - 9 units</span>
                                            <span className="font-bold text-brand-navy">${product.price.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-2 border-b border-brand-orange/10">
                                            <span className="text-gray-600">10 - 49 units</span>
                                            <span className="font-bold text-green-600">${(product.price * 0.95).toFixed(2)} (-5%)</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">50+ units</span>
                                            <span className="font-bold text-green-600">${(product.price * 0.85).toFixed(2)} (-15%)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center border border-gray-300 rounded-lg h-12">
                                        <button
                                            onClick={() => setQty(Math.max(product.minOrder, qty - 1))}
                                            className="px-4 h-full hover:bg-gray-50 text-gray-500 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <div className="w-16 text-center font-bold text-brand-navy">{qty}</div>
                                        <button
                                            onClick={() => setQty(qty + 1)}
                                            className="px-4 h-full hover:bg-gray-50 text-gray-500 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button className="flex-1 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold h-12 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                                        <ShoppingCart className="w-5 h-5" /> Add to Cart
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-4 h-4 text-brand-navy" />
                                        <span>Items ship from <strong>Cairo Warehouse</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-brand-navy" />
                                        <span>Sold by <strong>{product.brand} Official</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-brand-navy" />
                                        <span>Secure transaction</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RotateCcw className="w-4 h-4 text-brand-navy" />
                                        <span>30-Day Return Policy</span>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100 my-6" />

                            <div>
                                <h3 className="font-bold text-brand-navy mb-4">Product Description</h3>
                                <div className="prose prose-sm text-gray-600 max-w-none">
                                    <p>Premium quality {product.name.toLowerCase()} sourced directly from the manufacturer. Perfect for retail stocking, restaurants, cafes, and bulk vending requirements. </p>
                                    <ul className="list-disc pl-4 mt-2 space-y-1">
                                        <li>High-demand consumer favorite</li>
                                        <li>Extended shelf life packaging</li>
                                        <li>Optimized for efficient pallet stacking</li>
                                        <li>Certified original product</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="container-wide mb-12">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">Related Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {related.map((p) => (
                        <div key={p.id} className="h-full">
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Check({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12" /></svg>
    )
}
