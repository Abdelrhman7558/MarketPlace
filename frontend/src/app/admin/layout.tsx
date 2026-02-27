'use client';

import * as React from 'react';
import Link from 'next/link';
import '../globals.css';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Package,
    ShoppingCart,
    Settings,
    Bell,
    LogOut,
    Menu,
    X,
    UserPlus,
    LayoutList,
    Tag,
    Shield,
    Ticket,
    Home,
    ChevronDown,
    FolderTree,
    Megaphone,
    Store,
    Wrench,
    Sun,
    Moon
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { UserMenu } from '@/components/dashboard/UserMenu';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/LanguageContext';
import { Locale } from '@/locales';

interface SidebarGroup {
    title: string;
    icon: React.ElementType;
    links: { label: string; href: string; icon: React.ElementType }[];
}

const SIDEBAR_GROUPS: SidebarGroup[] = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        links: [
            { label: 'Overview', href: '/admin', icon: LayoutDashboard },
            { label: 'Homepage', href: '/admin/homepage', icon: Home },
        ]
    },
    {
        title: 'People',
        icon: Users,
        links: [
            { label: 'Users & Approvals', href: '/admin/users', icon: Users },
            { label: 'Buyers', href: '/admin/buyers', icon: Users },
            { label: 'Suppliers', href: '/admin/suppliers', icon: Store },
            { label: 'Team', href: '/admin/team', icon: Users },
            { label: 'Invite Center', href: '/admin/invite', icon: UserPlus },
        ]
    },
    {
        title: 'Catalog',
        icon: Package,
        links: [
            { label: 'All Products', href: '/admin/products', icon: Package },
            { label: 'Add Product', href: '/admin/products/new', icon: Package },
            { label: 'Categories', href: '/admin/categories', icon: FolderTree },
        ]
    },
    {
        title: 'Marketing',
        icon: Megaphone,
        links: [
            { label: 'Offers', href: '/admin/offers', icon: Tag },
            { label: 'Add Promotion', href: '/admin/offers/new', icon: Tag },
            { label: 'Coupons', href: '/admin/coupons', icon: Ticket },
            { label: 'Placements', href: '/admin/placements', icon: LayoutList },
        ]
    },
    {
        title: 'Operations',
        icon: Wrench,
        links: [
            { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
            { label: 'Security', href: '/admin/security', icon: Shield },
            { label: 'Settings', href: '/admin/settings', icon: Settings },
        ]
    },
];

