'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Package, Truck, Shield, Clock, Sparkles, Star, Zap, Award, TrendingUp, Gift } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import { PRODUCTS } from '@/lib/products';

/* ========== DATA ========== */
const HERO_SLIDES = [
    {
        title: 'Premium Beverages\nat Wholesale Prices',
        subtitle: 'Direct access to 500+ brands. Free delivery on orders over $500.',
        cta: 'Shop Now',
        image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2787&auto=format&fit=crop',
    },
    {
        title: 'Energy Drinks\nCollection',
        subtitle: 'Red Bull, Monster, and more — available in bulk with exclusive discounts.',
        cta: 'Explore Energy',
        image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=2787&auto=format&fit=crop',
    },
    {
        title: 'Summer Ready\nStock Up Now',
        subtitle: 'Beat the rush — up to 30% off on soft drinks, water & juices.',
        cta: 'See Deals',
        image: 'https://images.unsplash.com/photo-1581098361633-15fb886efc90?q=80&w=2787&auto=format&fit=crop',
    },
];

const CATEGORY_CARDS = [
    { title: 'Soft Drinks', image: 'https://images.unsplash.com/photo-1581098361633-15fb886efc90?auto=format&fit=crop&q=80&w=300&h=300', link: 'Soft Drinks', emoji: '🥤' },
    { title: 'Energy Drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=300&h=300', link: 'Energy Drinks', emoji: '⚡' },
    { title: 'Water & Sparkling', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=300&h=300', link: 'Water', emoji: '💧' },
    { title: 'Juice & Smoothies', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=300&h=300', link: 'Juice', emoji: '🍊' },
];

const STATS = [
    { value: '500+', label: 'Products', icon: Package },
    { value: '10K+', label: 'Happy Customers', icon: Star },
    { value: '24/7', label: 'Support', icon: Clock },
    { value: '99%', label: 'Satisfaction', icon: Award },
];

const MARQUEE_ITEMS = [
    '🔥 Flash Sale: 20% off Energy Drinks — Today Only',
    '🚚 FREE Shipping on orders over $500',
    '⭐ New: Monster Energy Ultra just arrived',
    '💎 Business Credit Line — Apply Now',
    '🎁 First Order? Get 15% off with code WELCOME15',
    '📦 Bulk orders available — Contact us for custom pricing',
];

/* ========== SCROLL REVEAL HOOK ========== */
function useScrollReveal() {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
        elements.forEach((el) => observerRef.current?.observe(el));

        return () => observerRef.current?.disconnect();
    }, []);
}

