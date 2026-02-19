'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, Search, ShoppingCart, MapPin, ChevronDown } from 'lucide-react';

const CATEGORIES = [
    { name: 'All Categories', href: '/catalog' },
    { name: 'Soft Drinks', href: '/catalog?category=Soft Drinks' },
    { name: 'Water', href: '/catalog?category=Water' },
    { name: 'Energy Drinks', href: '/catalog?category=Energy Drinks' },
    { name: 'Juice', href: '/catalog?category=Juice' },
    { name: 'Tea & Coffee', href: '/catalog?category=Tea & Coffee' },
];

const SUB_NAV = [
    { label: "Today's Deals", href: '/deals' },
    { label: 'Best Sellers', href: '/catalog' },
    { label: 'New Releases', href: '/catalog' },
    { label: 'Bulk Orders', href: '/catalog' },
    { label: 'Customer Service', href: '#' },
    { label: 'Gift Cards', href: '#' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCat, setSelectedCat] = useState('All');

    return (
        <>
            {/* Main Nav Bar — Amazon Dark */}
            <nav className="bg-[#131921] sticky top-0 z-50">
                <div className="max-w-[1500px] mx-auto px-2 sm:px-4">
                    <div className="flex items-center h-[60px] gap-2 sm:gap-3">
                        {/* Logo */}
                        <Link href="/" className="amz-nav-link flex-shrink-0 flex items-center pt-1">
                            <span className="text-white font-bold text-xl tracking-tight">market</span>
                            <span className="text-[#ff9900] font-bold text-xl">.eg</span>
                        </Link>

                        {/* Deliver to */}
                        <div className="amz-nav-link hidden md:flex items-center gap-1 text-xs flex-shrink-0">
                            <MapPin className="w-4 h-4 text-white" />
                            <div>
                                <span className="text-gray-300 block text-[11px]">Deliver to</span>
                                <span className="text-white font-bold text-sm">Egypt</span>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="flex-1 hidden sm:block">
                            <div className="amz-search-bar">
                                <select
                                    value={selectedCat}
                                    onChange={(e) => setSelectedCat(e.target.value)}
                                    className="hidden md:block"
                                >
                                    {CATEGORIES.map((c) => (
                                        <option key={c.name} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Search MarketPlace"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button aria-label="Search">
                                    <Search className="w-5 h-5 text-[#131921]" />
                                </button>
                            </div>
                        </div>

                        {/* Right side items */}
                        <div className="flex items-center gap-0.5 sm:gap-1">
                            {/* Account */}
                            <Link href="/auth/login" className="amz-nav-link hidden sm:block">
                                <span className="text-[11px] text-gray-300 block">Hello, sign in</span>
                                <span className="text-sm font-bold text-white flex items-center gap-0.5">
                                    Account & Lists <ChevronDown className="w-3 h-3" />
                                </span>
                            </Link>

                            {/* Returns & Orders */}
                            <Link href="/catalog" className="amz-nav-link hidden md:block">
                                <span className="text-[11px] text-gray-300 block">Returns</span>
                                <span className="text-sm font-bold text-white">& Orders</span>
                            </Link>

                            {/* Cart */}
                            <Link href="/catalog" className="amz-nav-link flex items-center gap-1">
                                <div className="relative">
                                    <ShoppingCart className="w-7 h-7 text-white" />
                                    <span className="absolute -top-1 right-0 text-[#ff9900] font-bold text-sm">0</span>
                                </div>
                                <span className="text-white font-bold text-sm hidden sm:block">Cart</span>
                            </Link>

                            {/* Mobile toggle */}
                            <button
                                className="sm:hidden text-white p-2"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sub Nav — Amazon categories bar */}
                <div className="bg-[#232f3e] border-t border-[#3a4553]">
                    <div className="max-w-[1500px] mx-auto px-2 sm:px-4">
                        <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide h-[39px]">
                            <Link href="/catalog" className="amz-nav-link flex items-center gap-1 text-sm font-bold whitespace-nowrap">
                                <Menu className="w-4 h-4" /> All
                            </Link>
                            {SUB_NAV.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="amz-nav-link text-sm whitespace-nowrap"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile search */}
                <div className="sm:hidden bg-[#131921] px-3 pb-2">
                    <div className="amz-search-bar">
                        <input
                            type="text"
                            placeholder="Search MarketPlace"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button aria-label="Search">
                            <Search className="w-5 h-5 text-[#131921]" />
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="sm:hidden bg-white absolute top-full left-0 right-0 z-50 shadow-xl animate-slide-down">
                        <div className="p-4 space-y-1">
                            <Link href="/auth/login" className="block py-2 px-3 text-sm font-bold text-[#111] rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                                Sign In
                            </Link>
                            <div className="border-t my-2" />
                            <p className="px-3 text-xs font-bold text-gray-500 uppercase">Shop By Category</p>
                            {CATEGORIES.slice(1).map((cat) => (
                                <Link
                                    key={cat.name}
                                    href={cat.href}
                                    className="block py-2 px-3 text-sm text-[#111] rounded hover:bg-gray-100"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
