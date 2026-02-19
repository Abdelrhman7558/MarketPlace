'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Star, ShoppingCart, Plus, Minus, Check, Truck, Shield, RotateCcw, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/lib/cart';
import ProductCard from '@/components/product/ProductCard';

export default function ProductDetailClient() {
    const { id } = useParams();
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
                    <h2 className="text-2xl font-bold text-amz-text mb-2">Product Not Found</h2>
                    <Link href="/" className="text-amz-link hover:text-amz-blue-hover hover:underline font-semibold">Back to Store</Link>
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
        <div className="min-h-screen bg-amz-bg py-4">
            <div className="container-amz">
                <nav className="flex items-center gap-2 text-[12px] text-amz-text2 mb-4">
                    <Link href="/" className="text-amz-link hover:text-amz-blue-hover hover:underline">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-amz-link hover:text-amz-blue-hover cursor-pointer">{product.category}</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-amz-text truncate max-w-xs">{product.name}</span>
                </nav>

                <div className="bg-white border border-[#d5d9d9] rounded-[4px] overflow-hidden mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        <div className="relative bg-white p-8 flex items-center justify-center min-h-[400px] border-r border-[#e7e7e7]">
                            <img src={product.image} alt={product.name} className="max-w-full max-h-[400px] object-contain hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {product.bulkSave && <span className="bg-amz-red text-white text-[11px] font-bold px-2 py-1 rounded-sm">BULK SAVE</span>}
                                {product.inStock
                                    ? <span className="bg-amz-green text-white text-[11px] font-bold px-2 py-1 rounded-sm">✓ In Stock</span>
                                    : <span className="bg-amz-red text-white text-[11px] font-bold px-2 py-1 rounded-sm">Out of Stock</span>
                                }
                            </div>
                        </div>

                        <div className="p-6 md:p-8 flex flex-col">
                            <span className="text-amz-text2 text-[12px] uppercase tracking-wider mb-1">Visit the {product.brand} Store</span>
                            <h1 className="text-[20px] md:text-[24px] font-normal text-amz-text mb-3 leading-tight">{product.name}</h1>

                            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#e7e7e7]">
                                <span className="text-[14px] text-amz-link">{rating}</span>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} className={`w-4 h-4 ${i <= rating ? 'text-amz-star fill-amz-star' : 'text-gray-200'}`} />
                                    ))}
                                </div>
                                <span className="text-[13px] text-amz-link hover:text-amz-blue-hover cursor-pointer">{reviewCount} ratings</span>
                            </div>

                            <div className="mb-4">
                                <span className="text-[13px] text-amz-text2">Price:</span>
                                <div className="flex items-baseline gap-0.5 mt-0.5">
                                    <span className="text-[14px] text-amz-text relative -top-[6px]">$</span>
                                    <span className="text-[28px] font-light text-amz-text leading-none">{Math.floor(product.price)}</span>
                                    <span className="text-[14px] text-amz-text relative -top-[6px]">{((product.price % 1) * 100).toFixed(0).padStart(2, '0')}</span>
                                    <span className="text-amz-text2 text-[13px] ml-2">/ {product.unit}</span>
                                </div>
                                <p className="text-[13px] text-amz-text2 mt-1">Minimum order: {product.minOrder} units</p>
                            </div>

                            <div className="bg-[#f7f7f7] border border-[#e7e7e7] rounded-[4px] p-3 mb-4">
                                <p className="text-[13px]">
                                    <span className="text-amz-green font-bold">FREE delivery</span>
                                    <span className="text-amz-text"> on orders over $500</span>
                                </p>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center border border-[#d5d9d9] rounded-[4px] overflow-hidden bg-[#f0f2f2]">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#e3e6e6] transition-colors">
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center font-bold text-amz-text text-[15px] bg-white border-x border-[#d5d9d9]">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-[#e3e6e6] transition-colors">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={handleAdd}
                                    disabled={!product.inStock}
                                    className={`flex-1 py-[10px] rounded-[20px] font-medium text-[14px] flex items-center justify-center gap-2 transition-all duration-300 border
                                        ${isAdded ? 'bg-amz-green text-white border-amz-green' : 'text-amz-text border-[#a88734] hover:brightness-95'}
                                        ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    style={!isAdded && product.inStock ? { background: 'linear-gradient(to bottom, #f7dfa5, #f0c14b)' } : undefined}
                                >
                                    {isAdded ? (<><Check className="w-4 h-4" /> Added to Cart!</>) : (<><ShoppingCart className="w-4 h-4" /> Add to Cart</>)}
                                </button>
                            </div>

                            <div className="mt-auto space-y-2 pt-4 border-t border-[#e7e7e7]">
                                {[
                                    { icon: Truck, text: 'Free shipping on orders $500+' },
                                    { icon: Shield, text: 'Quality guaranteed' },
                                    { icon: RotateCcw, text: '30-day return policy' },
                                ].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[13px] text-amz-text2">
                                        <feat.icon className="w-4 h-4 text-amz-text2" />
                                        {feat.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-[21px] font-bold text-amz-text mb-4">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {relatedProducts.map((p, i) => (
                                <div key={p.id} className="product-card-animate shadow-amz-card rounded-[4px] overflow-hidden">
                                    <ProductCard product={p} index={i} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
