'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { Tag, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function DealsPage() {
    const { products } = useProducts();

    // Mocking "Deals" by taking a subset or adding a discount field visually
    // In a real app, we'd filter by `p.discount > 0`
    const dealProducts = products.slice(0, 4).map(p => ({
        ...p,
        price: p.price * 0.85, // Simulate 15% off
        originalPrice: p.price
    }));

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Header / Hero */}
            <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3">
                            <Tag size={40} />
                            Flash Deals & Offers
                        </h1>
                        <p className="text-xl md:text-2xl text-red-100 max-w-2xl mx-auto">
                            Limited time offers on top brands. Stock up now and save up to 30% on bulk orders!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Flash Sale Countdown Banner */}
            <div className="bg-slate-900 text-white py-3 shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center text-sm md:text-base">
                    <div className="flex items-center gap-2 text-orange-400 font-bold animate-pulse">
                        <Clock size={18} />
                        <span>Ends in: 04h 23m 15s</span>
                    </div>
                    <div className="hidden md:block text-slate-400">
                        Orders over $500 get <strong>FREE Shipping</strong>
                    </div>
                    <Link href="/catalog" className="flex items-center gap-1 hover:text-orange-400 transition-colors">
                        View all items <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Deal Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dealProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Discount Badge Overlay */}
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                                15% OFF
                            </div>

                            <ProductCard
                                {...product}
                                // Pass calculated discounted price
                                price={product.price}
                            />

                            {/* Original Price Visual */}
                            <div className="absolute bottom-[72px] left-4 bg-white/80 px-1 rounded text-xs text-slate-500 line-through">
                                ${product.originalPrice.toFixed(2)}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* More content / newsletter placeholder */}
                <div className="mt-20 bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center border border-slate-100">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Don't Miss Out!</h3>
                    <p className="text-slate-600 mb-6">Subscribe to get notified about new deals and exclusive bulk discounts.</p>
                    <div className="flex max-w-md mx-auto gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
