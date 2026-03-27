'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Eye, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/currency';

// ----- Mock data (replace with real API calls) -----
const revenueData = [
    { month: 'Jan', revenue: 4200, orders: 38 },
    { month: 'Feb', revenue: 5800, orders: 52 },
    { month: 'Mar', revenue: 4900, orders: 44 },
    { month: 'Apr', revenue: 7200, orders: 68 },
    { month: 'May', revenue: 6100, orders: 55 },
    { month: 'Jun', revenue: 8420, orders: 78 },
    { month: 'Jul', revenue: 9100, orders: 85 },
];

const categoryData = [
    { name: 'Electronics', value: 38 },
    { name: 'Industrial', value: 27 },
    { name: 'Packaging', value: 19 },
    { name: 'Chemicals', value: 10 },
    { name: 'Other', value: 6 },
];

const PIE_COLORS = ['#FF9900', '#FF6B35', '#10b981', '#3b82f6', '#8b5cf6'];

const topViewedProducts = [
    { name: 'Heavy-Duty Pallets (Set of 10)', views: 1240, orders: 87 },
    { name: 'Industrial Grade Epoxy 5L', views: 980, orders: 64 },
    { name: 'Corrugated Boxes 40x30x20', views: 830, orders: 112 },
    { name: 'Stainless Steel Bolts M12', views: 720, orders: 55 },
    { name: 'Bubble Wrap Roll 100m', views: 610, orders: 43 },
];

const KPI_CARDS = [
    {
        label: 'Total Revenue (YTD)',
        value: '$45,720',
        trend: '+24.8%',
        up: true,
        icon: DollarSign,
        color: 'emerald',
        sub: 'vs last year',
    },
    {
        label: 'Total Orders',
        value: '420',
        trend: '+18.2%',
        up: true,
        icon: ShoppingCart,
        color: 'blue',
        sub: 'vs last year',
    },
    {
        label: 'Total Impressions',
        value: '28.4k',
        trend: '+31%',
        up: true,
        icon: Eye,
        color: 'purple',
        sub: 'product page views',
    },
    {
        label: 'Active Products',
        value: '24',
        trend: '-2',
        up: false,
        icon: Package,
        color: 'orange',
        sub: 'in marketplace',
    },
];

const COLOR_MAP: Record<string, string> = {
    emerald: 'text-emerald-500 bg-emerald-500/10',
    blue: 'text-blue-500 bg-blue-500/10',
    purple: 'text-purple-500 bg-purple-500/10',
    orange: 'text-[#FF9900] bg-[#FF9900]/10',
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-xl text-sm">
            <p className="font-black text-foreground mb-1">{label}</p>
            {payload.map((p: any) => (
                <p key={p.name} style={{ color: p.color }} className="font-bold">
                    {p.name === 'revenue' ? formatPrice(p.value) : `${p.value} orders`}
                </p>
            ))}
        </div>
    );
};

export default function SupplierAnalyticsPage() {
    const [period, setPeriod] = React.useState<'7d' | '30d' | '90d' | 'ytd'>('ytd');

    return (
        <div className="space-y-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-foreground tracking-tight">Analytics</h1>
                    <p className="text-muted-foreground font-medium">Deep dive into your sales performance and trends.</p>
                </div>
                {/* Period Selector */}
                <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-xl border border-border/50">
                    {(['7d', '30d', '90d', 'ytd'] as const).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={cn(
                                'px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all',
                                period === p
                                    ? 'bg-card text-foreground shadow-sm border border-border/50'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                        >
                            {p === 'ytd' ? 'Year' : p}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {KPI_CARDS.map((kpi, i) => {
                    const Icon = kpi.icon;
                    return (
                        <motion.div
                            key={kpi.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', COLOR_MAP[kpi.color])}>
                                    <Icon size={20} />
                                </div>
                                <span className={cn(
                                    'flex items-center gap-0.5 text-[10px] font-black uppercase tracking-tighter',
                                    kpi.up ? 'text-emerald-500' : 'text-red-500'
                                )}>
                                    {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {kpi.trend}
                                </span>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{kpi.label}</p>
                            <p className="text-2xl font-black text-foreground tracking-tight mt-1">{kpi.value}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">{kpi.sub}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Revenue & Orders Chart */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-3xl border border-border/50 p-8 shadow-sm"
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                            <TrendingUp size={20} className="text-[#FF9900]" /> Revenue & Orders Over Time
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Monthly breakdown of revenue generated and orders fulfilled</p>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF9900" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#FF9900" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="revenue" stroke="#FF9900" strokeWidth={2.5} fill="url(#gradRevenue)" name="revenue" />
                        <Area type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gradOrders)" name="orders" />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Bottom Row: Category Breakdown + Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-card rounded-3xl border border-border/50 p-8 shadow-sm"
                >
                    <h3 className="text-lg font-black text-foreground mb-1">Sales by Category</h3>
                    <p className="text-xs text-muted-foreground mb-6">Distribution of your product categories</p>
                    <div className="flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={90}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {categoryData.map((_, index) => (
                                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [`${value}%`, 'Share']}
                                    contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12 }}
                                />
                                <Legend
                                    iconType="circle"
                                    iconSize={8}
                                    formatter={(value) => <span style={{ fontSize: 11, fontWeight: 700 }}>{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Top Viewed Products Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-card rounded-3xl border border-border/50 p-8 shadow-sm"
                >
                    <h3 className="text-lg font-black text-foreground mb-1">Top Viewed Products</h3>
                    <p className="text-xs text-muted-foreground mb-6">Page views vs orders for your best-performing listings</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={topViewedProducts} layout="vertical" margin={{ left: 0, right: 10, top: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
                            <XAxis type="number" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={130}
                                tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => v.length > 18 ? v.slice(0, 18) + '…' : v}
                            />
                            <Tooltip
                                contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12 }}
                            />
                            <Bar dataKey="views" fill="#FF9900" radius={[0, 6, 6, 0]} name="Views" />
                            <Bar dataKey="orders" fill="#10b981" radius={[0, 6, 6, 0]} name="Orders" />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
}
