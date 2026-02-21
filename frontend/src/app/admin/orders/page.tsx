'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Filter, ArrowUpRight, Clock, CheckCircle2, XCircle, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminOrder {
    id: string;
    customer: string;
    supplier: string;
    total: number;
    status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    date: string;
}

export default function AdminOrdersPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [orders, setOrders] = React.useState<AdminOrder[]>([
        { id: 'ORD-7721', customer: 'Global Foods Ltd', supplier: 'Coca-Cola Hellenic', total: 4250.00, status: 'PAID', date: '2026-02-21' },
        { id: 'ORD-7722', customer: 'Beach Resort X', supplier: 'Nestlé Prime', total: 1200.50, status: 'SHIPPED', date: '2026-02-20' },
        { id: 'ORD-7723', customer: 'Tech City Office', supplier: 'Red Bull GmbH', total: 850.00, status: 'PENDING', date: '2026-02-21' },
    ]);

    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white tracking-tight">Enterprise Orders</h1>
                    <p className="text-white/40 font-medium">Global oversight of all transactions across the marketplace.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input
                            type="text"
                            placeholder="Filter orders..."
                            className="h-12 pl-12 pr-6 bg-[#131921] rounded-xl border border-white/5 outline-none focus:border-primary/50 text-white text-sm w-[250px] transition-all"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-[#131921] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5">
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5">Order ID</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5">Stakeholders</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5">Value</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5">Lifecycle</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-6">
                                        <span className="text-xs font-black text-primary">{order.id}</span>
                                        <p className="text-[10px] text-white/20 mt-1 font-bold">{order.date}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-white flex items-center gap-2">
                                                <span className="text-[9px] text-white/20 uppercase font-black">C:</span> {order.customer}
                                            </p>
                                            <p className="text-sm font-bold text-white/60 flex items-center gap-2">
                                                <span className="text-[9px] text-white/20 uppercase font-black">S:</span> {order.supplier}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-lg font-black text-white">${order.total.toLocaleString()}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border",
                                            order.status === 'PAID' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                order.status === 'SHIPPED' ? "bg-primary/10 text-primary border-primary/20" :
                                                    order.status === 'PENDING' ? "bg-amber-400/10 text-amber-400 border-amber-400/20" :
                                                        "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}>
                                            <div className={cn("w-1 h-1 rounded-full",
                                                order.status === 'PAID' ? "bg-emerald-400" :
                                                    order.status === 'SHIPPED' ? "bg-primary" : "bg-amber-400"
                                            )} />
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 hover:bg-white/5 text-white/40 hover:text-white rounded-lg transition-all">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
