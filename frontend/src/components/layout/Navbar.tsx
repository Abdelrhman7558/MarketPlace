'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, Search, ChevronDown } from 'lucide-react';

const CATEGORIES = [
    { name: 'Soft Drinks', href: '/catalog?category=soft-drinks' },
    { name: 'Water', href: '/catalog?category=water' },
    { name: 'Energy Drinks', href: '/catalog?category=energy-drinks' },
    { name: 'Juice', href: '/catalog?category=juice' },
    { name: 'Tea & Coffee', href: '/catalog?category=tea-coffee' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const catRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (catRef.current && !catRef.current.contains(event.target as Node)) {
                setShowCategories(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            {/* Top Bar */}
            <div className="bg-[#1A1A2E] text-gray-300 text-sm border-b border-[#2A2A4A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-9">
                    <span className="font-medium">B2B Wholesale Marketplace</span>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-[#FF6B00] transition-colors">Help Center</Link>
                        <Link href="/auth/register" className="hover:text-[#FF6B00] transition-colors">Become a Supplier</Link>
                    </div>
                </div>
            </div>

            {/* Main Nav */}
            <nav className="bg-[#0D0D1A] border-b border-[#2A2A4A] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 gap-4">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 flex items-center gap-1">
                            <span className="font-extrabold text-xl text-white">Market</span>
                            <span className="font-extrabold text-xl text-[#FF6B00]">Place</span>
                        </Link>

                        {/* Categories Dropdown */}
                        <div className="relative hidden md:block" ref={catRef}>
                            <button
                                onClick={() => setShowCategories(!showCategories)}
                                className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm font-medium"
                            >
                                <Menu className="w-4 h-4" />
                                Categories
                                <ChevronDown className={`w-3 h-3 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
                            </button>

                            {showCategories && (
                                <div className="absolute top-full mt-2 left-0 bg-[#1A1A2E] border border-[#2A2A4A] rounded-lg shadow-xl py-2 w-52 z-50 animate-slide-in">
                                    {CATEGORIES.map((cat) => (
                                        <Link
                                            key={cat.name}
                                            href={cat.href}
                                            className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-[#2A2A4A] hover:text-[#FF6B00] transition-colors"
                                            onClick={() => setShowCategories(false)}
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-2xl hidden md:flex">
                            <div className="flex w-full">
                                <div className="flex items-center bg-[#1A1A2E] border border-[#2A2A4A] rounded-l-lg px-3 flex-1">
                                    <Search className="w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search products, brands, SKU..."
                                        className="bg-transparent text-white placeholder-gray-500 w-full py-2.5 px-3 text-sm outline-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button className="bg-[#FF6B00] hover:bg-[#E55F00] text-white px-6 rounded-r-lg font-semibold text-sm transition-colors">
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-5">
                            <Link href="/dashboard/super-admin-7bd0" className="hidden md:flex flex-col items-center text-gray-300 hover:text-[#FF6B00] transition-colors">
                                <User className="w-5 h-5" />
                                <span className="text-xs mt-0.5">Account</span>
                            </Link>
                            <Link href="/catalog" className="relative hidden md:flex flex-col items-center text-gray-300 hover:text-[#FF6B00] transition-colors">
                                <ShoppingCart className="w-5 h-5" />
                                <span className="text-xs mt-0.5">Cart</span>
                                <span className="absolute -top-1 -right-2 bg-[#FF6B00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <button
                                className="md:hidden text-white"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-[#1A1A2E] border-t border-[#2A2A4A] animate-slide-in">
                        <div className="px-4 py-3">
                            <div className="flex mb-3">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="bg-[#0D0D1A] border border-[#2A2A4A] text-white placeholder-gray-500 w-full py-2.5 px-3 text-sm outline-none rounded-l-lg"
                                />
                                <button className="bg-[#FF6B00] text-white px-4 rounded-r-lg text-sm font-semibold">Search</button>
                            </div>
                            <div className="space-y-1">
                                {CATEGORIES.map((cat) => (
                                    <Link
                                        key={cat.name}
                                        href={cat.href}
                                        className="block py-2 px-3 text-gray-300 hover:text-[#FF6B00] text-sm rounded-lg hover:bg-[#0D0D1A] transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="border-t border-[#2A2A4A] mt-3 pt-3 flex gap-4">
                                <Link href="/dashboard/super-admin-7bd0" className="flex items-center gap-2 text-gray-300 text-sm" onClick={() => setIsOpen(false)}>
                                    <User className="w-4 h-4" /> Account
                                </Link>
                                <Link href="/catalog" className="flex items-center gap-2 text-gray-300 text-sm" onClick={() => setIsOpen(false)}>
                                    <ShoppingCart className="w-4 h-4" /> Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
