'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, ShoppingCart, MapPin, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useAuth } from '../../lib/auth';

const NAV_ITEMS = [
    { name: 'All', href: '/#products' },
    { name: "Today's Deals", href: '/deals/' },
    { name: 'Bulk Orders', href: '/#products' },
    { name: 'Customer Service', href: '/#products' },
    { name: 'New Arrivals', href: '/#products' },
    { name: 'Best Sellers', href: '/#products' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCategory, setSearchCategory] = useState('All');
    const { items } = useCart();
    const { user, logout } = useAuth();
    const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            // Scroll to products and the Navbar search filters will apply
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="sticky top-0 z-50">
            {/* === MAIN DARK NAV === */}
            <div className="bg-amz-dark">
                <div className="container-amz flex items-center h-[60px] gap-2">
                    {/* Logo */}
                    <Link href="/" className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded-sm flex-shrink-0">
                        <span className="text-white font-bold text-[20px] leading-none">
                            Bev<span className="text-amz-orange">Market</span>
                        </span>
                        <span className="text-gray-400 text-[10px] ml-0.5 self-end">.eg</span>
                    </Link>

                    {/* Deliver to */}
                    <div className="hidden lg:flex items-center px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer flex-shrink-0">
                        <MapPin className="w-4 h-4 text-white mr-1" />
                        <div>
                            <span className="text-gray-400 text-[11px] block leading-tight">Deliver to</span>
                            <span className="text-white text-[13px] font-bold leading-tight">Egypt</span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 flex h-[40px] rounded-md overflow-hidden">
                        <select
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            className="hidden md:block bg-[#E6E6E6] text-[#555] text-[12px] pl-2 pr-6 border-r border-gray-300 outline-none cursor-pointer rounded-l-md"
                        >
                            <option>All</option>
                            <option>Soft Drinks</option>
                            <option>Energy Drinks</option>
                            <option>Water</option>
                            <option>Juice</option>
                            <option>Tea & Coffee</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search BevMarket"
                            className="flex-1 px-3 text-[15px] text-amz-text outline-none bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button onClick={handleSearch} className="bg-amz-orange hover:bg-amz-orange2 px-4 flex items-center justify-center rounded-r-md">
                            <Search className="w-5 h-5 text-amz-dark" />
                        </button>
                    </div>

                    {/* Account */}
                    <div className="hidden md:flex flex-col px-2 py-1 border border-transparent hover:border-white rounded-sm flex-shrink-0 relative group">
                        {user ? (
                            <>
                                <div className="cursor-pointer">
                                    <span className="text-gray-300 text-[11px] leading-tight">Hello, {user.name}</span>
                                    <span className="text-white text-[13px] font-bold leading-tight flex items-center">
                                        Account & Lists
                                        <ChevronDown className="w-3 h-3 ml-0.5" />
                                    </span>
                                </div>
                                {/* Dropdown */}
                                <div className="absolute top-full right-0 w-48 bg-white rounded-md shadow-lg py-2 hidden group-hover:block text-black z-50">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-xs text-gray-500">Signed in as</p>
                                        <p className="text-sm font-bold truncate">{user.email}</p>
                                    </div>
                                    <Link href={user.role === 'admin' ? "/dashboard/super-admin-7bd0" : "/dashboard/buyer"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Dashboard
                                    </Link>
                                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Your Profile
                                    </Link>
                                    <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Your Orders
                                    </Link>
                                    <div className="border-t border-gray-100 mt-1 pt-1">
                                        <button
                                            onClick={() => logout()}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Link href="/auth/login">
                                <span className="text-gray-300 text-[11px] leading-tight">Hello, sign in</span>
                                <span className="text-white text-[13px] font-bold leading-tight flex items-center">
                                    Account & Lists
                                    <ChevronDown className="w-3 h-3 ml-0.5" />
                                </span>
                            </Link>
                        )}
                    </div>

                    {/* Returns & Orders */}
                    <Link href={user ? "/orders" : "/auth/login"} className="hidden md:flex flex-col px-2 py-1 border border-transparent hover:border-white rounded-sm flex-shrink-0">
                        <span className="text-gray-300 text-[11px] leading-tight">Returns</span>
                        <span className="text-white text-[13px] font-bold leading-tight">& Orders</span>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded-sm flex-shrink-0">
                        <div className="relative">
                            <ShoppingCart className="w-8 h-8 text-white" />
                            <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-amz-orange font-bold text-[16px]">
                                {cartCount}
                            </span>
                        </div>
                        <span className="text-white text-[13px] font-bold ml-0.5 hidden sm:inline">Cart</span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-1 border border-transparent hover:border-white rounded-sm text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* === BOTTOM NAV BAR === */}
            <div className="bg-amz-dark2">
                <div className="container-amz">
                    <div className="flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                        <Link
                            href="/#products"
                            className="flex items-center gap-1 text-white text-[13px] font-bold px-2 py-[6px] border border-transparent hover:border-white rounded-sm whitespace-nowrap hover:no-underline"
                        >
                            <Menu className="w-5 h-5" />
                            All
                        </Link>
                        {NAV_ITEMS.slice(1).map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-white text-[13px] px-2 py-[6px] border border-transparent hover:border-white rounded-sm whitespace-nowrap hover:no-underline"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/auth/register"
                            className="text-white text-[13px] font-bold px-2 py-[6px] border border-transparent hover:border-white rounded-sm whitespace-nowrap ml-auto hover:no-underline"
                        >
                            Become a Supplier
                        </Link>
                    </div>
                </div>
            </div>

            {/* === MOBILE MENU === */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-300 shadow-lg absolute w-full top-full z-50">
                    <div className="p-4 space-y-3">
                        <div className="flex h-10 rounded overflow-hidden border border-gray-300">
                            <input
                                type="text"
                                placeholder="Search BevMarket"
                                className="flex-1 px-3 text-sm outline-none"
                            />
                            <button className="bg-amz-orange px-3">
                                <Search className="w-5 h-5 text-amz-dark" />
                            </button>
                        </div>
                        <nav className="space-y-1">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block py-2 px-3 text-amz-text text-[14px] hover:bg-gray-100 rounded hover:no-underline"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="border-t pt-3">
                            {user ? (
                                <div className="space-y-2">
                                    <div className="px-3 py-2 bg-gray-50 rounded">
                                        <p className="text-xs text-gray-500">Signed in as</p>
                                        <p className="text-sm font-bold text-amz-dark">{user.name}</p>
                                    </div>
                                    <Link href="/dashboard/buyer" className="block w-full text-left px-3 py-2 text-[14px] font-medium text-amz-text hover:bg-gray-100 rounded" onClick={() => setIsOpen(false)}>
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => { logout(); setIsOpen(false); }}
                                        className="block w-full text-left px-3 py-2 text-[14px] font-medium text-red-600 hover:bg-gray-100 rounded"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <Link href="/auth/login" className="block w-full text-center btn-amz py-2 text-[14px] font-bold" onClick={() => setIsOpen(false)}>
                                    Sign in
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
