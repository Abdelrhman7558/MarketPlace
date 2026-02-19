'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut,
    Menu, X, Bell, Search, ChevronDown
} from 'lucide-react';

const NAV_ITEMS = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard/super-admin-7bd0' },
    { name: 'Products', icon: Package, href: '/dashboard/super-admin-7bd0/products' },
    { name: 'Orders', icon: ShoppingCart, href: '/dashboard/super-admin-7bd0/orders' },
    { name: 'Users', icon: Users, href: '/dashboard/super-admin-7bd0/users' },
    { name: 'Settings', icon: Settings, href: '/dashboard/super-admin-7bd0/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [userName, setUserName] = useState('Admin');

    // Load avatar from localStorage
    if (typeof window !== 'undefined' && !avatar) {
        const saved = localStorage.getItem('bev-admin-avatar');
        const savedName = localStorage.getItem('bev-admin-name');
        if (saved) setAvatar(saved);
        if (savedName) setUserName(savedName);
    }

    return (
        <div className="flex min-h-screen bg-brand-light">
            {/* Sidebar - Desktop */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-navy transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static flex-shrink-0`}>
                <div className="flex flex-col h-full dark-scrollbar overflow-y-auto">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/10">
                        <Link href="/dashboard/super-admin-7bd0" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-brand-red rounded-xl flex items-center justify-center shadow-glow-orange group-hover:scale-110 transition-transform">
                                <span className="text-white font-black text-lg">B</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-extrabold tracking-tight text-white">BevMarket</h2>
                                <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wider">Admin Panel</span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                                        ? 'bg-gradient-to-r from-brand-orange to-brand-orange-hover text-white shadow-glow-orange'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                                    )}
                                    <item.icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
                                    <span className="font-medium text-sm">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Card + Logout */}
                    <div className="p-4 border-t border-white/10 mt-auto">
                        <div className="flex items-center gap-3 px-3 py-3 mb-2">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-orange to-brand-red flex items-center justify-center text-white font-bold text-sm overflow-hidden flex-shrink-0">
                                {avatar ? (
                                    <img src={avatar} className="w-full h-full object-cover" alt="avatar" />
                                ) : (
                                    userName[0]?.toUpperCase()
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-white text-sm font-semibold truncate">{userName}</p>
                                <p className="text-gray-500 text-[10px] truncate">7bd02025@gmail.com</p>
                            </div>
                        </div>
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group"
                        >
                            <LogOut className="w-5 h-5 text-gray-500 group-hover:text-white" />
                            <span className="font-medium text-sm">Sign Out</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <div>
                            <h1 className="font-bold text-brand-navy text-lg">
                                Welcome back, <span className="text-brand-orange">{userName}</span> 👋
                            </h1>
                            <p className="text-text-muted text-xs">Here&apos;s what&apos;s happening with your store</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-64 focus-within:border-brand-orange transition-colors">
                            <Search className="w-4 h-4 text-gray-400 mr-2" />
                            <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm flex-1 text-gray-700" />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
                            <Bell className="w-5 h-5 text-gray-500" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-orange rounded-full animate-pulse-slow" />
                        </button>

                        {/* Profile */}
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-orange to-brand-red flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:scale-110 transition-transform overflow-hidden">
                            {avatar ? (
                                <img src={avatar} className="w-full h-full object-cover" alt="" />
                            ) : (
                                userName[0]?.toUpperCase()
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
