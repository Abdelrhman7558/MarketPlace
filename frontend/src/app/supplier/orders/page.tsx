'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingBag,
    ChevronDown,
    Search,
    Truck,
    ArrowRight,
    Package,
    Clock,
    CheckCircle2,
    ShieldCheck,
    Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';

type OrderStatus = 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number; // The price the supplier gets
    buyerPrice?: number; // The price the buyer paid (price * 1.05)
}

interface SupplierOrder {
    id: string;
    customerName: string;
    customerEmail: string; // To be masked
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    date: string;
    trackingNumber?: string;
}

export default function SupplierOrdersPage() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [orders, setOrders] = React.useState<SupplierOrder[]>([
        {
            id: 'ORD-5501',
            customerName: 'A*** R***',
            customerEmail: 'ab***@gmail.com',
            items: [{ id: '1', name: 'Coca-Cola 330ml Can', quantity: 5, price: 18.25, buyerPrice: 19.16 }],
            total: 91.25,
            status: 'PROCESSING',
            date: '2026-02-21'
        },
        {
            id: 'ORD-5502',
            customerName: 'J*** D***',
            customerEmail: 'jo***@hotmail.com',
            items: [{ id: '105', name: 'Davidoff Rich Aroma', quantity: 2, price: 9.80, buyerPrice: 10.29 }],
            total: 19.60,
            status: 'SHIPPED',
            date: '2026-02-20',
            trackingNumber: 'TRK-99228-B2B'
        }
    ]);
    const [expandedOrderId, setExpandedOrderId] = React.useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedOrderId(prev => prev === id ? null : id);
    };

    const maskEmail = (email: string) => {
        const [user, domain] = email.split('@');
        return `${user.substring(0, 2)}***@${domain}`;
    };

    const handleStatusUpdate = (orderId: string, status: OrderStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    };

    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white tracking-tight">Order Management</h1>
                    <p className="text-white/40 font-medium">Track and fulfill wholesale orders from your customers.</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input
                        type="text"
                        placeholder="Search order ID..."
                        className="h-12 pl-12 pr-6 bg-[#131921] rounded-xl border border-white/5 outline-none focus:border-emerald-500/50 text-white text-sm w-[250px] transition-all"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Alert: Strict Isolation Notice */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-4">
                <ShieldCheck className="text-emerald-500" size={24} />
                <p className="text-xs text-white/80 font-medium">
                    <span className="font-black text-emerald-400 uppercase tracking-widest mr-2">Secure Link:</span>
                    Displaying only orders containing your products. Customer data is partially masked for privacy compliance.
                </p>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                    {orders.filter(o => o.id.includes(searchTerm)).map((order, i) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#131921] border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/20 transition-all group"
                        >
                            {/* Order Summary Row */}
                            <div className="p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-white/5">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
                                        <ShoppingBag className="text-emerald-400" size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">{order.id}</span>
                                            <span className="text-[10px] text-white/30 font-bold uppercase">{order.date}</span>
                                        </div>
                                        <h3 className="text-lg font-black text-white">{order.customerName}</h3>
                                        <p className="text-white/40 text-[11px] font-bold tracking-widest uppercase">{maskEmail(order.customerEmail)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Total Value</p>
                                        <p className="text-xl font-black text-white">${order.total.toFixed(2)}</p>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <div className={cn(
                                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                            order.status === 'DELIVERED' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                order.status === 'PROCESSING' ? "bg-amber-400/10 text-amber-400 border-amber-400/20" :
                                                    order.status === 'SHIPPED' ? "bg-primary/10 text-primary border-primary/20" :
                                                        "bg-red-500/10 text-red-400 border-red-500/20"
                                        )}>
                                            {order.status}
                                        </div>
                                        {order.trackingNumber && (
                                            <p className="text-[9px] text-white/40 font-black tracking-widest flex items-center gap-1">
                                                <Truck size={10} /> {order.trackingNumber}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {order.status === 'PROCESSING' && (
                                        <button
                                            onClick={() => handleStatusUpdate(order.id, 'SHIPPED')}
                                            className="h-12 px-6 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-black text-xs rounded-xl border border-emerald-500/20 transition-all flex items-center gap-2"
                                        >
                                            <Truck size={16} /> Mark as Shipped
                                        </button>
                                    )}
                                    <button
                                        onClick={() => toggleExpand(order.id)}
                                        className={cn(
                                            "h-12 px-6 text-xs font-black rounded-xl border transition-all flex items-center gap-2",
                                            expandedOrderId === order.id
                                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                                : "bg-white/5 text-white/40 border-white/10 hover:text-white"
                                        )}
                                    >
                                        <Eye size={16} /> {expandedOrderId === order.id ? 'Close Details' : 'View Details'}
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Details View */}
                            <AnimatePresence>
                                {expandedOrderId === order.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-b border-white/5 bg-[#0d1117] overflow-hidden"
                                    >
                                        <div className="p-8 space-y-8">
                                            <div>
                                                <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4">Line Items</h4>
                                                <div className="space-y-3">
                                                    {order.items.map(item => (
                                                        <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                                                    <Package className="text-white/60 w-5 h-5" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-bold text-white">{item.name}</p>
                                                                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">SKU: {item.id}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-8 text-right">
                                                                <div>
                                                                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Quantity</p>
                                                                    <p className="text-sm font-bold text-white">{item.quantity} Units</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Unit Revenue</p>
                                                                    <p className="text-sm font-bold text-emerald-400">${item.price.toFixed(2)}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Line Total</p>
                                                                    <p className="text-sm font-black text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest">Logistics Hub</h4>
                                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                                                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Destination Address (Partial)</p>
                                                        <p className="text-sm font-black text-white mb-4">*** 14th Street, New York, NY 10001</p>

                                                        {order.trackingNumber && (
                                                            <>
                                                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Tracking Consignment</p>
                                                                <div className="flex items-center gap-2">
                                                                    <Truck size={14} className="text-primary" />
                                                                    <p className="text-xs font-black text-primary tracking-widest">{order.trackingNumber}</p>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest">Financial Summary</h4>
                                                    <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <p className="text-xs font-bold text-white/60">Gross Order Value</p>
                                                            <p className="text-xs font-bold text-white">${(order.total * 1.05).toFixed(2)}</p>
                                                        </div>
                                                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-emerald-500/20">
                                                            <p className="text-xs font-bold text-red-400">Platform Margin (5%)</p>
                                                            <p className="text-xs font-bold text-red-400">-${(order.total * 0.05).toFixed(2)}</p>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <p className="text-sm font-black text-emerald-400">Your Net Revenue</p>
                                                            <p className="text-lg font-black text-emerald-400">${order.total.toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
