'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, ChevronDown, X } from 'lucide-react';
import { useToast } from '@/components/ui/ToastProvider';
import CartDrawer from '@/components/cart/CartDrawer';
import { signOut, useSession } from 'next-auth/react';
import { fadeIn, slideUp } from '@/lib/motion';
import { useCart } from '@/context/CartContext';

const CATEGORIES: { name: string; items: string[] }[] = [
    { name: 'Beverages', items: ['Soft Drinks', 'Water', 'Juices', 'Energy Drinks'] },
    { name: 'Snacks', items: ['Chips', 'Biscuits', 'Chocolates', 'Nuts'] },
    { name: 'Dairy', items: ['Milk', 'Cheese', 'Yogurt', 'Butter'] },
    { name: 'Cooking Essentials', items: ['Oil', 'Rice', 'Pasta', 'Spices'] },
    { name: 'Personal Care', items: ['Soap', 'Shampoo', 'Toothpaste', 'Deodorant'] },
];

export default function Navbar() {
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { showToast } = useToast();
    const { data: session } = useSession();
    const { items } = useCart();

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Add a simple redirect to catalog with search query
            // Since we don't have a dedicated search page yet, we can reuse catalog
            // For now, just show toast as "feature coming soon" or simple client-side filter if possible
            // But user asked for search to work.
            // Let's redirect to /catalog?q=...
            window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <>
            <header className="sticky top-0 z-30 bg-white shadow-md border-b border-slate-200">
                {/* Top Bar (Optional for strictly B2B contacts, language, etc) */}
                <div className="bg-primary text-white text-xs py-1 px-4 flex justify-between">
                    <span>B2B Wholesale Marketplace</span>
                    <div className="flex gap-4">
                        <Link href="/help" className="hover:text-accent-light">Help Center</Link>
                        <Link href="/supplier" className="hover:text-accent-light">Become a Supplier</Link>
                    </div>
                </div>

                <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    {/* Logo & Mega Menu Trigger */}
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-2xl font-bold text-primary-dark tracking-tight">
                            Market<span className="text-accent">Place</span>
                        </Link>

                        <div
                            className="relative"
                            onMouseEnter={() => setIsMegaMenuOpen(true)}
                            onMouseLeave={() => setIsMegaMenuOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-2 text-sm font-medium py-2 transition-colors ${isMegaMenuOpen ? 'text-accent' : 'text-slate-700 hover:text-accent'}`}
                                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                            >
                                <Menu size={20} />
                                Categories
                                <ChevronDown size={16} className={`transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Mega Menu Dropdown */}
                            <AnimatePresence>
                                {isMegaMenuOpen && (
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={fadeIn}
                                        className="absolute top-full left-0 w-[600px] bg-white shadow-xl rounded-lg border border-slate-100 p-6 grid grid-cols-2 gap-6 z-dropdown"
                                        style={{ marginTop: '-1px' }} // Slight overlap to prevent gap issues
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <div key={cat.name}>
                                                <h3 className="font-bold text-primary mb-2 border-b border-slate-100 pb-1">
                                                    {cat.name}
                                                </h3>
                                                <ul className="space-y-1">
                                                    {cat.items.map((item) => (
                                                        <li key={item}>
                                                            <Link
                                                                href={`/catalog?category=${encodeURIComponent(cat.name)}&subcategory=${encodeURIComponent(item)}`}
                                                                className="text-sm text-slate-600 hover:text-accent hover:translate-x-1 transition-transform block"
                                                                onClick={() => setIsMegaMenuOpen(false)}
                                                            >
                                                                {item}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products, brands, SKU..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                            <button
                                type="submit"
                                className="absolute right-1 top-1 bottom-1 bg-accent text-white px-4 rounded hover:bg-accent-hover transition-colors font-medium text-sm"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                        {session?.user?.email === '7bd02025@gmail.com' && (
                            <Link href="/dashboard/super-admin-7bd0" className="text-sm font-bold text-primary hover:text-primary-dark border border-primary px-3 py-1 rounded transition-colors hidden md:block">
                                Manager Dashboard
                            </Link>
                        )}

                        {session?.user ? (
                            <div className="relative group">
                                <button
                                    className="flex flex-col items-center text-slate-600 hover:text-primary group"
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                                        {session.user.name?.charAt(0) || <User size={18} />}
                                    </div>
                                    <span className="text-xs mt-1 font-medium text-blue-600 max-w-[60px] truncate">
                                        {session.user.name?.split(' ')[0] || 'Account'}
                                    </span>
                                </button>

                                {/* User Dropdown Menu */}
                                {userMenuOpen && (
                                    <div className="absolute top-12 right-0 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">

                                        {/* Header */}
                                        <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                                                {session.user.name?.charAt(0)}
                                            </div>
                                            <div className="overflow-hidden">
                                                <h4 className="font-bold text-slate-900 truncate">{session.user.name}</h4>
                                                <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="space-y-1 mb-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">Role:</span>
                                                <span className="font-medium text-blue-600 bg-blue-50 px-2 rounded-full text-xs py-0.5">
                                                    {(session.user as any).role || 'Buyer'}
                                                </span>
                                            </div>
                                            {/* Add more fields here if needed */}
                                        </div>

                                        {/* Actions */}
                                        <div className="space-y-2">
                                            {session.user.email === '7bd02025@gmail.com' && (
                                                <Link
                                                    href="/dashboard/super-admin-7bd0"
                                                    className="block w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-slate-50 rounded-lg transition-colors border border-dashed border-primary/20 mb-2"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    Manager Dashboard
                                                </Link>
                                            )}
                                            <Link
                                                href="/profile"
                                                className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                Profile Settings
                                            </Link>
                                            <button
                                                onClick={() => signOut({ callbackUrl: '/' })}
                                                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {/* Overlay to close */}
                                {userMenuOpen && (
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setUserMenuOpen(false)}
                                    />
                                )}
                            </div>
                        ) : (
                            <Link href="/auth/login" className="flex flex-col items-center text-slate-600 hover:text-primary group">
                                <User size={20} className="group-hover:scale-110 transition-transform" />
                                <span className="text-xs mt-1">Sign In</span>
                            </Link>
                        )}

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="flex flex-col items-center text-slate-600 hover:text-primary group relative"
                        >
                            <div className="relative">
                                <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-in zoom-in">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs mt-1">Cart</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Cart Drawer */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
