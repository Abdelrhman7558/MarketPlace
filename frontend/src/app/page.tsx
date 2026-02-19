'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, TrendingUp, Truck, Shield, Clock, ChevronRight, Star, Package, Users, ShoppingCart, Award } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import { PRODUCTS } from '@/lib/products';

const CATEGORY_CARDS = [
    { name: 'Soft Drinks', emoji: '🥤', color: 'from-red-500/10 to-red-600/10', border: 'border-red-200', hoverBg: 'hover:shadow-glow-red', count: 3 },
    { name: 'Energy Drinks', emoji: '⚡', color: 'from-yellow-500/10 to-green-500/10', border: 'border-yellow-200', hoverBg: 'hover:shadow-glow-orange', count: 2 },
    { name: 'Water', emoji: '💧', color: 'from-sky-500/10 to-blue-500/10', border: 'border-sky-200', hoverBg: 'hover:shadow-glow-blue', count: 1 },
    { name: 'Juice', emoji: '🍊', color: 'from-orange-500/10 to-yellow-500/10', border: 'border-orange-200', hoverBg: 'hover:shadow-glow-orange', count: 1 },
    { name: 'Tea & Coffee', emoji: '☕', color: 'from-amber-500/10 to-brown-500/10', border: 'border-amber-200', hoverBg: 'hover:shadow-glow-orange', count: 1 },
    { name: 'Bulk Deals', emoji: '📦', color: 'from-purple-500/10 to-pink-500/10', border: 'border-purple-200', hoverBg: 'hover:shadow-glow-blue', count: 2 },
];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!visible) return;
        let start = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
        }, 20);
        return () => clearInterval(timer);
    }, [visible, target]);

    return <div ref={ref} className="text-3xl md:text-4xl font-extrabold text-white">{count.toLocaleString()}{suffix}</div>;
}

