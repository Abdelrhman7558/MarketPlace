'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut,
    TrendingUp, Star, Bell, ShieldCheck, History
} from 'lucide-react';
import { Button } from '../ui/Button';

interface SidebarItem {
    name: string;
    icon: any;
    href: string;
    badge?: string;
}

const SUPPLIER_ITEMS: SidebarItem[] = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard/supplier' },
    { name: 'My Products', icon: Package, href: '/dashboard/supplier/products' },
    { name: 'Placements', icon: Star, href: '/dashboard/supplier/placements', badge: 'New' },
    { name: 'Orders', icon: ShoppingCart, href: '/dashboard/supplier/orders' },
    { name: 'Analytics', icon: TrendingUp, href: '/dashboard/supplier/analytics' },
    { name: 'Settings', icon: Settings, href: '/dashboard/supplier/settings' },
];

const BUYER_ITEMS: SidebarItem[] = [
    { name: 'My Dashboard', icon: LayoutDashboard, href: '/dashboard/buyer' },
    { name: 'Orders History', icon: History, href: '/dashboard/buyer/orders' },
    { name: 'Notifications', icon: Bell, href: '/dashboard/buyer/notifications' },
    { name: 'Settings', icon: Settings, href: '/dashboard/buyer/settings' },
];

const ADMIN_ITEMS: SidebarItem[] = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard/super-admin-7bd0' },
    { name: 'Control Center', icon: ShieldCheck, href: '/dashboard/super-admin-7bd0/users' },
    { name: 'Manage Placements', icon: Star, href: '/dashboard/super-admin-7bd0/placements' },
    { name: 'Global Orders', icon: ShoppingCart, href: '/dashboard/super-admin-7bd0/orders' },
    { name: 'Settings', icon: Settings, href: '/dashboard/super-admin-7bd0/settings' },
];

export default function Sidebar({ role = 'supplier' }: { role?: 'supplier' | 'buyer' | 'admin' }) {
    const pathname = usePathname();

    const items = role === 'admin' ? ADMIN_ITEMS : role === 'buyer' ? BUYER_ITEMS : SUPPLIER_ITEMS;

    return (
        <aside className="w-72 bg-card border-r border-border min-h-screen hidden md:flex flex-col flex-shrink-0 sticky top-0 h-screen overflow-hidden group/sidebar transition-all duration-300">
            {/* Branding Header */}
            <div className="p-6 flex items-center gap-4 border-b border-border/50">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-black text-2xl shadow-lg shadow-primary/20">
                    AT
                </div>
                <div className="flex flex-col">
                    <h2 className="text-lg font-poppins font-bold tracking-tight text-foreground leading-none">
                        Atlantis
                    </h2>
                    <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mt-1">
                        {role} Portal
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive
                                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 bg-gradient-to-r from-primary to-primary/90'
                                    : 'text-foreground/60 hover:bg-primary/5 hover:text-primary'
                                }
              `}
                        >
                            <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-foreground/40 group-hover:text-primary'}`} />
                            <span className="font-semibold text-sm flex-1">{item.name}</span>
                            {item.badge && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${isActive ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
                                    {item.badge}
                                </span>
                            )}
                            {isActive && (
                                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm">
                <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-6 hover:bg-accent/5 text-foreground/60 hover:text-accent rounded-xl">
                    <LogOut className="w-5 h-5" />
                    <span className="font-bold text-sm">Sign Out</span>
                </Button>
            </div>
        </aside>
    );
}
