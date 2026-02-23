'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, UserCircle2, Mail, Link as LinkIcon, Download, MoreVertical, X, Settings2, Shield, CircleDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Buyer {
    id: string;
    companyName: string;
    contactName: string;
    email: string;
    totalOrders: number;
    lifetimeValue: number;
    status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
    joinDate: string;
    tier: 'ENTERPRISE' | 'PRO' | 'BASIC';
}

export default function AdminBuyersPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedBuyer, setSelectedBuyer] = React.useState<Buyer | null>(null);

    const [buyers, setBuyers] = React.useState<Buyer[]>([
        {
            id: 'BY-001',
            companyName: 'Global Foods Retail',
            contactName: 'Sarah Jenkins',
            email: 'procurement@globalfoods.com',
            totalOrders: 142,
            lifetimeValue: 1250000,
            status: 'ACTIVE',
            joinDate: '2025-01-15',
            tier: 'ENTERPRISE'
        },
        {
            id: 'BY-002',
            companyName: 'Tech Startups Hub',
            contactName: 'Michael Chen',
            email: 'm.chen@techhub.io',
            totalOrders: 45,
            lifetimeValue: 85000,
            status: 'ACTIVE',
            joinDate: '2025-06-22',
            tier: 'PRO'
        },
        {
            id: 'BY-003',
            companyName: 'Local Grocers Union',
            contactName: 'Robert Smith',
            email: 'orders@localgrocers.net',
            totalOrders: 12,
            lifetimeValue: 15400,
            status: 'PENDING',
            joinDate: '2026-02-10',
            tier: 'BASIC'
        },
    ]);

    const filteredBuyers = buyers.filter(b =>
        b.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.contactName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white tracking-tight">Enterprise Buyers</h1>
                    <p className="text-white/40 font-medium">Manage procurement corporate accounts, order history, and account tiers.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input
                            type="text"
                            placeholder="Search buyers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-12 pl-12 pr-6 bg-[#131921] rounded-xl border border-white/5 outline-none focus:border-primary/50 text-white text-sm w-[250px] transition-all"
                        />
                    </div>
                    <button className="h-12 w-12 bg-[#131921] rounded-xl border border-white/5 flex items-center justify-center text-white hover:border-primary/50 transition-all">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Top Metrics Map */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#131921] p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                    <div className="relative z-10 flex items-center gap-5">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <Building2 size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Total Buyers</p>
                            <p className="text-3xl font-black text-white mt-1">2,410</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#131921] p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
                    <div className="relative z-10 flex items-center gap-5">
                        <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                            <CircleDollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Avg. Lifetime Value</p>
                            <p className="text-3xl font-black text-white mt-1">$45.2K</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#131921] p-6 rounded-3xl border border-emerald-500/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Active Procurement</p>
                            <p className="text-3xl font-black text-white mt-1">1,894</p>
                            <p className="text-xs text-emerald-400/60 font-medium mt-1">+12% this week</p>
                        </div>
                        <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse border-2 border-[#131921]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Buyers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredBuyers.map((buyer) => (
                        <motion.div
                            key={buyer.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#131921] rounded-3xl border border-white/5 p-8 relative group hover:border-primary/30 transition-all cursor-pointer overflow-hidden"
                            onClick={() => setSelectedBuyer(buyer)}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-[#1A222C] rounded-2xl flex items-center justify-center border border-white/5">
                                        <Building2 size={24} className="text-white/40" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-white text-lg">{buyer.companyName}</h3>
                                        <p className="text-xs text-white/40 font-medium">{buyer.id}</p>
                                    </div>
                                </div>
                                <div className={cn(
                                    "px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border",
                                    buyer.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                        buyer.status === 'PENDING' ? "bg-amber-400/10 text-amber-400 border-amber-400/20" :
                                            "bg-red-500/10 text-red-500 border-red-500/20"
                                )}>
                                    {buyer.status}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-white/5 rounded-2xl">
                                <div>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Total Orders</p>
                                    <p className="font-black text-white text-lg">{buyer.totalOrders}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Lifetime Value</p>
                                    <p className="font-black text-primary text-lg">${(buyer.lifetimeValue / 1000).toFixed(1)}K</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Shield size={10} className="text-primary" />
                                    </div>
                                    <span className="text-[10px] uppercase font-black tracking-widest text-primary">{buyer.tier}</span>
                                </div>
                                <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-white/40 hover:text-white transition-all">
                                    <MoreVertical size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Selected Buyer Details Sidebar (Overlay) */}
            <AnimatePresence>
                {selectedBuyer && (
                    <div className="fixed inset-0 z-[100] flex justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedBuyer(null)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="bg-[#131921] w-full max-w-xl h-full relative z-10 border-l border-white/10 shadow-2xl overflow-y-auto no-scrollbar"
                        >
                            <div className="sticky top-0 bg-[#131921]/80 backdrop-blur-xl border-b border-white/5 p-6 flex items-center justify-between z-20">
                                <h2 className="text-xl font-black text-white">Buyer Profile</h2>
                                <button onClick={() => setSelectedBuyer(null)} className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8 space-y-10">
                                {/* Buyer Identity */}
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 bg-[#1A222C] rounded-3xl flex items-center justify-center border border-white/5 relative">
                                        <Building2 size={32} className="text-white/20" />
                                        <div className={cn(
                                            "absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-[#131921]",
                                            selectedBuyer.status === 'ACTIVE' ? "bg-emerald-400" :
                                                selectedBuyer.status === 'PENDING' ? "bg-amber-400" : "bg-red-500"
                                        )} />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-black text-white">{selectedBuyer.companyName}</h1>
                                        <p className="text-sm font-medium text-white/40 flex items-center gap-2 mt-2">
                                            <Shield size={14} className="text-primary" /> {selectedBuyer.tier} Partner
                                        </p>
                                    </div>
                                </div>

                                {/* Contact Details */}
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Contact Information</h3>
                                    <div className="bg-white/5 rounded-2xl p-4 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/60">
                                                <UserCircle2 size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Primary Contact</p>
                                                <p className="text-sm font-bold text-white">{selectedBuyer.contactName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/60">
                                                <Mail size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Corporate Email</p>
                                                <p className="text-sm font-bold text-white flex items-center gap-2">
                                                    {selectedBuyer.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div className="pt-8 border-t border-white/5">
                                    <h3 className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-4">Danger Zone</h3>
                                    <div className="border border-red-500/20 rounded-2xl p-6 bg-red-500/5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-white">Suspend Account</p>
                                                <p className="text-xs text-white/50 mt-1">Temporarily block all procurement access.</p>
                                            </div>
                                            <button className="h-10 px-6 bg-red-500/20 hover:bg-red-500/30 text-red-500 font-black text-xs uppercase tracking-widest rounded-xl transition-all">
                                                Suspend
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
