'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Package, Truck, Shield, Clock, Sparkles } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import { PRODUCTS } from '@/lib/products';

const HERO_SLIDES = [
    {
        title: 'Premium Beverages at Wholesale Prices',
        subtitle: 'Direct access to 500+ brands. Free delivery on orders over $500.',
        image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2787&auto=format&fit=crop',
        gradient: 'from-[#232f3e] to-[#131921]',
    },
    {
        title: 'Energy Drinks Collection',
        subtitle: 'Red Bull, Monster, and more — available in bulk with exclusive discounts.',
        image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=2787&auto=format&fit=crop',
        gradient: 'from-[#1a1a2e] to-[#16213e]',
    },
    {
        title: 'Summer Ready Stock',
        subtitle: 'Stock up before summer rush. Up to 30% off on soft drinks and water.',
        image: 'https://images.unsplash.com/photo-1581098361633-15fb886efc90?q=80&w=2787&auto=format&fit=crop',
        gradient: 'from-[#0d1117] to-[#161b22]',
    },
];

const CATEGORY_CARDS = [
    { title: 'Soft Drinks', image: 'https://images.unsplash.com/photo-1581098361633-15fb886efc90?auto=format&fit=crop&q=80&w=300&h=300', link: 'Soft Drinks' },
    { title: 'Energy Drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=300&h=300', link: 'Energy Drinks' },
    { title: 'Water & Sparkling', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=300&h=300', link: 'Water' },
    { title: 'Juice & Smoothies', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=300&h=300', link: 'Juice' },
];

export default function Home() {
    const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('popular');
    const [heroSlide, setHeroSlide] = useState(0);

    // Auto-slide hero
    useEffect(() => {
        const timer = setInterval(() => {
            setHeroSlide((s) => (s + 1) % HERO_SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const allBrands = Array.from(new Set(PRODUCTS.map(p => p.brand)));
    const allCategories = Array.from(new Set(PRODUCTS.map(p => p.category)));

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    };
    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    };

    let filtered = PRODUCTS.filter(p => {
        if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
        if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
        if (priceRange.min && p.price < Number(priceRange.min)) return false;
        if (priceRange.max && p.price > Number(priceRange.max)) return false;
        return true;
    });

    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);

    return (
        <main className="min-h-screen bg-amz-bg">
            {/* ========== HERO CAROUSEL ========== */}
            <section className="relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #232f3e 70%, #EAEDED 30%)' }}>
                {/* Carousel */}
                <div className="relative h-[280px] sm:h-[380px] md:h-[450px] overflow-hidden">
                    {HERO_SLIDES.map((slide, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-opacity duration-700 ${i === heroSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-amz-bg via-transparent to-transparent" />
                        </div>
                    ))}

                    {/* Hero Text */}
                    <div className="absolute inset-0 flex items-center pointer-events-none">
                        <div className="container-amz pointer-events-auto">
                            <div className="max-w-lg">
                                <h1 className="text-white text-[28px] sm:text-[36px] font-bold leading-tight mb-3 drop-shadow-lg">
                                    {HERO_SLIDES[heroSlide].title}
                                </h1>
                                <p className="text-gray-200 text-[14px] sm:text-[16px] mb-5 drop-shadow">
                                    {HERO_SLIDES[heroSlide].subtitle}
                                </p>
                                <a
                                    href="#products"
                                    className="inline-block btn-amz !py-[10px] !px-6 !text-[14px] font-bold hover:no-underline"
                                >
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Nav Arrows */}
                    <button
                        onClick={() => setHeroSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                        className="absolute left-0 top-0 bottom-[80px] w-[60px] flex items-center justify-center text-white/60 hover:text-white transition-colors bg-transparent hover:bg-black/10"
                    >
                        <ChevronLeft className="w-10 h-10" />
                    </button>
                    <button
                        onClick={() => setHeroSlide((s) => (s + 1) % HERO_SLIDES.length)}
                        className="absolute right-0 top-0 bottom-[80px] w-[60px] flex items-center justify-center text-white/60 hover:text-white transition-colors bg-transparent hover:bg-black/10"
                    >
                        <ChevronRight className="w-10 h-10" />
                    </button>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 flex gap-2">
                        {HERO_SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setHeroSlide(i)}
                                className={`w-3 h-3 rounded-full transition-all ${i === heroSlide ? 'bg-white w-6' : 'bg-white/40'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Overlapping Category Cards */}
                <div className="container-amz relative -mt-[120px] sm:-mt-[150px] z-10 grid grid-cols-2 md:grid-cols-4 gap-[15px] pb-5">
                    {CATEGORY_CARDS.map((cat) => (
                        <div key={cat.title} className="bg-white p-5 shadow-amz-card">
                            <h2 className="text-[18px] font-bold text-amz-text mb-3">{cat.title}</h2>
                            <div
                                className="aspect-square bg-[#f7f7f7] mb-3 cursor-pointer overflow-hidden rounded-sm"
                                onClick={() => {
                                    setSelectedCategories([cat.link]);
                                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedCategories([cat.link]);
                                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="text-amz-link text-[13px] hover:text-amz-blue-hover hover:underline"
                            >
                                Shop now
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========== 3D PREMIUM AD BANNERS ========== */}
            <section className="container-amz pb-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px]">
                    {/* 3D Banner 1 — Bulk Savings */}
                    <div className="relative group cursor-pointer overflow-hidden rounded-sm" style={{ perspective: '1000px' }}>
                        <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565c0] to-[#42a5f5] p-6 min-h-[220px] flex flex-col justify-between relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
                            style={{ transformStyle: 'preserve-3d' }}>
                            {/* Animated 3D floating shapes */}
                            <div className="absolute top-[-20px] right-[-20px] w-[120px] h-[120px] rounded-full bg-white/10 blur-sm"
                                style={{ animation: 'float3d 6s ease-in-out infinite', transform: 'translateZ(40px)' }} />
                            <div className="absolute bottom-[-30px] left-[-10px] w-[80px] h-[80px] rounded-full bg-white/5"
                                style={{ animation: 'float3d 8s ease-in-out infinite reverse', transform: 'translateZ(20px)' }} />
                            <div className="absolute top-1/2 right-10 w-[60px] h-[60px] bg-white/5 rounded-lg rotate-45"
                                style={{ animation: 'float3d 5s ease-in-out infinite 1s', transform: 'translateZ(30px)' }} />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <Truck className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-white/80 text-[11px] uppercase tracking-[2px] font-medium">Bulk Order</span>
                                </div>
                                <h3 className="text-white text-[24px] font-bold leading-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                                    Save up to <span className="text-[#ffeb3b]">30%</span>
                                </h3>
                                <p className="text-white/70 text-[13px] mt-1">On orders over $500</p>
                            </div>
                            <a href="#products" className="inline-flex items-center gap-1 text-white text-[13px] font-bold mt-3 hover:no-underline group/link relative z-10">
                                Shop bulk deals
                                <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </a>
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                        </div>
                    </div>

                    {/* 3D Banner 2 — New Arrivals */}
                    <div className="relative group cursor-pointer overflow-hidden rounded-sm" style={{ perspective: '1000px' }}>
                        <div className="bg-gradient-to-br from-[#e65100] via-[#f57c00] to-[#ffb74d] p-6 min-h-[220px] flex flex-col justify-between relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
                            style={{ transformStyle: 'preserve-3d' }}>
                            <div className="absolute top-[-15px] left-[-15px] w-[100px] h-[100px] rounded-full bg-white/10 blur-sm"
                                style={{ animation: 'float3d 7s ease-in-out infinite', transform: 'translateZ(35px)' }} />
                            <div className="absolute bottom-[-20px] right-[-20px] w-[90px] h-[90px] rounded-full bg-white/5"
                                style={{ animation: 'float3d 5s ease-in-out infinite reverse', transform: 'translateZ(25px)' }} />
                            <div className="absolute top-1/3 left-[60%] w-[40px] h-[40px] bg-white/10 rounded-full"
                                style={{ animation: 'float3d 6s ease-in-out infinite 0.5s', transform: 'translateZ(45px)' }} />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-white/80 text-[11px] uppercase tracking-[2px] font-medium">Hot</span>
                                </div>
                                <h3 className="text-white text-[24px] font-bold leading-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                                    New <span className="text-[#fff9c4]">Arrivals</span>
                                </h3>
                                <p className="text-white/70 text-[13px] mt-1">Fresh brands just landed</p>
                            </div>
                            <a href="#products" className="inline-flex items-center gap-1 text-white text-[13px] font-bold mt-3 hover:no-underline group/link relative z-10">
                                Explore new
                                <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </a>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                        </div>
                    </div>

                    {/* 3D Banner 3 — Business Credit */}
                    <div className="relative group cursor-pointer overflow-hidden rounded-sm" style={{ perspective: '1000px' }}>
                        <div className="bg-gradient-to-br from-[#1b5e20] via-[#2e7d32] to-[#66bb6a] p-6 min-h-[220px] flex flex-col justify-between relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
                            style={{ transformStyle: 'preserve-3d' }}>
                            <div className="absolute top-[-25px] right-[-15px] w-[110px] h-[110px] rounded-full bg-white/10 blur-sm"
                                style={{ animation: 'float3d 6s ease-in-out infinite 0.3s', transform: 'translateZ(30px)' }} />
                            <div className="absolute bottom-[-15px] left-[-25px] w-[70px] h-[70px] rounded-full bg-white/5"
                                style={{ animation: 'float3d 9s ease-in-out infinite reverse', transform: 'translateZ(20px)' }} />
                            <div className="absolute top-[40%] right-[20%] w-[50px] h-[50px] bg-white/10 rounded-lg rotate-12"
                                style={{ animation: 'float3d 4s ease-in-out infinite 0.8s', transform: 'translateZ(50px)' }} />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <Shield className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-white/80 text-[11px] uppercase tracking-[2px] font-medium">Business</span>
                                </div>
                                <h3 className="text-white text-[24px] font-bold leading-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                                    Pay <span className="text-[#c8e6c9]">Later</span>
                                </h3>
                                <p className="text-white/70 text-[13px] mt-1">Credit line up to $50,000</p>
                            </div>
                            <a href="#" className="inline-flex items-center gap-1 text-white text-[13px] font-bold mt-3 hover:no-underline group/link relative z-10">
                                Apply now
                                <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </a>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== DEALS ROW ========== */}
            <section className="container-amz pb-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[15px]">
                    {/* Deal card 1 */}
                    <div className="bg-white p-5 shadow-amz-card">
                        <h2 className="text-[18px] font-bold text-amz-text mb-3">Top Deals on Energy</h2>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            {PRODUCTS.filter(p => p.category === 'Energy Drinks').slice(0, 2).map(p => (
                                <Link key={p.id} href={`/products/${p.id}`} className="block">
                                    <div className="bg-[#f7f7f7] aspect-square p-2 rounded-sm">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                                    </div>
                                </Link>
                            ))}
                            {PRODUCTS.filter(p => p.category === 'Soft Drinks').slice(0, 2).map(p => (
                                <Link key={p.id} href={`/products/${p.id}`} className="block">
                                    <div className="bg-[#f7f7f7] aspect-square p-2 rounded-sm">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <a href="#products" className="text-amz-link text-[13px] hover:text-amz-blue-hover hover:underline">See all deals</a>
                    </div>

                    {/* Deal card 2 */}
                    <div className="bg-white p-5 shadow-amz-card">
                        <h2 className="text-[18px] font-bold text-amz-text mb-3">Best Sellers</h2>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            {PRODUCTS.slice(0, 4).map(p => (
                                <Link key={p.id} href={`/products/${p.id}`} className="block">
                                    <div className="bg-[#f7f7f7] aspect-square p-2 rounded-sm">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <a href="#products" className="text-amz-link text-[13px] hover:text-amz-blue-hover hover:underline">See all</a>
                    </div>

                    {/* Sign in card */}
                    <div className="bg-white p-5 shadow-amz-card flex flex-col">
                        <h2 className="text-[18px] font-bold text-amz-text mb-3">Sign in for the best experience</h2>
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center w-full">
                                <p className="text-[13px] text-amz-text2 mb-4">Get wholesale prices, track orders, and manage your account.</p>
                                <Link href="/auth/login" className="btn-amz block w-full py-2 text-center font-bold hover:no-underline !text-[14px]">
                                    Sign in securely
                                </Link>
                                <p className="text-[11px] text-amz-text2 mt-3">
                                    New to BevMarket?{' '}
                                    <Link href="/auth/register" className="text-amz-link hover:text-amz-blue-hover hover:underline">
                                        Start here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Free Shipping */}
                    <div className="bg-white p-5 shadow-amz-card">
                        <h2 className="text-[18px] font-bold text-amz-text mb-3">Free Shipping $500+</h2>
                        <div className="relative h-[170px] bg-[#f7f7f7] mb-3 overflow-hidden rounded-sm">
                            <img
                                src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=300&h=200"
                                className="w-full h-full object-cover"
                                alt="Bulk deals"
                            />
                        </div>
                        <a href="#products" className="text-amz-link text-[13px] hover:text-amz-blue-hover hover:underline">See shipping details</a>
                    </div>
                </div>
            </section>

            {/* ========== PRODUCTS SECTION ========== */}
            <section id="products" className="container-amz pb-10">
                <div className="flex gap-[15px]">
                    {/* Sidebar */}
                    <aside className="hidden lg:block w-[220px] flex-shrink-0">
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
                    </aside>

                    {/* Products */}
                    <div className="flex-1 min-w-0">
                        {/* Results header */}
                        <div className="bg-white border-b border-[#e7e7e7] px-4 py-[10px] mb-[15px] flex items-center justify-between shadow-amz-card">
                            <div className="text-[14px] text-amz-text">
                                <span className="text-[16px] font-bold">Results</span>
                                {selectedCategories.length > 0 && (
                                    <span className="text-amz-text2 ml-1">in {selectedCategories.join(', ')}</span>
                                )}
                                <span className="text-amz-text2 ml-1">
                                    ({filtered.length} results)
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-[13px] text-amz-text2">Sort by:</label>
                                <select
                                    className="text-[13px] bg-[#f0f2f2] border border-[#D5D9D9] rounded-lg px-2 py-[5px] outline-none cursor-pointer"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="popular">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {filtered.length === 0 ? (
                            <div className="bg-white p-12 text-center shadow-amz-card">
                                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <h3 className="text-[16px] font-bold text-amz-text">No results found</h3>
                                <p className="text-[13px] text-amz-text2">Try different filters or search terms.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[15px]">
                                {filtered.map((product, i) => (
                                    <div key={product.id} className="shadow-amz-card hover:shadow-amz-card-hover transition-shadow">
                                        <ProductCard product={product} index={i} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 3D Animation Keyframes */}
            <style jsx>{`
                @keyframes float3d {
                    0%, 100% { transform: translateY(0px) translateZ(30px); }
                    50% { transform: translateY(-15px) translateZ(50px); }
                }
            `}</style>
        </main>
    );
}
