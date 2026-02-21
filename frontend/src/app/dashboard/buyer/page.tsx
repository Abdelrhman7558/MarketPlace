'use client';

import { useState } from 'react';
import {
    ShoppingBag, Clock, CheckCircle2, Package,
    ArrowRight, CreditCard, MapPin, ReceiptText,
    Star, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import { useAuth } from '@/app/providers';

const MOCK_ORDERS = [
    { id: 'ORD-7721', date: 'Oct 24, 2023', total: '$450.00', status: 'Delivered', items: 12 },
    { id: 'ORD-7722', date: 'Nov 12, 2023', total: '$890.00', status: 'In Transit', items: 25 },
    { id: 'ORD-7723', date: 'Dec 05, 2023', total: '$1,200.00', status: 'Pending', items: 40 },
];

export default function BuyerDashboard() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-poppins font-black tracking-tight">Welcome back, {user?.name || 'Customer'}</h1>
                    <p className="text-foreground/60">Manage your wholesale orders and business account.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-full gap-2">
                        <ReceiptText className="w-4 h-4" />
                        Billing History
                    </Button>
                    <Button className="rounded-full gap-2 shadow-lg shadow-primary/20">
                        <ShoppingBag className="w-4 h-4" />
                        New Bulk Order
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Active Orders', value: '2', icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
                    { label: 'Total Spent', value: '$12.4k', icon: CreditCard, color: 'text-success', bg: 'bg-success/10' },
                    { label: 'Completed', value: '45', icon: CheckCircle2, color: 'text-secondary', bg: 'bg-secondary/10' },
                    { label: 'Saved Items', value: '18', icon: Star, color: 'text-accent', bg: 'bg-accent/10' },
                ].map((stat, i) => (
                    <div key={i} className="bg-surface border border-border/50 p-6 rounded-3xl hover:shadow-xl transition-shadow group">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg)}>
                            <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                        <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-3xl font-black mt-1 leading-none">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-surface border border-border/50 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                            <Package className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold">Recent Orders</h2>
                    </div>
                    <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5">
                        View All Orders
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-muted/30">
                                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Order ID</th>
                                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Date</th>
                                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Items</th>
                                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Total</th>
                                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Status</th>
                                <th className="px-8 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {MOCK_ORDERS.map((order) => (
                                <tr key={order.id} className="hover:bg-muted/20 transition-colors group">
                                    <td className="px-8 py-6 font-bold">{order.id}</td>
                                    <td className="px-8 py-6 text-foreground/60">{order.date}</td>
                                    <td className="px-8 py-6 font-bold text-secondary">{order.items} Units</td>
                                    <td className="px-8 py-6 font-black">{order.total}</td>
                                    <td className="px-8 py-6">
                                        <span className={cn(
                                            "px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tight",
                                            order.status === 'Delivered' ? "bg-success/10 text-success" :
                                                order.status === 'In Transit' ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                                        )}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Shipping Address Card */}
                <div className="bg-surface border border-border/50 p-8 rounded-[2.5rem] space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold">Standard Shipping Address</h2>
                    </div>
                    <div className="p-6 bg-muted/30 rounded-2xl border border-border/50">
                        <p className="font-bold">Main Warehouse HQ</p>
                        <p className="text-foreground/60">123 Logistics Way, Suite 500</p>
                        <p className="text-foreground/60">Dubai, United Arab Emirates</p>
                        <p className="text-foreground/60 mt-2 font-medium">T: +971 50 123 4567</p>
                    </div>
                    <Button variant="outline" className="w-full rounded-2xl border-foreground/10 h-12">Edit Address</Button>
                </div>

                {/* Business Profile Card */}
                <div className="bg-gradient-to-br from-primary via-secondary to-primary p-8 rounded-[2.5rem] text-primary-foreground space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold">Business Profile Status</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="opacity-80">Profile Completion</span>
                            <span className="font-black">85%</span>
                        </div>
                        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-[85%] rounded-full" />
                        </div>
                        <p className="text-sm opacity-80 leading-relaxed">Complete your VAT registration to unlock lower tax rates and business credit lines.</p>
                    </div>
                    <Button className="w-full rounded-2xl bg-white text-primary border-none hover:bg-white/90 h-12 font-black">Verify VAT ID</Button>
                </div>
            </div>
        </div>
    );
}
