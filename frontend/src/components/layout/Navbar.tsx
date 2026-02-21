'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingCart, User, Moon, Sun, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useAuth } from '@/lib/auth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const NAV_ITEMS = [
    { name: 'Products', href: '/#products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Suppliers', href: '/suppliers' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const { items } = useCart();
    const { user, logout } = useAuth();
    const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const getDashboardLink = () => {
        if (!user) return '/auth/login';
        if (user.role === 'admin') return '/dashboard/super-admin-7bd0';
        if (user.role === 'supplier') return '/dashboard/supplier';
        return '/dashboard/buyer';
    };

    return (
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border transition-all duration-300">
            <div className="container-wide px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:rotate-6 transition-transform">
                        MP
                    </div>
                    <span className="hidden sm:block font-poppins font-bold text-xl tracking-tight text-foreground">
                        MarketPlace<span className="text-primary">.</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
                    {/* Search (Desktop) */}
                    <div className="hidden lg:block w-full max-w-xs relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full bg-surface border-border border rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Theme Toggle */}
                        <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-full w-10 h-10 p-0">
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </Button>

                        {/* Cart */}
                        <Link href="/cart" className="relative group">
                            <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                                <ShoppingCart className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-background animate-scale-in">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {/* Auth/User */}
                        {user ? (
                            <div className="relative group">
                                <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 rounded-full border-primary/20 hover:bg-primary/5">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        {user.name[0]}
                                    </div>
                                    <span className="max-w-[80px] truncate">{user.name}</span>
                                    <ChevronDown className="w-4 h-4 text-foreground/40" />
                                </Button>

                                {/* Dropdown Menu */}
                                <div className="absolute top-full right-0 mt-2 w-56 bg-surface border border-border rounded-xl shadow-xl py-2 hidden group-hover:block animate-fade-in-up">
                                    <div className="px-4 py-2 border-b border-border mb-1">
                                        <p className="text-xs text-foreground/50 uppercase font-bold tracking-wider">Signed in as</p>
                                        <p className="text-sm font-semibold truncate text-foreground">{user.email}</p>
                                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase font-bold mt-1 inline-block">
                                            {user.role}
                                        </span>
                                    </div>
                                    <Link href={getDashboardLink()} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-primary/5 text-foreground transition-colors">
                                        Dashboard
                                    </Link>
                                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-primary/5 text-foreground transition-colors">
                                        Your Profile
                                    </Link>
                                    <div className="border-t border-border mt-1 pt-1">
                                        <button
                                            onClick={() => logout()}
                                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-accent hover:bg-accent/5 transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link href="/auth/login">
                                <Button size="sm" className="rounded-full px-6">Sign In</Button>
                            </Link>
                        )}

                        {/* Mobile Toggle */}
                        <Button variant="ghost" size="sm" className="md:hidden rounded-full w-10 h-10 p-0" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border animate-fade-in-down shadow-2xl">
                    <div className="p-4 space-y-4">
                        <nav className="flex flex-col gap-2">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="px-4 py-3 rounded-lg hover:bg-primary/5 text-foreground font-medium transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="pt-4 border-t border-border">
                            {user ? (
                                <div className="space-y-2">
                                    <Link href={getDashboardLink()} className="block w-full py-3 px-4 rounded-lg bg-primary/10 text-primary font-bold text-center" onClick={() => setIsOpen(false)}>
                                        Go to Dashboard
                                    </Link>
                                    <Button variant="outline" className="w-full justify-center" onClick={() => { logout(); setIsOpen(false); }}>
                                        Sign Out
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <Link href="/auth/login" className="w-full">
                                        <Button variant="outline" className="w-full justify-center" onClick={() => setIsOpen(false)}>Login</Button>
                                    </Link>
                                    <Link href="/auth/register" className="w-full">
                                        <Button className="w-full justify-center" onClick={() => setIsOpen(false)}>Register</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
