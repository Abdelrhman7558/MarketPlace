'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut,
    Menu, X, Bell, Search
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

    if (typeof window !== 'undefined' && !avatar) {
        const saved = localStorage.getItem('bev-admin-avatar');
        const savedName = localStorage.getItem('bev-admin-name');
        if (saved) setAvatar(saved);
        if (savedName) setUserName(savedName);
    }

    return (
        <div className="flex min-h-screen bg-[#EAEDED]">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-[220px] bg-amz-dark2 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static flex-shrink-0`}>
                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Logo */}
                    <div className="px-4 py-5 border-b border-white/10">
                        <Link href="/dashboard/super-admin-7bd0" className="flex items-center gap-2 hover:no-underline">
                            <span className="text-white font-bold text-[18px]">
                                Bev<span className="text-amz-orange">Market</span>
                            </span>
                        </Link>
                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Seller Central</span>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 py-2">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-[10px] text-[13px] transition-colors hover:no-underline ${isActive
                                        ? 'bg-amz-dark text-white font-bold border-l-[3px] border-amz-orange'
                                        : 'text-gray-300 hover:bg-amz-dark hover:text-white border-l-[3px] border-transparent'
                                        }`}
                                >
                                    <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-amz-orange' : ''}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User + Logout */}
                    <div className="px-4 py-3 border-t border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-amz-dark flex items-center justify-center text-white text-[13px] font-bold overflow-hidden flex-shrink-0">
                                {avatar ? (
                                    <img src={avatar} className="w-full h-full object-cover" alt="avatar" />
                                ) : (
                                    userName[0]?.toUpperCase()
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-white text-[13px] font-medium truncate">{userName}</p>
                                <p className="text-gray-500 text-[10px] truncate">7bd02025@gmail.com</p>
                            </div>
                        </div>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-gray-400 hover:text-white text-[13px] transition-colors hover:no-underline"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
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
                <header className="bg-amz-dark h-[50px] flex items-center justify-between px-4 sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-1 text-white"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <h1 className="text-white text-[14px] font-medium hidden sm:block">
                            Welcome, <span className="font-bold">{userName}</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="hidden md:flex items-center h-[32px] rounded-[4px] overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-white px-3 h-full text-[13px] outline-none w-[200px]"
                            />
                            <button className="bg-amz-orange hover:bg-amz-orange2 h-full px-3">
                                <Search className="w-4 h-4 text-amz-dark" />
                            </button>
                        </div>

                        {/* Notifications */}
                        <button className="relative text-white p-1">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF0000] rounded-full" />
                        </button>

                        {/* Profile */}
                        <div className="w-7 h-7 rounded-full bg-amz-dark2 border border-gray-500 flex items-center justify-center text-white text-[12px] font-bold cursor-pointer overflow-hidden">
                            {avatar ? (
                                <img src={avatar} className="w-full h-full object-cover" alt="" />
                            ) : (
                                userName[0]?.toUpperCase()
                            )}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-5 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
