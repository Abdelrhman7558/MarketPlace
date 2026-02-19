'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut,
    TrendingUp, DollarSign, Archive, Bell
} from 'lucide-react';

const SUPPLIER_ITEMS = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard/supplier' },
    { name: 'Products', icon: Package, href: '/dashboard/supplier/products' },
    { name: 'Orders', icon: ShoppingCart, href: '/dashboard/supplier/orders' },
    { name: 'Customers', icon: Users, href: '/dashboard/supplier/customers' },
    { name: 'Analytics', icon: TrendingUp, href: '/dashboard/supplier/analytics' },
    { name: 'Settings', icon: Settings, href: '/dashboard/supplier/settings' },
];

const BUYER_ITEMS = [
    { name: 'My Orders', icon: ShoppingCart, href: '/dashboard/buyer' },
    { name: 'Reorder', icon: Archive, href: '/dashboard/buyer/reorder' },
    { name: 'Notifications', icon: Bell, href: '/dashboard/buyer/notifications' },
    { name: 'Settings', icon: Settings, href: '/dashboard/buyer/settings' },
];

const ADMIN_ITEMS = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard/super-admin-7bd0' },
    { name: 'All Users', icon: Users, href: '/dashboard/super-admin-7bd0/users' },
    { name: 'All Orders', icon: ShoppingCart, href: '/dashboard/super-admin-7bd0/orders' },
    { name: 'Settings', icon: Settings, href: '/dashboard/super-admin-7bd0/settings' },
];

export default function Sidebar({ role = 'supplier' }: { role?: 'supplier' | 'buyer' | 'admin' }) {
    const pathname = usePathname();

    let items = SUPPLIER_ITEMS;
    if (role === 'buyer') items = BUYER_ITEMS;
    if (role === 'admin') items = ADMIN_ITEMS;

    return (
        <aside className="w-64 bg-brand-navy text-white min-h-screen hidden md:flex flex-col flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center font-bold">MP</div>
                <div>
                    <h2 className="text-lg font-bold tracking-tight leading-none text-white">MarketPlace</h2>
                    <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wider">{role}</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${isActive
                                ? 'bg-brand-orange text-white shadow-lg'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white transition-colors'}`} />
                            <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-white/10 mt-auto">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group">
                    <LogOut className="w-5 h-5 text-gray-500 group-hover:text-white" />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
