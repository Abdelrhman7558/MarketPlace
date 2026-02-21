'use client';

import { useState } from 'react';
import {
    BarChart3, Package, ShoppingCart, ListChecks,
    Plus, Upload, Search, MoreHorizontal,
    ArrowUpRight, ArrowDownRight, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const MOCK_PRODUCTS = [
    { id: 'PRD-001', name: 'Coca Cola Classic 330ml', stock: 1200, price: '$0.85', status: 'Active', trend: '+12%' },
    { id: 'PRD-002', name: 'Monster Energy 500ml', stock: 450, price: '$1.45', status: 'Low Stock', trend: '+45%' },
    { id: 'PRD-003', name: 'Evian Water 500ml', stock: 3200, price: '$0.65', status: 'Active', trend: '-2%' },
    { id: 'PRD-004', name: 'Red Bull Sugar Free', stock: 0, price: '$1.55', status: 'Out of Stock', trend: '+18%' },
];

export default function SupplierDashboard() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-poppins font-black tracking-tight">Supplier Command Center</h1>
                    <p className="text-foreground/60">Manage your wholesale distribution and inventory levels.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-full gap-2 border-foreground/10">
                        <Upload className="w-4 h-4" />
                        Bulk Upload
                    </Button>
                    <Button className="rounded-full gap-2 shadow-xl shadow-primary/20">
                        <Plus className="w-4 h-4" />
                        New Product
                    </Button>
                </div>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-primary rounded-[2.5rem] p-8 text-primary-foreground relative overflow-hidden group shadow-2xl shadow-primary/20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <p className="text-sm font-bold opacity-80 uppercase tracking-widest mb-2">Total Revenue</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-5xl font-black">$45,290</h3>
                        <div className="flex items-center gap-1 text-xs font-black bg-white/20 px-3 py-1 rounded-full mb-1">
                            <TrendingUp className="w-3 h-3" />
                            +12.5%
                        </div>
                    </div>
                    <div className="mt-8 flex gap-2">
                        <div className="h-1 flex-1 bg-white/20 rounded-full"><div className="h-full bg-white w-2/3 rounded-full" /></div>
                        <div className="h-1 flex-1 bg-white/20 rounded-full"></div>
                        <div className="h-1 flex-1 bg-white/20 rounded-full"></div>
                    </div>
                </div>

                <div className="bg-surface border border-border/50 rounded-[2.5rem] p-8 group hover:shadow-xl transition-shadow">
                    <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest mb-2">Active Placements</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-5xl font-black">12</h3>
                        <div className="flex items-center gap-1 text-xs font-black text-success bg-success/10 px-3 py-1 rounded-full mb-1">
                            7 Active
                        </div>
                    </div>
                    <p className="mt-8 text-sm text-foreground/60">3 slots ending within <span className="text-foreground font-bold">48 hours</span></p>
                </div>

                <div className="bg-surface border border-border/50 rounded-[2.5rem] p-8 group hover:shadow-xl transition-shadow">
                    <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest mb-2">Open Orders</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-5xl font-black">48</h3>
                        <div className="flex items-center gap-1 text-xs font-black text-accent bg-accent/10 px-3 py-1 rounded-full mb-1">
                            8 Urgent
                        </div>
                    </div>
                    <p className="mt-8 text-sm text-foreground/60">Average fulfillment time: <span className="text-foreground font-bold">2.4h</span></p>
                </div>
            </div>

            {/* Inventory & Control */}
            <div className="bg-surface border border-border/50 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                            <Package className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold">Inventory Management</h2>
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                        <input
                            className="w-full h-12 rounded-full border border-border/50 pl-11 pr-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-muted/30">
                                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Product</th>
                                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Status</th>
                                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Price</th>
                                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Stock</th>
                                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Sales Trend</th>
                                <th className="px-8 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {MOCK_PRODUCTS.map((product) => (
                                <tr key={product.id} className="hover:bg-muted/20 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div>
                                            <p className="font-bold">{product.name}</p>
                                            <p className="text-xs text-foreground/40 font-mono uppercase tracking-tighter">{product.id}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <Badge variant={
                                            product.status === 'Active' ? 'success' :
                                                product.status === 'Low Stock' ? 'accent' : 'destructive'
                                        }>
                                            {product.status}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-6 font-bold">{product.price}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <span className="font-black">{product.stock}</span>
                                            <span className="text-xs text-foreground/40 uppercase">Units</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={cn(
                                            "flex items-center gap-1 font-black",
                                            product.trend.startsWith('+') ? "text-success" : "text-destructive"
                                        )}>
                                            {product.trend.startsWith('+') ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                            {product.trend}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0 text-foreground/40 hover:text-foreground">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </Button>
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
