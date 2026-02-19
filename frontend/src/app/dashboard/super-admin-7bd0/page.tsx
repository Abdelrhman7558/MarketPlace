'use client';

import { useState } from 'react';
import { DollarSign, Users, ShoppingCart, TrendingUp, TrendingDown, ArrowUp, ArrowDown, Package, Eye, MoreHorizontal } from 'lucide-react';

const KPIS = [
    { title: "Total Revenue", value: "$124,539", change: "+12.5%", trend: "up" as const, icon: DollarSign, gradient: "from-green-500 to-emerald-600" },
    { title: "Total Orders", value: "1,842", change: "+23", trend: "up" as const, icon: ShoppingCart, gradient: "from-blue-500 to-indigo-600" },
    { title: "Active Users", value: "342", change: "+18", trend: "up" as const, icon: Users, gradient: "from-purple-500 to-violet-600" },
    { title: "Profit/Loss", value: "+$32,450", change: "+8.2%", trend: "up" as const, icon: TrendingUp, gradient: "from-brand-orange to-brand-red" },
];

const RECENT_ORDERS = [
    { id: '#ORD-2301', customer: 'Ahmed Hassan', product: 'Coca-Cola 330ml x24', total: '$444.00', status: 'Delivered', date: 'Feb 19' },
    { id: '#ORD-2300', customer: 'Mohamed Ali', product: 'Red Bull 250ml x24', total: '$768.00', status: 'Processing', date: 'Feb 19' },
    { id: '#ORD-2299', customer: 'Sara Ibrahim', product: 'Pepsi Max x24', total: '$350.00', status: 'Shipped', date: 'Feb 18' },
    { id: '#ORD-2298', customer: 'Youssef Khaled', product: 'Nestle Water x12', total: '$90.00', status: 'Pending', date: 'Feb 18' },
    { id: '#ORD-2297', customer: 'Nour ElDin', product: 'Monster Energy x12', total: '$288.00', status: 'Delivered', date: 'Feb 17' },
];

const TOP_PRODUCTS = [
    { name: 'Coca-Cola Original 330ml', brand: 'Coca-Cola', sold: 342, revenue: '$6,327', image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=100&h=100&fit=crop' },
    { name: 'Red Bull 250ml', brand: 'Red Bull', sold: 256, revenue: '$8,192', image: 'https://images.unsplash.com/photo-1613915617612-f660234e856c?w=100&h=100&fit=crop' },
    { name: 'Pepsi Max 330ml', brand: 'Pepsi', sold: 198, revenue: '$3,465', image: 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=100&h=100&fit=crop' },
];

const STATUS_COLORS: Record<string, string> = {
    'Delivered': 'bg-green-100 text-green-700',
    'Processing': 'bg-blue-100 text-blue-700',
    'Shipped': 'bg-purple-100 text-purple-700',
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Cancelled': 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {KPIS.map((kpi, i) => (
                    <div
                        key={i}
                        className="stat-card opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`bg-gradient-to-r ${kpi.gradient} p-3 rounded-xl group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                                <kpi.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${kpi.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {kpi.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                {kpi.change}
                            </span>
                        </div>
                        <h3 className="text-text-muted text-sm font-medium mb-1">{kpi.title}</h3>
                        <p className="text-3xl font-extrabold text-brand-navy">{kpi.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card p-6 overflow-hidden animate-fade-in-up animation-delay-300">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-brand-navy text-lg">Revenue Overview</h3>
                            <p className="text-text-muted text-xs mt-0.5">Last 12 weeks performance</p>
                        </div>
                        <div className="flex gap-2">
                            {['Weekly', 'Monthly'].map(t => (
                                <button key={t} className="text-xs font-semibold px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-brand-orange hover:text-white transition-all">{t}</button>
                            ))}
                        </div>
                    </div>

                    <div className="h-72 flex items-end justify-between gap-2 md:gap-3 border-b border-gray-100 pb-3">
                        {[35, 58, 42, 72, 55, 85, 62, 90, 78, 88, 72, 95].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer h-full relative">
                                <div
                                    className="bg-gradient-to-t from-brand-navy to-brand-blue-light/70 hover:from-brand-orange hover:to-brand-orange-hover rounded-t-md w-full transition-all duration-500 relative group-hover:shadow-lg"
                                    style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
                                >
                                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[10px] px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg z-10 font-bold">
                                        ${(h * 1320).toLocaleString()}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-navy rotate-45" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-3 text-[10px] text-text-muted font-medium uppercase tracking-wide">
                        {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'].map(w => (
                            <span key={w}>{w}</span>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 animate-fade-in-up animation-delay-400">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-brand-navy text-lg">Top Products</h3>
                        <button className="text-xs text-brand-orange font-semibold hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {TOP_PRODUCTS.map((prod, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer">
                                <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-brand-navy truncate">{prod.name}</p>
                                    <p className="text-[11px] text-text-muted">{prod.brand} · {prod.sold} sold</p>
                                </div>
                                <span className="text-sm font-bold text-green-600">{prod.revenue}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden animate-fade-in-up animation-delay-500">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-brand-navy text-lg">Recent Orders</h3>
                        <p className="text-text-muted text-xs mt-0.5">Latest transactions across the platform</p>
                    </div>
                    <a href="/dashboard/super-admin-7bd0/orders" className="text-sm text-brand-orange font-semibold hover:underline">View All →</a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs text-text-muted uppercase tracking-wider border-b border-gray-100">
                                <th className="px-6 py-4 font-semibold">Order ID</th>
                                <th className="px-6 py-4 font-semibold">Customer</th>
                                <th className="px-6 py-4 font-semibold hidden md:table-cell">Product</th>
                                <th className="px-6 py-4 font-semibold">Total</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold hidden sm:table-cell">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RECENT_ORDERS.map((order, i) => (
                                <tr key={i} className="table-row-animate border-b border-gray-50 last:border-0">
                                    <td className="px-6 py-4 text-sm font-bold text-brand-navy">{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                                    <td className="px-6 py-4 text-sm text-text-muted hidden md:table-cell truncate max-w-xs">{order.product}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-brand-navy">{order.total}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-text-muted hidden sm:table-cell">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
