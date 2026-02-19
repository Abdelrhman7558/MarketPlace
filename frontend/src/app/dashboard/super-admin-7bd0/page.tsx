'use client';

import { DollarSign, Users, ShoppingCart, TrendingUp, ArrowUp, ArrowDown, Package } from 'lucide-react';
import Link from 'next/link';

const KPIS = [
    { title: "Total Revenue", value: "$124,539", change: "+12.5%", trend: "up" as const, icon: DollarSign, bg: "bg-[#1b5e20]" },
    { title: "Total Orders", value: "1,842", change: "+23", trend: "up" as const, icon: ShoppingCart, bg: "bg-[#0d47a1]" },
    { title: "Active Users", value: "342", change: "+18", trend: "up" as const, icon: Users, bg: "bg-[#4a148c]" },
    { title: "Profit/Loss", value: "+$32,450", change: "+8.2%", trend: "up" as const, icon: TrendingUp, bg: "bg-[#e65100]" },
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
        <div className="space-y-5">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {KPIS.map((kpi, i) => (
                    <div key={i} className="bg-white border border-[#d5d9d9] rounded-[4px] p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`${kpi.bg} p-2 rounded-[4px]`}>
                                <kpi.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className={`flex items-center gap-0.5 text-[12px] font-bold px-2 py-0.5 rounded-full ${kpi.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {kpi.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                {kpi.change}
                            </span>
                        </div>
                        <h3 className="text-amz-text2 text-[13px] mb-0.5">{kpi.title}</h3>
                        <p className="text-[24px] font-bold text-amz-text">{kpi.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white border border-[#d5d9d9] rounded-[4px] p-5 overflow-hidden">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="font-bold text-amz-text text-[16px]">Revenue Overview</h3>
                            <p className="text-amz-text2 text-[12px] mt-0.5">Last 12 weeks performance</p>
                        </div>
                        <div className="flex gap-1">
                            {['Weekly', 'Monthly'].map(t => (
                                <button key={t} className="text-[12px] font-medium px-3 py-1 bg-[#f0f2f2] border border-[#d5d9d9] text-amz-text rounded-[4px] hover:bg-[#e3e6e6] transition-colors">{t}</button>
                            ))}
                        </div>
                    </div>

                    <div className="h-60 flex items-end justify-between gap-1 md:gap-2 border-b border-[#e7e7e7] pb-3">
                        {[35, 58, 42, 72, 55, 85, 62, 90, 78, 88, 72, 95].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer h-full relative">
                                <div
                                    className="bg-amz-dark2 hover:bg-amz-orange rounded-t-sm w-full transition-colors duration-200 relative"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-amz-dark text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold z-10">
                                        ${(h * 1320).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-amz-text2 font-medium">
                        {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'].map(w => (
                            <span key={w}>{w}</span>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white border border-[#d5d9d9] rounded-[4px] p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-amz-text text-[16px]">Top Products</h3>
                        <Link href="/dashboard/super-admin-7bd0/products" className="text-[12px] text-amz-link hover:text-amz-blue-hover hover:underline">View All</Link>
                    </div>
                    <div className="space-y-3">
                        {TOP_PRODUCTS.map((prod, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-[#f7f7f7] transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-[4px] bg-[#f7f7f7] overflow-hidden flex-shrink-0">
                                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-medium text-amz-text truncate">{prod.name}</p>
                                    <p className="text-[11px] text-amz-text2">{prod.brand} · {prod.sold} sold</p>
                                </div>
                                <span className="text-[13px] font-bold text-[#007600]">{prod.revenue}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white border border-[#d5d9d9] rounded-[4px] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#e7e7e7] flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-amz-text text-[16px]">Recent Orders</h3>
                        <p className="text-amz-text2 text-[12px] mt-0.5">Latest transactions across the platform</p>
                    </div>
                    <Link href="/dashboard/super-admin-7bd0/orders" className="text-[13px] text-amz-link hover:text-amz-blue-hover hover:underline">View All →</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-[11px] text-amz-text2 uppercase tracking-wider border-b border-[#e7e7e7] bg-[#f7f7f7]">
                                <th className="px-5 py-3 font-medium">Order ID</th>
                                <th className="px-5 py-3 font-medium">Customer</th>
                                <th className="px-5 py-3 font-medium hidden md:table-cell">Product</th>
                                <th className="px-5 py-3 font-medium">Total</th>
                                <th className="px-5 py-3 font-medium">Status</th>
                                <th className="px-5 py-3 font-medium hidden sm:table-cell">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RECENT_ORDERS.map((order, i) => (
                                <tr key={i} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa] transition-colors">
                                    <td className="px-5 py-3 text-[13px] font-bold text-amz-text">{order.id}</td>
                                    <td className="px-5 py-3 text-[13px] text-amz-text">{order.customer}</td>
                                    <td className="px-5 py-3 text-[13px] text-amz-text2 hidden md:table-cell truncate max-w-xs">{order.product}</td>
                                    <td className="px-5 py-3 text-[13px] font-bold text-amz-text">{order.total}</td>
                                    <td className="px-5 py-3">
                                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-[13px] text-amz-text2 hidden sm:table-cell">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
