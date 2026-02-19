'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, ShoppingCart, User, Package, ChevronDown, MapPin } from 'lucide-react';

const CATEGORIES = [
    { name: 'Soft Drinks', href: '/catalog?category=soft-drinks' },
    { name: 'Energy Drinks', href: '/catalog?category=energy-drinks' },
    { name: 'Water', href: '/catalog?category=water' },
    { name: 'Juices', href: '/catalog?category=juices' },
    { name: 'Tea & Coffee', href: '/catalog?category=tea-coffee' },
    { name: 'Bulk Offers', href: '/catalog?category=bulk' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');

    return (
        <header className="flex flex-col sticky top-0 z-50 shadow-soft">
            {/* Top Bar - Main Navigation */}
            <div className="bg-brand-navy text-white py-3">
                <div className="container-wide flex items-center justify-between gap-4 md:gap-8">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-opacity">
                        <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-bold text-xl tracking-tight">Market<span className="text-brand-orange">Place</span></span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Wholesale B2B</span>
                        </div>
                    </Link>

                    {/* Deliver To Location (Desktop) */}
                    <div className="hidden lg:flex flex-col leading-tight hover:outline hover:outline-1 hover:outline-white p-2 rounded cursor-pointer">
                        <span className="text-xs text-gray-300 ml-5 block">Deliver to</span>
                        <div className="flex items-center gap-1 font-bold text-sm">
                            <MapPin className="w-4 h-4 text-white" />
                            <span>Cairo, Egypt</span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-3xl hidden md:flex h-10 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-orange transition-all shadow-sm">
                        <button className="bg-gray-100 text-text-primary px-3 text-xs border-r border-gray-300 hover:bg-gray-200 transition-colors flex items-center gap-1">
                            {category} <ChevronDown className="w-3 h-3" />
                        </button>
                        <input
                            type="text"
                            placeholder="Search for bulk drinks, cartons, brands..."
                            className="flex-1 px-4 text-text-primary outline-none placeholder:text-text-muted"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="bg-brand-orange px-5 hover:bg-brand-orange-hover transition-colors">
                            <Search className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
                        {/* Account */}
                        <Link href="/auth/login" className="hidden md:flex flex-col leading-tight hover:outline hover:outline-1 hover:outline-white p-2 rounded cursor-pointer">
                            <span className="text-xs text-gray-300">Hello, Sign in</span>
                            <div className="flex items-center gap-0.5 font-bold text-sm">
                                <span>Account & Lists</span>
                                <ChevronDown className="w-3 h-3" />
                            </div>
                        </Link>

                        {/* Orders */}
                        <Link href="/orders" className="hidden md:flex flex-col leading-tight hover:outline hover:outline-1 hover:outline-white p-2 rounded cursor-pointer">
                            <span className="text-xs text-gray-300">Returns</span>
                            <span className="font-bold text-sm">& Orders</span>
                        </Link>

                        {/* Cart */}
                        <Link href="/cart" className="flex items-end gap-1 hover:outline hover:outline-1 hover:outline-white p-2 rounded group">
                            <div className="relative">
                                <ShoppingCart className="w-8 h-8 group-hover:animate-bounce-scale" />
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-brand-navy">
                                    0
                                </span>
                            </div>
                            <span className="font-bold text-sm mb-1 hidden sm:block">Cart</span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-white"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Categories Navigation */}
            <div className="bg-brand-blue text-white py-2 hidden md:block border-t border-white/10">
                <div className="container-wide flex items-center gap-6 text-sm font-medium overflow-x-auto no-scrollbar">
                    <button className="flex items-center gap-1 hover:text-brand-orange transition-colors whitespace-nowrap">
                        <Menu className="w-4 h-4" /> All
                    </button>
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.name}
                            href={cat.href}
                            className="hover:text-brand-orange transition-colors whitespace-nowrap"
                        >
                            {cat.name}
                        </Link>
                    ))}
                    <Link href="/deals" className="hover:text-brand-orange transition-colors whitespace-nowrap ml-auto font-bold text-brand-orange">
                        Today's Deals
                    </Link>
                    <Link href="/dashboard/supplier" className="hover:text-brand-orange transition-colors whitespace-nowrap">
                        Supplier Dashboard
                    </Link>
                </div>
            </div>

            {/* Mobile Menu & Search */}
            {isOpen && (
                <div className="bg-white border-t border-gray-200 md:hidden animate-fade-in absolute w-full top-full shadow-lg">
                    <div className="p-4 space-y-4">
                        <div className="flex h-10 rounded-lg overflow-hidden border border-gray-300 focus-within:border-brand-orange">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="flex-1 px-4 text-text-primary outline-none"
                            />
                            <button className="bg-brand-orange px-4">
                                <Search className="w-5 h-5 text-white" />
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-2">
                            {CATEGORIES.map((cat) => (
                                <Link
                                    key={cat.name}
                                    href={cat.href}
                                    className="py-2 px-3 hover:bg-gray-50 rounded-lg text-text-primary font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                            <hr className="my-2" />
                            <Link href="/auth/login" className="py-2 px-3 text-brand-orange font-bold">Sign In</Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