/* ========== COMPONENT ========== */
export default function Home() {
    const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('popular');
    const [heroSlide, setHeroSlide] = useState(0);
    const [heroTextAnim, setHeroTextAnim] = useState(true);

    useScrollReveal();

    // Hero auto-slide
    useEffect(() => {
        const timer = setInterval(() => {
            setHeroTextAnim(false);
            setTimeout(() => {
                setHeroSlide((s) => (s + 1) % HERO_SLIDES.length);
                setHeroTextAnim(true);
            }, 200);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const changeSlide = useCallback((dir: number) => {
        setHeroTextAnim(false);
        setTimeout(() => {
            setHeroSlide((s) => (s + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
            setHeroTextAnim(true);
        }, 200);
    }, []);

    const allBrands = Array.from(new Set(PRODUCTS.map(p => p.brand)));
    const allCategories = Array.from(new Set(PRODUCTS.map(p => p.category)));

    const toggleBrand = (brand: string) => setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    const toggleCategory = (category: string) => setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);

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
            {/* ========== MARQUEE ANNOUNCEMENT BAR ========== */}
            <div className="bg-amz-dark text-white overflow-hidden py-[6px] relative">
                <div className="marquee-track">
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                        <span key={i} className="text-[12px] mx-8 whitespace-nowrap flex items-center gap-1">
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* ========== HERO CAROUSEL ========== */}
            <section className="relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #232f3e 65%, #EAEDED 35%)' }}>
                <div className="relative h-[300px] sm:h-[400px] md:h-[480px] overflow-hidden">
                    {/* Background Images */}
                    {HERO_SLIDES.map((slide, i) => (
                        <div
                            key={i}
                            className="absolute inset-0 transition-all duration-1000 ease-in-out"
                            style={{
                                opacity: i === heroSlide ? 1 : 0,
                                transform: i === heroSlide ? 'scale(1)' : 'scale(1.05)',
                            }}
                        >
                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#EAEDED] via-transparent to-transparent" />
                        </div>
                    ))}

                    {/* Hero Text — Animated */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="container-amz">
                            <div
                                className="max-w-lg transition-all duration-500 ease-out"
                                style={{
                                    opacity: heroTextAnim ? 1 : 0,
                                    transform: heroTextAnim ? 'translateY(0)' : 'translateY(20px)',
                                }}
                            >
                                <h1 className="text-white text-[28px] sm:text-[38px] md:text-[44px] font-bold leading-[1.15] mb-4 drop-shadow-lg whitespace-pre-line">
                                    {HERO_SLIDES[heroSlide].title}
                                </h1>
                                <p className="text-gray-200 text-[15px] sm:text-[17px] mb-6 drop-shadow max-w-md">
                                    {HERO_SLIDES[heroSlide].subtitle}
                                </p>
                                <a
                                    href="#products"
                                    className="inline-flex items-center gap-2 btn-amz !py-[12px] !px-8 !text-[15px] font-bold hover:no-underline group"
                                >
                                    {HERO_SLIDES[heroSlide].cta}
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Nav Arrows */}
                    <button
                        onClick={() => changeSlide(-1)}
                        className="absolute left-0 top-0 bottom-[120px] w-[60px] flex items-center justify-center text-white/40 hover:text-white transition-all bg-transparent hover:bg-white/5 group"
                    >
                        <ChevronLeft className="w-10 h-10 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={() => changeSlide(1)}
                        className="absolute right-0 top-0 bottom-[120px] w-[60px] flex items-center justify-center text-white/40 hover:text-white transition-all bg-transparent hover:bg-white/5 group"
                    >
                        <ChevronRight className="w-10 h-10 group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-[130px] left-1/2 -translate-x-1/2 flex gap-2">
                        {HERO_SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { setHeroTextAnim(false); setTimeout(() => { setHeroSlide(i); setHeroTextAnim(true); }, 200); }}
                                className={`h-[4px] rounded-full transition-all duration-500 ${i === heroSlide ? 'bg-amz-orange w-8' : 'bg-white/40 w-4 hover:bg-white/60'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Overlapping Category Cards */}
                <div className="container-amz relative -mt-[100px] z-10 grid grid-cols-2 md:grid-cols-4 gap-4 pb-5 stagger-children visible">
                    {CATEGORY_CARDS.map((cat, i) => (
                        <div key={cat.title} className="amz-card shadow-amz-card img-zoom cursor-pointer group" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[22px]">{cat.emoji}</span>
                                <h2 className="!text-[17px]">{cat.title}</h2>
                            </div>
                            <div
                                className="aspect-square bg-[#f7f7f7] mb-3 rounded-sm overflow-hidden"
                                onClick={() => {
                                    setSelectedCategories([cat.link]);
                                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedCategories([cat.link]);
                                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="text-amz-link text-[13px] hover:text-amz-blue-hover hover:underline flex items-center gap-1 group/link"
                            >
                                Shop now
                                <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========== STATS BAR ========== */}
            <section className="bg-white border-y border-[#ddd] reveal">
                <div className="container-amz py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {STATS.map((stat, i) => (
                            <div key={i} className="flex items-center gap-3 group" style={{ animationDelay: `${i * 150}ms` }}>
                                <div className="w-12 h-12 rounded-full bg-amz-dark2 flex items-center justify-center group-hover:bg-amz-orange transition-colors duration-300 group-hover:scale-110 transform">
                                    <stat.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-[22px] font-bold text-amz-text leading-tight gradient-text">{stat.value}</p>
                                    <p className="text-[12px] text-amz-text2">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== 3D PREMIUM AD BANNERS ========== */}
            <section className="container-amz py-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children reveal">
                    {/* Banner 1 — Bulk Savings */}
                    <div className="relative group cursor-pointer overflow-hidden rounded-md" style={{ perspective: '1000px' }}>
                        <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565c0] to-[#42a5f5] p-6 min-h-[230px] flex flex-col justify-between relative overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl"
                            style={{ transformStyle: 'preserve-3d' }}>
                            <div className="absolute top-[-20px] right-[-20px] w-[120px] h-[120px] rounded-full bg-white/10 blur-sm animate-float" />
                            <div className="absolute bottom-[-30px] left-[-10px] w-[80px] h-[80px] rounded-full bg-white/5 animate-float-slow" />
                            <div className="absolute top-1/2 right-10 w-[60px] h-[60px] bg-white/5 rounded-lg rotate-45 animate-float" style={{ animationDelay: '1s' }} />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm animate-pulse-soft">
                                        <Truck className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-white/80 text-[11px] uppercase tracking-[2px] font-medium">Bulk Order</span>
                                </div>
                                <h3 className="text-white text-[26px] font-bold leading-tight mt-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                                    Save up to <span className="text-[#ffeb3b]">30%</span>
                                </h3>
                                <p className="text-white/70 text-[13px] mt-1">On orders over $500</p>
                            </div>
                            <a href="#products" className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[13px] font-bold mt-3 px-4 py-2 rounded-full hover:bg-white/30 hover:no-underline transition-all w-fit group/link relative z-10">
                                Shop bulk deals
                                <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </a>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                        </div>
                    </div>

                    {/* Banner 2 — New Arrivals */}
                    <div className="relative group cursor-pointer overflow-hidden rounded-md" style={{ perspective: '1000px' }}>
                        <div className="bg-gradient-to-br from-[#e65100] via-[#f57c00] to-[#ffb74d] p-6 min-h-[230px] flex flex-col justify-between relative overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl"
                            style={{ transformStyle: 'preserve-3d' }}>
                            <div className="absolute top-[-15px] left-[-15px] w-[100px] h-[100px] rounded-full bg-white/10 blur-sm animate-float-slow" />
                            <div className="absolute bottom-[-20px] right-[-20px] w-[90px] h-[90px] rounded-full bg-white/5 animate-float" />
                            <div className="absolute top-1/3 left-[60%] w-[40px] h-[40px] bg-white/10 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm animate-pulse-soft">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-white/80 text-[11px] uppercase tracking-[2px] font-medium">Hot</span>
                                </div>
                                <h3 className="text-white text-[26px] font-bold leading-tight mt-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                                    New <span className="text-[#fff9c4]">Arrivals</span>
                                </h3>
                                <p className="text-white/70 text-[13px] mt-1">Fresh brands just landed</p>
                            </div>
                            <a href="#products" className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[13px] font-bold mt-3 px-4 py-2 rounded-full hover:bg-white/30 hover:no-underline transition-all w-fit group/link relative z-10">
                                Explore new
                                <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </a>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                        </div>
                    </div>

                    {/* Banner 3 — Business Credit */}
                    <div className="relative group cursor-pointer overflow-hidden rounded-md" style={{ perspective: '1000px' }}>
                        <div className="bg-gradient-to-br from-[#1b5e20] via-[#2e7d32] to-[#66bb6a] p-6 min-h-[230px] flex flex-col justify-between relative overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl"
                            style={{ transformStyle: 'preserve-3d' }}>
                            <div className="absolute top-[-25px] right-[-15px] w-[110px] h-[110px] rounded-full bg-white/10 blur-sm animate-float" style={{ animationDelay: '0.3s' }} />
                            <div className="absolute bottom-[-15px] left-[-25px] w-[70px] h-[70px] rounded-full bg-white/5 animate-float-slow" />
                            <div className="absolute top-[40%] right-[20%] w-[50px] h-[50px] bg-white/10 rounded-lg rotate-12 animate-float" style={{ animationDelay: '0.8s' }} />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm animate-pulse-soft">
                                        <Shield className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-white/80 text-[11px] uppercase tracking-[2px] font-medium">Business</span>
                                </div>
                                <h3 className="text-white text-[26px] font-bold leading-tight mt-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                                    Pay <span className="text-[#c8e6c9]">Later</span>
                                </h3>
                                <p className="text-white/70 text-[13px] mt-1">Credit line up to $50,000</p>
                            </div>
                            <a href="#products" className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[13px] font-bold mt-3 px-4 py-2 rounded-full hover:bg-white/30 hover:no-underline transition-all w-fit group/link relative z-10">
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children reveal">
                    {/* Deal card 1 */}
                    <div className="amz-card shadow-amz-card group img-zoom">
                        <h2 className="!text-[17px]">⚡ Top Deals on Energy</h2>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            {PRODUCTS.filter(p => p.category === 'Energy Drinks').slice(0, 2).map(p => (
                                <Link key={p.id} href={`/products/${p.id}`} className="block hover:no-underline">
                                    <div className="bg-[#f7f7f7] aspect-square p-2 rounded-sm overflow-hidden">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-contain hover:scale-110 transition-transform duration-300" />
                                    </div>
                                </Link>
                            ))}
                            {PRODUCTS.filter(p => p.category === 'Soft Drinks').slice(0, 2).map(p => (
                                <Link key={p.id} href={`/products/${p.id}`} className="block hover:no-underline">
                                    <div className="bg-[#f7f7f7] aspect-square p-2 rounded-sm overflow-hidden">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-contain hover:scale-110 transition-transform duration-300" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <a href="#products" className="text-amz-link text-[13px] hover:text-amz-blue-hover hover:underline flex items-center gap-1 group/link">
                            See all deals <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Deal card 2 */}
                    <div className="amz-card shadow-amz-card group img-zoom">
                        <h2 className="!text-[17px]">🏆 Best Sellers</h2>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            {PRODUCTS.slice(0, 4).map(p => (
                                <Link key={p.id} href={`/products/${p.id}`} className="block hover:no-underline">
                                    <div className="bg-[#f7f7f7] aspect-square p-2 rounded-sm overflow-hidden">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-contain hover:scale-110 transition-transform duration-300" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <a href="#products" className="text-amz-link text-[13px] hover:text-amz-blue-hover hover:underline flex items-center gap-1 group/link">
                            See all <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Sign in card  */}
                    <div className="amz-card shadow-amz-card flex flex-col group">
                        <h2 className="!text-[17px]">🔐 Sign in for the best experience</h2>
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center w-full">
                                <div className="w-16 h-16 mx-auto mb-3 bg-amz-dark2 rounded-full flex items-center justify-center group-hover:bg-amz-orange transition-colors duration-500 group-hover:scale-110 transform">
                                    <Zap className="w-7 h-7 text-white" />
                                </div>
                                <p className="text-[13px] text-amz-text2 mb-4">Wholesale prices, order tracking & more.</p>
                                <Link href="/auth/login" className="btn-amz block w-full py-2 text-center font-bold hover:no-underline !text-[14px]">
                                    Sign in securely
                                </Link>
                                <p className="text-[11px] text-amz-text2 mt-3">
                                    New? <Link href="/auth/register" className="text-amz-link hover:text-amz-blue-hover hover:underline">Start here</Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Free Shipping */}
                    <div className="amz-card shadow-amz-card group">
                        <h2 className="!text-[17px]">🚚 Free Shipping $500+</h2>
                        <div className="relative h-[170px] bg-[#f7f7f7] mb-3 overflow-hidden rounded-sm">
                            <img
                                src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=300&h=200"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                alt="Bulk deals"
                            />
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                                <p className="text-white text-[12px] font-bold">Fast & reliable delivery</p>
                            </div>
                        </div>
                        <a href="#products" className="text-amz-link text-[13px] hover:text-amz-blue-hover hover:underline flex items-center gap-1 group/link">
                            See details <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ========== TRENDING BANNER ========== */}
            <section className="container-amz pb-5 reveal">
                <div className="bg-gradient-to-r from-amz-dark via-amz-dark2 to-amz-dark rounded-md p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-amz-orange/10 rounded-full blur-3xl animate-pulse-soft" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-14 h-14 rounded-full bg-amz-orange/20 flex items-center justify-center animate-pulse-soft">
                            <TrendingUp className="w-7 h-7 text-amz-orange" />
                        </div>
                        <div>
                            <h3 className="text-white text-[20px] font-bold">Trending This Week</h3>
                            <p className="text-gray-400 text-[13px]">Monster Energy, Coca-Cola Zero & Tropicana are flying off the shelves</p>
                        </div>
                    </div>
                    <a href="#products" className="btn-amz !py-3 !px-6 !text-[14px] font-bold hover:no-underline relative z-10 flex items-center gap-2 group whitespace-nowrap">
                        <Gift className="w-4 h-4" />
                        See trending
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </section>

            {/* ========== PRODUCTS SECTION ========== */}
            <section id="products" className="container-amz pb-10">
                <div className="flex gap-4">
                    {/* Sidebar */}
                    <aside className="hidden lg:block w-[220px] flex-shrink-0 reveal-left">
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
                    <div className="flex-1 min-w-0 reveal-right">
                        {/* Results header */}
                        <div className="bg-white border border-[#d5d9d9] rounded-[4px] px-4 py-3 mb-4 flex items-center justify-between">
                            <div className="text-[14px] text-amz-text">
                                <span className="text-[18px] font-bold">Results</span>
                                {selectedCategories.length > 0 && (
                                    <span className="text-amz-text2 ml-2">
                                        in <span className="font-medium text-amz-text">{selectedCategories.join(', ')}</span>
                                    </span>
                                )}
                                <span className="text-amz-text2 ml-1">
                                    — {filtered.length} item{filtered.length !== 1 && 's'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-[13px] text-amz-text2 hidden sm:block">Sort by:</label>
                                <select
                                    className="text-[13px] bg-[#f0f2f2] border border-[#D5D9D9] rounded-lg px-2 py-[5px] outline-none cursor-pointer hover:bg-[#e3e6e6] transition-colors"
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
                            <div className="bg-white p-12 text-center shadow-amz-card rounded-[4px] animate-fade-in">
                                <Package className="w-14 h-14 text-gray-300 mx-auto mb-3 animate-bounce-in" />
                                <h3 className="text-[16px] font-bold text-amz-text">No results found</h3>
                                <p className="text-[13px] text-amz-text2 mt-1">Try different filters or search terms.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filtered.map((product, i) => (
                                    <div
                                        key={product.id}
                                        className="product-card-animate shadow-amz-card rounded-[4px] overflow-hidden"
                                        style={{ animationDelay: `${i * 50}ms` }}
                                    >
                                        <ProductCard product={product} index={i} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