function SidebarGroupComponent({ group, isOpen, pathname }: { group: SidebarGroup; isOpen: boolean; pathname: string }) {
    const hasActiveLink = group.links.some(l => l.href === pathname);
    const [expanded, setExpanded] = React.useState(hasActiveLink);
    const GroupIcon = group.icon;

    // Auto-expand on route change
    React.useEffect(() => {
        if (hasActiveLink) setExpanded(true);
    }, [hasActiveLink]);

    if (!isOpen) {
        // Collapsed: just show icons
        return (
            <div className="space-y-1">
                {group.links.map(link => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            title={link.label}
                            className={cn(
                                "flex items-center justify-center p-3 rounded-lg transition-all",
                                isActive
                                    ? "bg-[#FF9900] text-white"
                                    : "text-[#555] dark:text-[#999] hover:text-[#0F1111] dark:hover:text-white hover:bg-[#F3F3F3] dark:hover:bg-white/10"
                            )}
                        >
                            <Icon size={18} />
                        </Link>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="mb-1">
            <button
                onClick={() => setExpanded(!expanded)}
                className={cn(
                    "flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors",
                    hasActiveLink ? "text-[#0F1111] dark:text-white" : "text-[#888] dark:text-[#999] hover:text-[#0F1111] dark:hover:text-white"
                )}
            >
                <span className="flex items-center gap-2">
                    <GroupIcon size={14} />
                    {group.title}
                </span>
                <ChevronDown size={14} className={cn("transition-transform", expanded && "rotate-180")} />
            </button>
            {expanded && (
                <div className="ml-2 mt-1 space-y-0.5 border-l-2 border-[#EAEDED] dark:border-white/10 pl-2">
                    {group.links.map(link => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all",
                                    isActive
                                        ? "bg-[#FEF8E8] dark:bg-[#FF9900]/10 text-[#0F1111] dark:text-white font-bold border border-[#FF9900]/30"
                                        : "text-[#555] dark:text-[#999] hover:text-[#0F1111] dark:hover:text-white hover:bg-[#F3F3F3] dark:hover:bg-white/10 font-medium"
                                )}
                            >
                                <Icon size={16} className={isActive ? "text-[#FF9900]" : ""} />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(true);
    const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
    const [pendingCount, setPendingCount] = React.useState(0);
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const { locale, setLocale } = useLanguage();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        const fetchPendingUsers = async () => {
            if (user?.role !== 'admin' && user?.role !== 'ADMIN') return;
            try {
                const token = localStorage.getItem('bev-token');
                const res = await fetch('http://localhost:3005/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    const pending = data.filter((u: any) => u.status === 'PENDING_APPROVAL' && u.role !== 'ADMIN').length;
                    setPendingCount(pending);
                }
            } catch (err) {
                console.error("Failed to fetch pending users:", err);
            }
        };
        fetchPendingUsers();
        const interval = setInterval(fetchPendingUsers, 30000);
        return () => clearInterval(interval);
    }, [user]);

    return (
        <div className="flex h-screen bg-[#EAEDED] dark:bg-[#0F1111] overflow-hidden">
            {/* Sidebar */}
            <aside className={cn(
                "bg-white dark:bg-[#131921] border-r border-[#DDD] dark:border-white/10 transition-all duration-300 flex flex-col z-50",
                isOpen ? "w-60" : "w-16"
            )}>
                {/* Sidebar Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-[#DDD] dark:border-white/10">
                    {isOpen ? (
                        <Link href="/" className="font-heading font-black text-lg tracking-tighter text-[#0F1111] dark:text-white">
                            Market<span className="text-[#FF9900]">Place</span>
                        </Link>
                    ) : (
                        <div className="w-8 h-8 bg-[#FF9900] rounded flex items-center justify-center font-black text-xs text-white">M</div>
                    )}
                    <button onClick={() => setIsOpen(!isOpen)} className="text-[#888] hover:text-[#0F1111] dark:hover:text-white transition-colors">
                        {isOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto no-scrollbar">
                    {SIDEBAR_GROUPS.map(group => (
                        <SidebarGroupComponent key={group.title} group={group} isOpen={isOpen} pathname={pathname} />
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-[#DDD] dark:border-white/10">
                    <button
                        onClick={() => {
                            logout();
                            window.location.href = '/';
                        }}
                        className="flex items-center gap-3 px-3 py-2 w-full text-[#888] hover:text-[#C40000] hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-all group"
                    >
                        <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
                        {isOpen && <span className="text-sm font-bold">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header Row */}
                <header className="h-16 bg-white dark:bg-[#131921] border-b border-[#DDD] dark:border-white/10 flex items-center justify-between px-6 z-40 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                            <h2 className="text-[#0F1111] dark:text-white font-bold text-lg">Admin Panel</h2>
                            <p className="text-[#FF9900] text-[10px] font-bold uppercase tracking-wider leading-none mt-0.5">Enterprise Administration</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Language Switcher */}
                        <select
                            value={locale}
                            onChange={(e) => setLocale(e.target.value as Locale)}
                            className="bg-transparent dark:bg-transparent text-xs font-bold outline-none cursor-pointer text-[#555] dark:text-[#999] hover:text-[#0F1111] dark:hover:text-white border border-[#DDD] dark:border-white/10 rounded-md px-2 py-1.5 transition-all"
                        >
                            <option value="en" className="text-black bg-white">EN</option>
                            <option value="ar" className="text-black bg-white">عربي</option>
                            <option value="fr" className="text-black bg-white">FR</option>
                            <option value="de" className="text-black bg-white">DE</option>
                            <option value="es" className="text-black bg-white">ES</option>
                            <option value="pt" className="text-black bg-white">PT</option>
                            <option value="ro" className="text-black bg-white">RO</option>
                        </select>

                        {/* Theme Toggle */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-md hover:bg-[#F3F3F3] dark:hover:bg-white/10 transition-all outline-none text-[#555] dark:text-[#999] hover:text-[#0F1111] dark:hover:text-white"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        )}

                        {/* Notification Bell */}
                        <div className="relative group">
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="p-2 rounded-md hover:bg-[#F3F3F3] dark:hover:bg-white/10 transition-all outline-none"
                            >
                                <Bell size={18} className="text-[#555] dark:text-[#999] group-hover:text-[#FF9900] transition-all" />
                                {pendingCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C40000] rounded-full animate-pulse" />}
                            </button>

                            {/* Dropdown Notification */}
                            <div className={cn(
                                "absolute top-full right-0 mt-2 w-72 bg-white dark:bg-[#1A1F26] border border-[#DDD] dark:border-white/10 rounded-lg shadow-lg transition-all p-3 z-[100] origin-top-right",
                                isNotificationsOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
                            )}>
                                <h4 className="text-xs font-bold text-[#0F1111] dark:text-white uppercase tracking-wider mb-3">Notifications</h4>
                                <div className="space-y-2">
                                    {pendingCount > 0 ? (
                                        <Link href="/admin/users" onClick={() => setIsNotificationsOpen(false)} className="flex items-center gap-2 p-2 rounded-md bg-[#FEF8E8] dark:bg-[#FF9900]/10 border border-[#FF9900]/20 hover:border-[#FF9900]/50 transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-[#FF9900]" />
                                            <p className="text-xs text-[#0F1111] dark:text-white font-medium">{pendingCount} new user approvals pending</p>
                                        </Link>
                                    ) : (
                                        <div className="p-2 text-xs text-[#888] font-medium">No pending actions.</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="h-6 w-[1px] bg-[#DDD] dark:bg-white/10" />

                        <UserMenu role="admin" />
                    </div>
                </header>


                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                    {children}
                </div>
            </main>
        </div>
    );
}
