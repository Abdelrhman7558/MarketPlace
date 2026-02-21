'use client';

import * as React from 'react';
import { useCart } from '@/lib/cart';
import { Search, ShoppingCart, User, Menu, PackageSearch, Bell, Moon, Sun } from 'lucide-react';
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
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center premium-shadow group-hover:rotate-12 transition-transform duration-300">
                        <PackageSearch className="text-primary-foreground" size={24} />
                    </div>
                    <span className="font-heading font-bold text-2xl tracking-tight hidden sm:block">
                        Bev<span className="text-secondary">Market</span>
                    </span>
                </Link>

                {/* Main Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex relative group">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search wholesale beverages..."
                        className="w-full h-12 bg-muted/50 dark:bg-muted/20 border-border/50 rounded-2xl px-12 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all backdrop-blur-sm"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
                    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </form>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="w-10 h-10 rounded-xl hover:bg-muted/50 flex items-center justify-center transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Notifications */}
                    <button className="w-10 h-10 rounded-xl hover:bg-muted/50 flex items-center justify-center transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-highlight rounded-full" />
                    </button>

                    <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

                    {/* Account */}
                    <Link
                        href={user ? (user.role === 'admin' ? '/dashboard/super-admin-7bd0' : `/dashboard/${user.role}`) : '/auth/login'}
                        className="flex items-center gap-3 p-1 rounded-2xl hover:bg-muted/50 transition-colors group"
                    >
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                            <User className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                        </div>
                        <div className="hidden lg:flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                {user ? user.role : 'Guest'}
                            </span>
                            <span className="text-sm font-bold leading-tight">
                                {user ? user.name.split(' ')[0] : 'Sign In'}
                            </span>
                        </div>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="relative group">
                        <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center premium-shadow group-hover:bg-secondary/90 transition-colors">
                            <ShoppingCart className="w-5 h-5 text-secondary-foreground" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-highlight text-highlight-foreground text-[10px] font-bold w-5 h-5 rounded-lg flex items-center justify-center border-2 border-background animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}