export default function Home() {
    const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [sortBy, setSortBy] = useState('popular');

    const allBrands = Array.from(new Set(PRODUCTS.map(p => p.brand)));
    const allCategories = Array.from(new Set(PRODUCTS.map(p => p.category)));

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    };

    // Filter products
    let filtered = PRODUCTS.filter(p => {
        if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
        if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
        if (priceRange.min && p.price < Number(priceRange.min)) return false;
        if (priceRange.max && p.price > Number(priceRange.max)) return false;
        return true;
    });

    // Sort
    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);

    return (
        <main className="min-h-screen bg-brand-light">
            {/* ===== HERO SECTION ===== */}
            <section className="relative overflow-hidden bg-gradient-hero text-white">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-[10%] w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float animation-delay-300" />
                    <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-red-500/5 rounded-full blur-2xl animate-pulse-slow" />
                    {/* Floating beverage emojis */}
                    <div className="absolute top-[15%] right-[15%] text-4xl animate-float opacity-20">🥤</div>
                    <div className="absolute bottom-[20%] right-[25%] text-5xl animate-float animation-delay-500 opacity-15">⚡</div>
                    <div className="absolute top-[40%] left-[8%] text-3xl animate-float animation-delay-700 opacity-20">💧</div>
                </div>

                <div className="container-wide relative z-10 py-20 md:py-28">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider animate-fade-in-down">
                            <TrendingUp className="w-3 h-3" />
                            #1 B2B Beverage Marketplace
                        </span>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 animate-fade-in-up">
                            Premium Beverage
                            <br />
                            <span className="gradient-text">Distribution</span>
                            <br />
                            <span className="text-gray-400 text-3xl md:text-5xl">Made Simple</span>
                        </h1>

                        <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed animate-fade-in-up animation-delay-200">
                            Connect with top beverage brands — Pepsi, Coca-Cola, Red Bull, Lipton and more.
                            Wholesale pricing, fast delivery, trusted quality.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
                            <a href="#products" className="btn-primary text-center text-lg px-10 py-4 flex items-center justify-center gap-2 group">
                                Browse Catalog
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <Link href="/auth/register" className="btn-secondary text-center text-lg px-10 py-4">
                                Register Now
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap items-center gap-6 mt-10 animate-fade-in-up animation-delay-500">
                            {[
                                { icon: Truck, text: 'Free Shipping $500+' },
                                { icon: Shield, text: 'Secure Payments' },
                                { icon: Clock, text: '24h Fast Delivery' },
                            ].map((badge, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-400">
                                    <badge.icon className="w-4 h-4 text-brand-orange" />
                                    <span className="text-xs font-medium">{badge.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CATEGORIES ===== */}
            <section className="container-wide py-14">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy mb-2">Shop by Category</h2>
                    <p className="text-text-muted text-sm">Explore our wide range of premium beverages</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {CATEGORY_CARDS.map((cat, i) => (
                        <button
                            key={cat.name}
                            onClick={() => {
                                if (cat.name === 'Bulk Deals') return;
                                setSelectedCategories([cat.name]);
                                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`bg-gradient-to-br ${cat.color} border ${cat.border} rounded-2xl p-5 text-center hover:-translate-y-2 ${cat.hoverBg} transition-all duration-500 group cursor-pointer opacity-0 animate-fade-in-up`}
                            style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
                        >
                            <span className="text-3xl block mb-2 group-hover:scale-125 group-hover:animate-wiggle transition-transform duration-300">{cat.emoji}</span>
                            <h3 className="font-bold text-sm text-brand-navy">{cat.name}</h3>
                            <p className="text-[11px] text-text-muted mt-0.5">{cat.count} products</p>
                        </button>
                    ))}
                </div>
            </section>

            {/* ===== DEALS BANNER ===== */}
            <section className="container-wide mb-14">
                <div className="relative bg-gradient-to-r from-brand-navy via-brand-navy-light to-brand-navy rounded-3xl overflow-hidden p-8 md:p-12">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-orange/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <span className="text-brand-orange text-sm font-bold uppercase tracking-wider">🔥 Limited Time</span>
                            <h3 className="text-white text-2xl md:text-3xl font-extrabold mt-2">Bulk Order Discounts</h3>
                            <p className="text-gray-400 mt-2">Order 50+ cases and get up to <span className="text-brand-orange font-bold">25% OFF</span></p>
                        </div>
                        <a href="#products" className="btn-primary text-lg px-8 py-4 whitespace-nowrap flex items-center gap-2 group">
                            Shop Now
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== PRODUCTS SECTION ===== */}
            <section id="products" className="container-wide pb-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-36">
                            <ProductFilters
                                brands={allBrands}
                                categories={allCategories}
                                selectedBrands={selectedBrands}
                                selectedCategories={selectedCategories}
                                priceRange={priceRange}
                                onBrandChange={toggleBrand}
                                onCategoryChange={toggleCategory}
                                onPriceChange={setPriceRange}
                                onApplyPrice={() => { }}
                            />
                        </div>
                    </aside>

                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl font-semibold shadow-sm w-full justify-center hover:border-brand-orange transition-colors"
                        >
                            <SlidersHorizontal className="w-4 h-4 text-brand-orange" />
                            Filters
                            {(selectedBrands.length + selectedCategories.length) > 0 && (
                                <span className="bg-brand-orange text-white text-xs px-2 py-0.5 rounded-full ml-1">
                                    {selectedBrands.length + selectedCategories.length}
                                </span>
                            )}
                        </button>
                        {showMobileFilters && (
                            <div className="mt-4 animate-slide-down">
                                <ProductFilters
                                    brands={allBrands}
                                    categories={allCategories}
                                    selectedBrands={selectedBrands}
                                    selectedCategories={selectedCategories}
                                    priceRange={priceRange}
                                    onBrandChange={toggleBrand}
                                    onCategoryChange={toggleCategory}
                                    onPriceChange={setPriceRange}
                                    onApplyPrice={() => { }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-extrabold text-brand-navy">All Products</h2>
                                <p className="text-sm text-text-muted mt-0.5">{filtered.length} products found</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-text-muted hidden sm:inline">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value)}
                                    className="bg-white border border-gray-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-brand-orange font-medium cursor-pointer transition-colors"
                                >
                                    <option value="popular">Most Popular</option>
                                    <option value="price-low">Price: Low → High</option>
                                    <option value="price-high">Price: High → Low</option>
                                </select>
                            </div>
                        </div>

                        {filtered.length === 0 ? (
                            <div className="text-center py-20 animate-fade-in">
                                <div className="text-5xl mb-4">🔍</div>
                                <h3 className="text-xl font-bold text-brand-navy mb-2">No products found</h3>
                                <p className="text-text-muted">Try adjusting your filters</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filtered.map((product, i) => (
                                    <ProductCard key={product.id} product={product} index={i} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ===== STATS SECTION ===== */}
            <section className="bg-gradient-hero text-white py-16">
                <div className="container-wide">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: Package, value: 500, suffix: '+', label: 'Products' },
                            { icon: Users, value: 1200, suffix: '+', label: 'Active Clients' },
                            { icon: ShoppingCart, value: 8500, suffix: '+', label: 'Orders Delivered' },
                            { icon: Award, value: 7, suffix: '', label: 'Premium Brands' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-14 h-14 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-orange/20 group-hover:scale-110 transition-all duration-300">
                                    <stat.icon className="w-7 h-7 text-brand-orange" />
                                </div>
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                <p className="text-gray-400 text-sm mt-1 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
