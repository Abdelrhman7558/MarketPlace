'use client';

import { DollarSign, ShoppingCart, Package, Star, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const STATS = [
    { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign, color: "bg-green-500" },
    { title: "Active Orders", value: "24", change: "+12", icon: ShoppingCart, color: "bg-brand-orange" },
    { title: "Products Listed", value: "142", change: "+3", icon: Package, color: "bg-blue-500" },
    { title: "Supplier Rating", value: "4.8/5.0", change: "+0.2", icon: Star, color: "bg-yellow-500" },
];

const RECENT_ORDERS = [
    { id: '#ORD-7829', customer: 'Cairo Coffee House', items: '12x Carton Local Cola', amount: '$420.00', status: 'Processing', date: 'Just now' },
    { id: '#ORD-7828', customer: 'Fresh Market Zamalek', items: '50x 1L Water Pack', amount: '$1,250.00', status: 'Shipped', date: '2 hours ago' },
    { id: '#ORD-7827', customer: 'Sunshine Cafe', items: '5x Energy Drink Case', amount: '$850.00', status: 'Delivered', date: 'Yesterday' },
    { id: '#ORD-7826', customer: 'Metro Supermarket', items: 'Bulk Juice Order', amount: '$3,400.00', status: 'Pending', date: 'Yesterday' },
];

export default function SupplierDashboard() {
    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-brand-navy">Supplier Overview</h1>
                    <p className="text-gray-500 text-sm">Welcome back, here's what's happening with your store today.</p>
                </div>
                <button className="bg-brand-orange hover:bg-brand-orange-hover text-white px-4 py-2 rounded-lg font-bold shadow-sm text-sm transition-colors">
                    + Add New Product
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {STATS.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color}/10 p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                        <p className="text-2xl font-bold text-brand-navy">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-brand-navy flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 text-gray-400" /> Recent Wholesale Orders
                        </h3>
                        <a href="#" className="text-brand-orange text-sm font-bold hover:underline">View All</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {RECENT_ORDERS.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-brand-navy">{order.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-brand-navy">{order.customer}</div>
                                            <div className="text-xs text-gray-400">{order.items}</div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-brand-navy">{order.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' :
                                                    order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                        order.status === 'Processing' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                            'bg-gray-50 text-gray-600 border-gray-200'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Inventory Alert / Activity */}
                <div className="space-y-6">
                    <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                        <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" /> Low Stock Alert
                        </h3>
                        <p className="text-sm text-orange-700 mb-4">3 products are running low on inventory.</p>
                        <div className="space-y-3">
                            <div className="bg-white p-3 rounded-lg border border-orange-100 shadow-sm flex items-center justify-between">
                                <span className="text-sm font-medium text-brand-navy">Red Bull 250ml (Case)</span>
                                <span className="text-xs font-bold text-red-600">5 left</span>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-orange-100 shadow-sm flex items-center justify-between">
                                <span className="text-sm font-medium text-brand-navy">Local Cola 1L</span>
                                <span className="text-xs font-bold text-red-600">12 left</span>
                            </div>
                        </div>
                        <button className="w-full mt-4 bg-white hover:bg-orange-100 text-orange-700 font-bold py-2 rounded-lg text-sm border border-orange-200 transition-colors">
                            Restock Now
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-gray-400" /> Market Insights
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500">Soft Drink Demand</span>
                                    <span className="font-medium text-green-600">+15%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[75%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500">Energy Drink Sales</span>
                                    <span className="font-medium text-brand-orange">+8%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-orange w-[60%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
