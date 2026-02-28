'use client';

import * as React from 'react';
import { useCart } from '@/lib/cart';
import { Search, ShoppingCart, Menu, ChevronDown, Coffee, Zap, Droplets, IceCream, ShieldCheck, Home, Grid, Sparkles, Heart, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { CATEGORIES_LIST } from '@/lib/products';
import { UserMenu } from '@/components/dashboard/UserMenu';
import { useLanguage } from '@/contexts/LanguageContext';
import { Locale } from '@/locales';

const CATEGORY_ICONS: Record<string, any> = {
    'Soft Drinks': Droplets,
    'Energy Drinks': Zap,
    'Coffee & Tea': Coffee,
    'Snacks & Sweets': IceCream,
    'Personal Care': ShieldCheck,
    'Home Care': Home,
    'Makeup': Sparkles,
    'Perfume': Heart,
};

export default function AmazonNavbar() {
    const { items } = useCart();
    const { user } = useAuth();
    const { t, locale, setLocale } = useLanguage();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchCategory, setSearchCategory] = React.useState('All');
    const [isCategoriesOpen, setIsCategoriesOpen] = React.useState(false);
    const router = useRouter();
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/categories?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <header className="flex flex-col w-full z-50 sticky top-0 transition-shadow duration-300">
            {/* Top Bar */}
            <div className="bg-[#0A1A2F] text-white py-1 px-4 flex items-center justify-between gap-4 h-14 md:h-16 shadow-lg">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-1 p-1 hover:border-white/20 border border-transparent rounded transition-all h-full">
                    <span className="font-heading font-black text-xl md:text-2xl tracking-tighter text-white">
                        Atlan<span className="text-[#FF8A00]">tis</span>
                    </span>
                </Link>

                {/* Search Bar - Center Aligned */}
                <form onSubmit={handleSearch} className="flex-1 max-w-3xl flex items-center h-9 md:h-10 group bg-white rounded overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                    <div className="hidden sm:flex h-full bg-[#f3f3f3] text-[#555] text-xs items-center border-r border-[#ccc] cursor-pointer hover:bg-[#e3e3e3] font-medium relative focus-within:ring-2 focus-within:ring-primary/50 rounded-l">
                        <select
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            className="appearance-none bg-transparent h-full pl-3 pr-8 outline-none cursor-pointer"
                        >
                            <option value="All">{t('navbar', 'allCategories')}</option>
                            {CATEGORIES_LIST.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-2 pointer-events-none" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t('navbar', 'searchPlaceholder')}
                        className="flex-1 h-full px-3 text-sm text-[#111] outline-none font-normal"
                    />
                    <button
                        type="submit"
                        className="h-full px-5 bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition-colors shadow-inner"
                    >
                        <Search size={20} className="stroke-[2.5]" />
                    </button>
                </form>

                {/* Right Actions */}
                <div className="flex items-center gap-1 h-full font-heading">
                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="hidden sm:flex items-center justify-center p-2 mx-1 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={20} className="stroke-[1.5]" /> : <Moon size={20} className="stroke-[1.5]" />}
                        </button>
                    )}

                    {/* Language Switcher */}
                    <div className="hidden sm:flex items-center h-full">
                        <select
                            value={locale}
                            onChange={(e) => setLocale(e.target.value as Locale)}
                            className="bg-transparent text-xs font-bold outline-none cursor-pointer text-white/80 hover:text-white uppercase border border-transparent hover:border-white/20 rounded px-2 py-1 transition-all"
                        >
                            <option value="en" className="text-black bg-white">EN</option>
                            <option value="ar" className="text-black bg-white">عربي</option>
                            <option value="fr" className="text-black bg-white">FR</option>
                            <option value="de" className="text-black bg-white">DE</option>
                            <option value="es" className="text-black bg-white">ES</option>
                            <option value="pt" className="text-black bg-white">PT</option>
                            <option value="ro" className="text-black bg-white">RO</option>
                        </select>
                    </div>

                    {/* Account & Lists */}
                    <div className="relative group h-full flex items-center">
                        {user ? (
                            <UserMenu role={user.role} />
                        ) : (
                            <Link
                                href="/auth/login"
                                className="flex flex-col items-start p-1.5 hover:border-white/20 border border-transparent rounded transition-all h-full whitespace-nowrap min-w-max justify-center"
                            >
                                <span className="text-[11px] leading-tight font-medium text-white/80">{t('navbar', 'helloSignIn')}</span>
                                <div className="flex items-center gap-0.5">
                                    <span className="text-xs md:text-sm font-black leading-tight">{t('navbar', 'account')}</span>
                                    <ChevronDown size={10} className="text-white/60" />
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Orders - Customer Only */}
                    {user?.role === 'customer' && (
                        <Link href="/dashboard" className="hidden md:flex flex-col items-start p-1.5 hover:border-white/20 border border-transparent rounded transition-all h-full whitespace-nowrap justify-center">
                            <span className="text-[11px] leading-tight font-medium text-white/80">{t('navbar', 'returns')}</span>
                            <span className="text-xs md:text-sm font-black leading-tight">{t('navbar', 'orders')}</span>
                        </Link>
                    )}

                    {/* Cart */}
                    <Link href="/cart" className="flex items-end p-1.5 hover:border-white/20 border border-transparent rounded transition-all h-full relative text-white">
                        <div className="relative">
                            <ShoppingCart size={28} className="stroke-[1.5]" />
                            <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-primary text-xs font-black bg-[#0A1A2F] px-0.5">
                                {cartCount}
                            </span>
                        </div>
                        <span className="hidden sm:block text-sm font-black mb-0.5 ml-1">{t('navbar', 'cart')}</span>
                    </Link>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#1a2b3c] text-white py-0.5 px-4 flex items-center justify-start gap-4 h-9 relative shadow-md">
                {/* Categories Dropdown Trigger */}
                <div
                    className="relative group h-full flex items-center"
                    onMouseEnter={() => setIsCategoriesOpen(true)}
                    onMouseLeave={() => setIsCategoriesOpen(false)}
                >
                    <button
                        className="flex items-center gap-1 font-black text-xs hover:border-white/30 border border-transparent rounded px-2 py-1 transition-all whitespace-nowrap h-8 uppercase tracking-widest"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsCategoriesOpen(!isCategoriesOpen);
                        }}
                    >
                        <Menu size={18} /> {t('navbar', 'categories')}
                    </button>

                    {/* Dropdown Menu */}
                    <div className={cn(
                        "absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-xl overflow-hidden transition-all duration-300 origin-top transform z-[60]",
                        isCategoriesOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
                    )}>
                        <div className="py-2">
                            {CATEGORIES_LIST.map((cat) => {
                                const Icon = CATEGORY_ICONS[cat] || Grid;
                                return (
                                    <Link
                                        key={cat}
                                        href={`/categories?category=${encodeURIComponent(cat)}`}
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors group"
                                        onClick={() => setIsCategoriesOpen(false)}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Icon size={18} className="text-gray-500 group-hover:text-primary" />
                                        </div>
                                        <span className="font-bold">{cat}</span>
                                    </Link>
                                );
                            })}
                            <div className="border-t border-gray-100 mt-2 pt-2">
                                <Link
                                    href="/categories"
                                    className="flex items-center justify-center py-3 text-xs font-black text-primary uppercase tracking-widest hover:bg-primary/5 transition-colors"
                                    onClick={() => setIsCategoriesOpen(false)}
                                >
                                    {t('navbar', 'browseCatalog')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-bold text-white/90 h-full overflow-x-auto no-scrollbar">
                    <Link href="/deals" className="hover:border-white/30 border border-transparent rounded px-2 py-1.5 transition-all whitespace-nowrap tracking-wide">{t('navbar', 'volumeDeals')}</Link>
                    <Link href="/suppliers" className="hover:border-white/30 border border-transparent rounded px-2 py-1.5 transition-all whitespace-nowrap tracking-wide">{t('navbar', 'supplyPartners')}</Link>
                    <Link href="/help" className="hover:border-white/30 border border-transparent rounded px-2 py-1.5 transition-all whitespace-nowrap tracking-wide">{t('navbar', 'logisticsHelp')}</Link>
                    <Link href="/corporate" className="hover:border-white/30 border border-transparent rounded px-2 py-1.5 transition-all whitespace-nowrap tracking-wide">{t('navbar', 'corporateAccounts')}</Link>
                </div>
            </div>
        </header>
    );
}
