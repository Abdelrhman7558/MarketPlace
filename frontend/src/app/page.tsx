'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ChevronRight, ArrowRight, Zap, ShieldCheck,
    Truck, Star, TrendingUp, Sparkles, Package,
    ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Skeleton, ProductCardSkeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';

/* ========== DATA ========== */
const HERO_FEATURES = [
    { icon: Zap, text: "Instant Wholesale Pricing", color: "text-primary" },
    { icon: ShieldCheck, text: "Verified Suppliers Only", color: "text-success" },
    { icon: Truck, text: "Next-Day Bulk Delivery", color: "text-accent" },
];

const CATEGORIES = [
    { name: 'Soft Drinks', count: '120+', image: 'https://images.unsplash.com/photo-1581098361633-15fb886efc90?auto=format&fit=crop&q=80&w=600', span: 'col-span-2 row-span-2' },
    { name: 'Energy', count: '45+', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400', span: 'col-span-1 row-span-1' },
    { name: 'Water', count: '30+', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=400', span: 'col-span-1 row-span-1' },
    { name: 'Juice', count: '60+', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=400', span: 'col-span-2 row-span-1' },
];

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
            {/* ========== HERO SECTION ========== */}
            <section className="relative pt-20 pb-16 overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

                <div className="container-wide px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in-up">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">The Future of B2B Commerce</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-black tracking-tight leading-[1.1] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            Premium Beverages. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                Wholesale Reimagined.
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            Connect directly with top suppliers and distributors. Scalable pricing, integrated logistics, and verified quality for your business.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            <Link href="/#products">
                                <Button size="lg" className="rounded-full px-10 gap-2 h-14 text-lg group shadow-xl shadow-primary/20">
                                    Shop Catalog
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg border-foreground/10 hover:bg-foreground/5">
                                    Become a Supplier
                                </Button>
                            </Link>
                        </div>

                        {/* Features Bar */}
                        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                            {HERO_FEATURES.map((feature, i) => (
                                <div key={i} className="flex items-center justify-center gap-3 py-3 px-6 rounded-2xl bg-surface border border-border/50 group hover:shadow-lg transition-all duration-300">
                                    <feature.icon className={cn("w-6 h-6 group-hover:scale-110 transition-transform", feature.color)} />
                                    <span className="text-sm font-bold text-foreground/80">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== CATEGORIES BENTO GRID ========== */}
            <section className="py-20 bg-surface/50">
                <div className="container-wide px-4">
                    <div className="flex items-end justify-between mb-12">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-poppins font-black tracking-tight">Explore by Category</h2>
                            <p className="text-foreground/60">Curated collections from the world's best beverage brands.</p>
                        </div>
                        <Link href="/categories" className="hidden sm:flex items-center gap-2 text-primary font-bold group">
                            View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                        {CATEGORIES.map((cat, i) => (
                            <Link
                                key={i}
                                href={`/categories/${cat.name.toLowerCase()}`}
                                className={cn(
                                    "relative overflow-hidden rounded-[2rem] group cursor-pointer",
                                    cat.span
                                )}
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                    <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-1">{cat.count} Products</span>
                                    <h3 className="text-2xl font-bold text-white group-hover:translate-x-2 transition-transform">{cat.name}</h3>
                                </div>
                                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="w-5 h-5 text-white" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== TRENDING PRODUCTS ========== */}
            <section id="products" className="py-20">
                <div className="container-wide px-4">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <TrendingUp className="w-5 h-5" />
                                <span>Trending Now</span>
                            </div>
                            <h2 className="text-4xl font-poppins font-black tracking-tight">Top Picks for Your Business</h2>
                        </div>
                        <div className="flex items-center gap-2 p-1 bg-surface border border-border rounded-full">
                            <button className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-bold text-sm">All</button>
                            <button className="px-6 py-2 rounded-full text-foreground/60 hover:text-foreground font-bold text-sm">Sale</button>
                            <button className="px-6 py-2 rounded-full text-foreground/60 hover:text-foreground font-bold text-sm">New</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {loading ? (
                            Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
                        ) : (
                            PRODUCTS.slice(0, 8).map((product, i) => (
                                <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                                    <ProductCard product={product} />
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-16 text-center">
                        <Button variant="outline" size="lg" className="rounded-full px-12 border-primary/20 hover:bg-primary/5 text-primary h-14">
                            Explore All Products
                        </Button>
                    </div>
                </div>
            </section>

            {/* ========== TRUST / LOGO CLOUD ========== */}
            <section className="py-16 border-t border-border/50">
                <div className="container-wide px-4">
                    <p className="text-center text-xs font-bold text-foreground/40 uppercase tracking-[0.3em] mb-10">Trusted by 500+ Regional Distributors</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
                        {/* Logo Placeholders */}
                        {['Alpha', 'BeverageCo', 'DirectDist', 'MarketFlow', 'Nova'].map(brand => (
                            <div key={brand} className="text-2xl font-black italic tracking-tighter">{brand}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== CTA SECTION ========== */}
            <section className="container-wide px-4 py-20">
                <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
                    <div className="absolute top-0 right-0 w-[40%] h-full bg-white/5 skew-x-[-20deg] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[20%] h-full bg-white/5 skew-x-[-20deg] pointer-events-none" />

                    <div className="relative z-10 space-y-8 max-w-3xl mx-auto text-primary-foreground">
                        <h2 className="text-4xl md:text-5xl font-poppins font-black leading-tight">Ready to optimize your <br /> supply chain?</h2>
                        <p className="text-xl text-primary-foreground/80 leading-relaxed">Join thousands of businesses already scaling with our marketplace platform. Registration takes only 2 minutes.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Button size="lg" className="rounded-full bg-white text-primary border-none hover:bg-white/90 h-14 px-12 text-lg font-black tracking-tight">
                                Create Free Account
                            </Button>
                            <Button variant="ghost" className="text-white hover:bg-white/10 h-14 px-10 text-lg">
                                Talk to Sales
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
