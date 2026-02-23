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
    supplierProfit: number;
    adminProfit: number;
    status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    date: string;
    items: { product: string; quantity: number; price: number }[];
}

export default function AdminOrdersPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [orders, setOrders] = React.useState<AdminOrder[]>([]);
    const [loading, ReactSetLoading] = React.useState(true);
    const [expandedOrder, setExpandedOrder] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const res = await fetch('http://localhost:3005/orders', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error(err);
            } finally {
                ReactSetLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleApprove = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3005/orders/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ status: 'PAID' })
            });
            if (res.ok) {
                setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'PAID' } : o));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleReject = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3005/orders/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ status: 'CANCELLED' })
            });
            if (res.ok) {
                setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'CANCELLED' } : o));
            }
        } catch (err) {
            console.error(err);
        }
    };

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
                            {loading && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-10 text-center text-white/50 text-sm font-bold">
                                        Loading enterprise orders...
                                    </td>
                                </tr>
                            )}
                            {!loading && orders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-10 text-center text-white/50 text-sm font-bold">
                                        No recent orders found.
                                    </td>
                                </tr>
                            )}
                            {!loading && orders.map((order) => (
                                <React.Fragment key={order.id}>
                                    <tr
                                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                        className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                                    >
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
                                            <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                                                {order.status === 'PENDING' ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(order.id)}
                                                            className="h-9 px-4 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 transition-all flex items-center gap-2"
                                                        >
                                                            <CheckCircle2 size={14} /> Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(order.id)}
                                                            className="w-9 h-9 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg border border-red-500/20 transition-all flex items-center justify-center"
                                                        >
                                                            <XCircle size={16} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button className="p-2 hover:bg-white/5 text-white/40 hover:text-white rounded-lg transition-all">
                                                        <MoreVertical size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Detail Modal */}
            <AnimatePresence>
                {expandedOrder && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" onClick={() => setExpandedOrder(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-[#131921] w-full max-w-4xl rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {(() => {
                                const order = orders.find(o => o.id === expandedOrder);
                                if (!order) return null;

                                return (
                                    <>
                                        {/* Modal Header */}
                                        <div className="bg-[#1A222C] border-b border-white/5 p-8 flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                                                        <ShoppingCart size={18} />
                                                    </div>
                                                    <div>
                                                        <h2 className="text-2xl font-black text-white tracking-tight">Order <span className="text-primary">{order.id}</span></h2>
                                                        <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">Date: {order.date}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                                                    order.status === 'PAID' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                        order.status === 'SHIPPED' ? "bg-primary/10 text-primary border-primary/20" :
                                                            order.status === 'PENDING' ? "bg-amber-400/10 text-amber-400 border-amber-400/20" :
                                                                "bg-red-500/10 text-red-500 border-red-500/20"
                                                )}>
                                                    Status: {order.status}
                                                </div>
                                                <button onClick={() => setExpandedOrder(null)} className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                                                    <XCircle size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Modal Body */}
                                        <div className="p-8 overflow-y-auto w-full no-scrollbar">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">

                                                {/* Actors / Stakeholders */}
                                                <div className="space-y-6">
                                                    <div>
                                                        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Buyer (Customer)</h4>
                                                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col justify-center h-[80px]">
                                                            <p className="text-lg font-bold text-white">{order.customer}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Vendor (Supplier)</h4>
                                                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col justify-center h-[80px]">
                                                            <p className="text-lg font-bold text-white">{order.supplier}</p>
                                                        </div>
                                                    </div>

                                                    <div className="pt-4 space-y-3">
                                                        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Order Line Items</h4>
                                                        <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                                                            <table className="w-full text-left">
                                                                <thead className="bg-white/5 border-b border-white/5">
                                                                    <tr>
                                                                        <th className="px-5 py-3 text-[9px] font-bold text-white/50 uppercase tracking-widest">SKU</th>
                                                                        <th className="px-5 py-3 text-[9px] font-bold text-white/50 uppercase tracking-widest text-right">Qty</th>
                                                                        <th className="px-5 py-3 text-[9px] font-bold text-white/50 uppercase tracking-widest text-right">Unit Price</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-white/5">
                                                                    {order.items.map((item, i) => (
                                                                        <tr key={i}>
                                                                            <td className="px-5 py-4 text-xs font-bold text-white">{item.product}</td>
                                                                            <td className="px-5 py-4 text-xs font-bold text-white/60 text-right">{item.quantity}</td>
                                                                            <td className="px-5 py-4 text-xs font-bold text-white/60 text-right">${item.price.toFixed(2)}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Financial Breakdown */}
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Financial Settlement Breakdown</h4>
                                                    <div className="bg-[#1A222C] rounded-3xl border border-white/5 p-8 relative overflow-hidden group">
                                                        {/* Decorative Background */}
                                                        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                                                        <div className="relative z-10 space-y-6">

                                                            {/* Total Revenue */}
                                                            <div className="flex items-center justify-between pb-6 border-b border-white/5">
                                                                <div>
                                                                    <span className="block text-sm font-black text-white">Gross Transaction Value</span>
                                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Total Paid by Buyer</span>
                                                                </div>
                                                                <span className="text-3xl font-black text-white">${order.total.toLocaleString()}</span>
                                                            </div>

                                                            {/* Supplier Payout */}
                                                            <div className="flex items-center justify-between pb-6 border-b border-white/5">
                                                                <div>
                                                                    <span className="block text-sm font-black text-white/60">Supplier Revenue</span>
                                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Net Cost basis</span>
                                                                </div>
                                                                <span className="text-xl font-black text-emerald-400">${order.supplierProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                            </div>

                                                            {/* Admin Profit */}
                                                            <div className="flex items-center justify-between bg-primary/10 -mx-8 -mb-8 p-8 border-t border-primary/20">
                                                                <div>
                                                                    <span className="block text-lg font-black text-primary uppercase tracking-widest">Platform Fee</span>
                                                                    <span className="text-[10px] text-primary/60 font-bold uppercase tracking-widest mt-1">Marketplace Admin Profit</span>
                                                                </div>
                                                                <span className="text-4xl font-black text-primary">${order.adminProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Settlement Status Footer */}
                                                    <div className="mt-6 flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                                                            <CheckCircle2 size={14} />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-white">Funds Secured in Escrow</p>
                                                            <p className="text-[10px] text-white/40 font-medium leading-relaxed mt-1">Admin profit is instantly allocated. Supplier revenue is held in escrow until buyer confirms delivery of goods.</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
