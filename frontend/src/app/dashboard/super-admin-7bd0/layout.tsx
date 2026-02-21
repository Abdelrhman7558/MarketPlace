'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut,
    Menu, X, Bell, Search, Check, Info, AlertTriangle, Gift,
    ArrowLeft, ChevronDown, User
} from 'lucide-react';
import { useAuth } from '@/lib/auth';

const NAV_ITEMS = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard/super-admin-7bd0' },
    { name: 'Products', icon: Package, href: '/dashboard/super-admin-7bd0/products' },
    { name: 'Orders', icon: ShoppingCart, href: '/dashboard/super-admin-7bd0/orders' },
    { name: 'Users', icon: Users, href: '/dashboard/super-admin-7bd0/users' },
    { name: 'Settings', icon: Settings, href: '/dashboard/super-admin-7bd0/settings' },
];

const INITIAL_NOTIFICATIONS = [
    { id: '1', icon: ShoppingCart, color: 'text-blue-500 bg-blue-100', title: 'New order received', desc: 'Order #2048 — 24x Coca-Cola cans', time: '2 min ago', read: false },
    { id: '2', icon: AlertTriangle, color: 'text-amber-500 bg-amber-100', title: 'Low stock alert', desc: 'Sprite 330ml — only 5 cases left', time: '15 min ago', read: false },
    { id: '3', icon: Users, color: 'text-green-500 bg-green-100', title: 'New user registered', desc: 'ahmed.store@email.com signed up', time: '1 hr ago', read: false },
    { id: '4', icon: Gift, color: 'text-purple-500 bg-purple-100', title: 'Offer expiring soon', desc: 'Bulk discount 30% ends tomorrow', time: '3 hrs ago', read: true },
    { id: '5', icon: Info, color: 'text-sky-500 bg-sky-100', title: 'System update', desc: 'Dashboard v2.1 deployed successfully', time: '5 hrs ago', read: true },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const userName = user?.name || 'Admin';
    const userEmail = user?.email || '7bd02025@gmail.com';

    // Avatar from localStorage
    const [avatar, setAvatar] = useState<string | null>(null);
    useEffect(() => {
        const saved = localStorage.getItem('bev-admin-avatar');
        if (saved) setAvatar(saved);
    }, []);

    // Notifications
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
    const notifRef = useRef<HTMLDivElement>(null);
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

    // User Menu
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Close dropdowns on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setShowNotifications(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Swipe to open/close sidebar
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
        };
        const handleTouchEnd = (e: TouchEvent) => {
            touchEndX.current = e.changedTouches[0].clientX;
            const diff = touchEndX.current - touchStartX.current;
            if (diff > 80 && touchStartX.current < 50) {
                setSidebarOpen(true);
            }
            if (diff < -80 && sidebarOpen) {
                setSidebarOpen(false);
            }
        };
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [sidebarOpen]);

    const handleSignOut = () => {
        logout();
        router.push('/');
    };

    // Page title from pathname
    const pageTitle = NAV_ITEMS.find(item => item.href === pathname)?.name || 'Dashboard';
    const isSubPage = pathname !== '/dashboard/super-admin-7bd0';

    return (
        <div className="flex h-screen overflow-hidden bg-[#EAEDED]">
            {/* Sidebar — fixed, doesn't scroll with content */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-[220px] bg-amz-dark2 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex-shrink-0`}>
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
                                <p className="text-gray-500 text-[10px] truncate">{userEmail}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 text-gray-400 hover:text-white text-[13px] transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main Content — offset by sidebar width on large screens */}
            <div className="flex-1 flex flex-col min-w-0 lg:ml-[220px]">
                {/* Top Bar — sticky */}
                <header className="bg-amz-dark h-[50px] flex items-center justify-between px-4 sticky top-0 z-20 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-1 text-white"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                        {/* Back button */}
                        {isSubPage && (
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-1 text-gray-300 hover:text-white text-[13px] transition-colors p-1 hover:bg-white/10 rounded"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Back</span>
                            </button>
                        )}

                        <h1 className="text-white text-[14px] font-medium hidden sm:block">
                            {pageTitle}
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
                        <div className="relative" ref={notifRef}>
                            <button
                                className="relative text-white p-1 hover:bg-white/10 rounded-md transition-colors"
                                onClick={() => setShowNotifications(!showNotifications)}
                            >
                                <Bell className="w-5 h-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#FF0000] rounded-full text-[10px] font-bold text-white flex items-center justify-center px-1">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 top-[calc(100%+8px)] w-[360px] max-w-[calc(100vw-32px)] max-h-[420px] bg-white rounded-lg shadow-2xl border border-[#d5d9d9] overflow-hidden z-50"
                                    style={{ animation: 'fadeIn 0.2s ease-out' }}>
                                    <div className="px-4 py-3 bg-[#f7f7f7] border-b border-[#e7e7e7] flex items-center justify-between">
                                        <h3 className="text-[15px] font-bold text-amz-text">Notifications</h3>
                                        {unreadCount > 0 && (
                                            <button onClick={markAllRead} className="text-[12px] text-amz-link hover:text-amz-blue-hover hover:underline flex items-center gap-1">
                                                <Check className="w-3 h-3" /> Mark all read
                                            </button>
                                        )}
                                    </div>
                                    <div className="overflow-y-auto max-h-[340px]">
                                        {notifications.map((n) => (
                                            <div key={n.id} onClick={() => markRead(n.id)}
                                                className={`flex items-start gap-3 px-4 py-3 border-b border-[#f0f0f0] cursor-pointer transition-colors hover:bg-[#f7f7f7] ${!n.read ? 'bg-[#fffbf0]' : ''}`}>
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${n.color}`}>
                                                    <n.icon className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p className={`text-[13px] ${!n.read ? 'font-bold text-amz-text' : 'font-medium text-amz-text2'} truncate`}>{n.title}</p>
                                                        {!n.read && <span className="w-2 h-2 bg-amz-orange rounded-full flex-shrink-0 mt-1.5" />}
                                                    </div>
                                                    <p className="text-[12px] text-amz-text2 truncate">{n.desc}</p>
                                                    <p className="text-[11px] text-gray-400 mt-0.5">{n.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="px-4 py-2 text-center border-t border-[#e7e7e7] bg-[#f7f7f7]">
                                        <button className="text-[12px] text-amz-link hover:text-amz-blue-hover hover:underline">
                                            View all notifications
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Menu */}
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 p-1 hover:bg-white/10 rounded-md transition-colors"
                            >
                                <div className="w-7 h-7 rounded-full bg-amz-dark2 border border-gray-500 flex items-center justify-center text-white text-[12px] font-bold cursor-pointer overflow-hidden">
                                    {avatar ? (
                                        <img src={avatar} className="w-full h-full object-cover" alt="" />
                                    ) : (
                                        userName[0]?.toUpperCase()
                                    )}
                                </div>
                                <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
                            </button>

                            {/* User Dropdown */}
                            {showUserMenu && (
                                <div className="absolute right-0 top-[calc(100%+8px)] w-[220px] bg-white rounded-lg shadow-2xl border border-[#d5d9d9] overflow-hidden z-50"
                                    style={{ animation: 'fadeIn 0.2s ease-out' }}>
                                    <div className="px-4 py-3 border-b border-[#e7e7e7]">
                                        <p className="text-[13px] font-bold text-amz-text truncate">{userName}</p>
                                        <p className="text-[11px] text-amz-text2 truncate">{userEmail}</p>
                                    </div>
                                    <div className="py-1">
                                        <Link href="/dashboard/super-admin-7bd0/settings" onClick={() => setShowUserMenu(false)}
                                            className="flex items-center gap-2 px-4 py-2 text-[13px] text-amz-text hover:bg-[#f7f7f7] transition-colors hover:no-underline">
                                            <User className="w-4 h-4 text-amz-text2" /> Profile & Settings
                                        </Link>
                                        <Link href="/" onClick={() => setShowUserMenu(false)}
                                            className="flex items-center gap-2 px-4 py-2 text-[13px] text-amz-text hover:bg-[#f7f7f7] transition-colors hover:no-underline">
                                            <ShoppingCart className="w-4 h-4 text-amz-text2" /> Back to Store
                                        </Link>
                                    </div>
                                    <div className="border-t border-[#e7e7e7] py-1">
                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-2 px-4 py-2 text-[13px] text-red-600 hover:bg-red-50 transition-colors w-full"
                                        >
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content — this is the only scrollable area */}
                <main className="flex-1 p-5 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
