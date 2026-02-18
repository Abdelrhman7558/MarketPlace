'use client';

import Sidebar from '@/components/layout/Sidebar';
import { LayoutDashboard, Package, ShoppingBag, Settings } from 'lucide-react';

const NAVIGATION = [
    { name: 'Overview', href: '/dashboard/supplier', icon: LayoutDashboard },
    { name: 'Products', href: '/dashboard/supplier/products', icon: Package },
    { name: 'Orders', href: '/dashboard/supplier/orders', icon: ShoppingBag },
    { name: 'Settings', href: '/dashboard/supplier/settings', icon: Settings },
];

export default function SupplierLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-[calc(100vh-64px)] bg-background-main">
            <Sidebar title="Supplier Portal" items={NAVIGATION} />
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
