'use client';

import * as React from 'react';
import { useCart } from '@/lib/cart';
import { Search, ShoppingCart, User, Menu, PackageSearch, Bell, Moon, Sun, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export default function Navbar() {
    const { items } = useCart();
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [scrolled, setScrolled] = React.useState(false);
    const router = useRouter();
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/categories?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            scrolled ? "glass py-2" : "bg-transparent py-4 text-white"
        )}>
            <div className="container mx-auto px-6 flex items-center justify-between gap-8">
                {/* Logo & Categories */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="font-heading font-black text-2xl tracking-tighter">
                            Market<span className="text-secondary">Place</span>
                        </span>
                    </Link>

                    <button className="hidden lg:flex items-center gap-2 text-sm font-bold hover:text-secondary transition-colors group">
                        <Menu size={20} className="group-hover:rotate-90 transition-transform" />
                        <span>Categories</span>
                        <ChevronRight size={16} className="rotate-90" />
                    </button>
                </div>

                {/* Main Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex relative group h-11">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products, brands, SKU..."
                        className="w-full h-full bg-white text-black rounded-l-lg px-12 text-sm font-medium outline-none border-none"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <button
                        type="submit"
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 font-bold text-sm rounded-r-lg transition-colors"
                    >
                        Search
                    </button>
                </form>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    {/* Help & Support (Desktop Only) */}
                    <div className="hidden xl:flex flex-col items-end text-[10px] font-bold uppercase tracking-widest text-white/50">
                        <span>Help Center</span>
                        <span className="text-white">Become a Supplier</span>
                    </div>

                    <div className="w-px h-8 bg-white/10 mx-2 hidden lg:block" />

                    {/* Account */}
                    <Link
                        href={user ? (user.role === 'admin' ? '/dashboard/super-admin-7bd0' : `/dashboard/${user.role}`) : '/auth/login'}
                        className="flex flex-col items-center gap-0.5 group"
                    >
                        <User className="w-5 h-5 group-hover:text-secondary transition-colors" />
                        <span className="text-[10px] font-bold">Account</span>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="relative flex flex-col items-center gap-0.5 group">
                        <ShoppingCart className="w-5 h-5 group-hover:text-secondary transition-colors" />
                        <span className="text-[10px] font-bold">Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
