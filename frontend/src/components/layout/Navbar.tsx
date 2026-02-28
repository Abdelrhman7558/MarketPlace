'use client';

import * as React from 'react';
import { useCart } from '@/lib/cart';
import { Search, ShoppingCart, User, Menu, PackageSearch, Bell, Moon, Sun, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/LanguageContext';
import { Locale } from '@/locales';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const { items } = useCart();
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const { locale, setLocale, t } = useLanguage();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [scrolled, setScrolled] = React.useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const isWhiteBackgroundPage = pathname.startsWith('/categories') || pathname.startsWith('/products') || pathname.startsWith('/cart') || pathname.startsWith('/checkout') || pathname.startsWith('/dashboard');

    // Hide Navbar completely on auth pages, as they have their own integrated clean layout.
    if (pathname.startsWith('/auth')) {
        return null;
    }

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
            scrolled ? "glass py-2 text-foreground" : (isWhiteBackgroundPage ? "bg-card border-b border-border/50 py-4 text-foreground shadow-sm" : "bg-transparent py-4 text-white")
        )}>
            <div className="container mx-auto px-6 flex items-center justify-between gap-8">
                {/* Logo & Categories */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className={cn(
                            "font-heading font-black text-2xl tracking-tighter",
                            (scrolled || isWhiteBackgroundPage) ? "text-primary" : "text-white"
                        )}>
                            ATLANTIS
                        </span>
                    </Link>

                    <button className="hidden lg:flex items-center gap-2 text-sm font-bold hover:text-secondary transition-colors group">
                        <Menu size={20} className="group-hover:rotate-90 transition-transform" />
                        <span>{t('navbar', 'categories')}</span>
                        <ChevronRight size={16} className="rotate-90" />
                    </button>
                </div>

                {/* Main Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex relative group h-11">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t('navbar', 'searchPlaceholder')}
                        className="w-full h-full bg-white text-black rounded-l-lg px-12 text-sm font-medium outline-none border-none"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <button
                        type="submit"
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 font-bold text-sm rounded-r-lg transition-colors"
                    >
                        {t('common', 'search')}
                    </button>
                </form>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    {/* Language Switcher */}
                    <div className="hidden lg:flex items-center gap-2">
                        <select
                            value={locale}
                            onChange={(e) => setLocale(e.target.value as Locale)}
                            className={cn(
                                "bg-transparent text-xs font-bold outline-none cursor-pointer uppercase",
                                (scrolled || isWhiteBackgroundPage) ? "text-foreground" : "text-white"
                            )}
                        >
                            <option value="en" className="text-black">EN</option>
                            <option value="ar" className="text-black">عربي</option>
                            <option value="fr" className="text-black">FR</option>
                            <option value="de" className="text-black">DE</option>
                            <option value="es" className="text-black">ES</option>
                            <option value="pt" className="text-black">PT</option>
                            <option value="ro" className="text-black">RO</option>
                        </select>
                    </div>

                    <div className={cn(
                        "hidden xl:flex flex-col items-end text-[10px] font-bold uppercase tracking-widest",
                        (scrolled || isWhiteBackgroundPage) ? "text-muted-foreground" : "text-white/50"
                    )}>
                        <span>{t('navbar', 'logisticsHelp')}</span>
                        <span className={(scrolled || isWhiteBackgroundPage) ? "text-foreground" : "text-white"}>{t('navbar', 'supplyPartners')}</span>
                    </div>

                    <div className={cn("w-px h-8 mx-2 hidden lg:block", (scrolled || isWhiteBackgroundPage) ? "bg-border" : "bg-white/10")} />

                    {/* Account */}
                    <Link
                        href={user ? (user.role === 'admin' ? '/admin' : user.role === 'supplier' ? '/supplier' : '/dashboard/customer') : '/auth/login'}
                        className="flex flex-col items-center gap-0.5 group"
                    >
                        <User className="w-5 h-5 group-hover:text-secondary transition-colors" />
                        <span className="text-[10px] font-bold">{t('navbar', 'account')}</span>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="relative flex flex-col items-center gap-0.5 group">
                        <ShoppingCart className="w-5 h-5 group-hover:text-secondary transition-colors" />
                        <span className="text-[10px] font-bold">{t('navbar', 'cart')}</span>
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
