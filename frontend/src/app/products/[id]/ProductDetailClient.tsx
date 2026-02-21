'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Star, ShoppingCart, Plus, Minus, Check, Truck,
    ShieldCheck, RotateCcw, ChevronRight, Share2,
    Heart, Info, Package, Sparkles, ArrowLeft
} from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/lib/cart';
import ProductCard from '@/components/product/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetailClient() {
    const { id } = useParams();
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const router = useRouter();

    const product = PRODUCTS.find(p => p.id === id);
    const relatedProducts = PRODUCTS.filter(p => p.id !== id && p.category === product?.category).slice(0, 4);

    if (!product) {
        return (
            <div className="min-h-screen bg-[#050B18] flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Package className="text-gray-600" size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4">Product Not Found</h2>
                    <p className="text-gray-400 mb-8">The product you're looking for might have been moved or discontinued.</p>
                    <Link href="/categories" className="bg-[#FF7A1A] text-white px-8 py-4 rounded-xl font-black shadow-xl hover:scale-105 transition-all inline-block">
                        Back to Catalog
                    </Link>
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

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20 overflow-x-hidden">
            {/* Upper Nav / Breadcrumbs */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-wide px-6 py-4 flex items-center justify-between">
                    <nav className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none">
                        <Link href="/" className="hover:text-[#FF7A1A] transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <Link href="/categories" className="hover:text-[#FF7A1A] transition-colors">Catalog</Link>
                        <ChevronRight size={12} />
                        <span className="text-[#050B18] truncate max-w-[200px]">{product.name}</span>
                    </nav>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-xs font-black text-[#050B18] hover:text-[#FF7A1A] transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>
                </div>
            </div>

            <main className="container-wide px-6 py-10 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Left Column: Visuals */}
                    <div className="lg:col-span-7 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-gray-200/50 border border-gray-100 flex items-center justify-center relative group overflow-hidden min-h-[500px] md:min-h-[600px]"
                        >
                            {/* Background Elements */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A1A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <div className="absolute top-10 right-10 w-40 h-40 bg-[#FF7A1A]/10 rounded-full blur-3xl animate-pulse" />

                            <motion.img
                                layoutId={`product-img-${product.id}`}
                                src={product.image}
                                alt={product.name}
                                className="max-w-full max-h-[500px] object-contain relative z-10 transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                            />

                            {/* Floating Badges */}
                            <div className="absolute top-10 left-10 flex flex-col gap-3 z-20">
                                {product.isNew && (
                                    <span className="bg-[#050B18] text-white text-[11px] font-black px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                        <Sparkles size={14} className="text-[#FF7A1A]" />
                                        NEW ARRIVAL
                                    </span>
                                )}
                                {product.bulkSave && (
                                    <span className="bg-[#FF7A1A] text-white text-[11px] font-black px-4 py-2 rounded-full shadow-lg">
                                        BULK PRICING ENABLED
                                    </span>
                                )}
                            </div>

                            <button className="absolute bottom-10 right-10 w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-xl text-gray-400 hover:text-red-500 hover:scale-110 transition-all z-20">
                                <Heart size={24} />
                            </button>
                        </motion.div>

                        {/* Thumbnails (Simulated) */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="aspect-square bg-white rounded-2xl border border-gray-100 p-4 hover:border-[#FF7A1A] cursor-pointer transition-all flex items-center justify-center group shadow-sm">
                                    <img src={product.image} className="max-h-full object-contain opacity-40 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Info & Actions */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            {/* Brand & Title */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#FF7A1A] font-black text-xs uppercase tracking-[0.2em]">Verified Listing</span>
                                    <ShieldCheck size={14} className="text-green-500" />
                                </div>
                                <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                                    <span className="bg-gray-100 px-3 py-1 rounded-full">{product.brand} Official</span>
                                    <span className="flex items-center gap-1"><Star size={14} className="fill-[#FF7A1A] text-[#FF7A1A]" /> 4.9 (500+ orders)</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-[#050B18] leading-[1.1] tracking-tight">{product.name}</h1>
                            </div>

                            {/* Pricing Card */}
                            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A1A]/5 rounded-bl-[100px] transition-all group-hover:w-full group-hover:h-full group-hover:rounded-none duration-500" />

                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-end gap-3">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xl font-black text-[#050B18]">$</span>
                                            <span className="text-6xl font-black text-[#050B18]">{product.price.toFixed(2)}</span>
                                        </div>
                                        <span className="text-gray-400 font-bold mb-2 uppercase text-xs tracking-widest">/ {product.unit} (Excl. VAT)</span>
                                    </div>

                                    <div className="flex items-center gap-6 py-4 border-y border-gray-50">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Min. Order</p>
                                            <p className="text-[#050B18] font-black">{product.minOrder} Units</p>
                                        </div>
                                        <div className="w-px h-8 bg-gray-100" />
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Availability</p>
                                            <p className="text-green-600 font-black">In Stock</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center bg-[#F0F2F5] rounded-2xl p-1.5 w-max">
                                                <button
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-all font-bold"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-14 text-center font-black text-[#050B18] text-lg">{quantity}</span>
                                                <button
                                                    onClick={() => setQuantity(quantity + 1)}
                                                    className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-all font-bold"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#050B18] transition-colors">
                                                <Share2 size={18} /> Share
                                            </button>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleAdd}
                                            className={`w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all shadow-2xl
                                                ${isAdded ? 'bg-green-600 text-white shadow-green-600/20' : 'bg-[#FF7A1A] text-white shadow-[#FF7A1A]/20 hover:bg-[#e66c17]'}`}
                                        >
                                            {isAdded ? (
                                                <><Check size={24} /> Item Added!</>
                                            ) : (
                                                <><ShoppingCart size={24} /> Get Wholesale Quote</>
                                            )}
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            {/* Logistics Metadata */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 bg-white rounded-3xl border border-gray-100 flex items-start gap-4 shadow-sm">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Truck size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black text-[#050B18] uppercase tracking-wider">Fast Shipping</h4>
                                        <p className="text-[11px] text-gray-500 font-medium">Delivered within 2-3 business days.</p>
                                    </div>
                                </div>
                                <div className="p-5 bg-white rounded-3xl border border-gray-100 flex items-start gap-4 shadow-sm">
                                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <RotateCcw size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black text-[#050B18] uppercase tracking-wider">30-Day Returns</h4>
                                        <p className="text-[11px] text-gray-500 font-medium">Hassle-free returns for businesses.</p>
                                    </div>
                                </div>
                            </div>

                            {/* About Product */}
                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-black text-[#050B18] flex items-center gap-2">
                                    <Info size={20} className="text-[#FF7A1A]" />
                                    Product Highlights
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    {[
                                        'Official Manufacturer Stock',
                                        'Verified Origin & Authenticity',
                                        'BBD / Expiry: 12+ Months',
                                        'Pallet Optimization Available',
                                        'Export documentation included',
                                        'Cold storage handled'
                                    ].map((li, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A]" />
                                            {li}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-32 pt-20 border-t border-gray-100">
                    <div className="flex items-end justify-between mb-12">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-black text-[#050B18]">You May Also Need</h2>
                            <p className="text-gray-500 font-medium">Compatible products from the same warehouse</p>
                        </div>
                        <Link href="/categories" className="text-[#FF7A1A] font-black text-sm uppercase tracking-widest hover:underline flex items-center gap-2">
                            Explore Whole Category <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((p, i) => (
                            <ProductCard key={p.id} product={p} index={i} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
