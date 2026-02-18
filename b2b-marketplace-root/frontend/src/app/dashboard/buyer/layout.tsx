'use client';

import Sidebar from '@/components/layout/Sidebar';
import { LayoutDashboard, ShoppingBag, UserCircle } from 'lucide-react';

const NAVIGATION = [
    { name: 'Overview', href: '/dashboard/buyer', icon: LayoutDashboard },
    { name: 'Orders', href: '/dashboard/buyer/orders', icon: ShoppingBag },
    { name: 'Profile', href: '/dashboard/buyer/profile', icon: UserCircle },
];

export default function BuyerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-[calc(100vh-64px)] bg-background-main">
            <Sidebar title="Buyer Portal" items={NAVIGATION} />
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
