'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Users, Package, DollarSign, Clock, TrendingUp, ArrowUpRight, ArrowDownRight, UserCheck, ShoppingCart } from 'lucide-react';

const STATS = [
    { label: 'Total Users', value: '1,284', trend: '+12%', up: true, icon: Users, color: 'text-primary' },
    { label: 'Verified Suppliers', value: '48', trend: '+5%', up: true, icon: Package, color: 'text-blue-400' },
    { label: 'Total Revenue', value: '$124,500', trend: '+18%', up: true, icon: DollarSign, color: 'text-emerald-400' },
    { label: 'Pending Approvals', value: '14', trend: 'High', up: true, icon: Clock, color: 'text-amber-400' },
    { label: 'Active Placements', value: '8', trend: 'Stable', up: true, icon: TrendingUp, color: 'text-purple-400' },
    { label: 'Orders Today', value: '156', trend: '+22%', up: true, icon: ShoppingCart, color: 'text-primary' },
];

export default function AdminOverviewPage() {
    return (
        <div className="space-y-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white tracking-tight">System Overview</h1>
                    <p className="text-white/40 font-medium">Real-time data for the MarketPlace ecosystem.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-2.5 bg-primary text-[#131921] font-black text-sm rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                        Generate Report
                    </button>
                    <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-sm rounded-xl transition-colors border border-white/5">
                        Export CSV
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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#131921] p-6 rounded-2xl border border-white/5 layered-3d-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                                    <Icon size={24} />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-black ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {stat.trend}
                                    {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-white tracking-tight">{stat.value}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-[#131921] rounded-3xl border border-white/5 p-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                            <TrendingUp className="text-primary" /> Active Placements
                        </h3>
                        <button className="text-xs font-bold text-white/40 hover:text-white transition-colors">View All</button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/20 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden border border-white/10">
                                        <img src={`https://images.unsplash.com/photo-1543256283-42c206511a76?w=100`} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">Premium Energy Bundle</p>
                                        <p className="text-[11px] text-white/40">Supplier: BeverageGroup Inc.</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                                        <span className="text-[10px] text-primary font-black uppercase">Live in Hero</span>
                                    </div>
                                    <p className="text-[11px] text-white/40 mt-1">Exp: 02 Mar 2026</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Approval Panel */}
                <div className="bg-[#131921] rounded-3xl border border-white/5 p-8 space-y-8">
                    <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                        <UserCheck className="text-amber-400" /> Pending Approval
                    </h3>

                    <div className="space-y-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 font-bold">JD</div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-bold text-white leading-none">John Doe</p>
                                        <p className="text-[11px] text-white/40 mt-1">john.doe@example.com</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-xs rounded-lg transition-colors border border-emerald-500/20">
                                        Approve
                                    </button>
                                    <button className="py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs rounded-lg transition-colors border border-red-500/20">
                                        Reject
                                    </button>
                                </div>
                                {item !== 3 && <div className="h-[1px] bg-white/5" />}
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold text-sm rounded-xl transition-colors border border-white/5">
                        Manage All Users
                    </button>
                </div>
            </div>
        </div>
    );
}
