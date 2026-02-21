'use client';

import * as React from 'react';
import { useCart } from '@/lib/cart';
import { Search, ShoppingCart, User, MapPin, ChevronDown, Menu, PackageSearch } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const { items } = useCart();
    const { user, logout } = useAuth();
    const [searchTerm, setSearchTerm] = React.useState('');
    const router = useRouter();
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/categories?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <header className="flex flex-col w-full sticky top-0 z-50">
            {/* Top Thin Bar - Dark Navy */}
            <div className="bg-[#050B18] text-white/80 text-[11px] px-6 h-8 flex items-center justify-between border-b border-white/5 font-medium">
                <span className="flex items-center gap-2">
                    <PackageSearch size={14} className="text-[#FF7A1A]" />
                    B2B Wholesale Marketplace
                </span>
                <div className="flex items-center gap-6">
                    <Link href="/help" className="hover:text-white transition-colors">Help Center</Link>
                    <Link href="/auth/register" className="hover:text-white transition-colors">Become a Supplier</Link>
                    <div className="h-3 w-px bg-white/10 mx-1" />
                    <Link href="/orders" className="hover:text-white transition-colors">Track Orders</Link>
                </div>
            </div>

            {/* Main Navbar - White (Exact Match from screenshot) */}
            <div className="bg-white text-[#050B18] px-6 h-16 flex items-center gap-8 border-b border-gray-200 shadow-sm">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-1 hover:opacity-80 transition-all">
                    <span className="font-black text-2xl tracking-tighter">Market<span className="text-[#FF7A1A]">Place</span></span>
                </Link>

                {/* Catalog Button */}
                <Link href="/categories" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-xl text-sm font-black transition-all group">
                    <Menu className="w-5 h-5 group-hover:text-[#FF7A1A]" />
                    <span>Categories</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 flex h-11 rounded-xl overflow-hidden border border-gray-200 focus-within:border-[#FF7A1A] focus-within:ring-4 focus-within:ring-[#FF7A1A]/10 transition-all bg-gray-50/50">
                    <div className="flex items-center px-4">
                        <Search className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products, brands, SKU..."
                        className="flex-1 bg-transparent px-2 text-sm font-medium outline-none text-gray-900"
                    />
                    <button type="submit" className="bg-[#FF7A1A] hover:bg-[#e66c17] px-10 flex items-center justify-center text-white transition-colors font-black text-sm uppercase tracking-widest">
                        Search
                    </button>
                </form>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    {/* Account */}
                    <Link
                        href={user ? (user.role === 'admin' ? '/dashboard/super-admin-7bd0' : `/dashboard/${user.role}`) : '/auth/login'}
                        className="flex items-center gap-3 hover:text-[#FF7A1A] transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#FF7A1A]/10 transition-all">
                            <User className="w-5 h-5 text-gray-600 group-hover:text-[#FF7A1A]" />
                        </div>
                        <div className="hidden lg:flex flex-col">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter leading-none">Hello, {user ? user.name.split(' ')[0] : 'Sign In'}</span>
                            <span className="text-sm font-black leading-tight">Account</span>
                        </div>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="flex items-center gap-3 hover:text-[#FF7A1A] transition-colors relative group">
                        <div className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#FF7A1A]/10 transition-all">
                            <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-[#FF7A1A]" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#FF7A1A] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <span className="hidden lg:block font-black text-sm">Cart</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
