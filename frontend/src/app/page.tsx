'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { PRODUCTS } from '@/lib/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const HERO_SLIDES = [
    {
        title: 'Wholesale Beverages',
        subtitle: 'Up to 40% off on bulk orders',
        bg: 'linear-gradient(135deg, #232f3e 0%, #131921 100%)',
        color: '#ff9900',
    },
    {
        title: 'New Arrivals',
        subtitle: 'Fresh inventory from top brands',
        bg: 'linear-gradient(135deg, #0f4c75 0%, #1b262c 100%)',
        color: '#febd69',
    },
    {
        title: 'Free Shipping',
        subtitle: 'On orders over EGP 500',
        bg: 'linear-gradient(135deg, #2d132c 0%, #1a0c2e 100%)',
        color: '#ff9900',
    },
];

const CATEGORY_CARDS = [
    {
        title: 'Popular in Soft Drinks',
        items: [
            { label: 'Coca-Cola', img: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200&h=200&fit=crop' },
            { label: 'Pepsi', img: 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=200&h=200&fit=crop' },
            { label: 'Sprite', img: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=200&h=200&fit=crop' },
            { label: 'Dr Pepper', img: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=200&h=200&fit=crop' },
        ],
        link: '/catalog?category=Soft Drinks',
    },
    {
        title: 'Top in Energy Drinks',
        items: [
            { label: 'Red Bull', img: 'https://images.unsplash.com/photo-1613915617612-f660234e856c?w=200&h=200&fit=crop' },
            { label: 'Monster', img: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=200&h=200&fit=crop' },
            { label: 'Celsius', img: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=200&h=200&fit=crop' },
            { label: 'Rockstar', img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&h=200&fit=crop' },
        ],
        link: '/catalog?category=Energy Drinks',
    },
    {
        title: 'Water & Hydration',
        items: [
            { label: 'Nestle', img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop' },
            { label: 'Evian', img: 'https://images.unsplash.com/photo-1564419320461-6e1e76266e66?w=200&h=200&fit=crop' },
            { label: 'Fiji', img: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=200&h=200&fit=crop' },
            { label: 'Sparkle', img: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=200&h=200&fit=crop' },
        ],
        link: '/catalog?category=Water',
    },
    {
        title: 'Tea & Coffee',
        items: [
            { label: 'Lipton', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop' },
            { label: 'Nescafe', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop' },
            { label: 'Twinings', img: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=200&h=200&fit=crop' },
            { label: 'Green Tea', img: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=200&h=200&fit=crop' },
        ],
        link: '/catalog?category=Tea & Coffee',
    },
];

export default function Home() {
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#eaeded]">
            {/* Hero Carousel */}
            <div className="amz-hero-carousel relative">
                <div
                    className="slide transition-all duration-700"
                    style={{ background: HERO_SLIDES[slide].bg, minHeight: 420 }}
                >
                    <div className="slide-overlay" />
                    <div className="relative z-10 text-center px-4 py-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            {HERO_SLIDES[slide].title}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8" style={{ color: HERO_SLIDES[slide].color }}>
                            {HERO_SLIDES[slide].subtitle}
                        </p>
                        <Link href="/catalog" className="amz-btn-primary text-base px-8 py-3">
                            Shop now
                        </Link>
                    </div>
                </div>
                <button
                    className="carousel-arrow left"
                    onClick={() => setSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                >
                    <ChevronLeft className="w-10 h-10" />
                </button>
                <button
                    className="carousel-arrow right"
                    onClick={() => setSlide((s) => (s + 1) % HERO_SLIDES.length)}
                >
                    <ChevronRight className="w-10 h-10" />
                </button>
                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {HERO_SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setSlide(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${i === slide ? 'bg-white scale-125' : 'bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Category Cards Grid — overlapping hero */}
            <div className="max-w-[1500px] mx-auto px-3 sm:px-4 -mt-24 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {CATEGORY_CARDS.map((card) => (
                        <div key={card.title} className="amz-category-card">
                            <h2>{card.title}</h2>
                            <div className="cat-grid">
                                {card.items.map((item) => (
                                    <Link key={item.label} href={card.link} className="cat-item">
                                        <img src={item.img} alt={item.label} />
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                            <Link href={card.link} className="see-more">See more</Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Today's Deals */}
            <div className="max-w-[1500px] mx-auto px-3 sm:px-4 mb-6">
                <div className="bg-white p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[21px] font-bold text-[#0f1111]">Today&apos;s Deals</h2>
                        <Link href="/deals" className="amz-link">See all deals</Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {PRODUCTS.slice(0, 6).map((product) => (
                            <Link key={product.id} href={`/products/${product.id}`} className="amz-deal-card block">
                                <img src={product.image} alt={product.name} />
                                <span className="amz-deal-badge mt-1">Up to 23% off</span>
                                <p className="text-xs text-[#565959] mt-1 line-clamp-2">{product.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Popular Products */}
            <div className="max-w-[1500px] mx-auto px-3 sm:px-4 mb-6">
                <div className="bg-white p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[21px] font-bold text-[#0f1111]">Popular Products for B2B</h2>
                        <Link href="/catalog" className="amz-link">See more</Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-px bg-[#e3e6e6]">
                        {PRODUCTS.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Best Sellers */}
            <div className="max-w-[1500px] mx-auto px-3 sm:px-4 mb-6">
                <div className="bg-white p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[21px] font-bold text-[#0f1111]">Best Sellers in Beverages</h2>
                        <Link href="/catalog" className="amz-link">See more</Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-px bg-[#e3e6e6]">
                        {PRODUCTS.slice(0, 6).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Sign In Banner */}
            <div className="max-w-[1500px] mx-auto px-3 sm:px-4 mb-6">
                <div className="bg-white p-6 text-center">
                    <p className="text-[15px] text-[#0f1111] mb-3">Sign in for the best experience</p>
                    <Link href="/auth/login" className="amz-btn-primary text-sm px-12 py-2.5">
                        Sign in securely
                    </Link>
                    <div className="amz-divider" />
                    <p className="text-xs text-[#565959]">New customer? <Link href="/auth/register" className="amz-link">Start here.</Link></p>
                </div>
            </div>

            {/* Footer */}
            <div className="amz-footer-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Back to top
            </div>
            <footer className="amz-footer">
                <div className="max-w-[1500px] mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3>Get to Know Us</h3>
                            <a href="#">About MarketPlace</a>
                            <a href="#">Careers</a>
                            <a href="#">Press Releases</a>
                            <a href="#">MarketPlace Science</a>
                        </div>
                        <div>
                            <h3>Make Money with Us</h3>
                            <a href="#">Sell on MarketPlace</a>
                            <a href="#">Become a Supplier</a>
                            <a href="#">Advertise Your Products</a>
                            <a href="#">Fulfillment by MP</a>
                        </div>
                        <div>
                            <h3>Payment Products</h3>
                            <a href="#">Business Line of Credit</a>
                            <a href="#">Shop with Points</a>
                            <a href="#">Reload Your Balance</a>
                            <a href="#">Currency Converter</a>
                        </div>
                        <div>
                            <h3>Let Us Help You</h3>
                            <a href="#">Your Account</a>
                            <a href="#">Your Orders</a>
                            <a href="#">Shipping Rates</a>
                            <a href="#">Returns & Replacements</a>
                            <a href="#">Help</a>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="amz-footer-bottom">
                <div className="mb-4">
                    <span className="text-white font-bold text-lg">market</span>
                    <span className="text-[#ff9900] font-bold text-lg">.eg</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <a href="#">Conditions of Use</a>
                    <a href="#">Privacy Notice</a>
                    <a href="#">Interest-Based Ads</a>
                </div>
                <p>© 2024–{new Date().getFullYear()} MarketPlace.eg, Inc. or its affiliates</p>
            </div>
        </div>
    );
}
