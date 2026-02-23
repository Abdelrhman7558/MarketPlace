'use client';

import * as React from 'react';
import Link from 'next/link';
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
    Ticket
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { UserMenu } from '@/components/dashboard/UserMenu';

const ADMIN_LINKS = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Users & Approvals', href: '/admin/users', icon: Users },
    { label: 'Buyers', href: '/admin/buyers', icon: Users },
    { label: 'Suppliers', href: '/admin/suppliers', icon: Package },
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
];


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(true);
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <div className="flex h-screen bg-[#0A0D12] overflow-hidden transition-colors duration-500">
            {/* Sidebar */}
            <aside className={cn(
                "bg-[#131921] border-r border-white/5 transition-all duration-300 flex flex-col z-50",
                isOpen ? "w-64" : "w-20"
            )}>
                {/* Sidebar Header */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
                    {isOpen ? (
                        <Link href="/" className="font-heading font-black text-xl tracking-tighter text-white">
                            Market<span className="text-primary">Place</span>
                        </Link>
                    ) : (
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-black text-xs">M</div>
                    )}
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white/60 hover:text-white transition-colors">
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
                                        ? "bg-primary text-[#131921] font-bold shadow-lg shadow-primary/20"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon size={20} className={cn("transition-transform group-hover:scale-110", isActive ? "stroke-[2.5]" : "")} />
                                {isOpen && <span className="text-sm">{link.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => {
                            logout();
                            window.location.href = '/';
                        }}
                        className="flex items-center gap-4 px-4 py-3 w-full text-white/40 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all group"
                    >
                        <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                        {isOpen && <span className="text-sm font-bold">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header Row */}
                <header className="h-20 bg-[#131921]/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 z-40">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <h2 className="text-white font-black tracking-tight text-xl">Command Hub</h2>
                            <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] leading-none mt-1">Enterprise Administration</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Notification Bell */}
                        <button className="relative group p-2 rounded-xl hover:bg-white/5 transition-all">
                            <Bell size={20} className="text-white/60 group-hover:text-primary group-hover:rotate-12 transition-all" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#131921] animate-pulse" />

                            {/* Hover Notification Preview */}
                            <div className="absolute top-full right-0 mt-4 w-80 bg-[#131921] border border-white/10 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none translate-y-2 group-hover:translate-y-0 transition-all p-4 z-[100]">
                                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Urgent Actions</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                                        <p className="text-[10px] text-white/80 font-medium">3 new supplier approvals pending</p>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <p className="text-[10px] text-white/80 font-medium">New placement request for Hero Slot</p>
                                    </div>
                                </div>
                            </div>
                        </button>

                        <div className="h-8 w-[1px] bg-white/10 mx-2" />

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
