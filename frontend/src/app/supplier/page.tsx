'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Package, ShoppingCart, Eye, TrendingUp, ArrowUpRight, Plus, Box } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function SupplierOverviewPage() {
    const { user } = useAuth();

    const STATS = [
        { label: 'Revenue (MTD)', value: '$8,420.00', trend: '+18.4%', up: true, icon: BarChart3, color: 'text-emerald-400' },
        { label: 'Active Products', value: '24', trend: 'Stable', up: true, icon: Package, color: 'text-primary' },
        { label: 'Total Orders', value: '156', trend: '+22%', up: true, icon: ShoppingCart, color: 'text-blue-400' },
        { label: 'Digital Impressions', value: '4.2k', trend: '+12%', up: true, icon: Eye, color: 'text-purple-400' },
    ];

    return (
        <div className="space-y-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white tracking-tight">Business Hub</h1>
                    <p className="text-white/40 font-medium">Performance metrics for your wholesale catalog.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-2.5 bg-primary text-[#131921] font-black text-sm rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/20 flex items-center gap-2">
                        <Plus size={18} strokeWidth={3} /> Add New Product
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#131921] p-6 rounded-2xl border border-white/5 layered-3d-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                                    <Icon size={24} />
                                </div>
                                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {stat.trend} <ArrowUpRight size={14} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-white tracking-tight">{stat.value}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders Table Mock */}
                <div className="lg:col-span-2 bg-[#131921] rounded-3xl border border-white/5 p-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                            <TrendingUp className="text-primary" /> Recent Sales
                        </h3>
                        <button className="text-xs font-bold text-white/40 hover:text-white transition-colors">View Sales Report</button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((order) => (
                            <div key={order} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-emerald-500/20 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-white/40 font-black border border-white/5">
                                        #{1200 + order}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Case of Sparkling Water (x10)</p>
                                        <p className="text-[11px] text-white/40">Buyer: Store Front #44 • Today, 10:24 AM</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-white">$450.00</p>
                                    <div className="inline-flex items-center gap-1.5 mt-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tight">Confirmed</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Placement Banner */}
                <div className="bg-gradient-to-br from-primary to-[#FF8C33] rounded-3xl p-8 flex flex-col justify-between text-[#131921] layered-3d-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12">
                        <Box size={140} strokeWidth={1} />
                    </div>

                    <div className="relative z-10 space-y-4">
                        <h3 className="text-2xl font-black leading-tight tracking-tighter">Boost your product visibility.</h3>
                        <p className="text-sm font-bold leading-relaxed opacity-80">
                            Get your items featured on the global homepage and reaching over 5k+ daily buyers.
                        </p>
                    </div>

                    <button className="relative z-10 w-full py-4 bg-[#131921] text-white font-black text-sm rounded-2xl hover:scale-[1.02] transition-transform shadow-xl">
                        Request Placement
                    </button>
                </div>
            </div>
        </div>
    );
}
