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
    avatar?: string;
}



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
                    // Only show real Suppliers and Buyers, not ADMIN users
                    setPendingUsers(data.filter(u => u.status === 'PENDING_APPROVAL' && u.role !== 'ADMIN'));
                }
            } catch (error) {
                console.error("Failed to fetch pending users", error);
            }
        };
        fetchPendingUsers();
    }, []);

    const [revenueData, setRevenueData] = React.useState<any[]>([]);
    const [activePlacements, setActivePlacements] = React.useState<any[]>([]);

    const STATS = [
        { label: 'Total Revenue', value: '$124,500', trend: '+12.5%', up: true, icon: DollarSign, color: 'text-emerald-400' },
        { label: 'Active Placements', value: activePlacements.length.toString(), trend: '+5.2%', up: true, icon: Package, color: 'text-blue-400' },
        { label: 'Pending Approvals', value: pendingUsers.length.toString(), trend: pendingUsers.length > 5 ? 'High' : 'Stable', up: pendingUsers.length > 0, icon: Clock, color: 'text-amber-400' },
        { label: 'Total Users', value: '1,240', trend: '+18.2%', up: true, icon: Users, color: 'text-indigo-400' }
    ];

    return (
        <div className="space-y-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-foreground tracking-tight">System Overview</h1>
                    <p className="text-muted-foreground font-medium">Real-time data for the Atlantis ecosystem.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-2.5 bg-primary text-primary-foreground font-black text-sm rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                        Generate Report
                    </button>
                    <button className="px-6 py-2.5 bg-muted/50 hover:bg-muted text-foreground font-bold text-sm rounded-xl transition-colors border border-border/50">
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
                            className="bg-card p-6 rounded-2xl border border-border/50 layered-3d-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center ${stat.color}`}>
                                    <Icon size={24} />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-black ${stat.up ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {stat.trend}
                                    {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-foreground tracking-tight">{stat.value}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-3 bg-card rounded-3xl border border-border/50 p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-foreground tracking-tight flex items-center gap-3">
                            <BarChart3 className="text-primary" /> Revenue Overview
                        </h3>
                    </div>
                    <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded-xl border border-border/50 border-dashed">
                        <span className="text-muted-foreground font-medium">Detailed Revenue Charts (Data pending)</span>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-card rounded-3xl border border-border/50 p-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-foreground tracking-tight flex items-center gap-3">
                            <TrendingUp className="text-primary" /> Active Placements
                        </h3>
                        <button className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">View All</button>
                    </div>

                    <div className="space-y-4">
                        {activePlacements.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl border border-border/50 group hover:border-primary/20 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden border border-border/50">
                                        {item.imgUrl ? (
                                            <img src={item.imgUrl} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground"><Package size={20} /></div>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.productName || 'Unknown Product'}</p>
                                        <p className="text-[11px] text-muted-foreground">Supplier: {item.supplierName || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                                        <span className="text-[10px] text-primary font-black uppercase">Live in {item.category || 'Placement'}</span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground mt-1">Exp: {item.endDate || 'TBD'}</p>
                                </div>
                            </div>
                        ))}
                        {activePlacements.length === 0 && (
                            <div className="text-center py-6 text-muted-foreground text-sm">
                                No active placements.
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Approval Panel */}
                <div className="bg-card rounded-3xl border border-border/50 p-8 space-y-8">
                    <h3 className="text-xl font-black text-foreground tracking-tight flex items-center gap-3">
                        <UserCheck className="text-amber-500" /> Pending Approval
                    </h3>

                    <div className="space-y-6">
                        {pendingUsers.slice(0, 3).map((user, idx) => (
                            <div key={user.id} className="space-y-4">
                                <div className="flex items-center gap-4">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-primary/30" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground font-bold uppercase">
                                            {user.name.substring(0, 2)}
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <p className="text-sm font-bold text-foreground leading-none">{user.name}</p>
                                        <p className="text-[11px] text-muted-foreground mt-1">{user.email}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 font-bold text-xs rounded-lg transition-colors border border-emerald-500/20">
                                        Approve
                                    </button>
                                    <button className="py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold text-xs rounded-lg transition-colors border border-red-500/20">
                                        Reject
                                    </button>
                                </div>
                                {idx !== pendingUsers.slice(0, 3).length - 1 && <div className="h-[1px] bg-border/50" />}
                            </div>
                        ))}
                        {pendingUsers.length === 0 && (
                            <div className="text-center py-6 text-muted-foreground text-sm">
                                No pending approvals.
                            </div>
                        )}
                    </div>

                    <button className="w-full py-4 bg-muted/50 hover:bg-muted text-foreground font-bold text-sm rounded-xl transition-colors border border-border/50">
                        Manage All Users
                    </button>
                </div>
            </div>
        </div>
    );
}
