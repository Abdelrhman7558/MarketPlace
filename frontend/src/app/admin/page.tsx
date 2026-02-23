'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Users, Package, DollarSign, Clock, TrendingUp, ArrowUpRight, ArrowDownRight, UserCheck, ShoppingCart, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
}

const INITIAL_STATS = [
    { label: 'Total Users', value: '1,284', trend: '+12%', up: true, icon: Users, color: 'text-primary' },
    { label: 'Verified Suppliers', value: '48', trend: '+5%', up: true, icon: Package, color: 'text-blue-400' },
    { label: 'Total Revenue', value: '$124,500', trend: '+18%', up: true, icon: DollarSign, color: 'text-emerald-400' },
    { label: 'Active Placements', value: '8', trend: 'Stable', up: true, icon: TrendingUp, color: 'text-purple-400' },
    { label: 'Orders Today', value: '156', trend: '+22%', up: true, icon: ShoppingCart, color: 'text-primary' },
];

export default function AdminOverviewPage() {
    const [pendingUsers, setPendingUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        const fetchPendingUsers = async () => {
            try {
                const token = localStorage.getItem('bev-token');
                const res = await fetch('http://localhost:3005/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data: User[] = await res.json();
                    setPendingUsers(data.filter(u => u.status === 'PENDING_APPROVAL'));
                }
            } catch (error) {
                console.error("Failed to fetch pending users", error);
            }
        };
        fetchPendingUsers();
    }, []);

    const STATS = [
        ...INITIAL_STATS.slice(0, 3),
        { label: 'Pending Approvals', value: pendingUsers.length.toString(), trend: pendingUsers.length > 5 ? 'High' : 'Stable', up: pendingUsers.length > 0, icon: Clock, color: 'text-amber-400' },
        ...INITIAL_STATS.slice(3)
    ];

    const REVENUE_DATA = [
        { name: 'Mon', revenue: 4200 },
        { name: 'Tue', revenue: 3800 },
        { name: 'Wed', revenue: 5100 },
        { name: 'Thu', revenue: 4800 },
        { name: 'Fri', revenue: 6200 },
        { name: 'Sat', revenue: 7500 },
        { name: 'Sun', revenue: 8100 },
    ];

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
                {/* Revenue Chart */}
                <div className="lg:col-span-3 bg-[#131921] rounded-3xl border border-white/5 p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                            <BarChart3 className="text-primary" /> Revenue Overview
                        </h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                                <XAxis dataKey="name" stroke="#666" tick={{ fill: '#666', fontSize: 12 }} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" tick={{ fill: '#666', fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#131921', borderColor: '#333', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                    formatter={(value: any) => [`$${value}`, 'Revenue']}
                                />
                                <Line type="monotone" dataKey="revenue" stroke="#CCFF00" strokeWidth={3} dot={{ r: 4, fill: '#131921', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#CCFF00' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

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
                        {pendingUsers.slice(0, 3).map((user, idx) => (
                            <div key={user.id} className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 font-bold uppercase">
                                        {user.name.substring(0, 2)}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-bold text-white leading-none">{user.name}</p>
                                        <p className="text-[11px] text-white/40 mt-1">{user.email}</p>
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
                                {idx !== pendingUsers.slice(0, 3).length - 1 && <div className="h-[1px] bg-white/5" />}
                            </div>
                        ))}
                        {pendingUsers.length === 0 && (
                            <div className="text-center py-6 text-white/40 text-sm">
                                No pending approvals.
                            </div>
                        )}
                    </div>

                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold text-sm rounded-xl transition-colors border border-white/5">
                        Manage All Users
                    </button>
                </div>
            </div>
        </div>
    );
}
