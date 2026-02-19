'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, ShoppingCart, Plus, Minus, Check, Truck, Shield, RotateCcw, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/lib/cart';
import ProductCard from '@/components/product/ProductCard';

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const product = PRODUCTS.find(p => p.id === id);
    const relatedProducts = PRODUCTS.filter(p => p.id !== id && p.category === product?.category).slice(0, 3);

    if (!product) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center animate-fade-in">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-2xl font-bold text-brand-navy mb-2">Product Not Found</h2>
                    <Link href="/" className="text-brand-orange font-semibold hover:underline">Back to Store</Link>
                </div>
            </div>
        );
    }

    const handleAdd = () => {
        addItem({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            unit: product.unit,
        }, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2500);
    };

    const rating = 4.3;
    const reviewCount = 247;

    return (
        <div className="min-h-screen bg-brand-light py-6">
            <div className="container-wide">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-text-muted mb-8 animate-fade-in">
                    <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="hover:text-brand-orange transition-colors cursor-pointer">{product.category}</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-brand-navy font-medium truncate max-w-xs">{product.name}</span>
                </nav>

                {/* Product Main */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden mb-12 animate-fade-in-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Image */}
                        <div className="relative bg-gradient-to-b from-gray-50 to-white p-12 flex items-center justify-center min-h-[400px]">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-w-full max-h-[400px] object-contain hover:scale-105 transition-transform duration-700"
                            />

                            {/* Badges */}
                            <div className="absolute top-6 left-6 flex flex-col gap-2">
                                {product.bulkSave && (
                                    <span className="bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md animate-pulse-slow">
                                        🔥 BULK SAVE
                                    </span>
                                )}
                                {product.inStock ? (
                                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">✓ In Stock</span>
                                ) : (
                                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Out of Stock</span>
                                )}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-8 md:p-12 flex flex-col">
                            <span className="text-text-muted text-xs font-bold uppercase tracking-wider mb-2">{product.brand}</span>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-navy mb-4 leading-tight">{product.name}</h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} className={`w-5 h-5 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                                    ))}
                                </div>
                                <span className="text-sm text-text-muted">{rating} ({reviewCount} reviews)</span>
                            </div>

                            {/* Price */}
                            <div className="bg-brand-light rounded-2xl p-5 mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm text-text-muted">$</span>
                                    <span className="text-4xl font-extrabold text-brand-navy">{Math.floor(product.price)}</span>
                                    <span className="text-xl font-bold text-brand-navy">.{((product.price % 1) * 100).toFixed(0).padStart(2, '0')}</span>
                                    <span className="text-text-muted ml-2">/ {product.unit}</span>
                                </div>
                                <p className="text-sm text-text-muted mt-1">Minimum order: {product.minOrder} units</p>
                            </div>

                            {/* Quantity & Add */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors active:scale-90"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-14 text-center font-bold text-brand-navy text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors active:scale-90"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAdd}
                                    disabled={!product.inStock}
                                    className={`flex-1 py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 ${isAdded
                                        ? 'bg-green-500 shadow-lg'
                                        : 'bg-gradient-to-r from-brand-orange to-brand-orange-hover hover:shadow-glow-orange active:scale-[0.98]'
                                        } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isAdded ? (
                                        <>
                                            <Check className="w-5 h-5 animate-scale-in" />
                                            Added to Cart!
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-5 h-5" />
                                            Add to Cart
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Features */}
                            <div className="mt-auto space-y-3 pt-6 border-t border-gray-100">
                                {[
                                    { icon: Truck, text: 'Free shipping on orders $500+', color: 'text-blue-500' },
                                    { icon: Shield, text: 'Quality guaranteed', color: 'text-green-500' },
                                    { icon: RotateCcw, text: '30-day return policy', color: 'text-purple-500' },
                                ].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                                        <feat.icon className={`w-4 h-4 ${feat.color}`} />
                                        {feat.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-2xl font-extrabold text-brand-navy mb-6">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedProducts.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
