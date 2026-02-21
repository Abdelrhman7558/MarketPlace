'use client';

import * as React from 'react';
import { useCart } from '@/lib/cart';
import { Search, ShoppingCart, User, Menu, MapPin, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';

export default function AmazonNavbar() {
    const { items } = useCart();
    const { user } = useAuth();
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
        <header className="flex flex-col w-full z-50 sticky top-0 transition-shadow duration-300">
            {/* Top Bar */}
            <div className="bg-[#131921] text-white py-1 px-4 flex items-center justify-between gap-4 h-14 md:h-16 shadow-lg">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-1 p-1 hover:border-white/20 border border-transparent rounded transition-all h-full">
                    <span className="font-heading font-extrabold text-xl md:text-2xl tracking-tight">
                        Market<span className="text-primary">Place</span>
                    </span>
                    <span className="text-[10px] mt-2 font-semibold text-white/60">.eg</span>
                </Link>

                {/* Search Bar - Center Aligned */}
                <form onSubmit={handleSearch} className="flex-1 max-w-3xl flex items-center h-9 md:h-10 group bg-white rounded overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                    <div className="hidden sm:flex h-full px-3 bg-[#f3f3f3] text-[#555] text-xs items-center gap-1 border-r border-[#ccc] cursor-pointer hover:bg-[#e3e3e3] font-medium">
                        All <ChevronDown size={14} />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search MarketPlace"
                        className="flex-1 h-full px-3 text-sm text-[#111] outline-none font-normal"
                    />
                    <button
                        type="submit"
                        className="h-full px-5 bg-primary hover:bg-primary/90 text-[#131921] flex items-center justify-center transition-colors shadow-inner"
                    >
                        <Search size={20} className="stroke-[2.5]" />
                    </button>
                </form>

                {/* Right Actions */}
                <div className="flex items-center gap-1 h-full">
                    {/* Account & Lists */}
                    <Link
                        href={user ? (user.role === 'admin' ? '/dashboard/super-admin-7bd0' : `/dashboard/${user.role}`) : '/auth/login'}
                        className="flex flex-col items-start p-1.5 hover:border-white/20 border border-transparent rounded transition-all h-full whitespace-nowrap min-w-max"
                    >
                        <span className="text-[11px] leading-tight font-medium text-white/80">Hello, {user ? user.name.split(' ')[0] : 'Sign in'}</span>
                        <div className="flex items-center gap-0.5">
                            <span className="text-xs md:text-sm font-bold leading-tight">Account</span>
                            <ChevronDown size={10} className="text-white/60" />
                        </div>
                    </Link>

                    {/* Orders */}
                    <Link href="/dashboard" className="hidden md:flex flex-col items-start p-1.5 hover:border-white/20 border border-transparent rounded transition-all h-full whitespace-nowrap">
                        <span className="text-[11px] leading-tight font-medium text-white/80">Returns</span>
                        <span className="text-xs md:text-sm font-bold leading-tight">& Orders</span>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="flex items-end p-1.5 hover:border-white/20 border border-transparent rounded transition-all h-full relative">
                        <div className="relative">
                            <ShoppingCart size={28} className="stroke-[1.5]" />
                            <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-primary text-xs font-black bg-[#131921] px-0.5">
                                {cartCount}
                            </span>
                        </div>
                        <span className="hidden sm:block text-sm font-bold mb-0.5 ml-1">Cart</span>
                    </Link>
                </div>
            </div>

            {/* Bottom Bar - Simplified */}
            <div className="bg-[#232F3E] text-white py-0.5 px-4 flex items-center justify-start gap-4 h-9 overflow-x-auto no-scrollbar shadow-md">
                <button className="flex items-center gap-1 font-bold text-xs hover:border-white/30 border border-transparent rounded px-2 py-1 transition-all whitespace-nowrap">
                    <Menu size={18} /> All
                </button>
                <div className="flex items-center gap-3 text-xs font-medium text-white/90">
                    {["Today's Deals", "Customer Service", "Registry", "Sell"].map((item) => (
                        <Link key={item} href="#" className="hover:border-white/30 border border-transparent rounded px-2 py-1 transition-all whitespace-nowrap">
                            {item}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
