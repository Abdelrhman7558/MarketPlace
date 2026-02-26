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
    Moon,
    Sun,
    Home
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { UserMenu } from '@/components/dashboard/UserMenu';
import { useTheme } from 'next-themes';

const ADMIN_LINKS = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Users & Approvals', href: '/admin/users', icon: Users },
    { label: 'Buyers', href: '/admin/buyers', icon: Users },
    { label: 'Suppliers', href: '/admin/suppliers', icon: Package },
    { label: 'All Products', href: '/admin/products', icon: Package },
    { label: 'Add Catalog Item', href: '/admin/products/new', icon: Package },
    { label: 'Security', href: '/admin/security', icon: Shield },
    { label: 'Offer Approvals', href: '/admin/offers', icon: Tag },
    { label: 'Add Promotion', href: '/admin/offers/new', icon: Tag },
    { label: 'Coupons Management', href: '/admin/coupons', icon: Ticket },
    { label: 'Placements', href: '/admin/placements', icon: LayoutList },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Team', href: '/admin/team', icon: Users },
    { label: 'Invite Center', href: '/admin/invite', icon: UserPlus },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
    { label: 'Homepage', href: '/admin/homepage', icon: Home },
];


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(true);
    const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
    const [pendingCount, setPendingCount] = React.useState(0);
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();
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
        const interval = setInterval(fetchPendingUsers, 30000); // Check every 30s
        return () => clearInterval(interval);
    }, [user]);

    return (
        <div className="flex h-screen bg-background overflow-hidden transition-colors duration-500">
            {/* Sidebar */}
            <aside className={cn(
                "bg-card border-r border-border/50 transition-all duration-300 flex flex-col z-50",
                isOpen ? "w-64" : "w-20"
            )}>
                {/* Sidebar Header */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-border/50">
                    {isOpen ? (
                        <Link href="/" className="font-heading font-black text-xl tracking-tighter text-foreground">
                            Market<span className="text-primary">Place</span>
                        </Link>
                    ) : (
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-black text-xs text-primary-foreground">M</div>
                    )}
                    <button onClick={() => setIsOpen(!isOpen)} className="text-muted-foreground hover:text-foreground transition-colors">
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto no-scrollbar">
                    {ADMIN_LINKS.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
                                    isActive
                                        ? "bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                <Icon size={20} className={cn("transition-transform group-hover:scale-110", isActive ? "stroke-[2.5]" : "")} />
                                {isOpen && <span className="text-sm">{link.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-border/50">
                    <button
                        onClick={() => {
                            logout();
                            window.location.href = '/';
                        }}
                        className="flex items-center gap-4 px-4 py-3 w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all group"
                    >
                        <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                        {isOpen && <span className="text-sm font-bold">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header Row */}
                <header className="h-20 bg-background/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-8 z-40">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <h2 className="text-foreground font-black tracking-tight text-xl">Command Hub</h2>
                            <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] leading-none mt-1">Enterprise Administration</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Theme Toggle */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-xl hover:bg-muted transition-all outline-none text-muted-foreground hover:text-foreground"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        )}

                        {/* Notification Bell */}
                        <div className="relative group">
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="p-2 rounded-xl hover:bg-muted transition-all outline-none"
                            >
                                <Bell size={20} className="text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" />
                                {pendingCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background animate-pulse" />}
                            </button>

                            {/* Dropdown Notification Preview */}
                            <div className={cn(
                                "absolute top-full right-0 mt-4 w-80 bg-card border border-border/50 rounded-2xl shadow-2xl transition-all p-4 z-[100] origin-top-right",
                                isNotificationsOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
                            )}>
                                <h4 className="text-xs font-black text-foreground uppercase tracking-widest mb-4">Urgent Actions</h4>
                                <div className="space-y-3">
                                    {pendingCount > 0 ? (
                                        <Link href="/admin/users" onClick={() => setIsNotificationsOpen(false)} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                                            <p className="text-[10px] text-foreground/80 font-medium group-hover:text-primary">{pendingCount} new user approvals pending</p>
                                        </Link>
                                    ) : (
                                        <div className="p-2 text-[10px] text-muted-foreground font-medium">No pending user approvals at this time.</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="h-8 w-[1px] bg-border/50 mx-2" />

                        <UserMenu role="admin" />
                    </div>
                </header>


                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                    {children}
                </div>
            </main>
        </div>
    );
}
