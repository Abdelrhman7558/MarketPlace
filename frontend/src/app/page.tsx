'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Truck, ShieldCheck, CreditCard, Star, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { PRODUCTS } from '@/lib/products';

const HERO_SLIDES = [
    {
        title: "Wholesale Beverages for Your Business",
        subtitle: "Direct from top suppliers. Bulk discounts up to 40%.",
        cta: "Shop Bulk Deals",
        image: "https://images.unsplash.com/photo-1597484662317-c9253e602519?q=80&w=1974&auto=format&fit=crop", // Soft drinks
        color: "bg-brand-navy"
    },
    {
        title: "Premium Energy Drinks Stock",
        subtitle: "Power up your inventory with Red Bull, Monster & more.",
        cta: "Explore Energy",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop", // Energy drinks
        color: "bg-orange-600"
    }
];

const CATEGORIES = [
    { name: 'Soft Drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500', href: '/catalog?category=soft-drinks' },
    { name: 'Energy Drinks', image: 'https://images.unsplash.com/photo-1581006152336-d760775d79cc?w=500', href: '/catalog?category=energy' },
    { name: 'Water & Sparkling', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500', href: '/catalog?category=water' },
    { name: 'Juices & Nectars', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500', href: '/catalog?category=juices' },
    { name: 'Tea & Coffee', image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=500', href: '/catalog?category=tea-coffee' },
    { name: 'Snacks & Sweets', image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=500', href: '/catalog?category=snacks' },
];

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-rotate hero slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-brand-navy">
                {HERO_SLIDES.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 z-20 container-wide flex flex-col justify-center text-white p-6 md:p-12">
                            <span className="inline-block bg-brand-orange text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 w-fit animate-fade-in">
                                B2B Exclusive
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold max-w-2xl leading-tight mb-4 animate-slide-in-right">
                                {slide.title}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-8 animate-fade-in delay-100">
                                {slide.subtitle}
                            </p>
                            <Link
                                href="/catalog"
                                className="bg-brand-orange hover:bg-brand-orange-hover text-white font-bold px-8 py-3.5 rounded-lg w-fit transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 animate-bounce-scale delay-200"
                            >
                                {slide.cta} <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                ))}
            </section>

            {/* Featured Categories Grid (Offset Overlap) */}
            <section className="container-wide -mt-16 relative z-30 mb-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.name}
                            href={cat.href}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-4 flex flex-col items-center text-center group hover:-translate-y-1 border border-transparent hover:border-brand-orange/30"
                        >
                            <div className="w-16 h-16 rounded-full bg-gray-50 mb-3 overflow-hidden group-hover:scale-105 transition-transform">
                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-bold text-brand-navy text-sm group-hover:text-brand-orange transition-colors">
                                {cat.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="container-wide mb-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { icon: Truck, title: "Fast Delivery", desc: "Next-day shipping across Egypt" },
                        { icon: ShieldCheck, title: "Verified Suppliers", desc: "100% authentic products" },
                        { icon: CreditCard, title: "Secure Payments", desc: "Cash on delivery or online" },
                        { icon: Clock, title: "24/7 Support", desc: "Dedicated account managers" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="p-3 bg-brand-orange/10 rounded-lg text-brand-orange">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-navy mb-1">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="container-wide mb-20">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-brand-navy">Best Sellers</h2>
                        <p className="text-gray-500 mt-1">Top rated products by other businesses</p>
                    </div>
                    <Link href="/catalog" className="text-brand-orange font-bold hover:underline flex items-center gap-1">
                        View All <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {PRODUCTS.slice(0, 5).map((product) => (
                        <div key={product.id} className="h-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>

            {/* New Arrivals Banner */}
            <section className="container-wide mb-20">
                <div className="bg-brand-navy rounded-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/20 to-transparent" />
                    <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12 relative z-10">
                        <div className="text-white">
                            <span className="text-brand-orange font-bold tracking-wider text-sm uppercase mb-2 block">New Arrivals</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stock Up on Summer Refreshments</h2>
                            <p className="text-gray-300 mb-8 max-w-md">Get ready for the season with our latest collection of juices, iced teas, and sparkling water. Bulk discounts available.</p>
                            <Link href="/catalog?category=summer" className="bg-white text-brand-navy hover:bg-gray-100 font-bold px-8 py-3 rounded-lg shadow-lg transition-colors inline-block">
                                Shop Collection
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            {/* Abstract visual/image would go here */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm animate-float">
                                    <div className="h-40 bg-gray-200/20 rounded-lg w-full"></div>
                                </div>
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm animate-float delay-500 mt-8">
                                    <div className="h-40 bg-gray-200/20 rounded-lg w-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recommended For You */}
            <section className="container-wide mb-20">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-brand-navy">Recommended For You</h2>
                        <p className="text-gray-500 mt-1">Based on your recent views</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {PRODUCTS.slice(5, 10).map((product) => (
                        <div key={product.id} className="h-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer Call to Action */}
            <section className="bg-brand-orange py-16 text-center text-white">
                <div className="container-wide max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
                    <p className="text-lg opacity-90 mb-8">Join thousands of retailers and restaurants sourcing their beverages through MarketPlace.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/auth/register" className="bg-brand-navy hover:bg-brand-navy/90 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-all">
                            Create Free Account
                        </Link>
                        <Link href="/contact" className="bg-white hover:bg-gray-50 text-brand-orange font-bold px-8 py-3 rounded-lg shadow-lg transition-all">
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
