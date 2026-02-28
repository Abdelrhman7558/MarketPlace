'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Settings,
    LogOut,
    ChevronDown,
    Shield,
    CreditCard,
    LayoutDashboard
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface UserMenuProps {
    role?: string;
}

export function UserMenu({ role }: UserMenuProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const { user, logout } = useAuth();
    const menuRef = React.useRef<HTMLDivElement>(null);

    // Detect if we're on the admin layout (white background) vs homepage (dark navbar)
    const isAdminLayout = role === 'admin' || role === 'supplier';

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = [
        {
            label: 'My Profile',
            icon: User,
            href: role === 'admin' ? '/admin/settings' : role === 'supplier' ? '/supplier/settings' : '/dashboard/customer'
        },
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            href: role === 'admin' ? '/admin' : '/supplier',
            hidden: role !== 'admin' && role !== 'supplier'
        },
        {
            label: 'Settings',
            icon: Settings,
            href: role === 'admin' ? '/admin/settings' : '/supplier/settings'
        },
        {
            label: 'Billing',
            icon: CreditCard,
            href: role === 'admin' ? '/admin/billing' : '/supplier/billing',
            hidden: role === 'admin'
        },
    ].filter(item => !item.hidden);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-3 p-1.5 rounded-2xl transition-all group border border-transparent",
                    isAdminLayout
                        ? "hover:bg-[#F3F3F3] hover:border-[#DDD]"
                        : "hover:bg-white/5 hover:border-white/10"
                )}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-[#FF8C33] flex items-center justify-center font-black text-[#131921] border-2 border-white/10 shadow-lg group-hover:scale-105 transition-transform overflow-hidden">
                        {user?.avatar ? (
                            <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} />
                        ) : (
                            user?.name?.[0] || 'U'
                        )}
                    </div>
                    <div className="text-left hidden lg:block">
                        <p className={cn(
                            "text-xs font-black group-hover:text-primary transition-colors",
                            isAdminLayout ? "text-[#0F1111]" : "text-white !important"
                        )}>{user?.name}</p>
                        <div className="flex items-center gap-1.5">
                            <div className={cn(
                                "w-1.5 h-1.5 rounded-full animate-pulse",
                                role === 'admin' ? "bg-primary" : role === 'supplier' ? "bg-emerald-500" : "bg-blue-500"
                            )} />
                            <span className={cn(
                                "text-[9px] font-black uppercase tracking-tighter",
                                role === 'admin' ? "text-primary" : role === 'supplier' ? "text-emerald-500" : "text-blue-500"
                            )}>
                                {role === 'admin' ? 'Super Admin' : role === 'supplier' ? 'Verified Supplier' : 'Partner'}
                            </span>
                        </div>
                    </div>
                </div>
                <ChevronDown
                    size={16}
                    className={cn(
                        "transition-all",
                        isAdminLayout ? "text-[#888] group-hover:text-[#0F1111]" : "text-white/60 group-hover:text-white !important",
                        isOpen && "rotate-180 text-primary"
                    )}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-4 w-64 bg-white border border-[#DDD] rounded-xl shadow-xl z-[100] overflow-hidden"
                    >
                        <div className="p-4 border-b border-[#EAEDED]">
                            <p className="text-[10px] font-black text-[#888] uppercase tracking-[0.2em] mb-3">Account</p>
                            <div className="flex items-center gap-3 px-2 py-1">
                                <div className="w-10 h-10 rounded-full bg-[#F3F3F3] flex items-center justify-center border border-[#DDD]">
                                    <Shield size={20} className={role === 'admin' ? "text-[#FF9900]" : "text-emerald-500"} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs font-black text-[#0F1111] truncate">{user?.name}</p>
                                    <p className="text-[10px] text-[#888] truncate">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#555] hover:text-[#0F1111] hover:bg-[#F3F3F3] transition-all group"
                                    >
                                        <Icon size={18} className="group-hover:scale-110 group-hover:text-[#FF9900] transition-all" />
                                        <span className="text-sm font-bold">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="p-2 bg-[#F9F9F9] border-t border-[#EAEDED]">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    logout();
                                    window.location.href = '/';
                                }}
                                className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-[#C40000] hover:bg-red-50 transition-all group"
                            >
                                <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                                <span className="text-sm font-bold">Sign Out</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
