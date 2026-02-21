'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Clock, ArrowRight, Star, ShieldCheck,
    Zap, Package, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { PRODUCTS, CATEGORIES_LIST } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';
import HeroCarousel from '@/components/home/HeroCarousel';

const HOME_TILES = [
    {
        title: "Beverages Collection",
        link: "/categories?c=Soft Drinks",
        layout: "quad",
        items: [
            { name: "Soft Drinks", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200", link: "/categories?c=Soft Drinks" },
            { name: "Coffee", image: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=200", link: "/categories?c=Coffee %26 Tea" },
            { name: "Energy Drinks", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200", link: "/categories?c=Energy Drinks" },
            { name: "Tea", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200", link: "/categories?c=Coffee %26 Tea" },
        ]
    },
    {
        title: "Snacks & Sweets",
        link: "/categories?c=Snacks %26 Sweets",
        layout: "grid",
        items: PRODUCTS.filter(p => p.category === 'Snacks & Sweets').slice(0, 4)
    },
    {
        title: "Personal Care Brands",
        link: "/categories?c=Personal Care",
        layout: "quad",
        items: [
            { name: "Body Wash", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200", link: "/categories?c=Personal Care" },
            { name: "Deodorant", image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=200", link: "/categories?c=Personal Care" },
            { name: "Lotions", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200", link: "/categories?c=Personal Care" },
            { name: "Soaps", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200", link: "/categories?c=Personal Care" },
        ]
    },
    {
        title: "Bulk Home Cleaning",
        link: "/categories?c=Home Care",
        image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400",
        subtitle: "Up to 30% off on bulk orders",
        layout: "single"
    }
];

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="min-h-screen bg-[#EAEDED] pb-20">
            {/* ========== HERO CAROUSEL ========== */}
            <HeroCarousel />

            {/* ========== AMAZON TILES ========== */}
            <div className="container-wide px-4 -mt-24 relative z-30">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {HOME_TILES.map((tile, i) => (
                        <div key={i} className="bg-white p-5 shadow-sm flex flex-col min-h-[420px]">
                            <h2 className="text-xl font-bold text-[#050B18] mb-4">{tile.title}</h2>

                            <div className="flex-1">
                                {tile.layout === 'quad' && tile.items && (
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                                        {tile.items.map((item: any, idx) => (
                                            <Link key={idx} href={item.link || tile.link} className="group flex flex-col">
                                                <div className="aspect-square bg-gray-50 mb-2 overflow-hidden flex items-center justify-center p-2">
                                                    <img src={item.image} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300" alt={item.name} />
                                                </div>
                                                <span className="text-[12px] text-gray-700 font-bold group-hover:text-[#FF7A1A] truncate">{item.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {tile.layout === 'grid' && tile.items && (
                                    <div className="grid grid-cols-2 gap-3 h-full">
                                        {tile.items.map((item: any, idx) => (
                                            <Link key={idx} href={`/products/${item.id}`} className="block group">
                                                <div className="aspect-square bg-white border border-gray-100 p-2 overflow-hidden flex items-center justify-center">
                                                    <img src={item.image} className="max-h-full object-contain group-hover:scale-105 transition-transform" alt={item.name} />
                                                </div>
                                                <div className="mt-1">
                                                    <span className="text-[13px] font-bold text-red-700">Deal</span>
                                                    <span className="text-[10px] text-gray-500 font-medium block truncate">{item.name}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {tile.layout === 'single' && (
                                    <Link href={tile.link} className="block group">
                                        <div className="aspect-[4/3] bg-gray-50 mb-3 overflow-hidden flex items-center justify-center">
                                            <img src={tile.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={tile.title} />
                                        </div>
                                        <p className="text-sm text-gray-600 font-medium mb-2">{tile.subtitle}</p>
                                    </Link>
                                )}
                            </div>

                            <Link href={tile.link} className="text-sm text-[#007185] font-bold hover:text-[#C45500] hover:underline mt-6">
                                See more
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* ========== DAILY DEALS SCROLLER ========== */}
            <section className="py-10">
                <div className="container-wide px-4">
                    <div className="bg-white p-6 shadow-sm rounded-sm">
                        <div className="flex items-center gap-6 mb-6">
                            <h2 className="text-2xl font-black text-[#050B18]">Today's Lightning Deals</h2>
                            <div className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-sm">
                                <Clock className="w-4 h-4" />
                                <span>Ends in 14:52:10</span>
                            </div>
                            <Link href="/deals" className="text-sm text-[#007185] font-bold hover:underline ml-auto">See all deals</Link>
                        </div>

                        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                            {PRODUCTS.map((p, i) => (
                                <Link key={i} href={`/products/${p.id}`} className="min-w-[200px] flex flex-col group">
                                    <div className="aspect-square bg-[#F7F8F8] mb-3 flex items-center justify-center p-6 rounded-sm">
                                        <img src={p.image} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" alt={p.name} />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-red-700 text-white text-[11px] font-black px-2 py-0.5 rounded-sm">15% off</span>
                                            <span className="text-red-700 text-[11px] font-black">Limited Deal</span>
                                        </div>
                                        <p className="text-lg font-black text-[#050B18] mt-1">${p.price.toFixed(2)} <span className="text-xs text-gray-500 font-medium">/ {p.unit}</span></p>
                                        <p className="text-[13px] text-gray-600 font-medium line-clamp-2 leading-snug">{p.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== RECOMMENDED FOR YOU ========== */}
            <section className="py-6">
                <div className="container-wide px-4">
                    <div className="bg-white p-8 shadow-sm rounded-sm">
                        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                            <div>
                                <h2 className="text-3xl font-black text-[#050B18]">Recommended for your Business</h2>
                                <p className="text-gray-500 font-medium text-sm mt-1">Based on your recent sourcing activity</p>
                            </div>
                            <Button className="bg-[#FF7A1A] hover:bg-[#e66c17] text-white font-black px-8 rounded-lg shadow-lg transition-all">
                                Shop All Products
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                            {loading ? (
                                Array(10).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
                            ) : (
                                PRODUCTS.map((product, i) => (
                                    <ProductCard key={product.id} product={product} index={i} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== SUPPLIER CTA ========== */}
            <section className="container-wide px-4 py-12">
                <div className="bg-[#050B18] text-white p-16 rounded-3xl shadow-2xl relative overflow-hidden text-center lg:text-left flex flex-col lg:flex-row items-center justify-between">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Start Selling Wholesale on MarketPlace</h2>
                        <p className="text-gray-400 text-xl font-medium mb-10 leading-relaxed">Join 50,000+ verified suppliers and reach millions of businesses worldwide.</p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <Button className="bg-[#FF7A1A] text-white border-none h-16 px-12 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-[#FF7A1A]/20">
                                Register as Supplier
                            </Button>
                            <Button variant="outline" className="text-white border-white/20 h-16 px-12 rounded-2xl font-black text-xl hover:bg-white/5 transition-all">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 w-1/3 h-full bg-[#FF7A1A]/5 rounded-full blur-[100px] pointer-events-none" />
                </div>
            </section>
        </main>
    );
}
