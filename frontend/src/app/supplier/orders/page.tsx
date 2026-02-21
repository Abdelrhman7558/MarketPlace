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
    price: number;
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
            items: [{ id: '1', name: 'Coca-Cola 330ml Can', quantity: 5, price: 18.25 }],
            total: 91.25,
            status: 'PROCESSING',
            date: '2026-02-21'
        },
        {
            id: 'ORD-5502',
            customerName: 'J*** D***',
            customerEmail: 'jo***@hotmail.com',
            items: [{ id: '105', name: 'Davidoff Rich Aroma', quantity: 2, price: 9.80 }],
            total: 19.60,
            status: 'SHIPPED',
            date: '2026-02-20',
            trackingNumber: 'TRK-99228-B2B'
        }
    ]);

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
                                    {order.status === 'PROCESSING' ? (
                                        <button
                                            onClick={() => handleStatusUpdate(order.id, 'SHIPPED')}
                                            className="h-12 px-6 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-black text-xs rounded-xl border border-emerald-500/20 transition-all flex items-center gap-2"
                                        >
                                            <Truck size={16} /> Mark as Shipped
                                        </button>
                                    ) : (
                                        <button className="h-12 px-6 bg-white/5 text-white/40 font-black text-xs rounded-xl border border-white/10 flex items-center gap-2">
                                            <Eye size={16} /> View Details
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
