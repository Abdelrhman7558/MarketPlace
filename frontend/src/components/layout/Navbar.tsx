'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingCart, User, ChevronDown, Heart, Zap } from 'lucide-react';
import { useCart } from '@/lib/cart';

const CATEGORIES = [
    { name: 'Soft Drinks', href: '/?category=Soft Drinks', emoji: '🥤' },
    { name: 'Energy Drinks', href: '/?category=Energy Drinks', emoji: '⚡' },
    { name: 'Water', href: '/?category=Water', emoji: '💧' },
    { name: 'Juice', href: '/?category=Juice', emoji: '🍊' },
    { name: 'Tea & Coffee', href: '/?category=Tea %26 Coffee', emoji: '☕' },
    { name: 'Bulk Deals', href: '/?bulk=true', emoji: '📦' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const { items } = useCart();

    const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'shadow-lg' : ''}`}>
            {/* Top announcement bar */}
            <div className="bg-brand-navy text-white text-center py-1.5 text-xs font-medium tracking-wide overflow-hidden">
                <div className="flex items-center justify-center gap-2 animate-fade-in">
                    <Zap className="w-3 h-3 text-brand-orange" />
                    <span>🎉 Free shipping on orders over <strong className="text-brand-orange">$500</strong> — Limited time offer!</span>
                    <Zap className="w-3 h-3 text-brand-orange" />
                </div>
            </div>

            {/* Main Navbar */}
            <div className={`bg-white/95 backdrop-blur-xl border-b border-gray-100 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
                <div className="container-wide flex items-center justify-between gap-4 md:gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-brand-red rounded-xl flex items-center justify-center shadow-glow-orange group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white font-black text-lg">B</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-extrabold text-xl tracking-tight text-brand-navy">
                                Bev<span className="text-brand-orange">Market</span>
                            </span>
                            <span className="block text-[9px] text-text-muted font-medium -mt-1 tracking-wider uppercase">Wholesale Distribution</span>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl hidden md:flex h-12 rounded-2xl overflow-hidden border-2 border-gray-200 focus-within:border-brand-orange focus-within:shadow-glow-orange/20 transition-all duration-300 group">
                        <div className="relative border-r border-gray-200">
                            <select className="h-full bg-gray-50 text-gray-700 text-sm px-4 pr-8 outline-none cursor-pointer hover:bg-gray-100 appearance-none font-medium transition-colors">
                                <option>All Categories</option>
                                <option>Soft Drinks</option>
                                <option>Energy Drinks</option>
                                <option>Water</option>
                                <option>Juice</option>
                                <option>Tea & Coffee</option>
                            </select>
                            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products, brands..."
                            className="flex-1 px-4 text-gray-900 outline-none placeholder:text-gray-400 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="bg-gradient-to-r from-brand-orange to-brand-orange-hover px-6 hover:from-brand-orange-hover hover:to-brand-red transition-all duration-300 text-white font-semibold ripple-effect">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                        {/* Account */}
                        <Link
                            href="/auth/login"
                            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                        >
                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
                                <User className="w-5 h-5 text-gray-500 group-hover:text-brand-orange transition-colors" />
                            </div>
                            <div className="hidden lg:block">
                                <span className="text-[10px] text-gray-500 block leading-none">Welcome</span>
                                <span className="text-sm font-bold text-brand-navy group-hover:text-brand-orange transition-colors">Sign In</span>
                            </div>
                        </Link>

                        {/* Wishlist */}
                        <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-red-50 transition-all duration-200 group relative">
                            <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:fill-red-500 transition-all duration-300" />
                        </button>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="flex items-center gap-2 bg-brand-navy hover:bg-brand-navy-light text-white px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg group relative"
                        >
                            <div className="relative">
                                <ShoppingCart className="w-5 h-5 group-hover:animate-wiggle" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2.5 w-5 h-5 bg-brand-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-in shadow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="hidden sm:inline text-sm font-semibold">Cart</span>
                        </Link>

                        {/* Mobile Menu */}
                        <button
                            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen
                                ? <X className="w-6 h-6 animate-scale-in" />
                                : <Menu className="w-6 h-6" />
                            }
                        </button>
                    </div>
                </div>
            </div>

            {/* Categories Bar */}
            <div className="bg-brand-navy hidden md:block">
                <div className="container-wide">
                    <div className="flex items-center gap-1 overflow-x-auto py-0">
                        {CATEGORIES.map((cat, i) => (
                            <Link
                                key={cat.name}
                                href={cat.href}
                                className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 whitespace-nowrap font-medium group"
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                <span className="group-hover:scale-125 transition-transform duration-200">{cat.emoji}</span>
                                {cat.name}
                            </Link>
                        ))}
                        <div className="ml-auto flex items-center">
                            <Link
                                href="/auth/register"
                                className="text-sm text-brand-orange hover:text-white font-bold px-4 py-2 transition-colors duration-200"
                            >
                                Become a Supplier →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 absolute w-full top-full shadow-2xl animate-slide-down z-50">
                    <div className="p-4 space-y-4">
                        {/* Mobile Search */}
                        <div className="flex h-11 rounded-xl overflow-hidden border-2 border-gray-200 focus-within:border-brand-orange">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="flex-1 px-4 text-gray-900 outline-none text-sm"
                            />
                            <button className="bg-brand-orange px-4">
                                <Search className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Mobile Categories */}
                        <nav className="grid grid-cols-2 gap-2">
                            {CATEGORIES.map((cat, i) => (
                                <Link
                                    key={cat.name}
                                    href={cat.href}
                                    className="flex items-center gap-2 py-3 px-4 bg-gray-50 hover:bg-brand-orange/10 rounded-xl text-gray-700 font-medium text-sm transition-all duration-200 animate-fade-in-up"
                                    style={{ animationDelay: `${i * 50}ms` }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span>{cat.emoji}</span>
                                    {cat.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="pt-2 border-t space-y-2">
                            <Link href="/auth/login" className="block w-full text-center btn-primary text-sm" onClick={() => setIsOpen(false)}>
                                Sign In
                            </Link>
                            <Link href="/auth/register" className="block w-full text-center py-3 text-brand-orange font-bold text-sm" onClick={() => setIsOpen(false)}>
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
