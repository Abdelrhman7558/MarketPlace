'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Box,
    ListPlus,
    ShoppingCart,
    MessageSquare,
    Bell,
    LogOut,
    Menu,
    X,
    Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { UserMenu } from '@/components/dashboard/UserMenu';

const SUPPLIER_LINKS = [
    { label: 'Business Overview', href: '/supplier', icon: LayoutDashboard },
    { label: 'Inventory Manager', href: '/supplier/products', icon: Box },
    { label: 'Offers & Ads', href: '/supplier/offers', icon: ListPlus },
    { label: 'My Sales', href: '/supplier/orders', icon: ShoppingCart },
    { label: 'Customer Chat', href: '/supplier/messages', icon: MessageSquare },
];


export default function SupplierLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(true);
    const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
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
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-black text-xs text-[#131921]">S</div>
                    )}
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white/60 hover:text-white transition-colors">
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto no-scrollbar">
                    {SUPPLIER_LINKS.map((link) => {
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
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <h2 className="text-white font-black tracking-tight text-xl">Business Hub</h2>
                            <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] leading-none mt-1">Direct Sales Access</p>
                        </div>

                        {/* Quick KPIs in Header */}
                        <div className="hidden lg:flex items-center gap-8 border-l border-white/10 pl-8">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Revenue (MTD)</span>
                                <span className="text-sm font-black text-white">$8,420.00</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Active Sales</span>
                                <span className="text-sm font-black text-emerald-400">12</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="p-2 rounded-xl hover:bg-white/5 transition-all outline-none"
                            >
                                <Bell size={20} className="text-white/60 group-hover:text-emerald-400 transition-colors" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#131921]" />
                            </button>

                            {/* Dropdown Notification Preview */}
                            <div className={cn(
                                "absolute top-full right-0 mt-4 w-80 bg-[#131921] border border-white/10 rounded-2xl shadow-2xl transition-all p-4 z-[100] origin-top-right",
                                isNotificationsOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
                            )}>
                                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Urgent Actions</h4>
                                <div className="space-y-3">
                                    <Link href="/supplier/orders" onClick={() => setIsNotificationsOpen(false)} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-emerald-500/50 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <p className="text-[10px] text-white/80 font-medium group-hover:text-emerald-400">New wholesale order received</p>
                                    </Link>
                                    <Link href="/supplier/messages" onClick={() => setIsNotificationsOpen(false)} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-emerald-500/50 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <p className="text-[10px] text-white/80 font-medium group-hover:text-emerald-400">New message from buyer</p>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="h-8 w-[1px] bg-white/10 mx-2" />

                        <UserMenu role="supplier" />
                    </div>
                </header>


                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 no-scrollbar relative">
                    <AnimatePresence>
                        {user?.status === 'PENDING_APPROVAL' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-50 bg-[#131921]/60 backdrop-blur-md flex items-center justify-center p-8"
                            >
                                <motion.div
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className="max-w-md w-full bg-[#131921] border border-white/10 rounded-[40px] p-10 text-center shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0" />

                                    <div className="w-20 h-20 bg-amber-500/10 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-amber-500/20">
                                        <Clock className="text-amber-500 animate-pulse" size={40} />
                                    </div>

                                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Registration Pending</h3>
                                    <p className="text-white/40 text-sm font-medium leading-relaxed mb-10">
                                        Your supplier application is currently under review by our administration team.
                                        You'll get full access to the vendor hub as soon as your account is verified.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 text-left">
                                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                                            <div>
                                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Current Status</p>
                                                <p className="text-xs font-bold text-white">Manual Verification in Progress</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => logout()}
                                            className="w-full py-4 text-[11px] font-black text-white/20 hover:text-white uppercase tracking-[0.2em] transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {children}
                </div>
            </main>
        </div>
    );
}
