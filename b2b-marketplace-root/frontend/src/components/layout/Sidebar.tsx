'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingBag, Settings, UserCircle, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { slideInRight } from '@/lib/motion';

interface SidebarItem {
    name: string;
    href: string;
    icon?: any;
}

interface SidebarProps {
    title: string;
    items: SidebarItem[];
}

export default function Sidebar({ title, items }: SidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <motion.div
            animate={{ width: collapsed ? 80 : 256 }}
            className="bg-white border-r border-slate-200 h-full flex flex-col sticky top-16 z-30 transition-all duration-300"
            style={{ height: 'calc(100vh - 64px)' }} // precise height accounting for navbar
        >
            {/* Header */}
            <div className={`p-6 border-b border-slate-100 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
                {!collapsed && (
                    <h2 className="text-lg font-bold text-primary truncate">{title}</h2>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 rounded hover:bg-slate-100 text-slate-500"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon || LayoutDashboard;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative
                ${isActive
                                    ? 'bg-primary/5 text-primary'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
                            title={collapsed ? item.name : ''}
                        >
                            <Icon size={20} className={isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'} />
                            {!collapsed && <span>{item.name}</span>}
                            {isActive && !collapsed && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute right-0 top-0 bottom-0 w-1 bg-primary rounded-l-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-slate-100">
                <button className={`
            flex items-center gap-3 px-3 py-2 w-full text-slate-500 hover:text-status-error hover:bg-red-50 rounded-lg transition-colors
            ${collapsed ? 'justify-center' : ''}
        `}>
                    <LogOut size={20} />
                    {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
                </button>
            </div>
        </motion.div>
    );
}
