'use client';

import { useState } from 'react';
import { Search, Filter, Eye, ChevronDown, Package } from 'lucide-react';

const ORDERS = [
    { id: '#ORD-2301', customer: 'Ahmed Hassan', email: 'ahmed@example.com', items: 'Coca-Cola 330ml x24, Sprite x12', qty: 36, total: '$666.00', status: 'Delivered', date: '2026-02-19', payment: 'Paid' },
    { id: '#ORD-2300', customer: 'Mohamed Ali', email: 'mohamed@example.com', items: 'Red Bull 250ml x24', qty: 24, total: '$768.00', status: 'Processing', date: '2026-02-19', payment: 'Paid' },
    { id: '#ORD-2299', customer: 'Sara Ibrahim', email: 'sara@example.com', items: 'Pepsi Max x24', qty: 24, total: '$420.00', status: 'Shipped', date: '2026-02-18', payment: 'Paid' },
    { id: '#ORD-2298', customer: 'Youssef Khaled', email: 'youssef@example.com', items: 'Nestle Water x12, Lipton Tea x15', qty: 27, total: '$112.35', status: 'Pending', date: '2026-02-18', payment: 'Unpaid' },
    { id: '#ORD-2297', customer: 'Nour ElDin', email: 'nour@example.com', items: 'Monster Energy x12', qty: 12, total: '$288.00', status: 'Delivered', date: '2026-02-17', payment: 'Paid' },
    { id: '#ORD-2296', customer: 'Layla Ahmed', email: 'layla@example.com', items: 'Tropicana Juice x8', qty: 8, total: '$103.92', status: 'Cancelled', date: '2026-02-17', payment: 'Refunded' },
    { id: '#ORD-2295', customer: 'Omar Farouk', email: 'omar@example.com', items: 'Coca-Cola x48, Red Bull x24', qty: 72, total: '$1,524.00', status: 'Delivered', date: '2026-02-16', payment: 'Paid' },
    { id: '#ORD-2294', customer: 'Hana Mostafa', email: 'hana@example.com', items: 'Pepsi x24, Nestle Water x20', qty: 44, total: '$510.00', status: 'Shipped', date: '2026-02-16', payment: 'Paid' },
];

const STATUS_COLORS: Record<string, string> = {
    'Delivered': 'bg-green-100 text-green-700',
    'Processing': 'bg-blue-100 text-blue-700',
    'Shipped': 'bg-purple-100 text-purple-700',
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Cancelled': 'bg-red-100 text-red-700',
};

const PAYMENT_COLORS: Record<string, string> = {
    'Paid': 'text-green-600',
    'Unpaid': 'text-yellow-600',
    'Refunded': 'text-red-500',
};

export default function OrdersPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    const filtered = ORDERS.filter(o => {
        const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'All' || o.status === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-extrabold text-brand-navy">Orders</h2>
                <p className="text-text-muted text-sm">{ORDERS.length} total orders</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 focus-within:border-brand-orange transition-all shadow-card">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <input
                        type="text"
                        placeholder="Search by order ID or customer..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="flex-1 outline-none text-sm text-gray-700"
                    />
                </div>
                <div className="relative">
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm font-medium outline-none focus:border-brand-orange appearance-none pr-10 cursor-pointer transition-colors shadow-card"
                    >
                        {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                            <option key={s}>{s}</option>
                        ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs text-text-muted uppercase tracking-wider border-b border-gray-100">
                                <th className="px-6 py-4 font-semibold">Order ID</th>
                                <th className="px-6 py-4 font-semibold">Customer</th>
                                <th className="px-6 py-4 font-semibold hidden lg:table-cell">Items</th>
                                <th className="px-6 py-4 font-semibold">Total</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold hidden md:table-cell">Payment</th>
                                <th className="px-6 py-4 font-semibold hidden sm:table-cell">Date</th>
                                <th className="px-6 py-4 font-semibold text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((order, i) => (
                                <>
                                    <tr key={order.id} className="table-row-animate border-b border-gray-50 cursor-pointer" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                                        <td className="px-6 py-4 text-sm font-bold text-brand-navy">{order.id}</td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-700">{order.customer}</p>
                                                <p className="text-[11px] text-text-muted">{order.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-text-muted hidden lg:table-cell truncate max-w-[200px]">{order.items}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-brand-navy">{order.total}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 text-sm font-semibold hidden md:table-cell ${PAYMENT_COLORS[order.payment]}`}>{order.payment}</td>
                                        <td className="px-6 py-4 text-sm text-text-muted hidden sm:table-cell">{order.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-brand-orange flex items-center justify-center transition-all ml-auto">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedOrder === order.id && (
                                        <tr key={`${order.id}-details`}>
                                            <td colSpan={8} className="bg-gray-50 px-6 py-4 animate-slide-down">
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                    <div><span className="text-text-muted block text-xs mb-1">Items</span><span className="font-semibold text-brand-navy">{order.items}</span></div>
                                                    <div><span className="text-text-muted block text-xs mb-1">Quantity</span><span className="font-semibold text-brand-navy">{order.qty} units</span></div>
                                                    <div><span className="text-text-muted block text-xs mb-1">Payment</span><span className={`font-semibold ${PAYMENT_COLORS[order.payment]}`}>{order.payment}</span></div>
                                                    <div><span className="text-text-muted block text-xs mb-1">Date</span><span className="font-semibold text-brand-navy">{order.date}</span></div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-text-muted">
                        <Package className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm">No orders found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
