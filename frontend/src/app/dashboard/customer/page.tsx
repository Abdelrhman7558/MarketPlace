'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Package,
    Truck,
    CheckCircle2,
    Clock,
    MapPin,
    ChevronRight,
    Search,
    ShoppingBag,
    Heart,
    Star
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';

export default function CustomerDashboard() {
    const { user } = useAuth();

    return (
        <div className="max-w-7xl mx-auto space-y-10 p-4 md:p-8 pt-24 min-h-screen bg-[#F5F7F7] dark:bg-[#0A0D12]">
            {/* Greeting */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-[#111] dark:text-white tracking-tight">
                        Welcome back, <span className="text-primary">{user?.name.split(' ')[0]}</span>
                    </h1>
                    <p className="text-[#555] dark:text-white/40 font-medium italic">Track your wholesale orders and curated recommendations.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="p-4 bg-white dark:bg-[#131921] rounded-2xl shadow-sm border border-black/5 dark:border-white/5 flex items-center gap-4 group hover:border-primary/20 transition-all cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <ShoppingBag size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black text-[#888] tracking-widest leading-none">Open Orders</span>
                            <span className="text-lg font-black text-[#111] dark:text-white">03</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Order Tracking */}
            <div className="bg-white dark:bg-[#131921] rounded-3xl border border-black/5 dark:border-white/5 p-8 space-y-8 layered-3d-shadow">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-[#111] dark:text-white tracking-tight flex items-center gap-3">
                        <Truck className="text-primary" /> Active Shipment
                    </h3>
                    <span className="text-xs font-bold text-primary hover:underline cursor-pointer">View Tracking History</span>
                </div>

                <div className="relative pt-12 pb-4 px-4">
                    {/* Progress Bar Container */}
                    <div className="absolute top-1/2 left-8 right-8 h-1 bg-[#E6E6E6] dark:bg-white/5 -translate-y-1/2 rounded-full" />
                    <div className="absolute top-1/2 left-8 w-1/2 h-1 bg-primary -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(255,107,0,0.4)]" />

                    <div className="flex justify-between relative z-10">
                        {[
                            { step: 'Ordered', icon: Clock, date: 'Feb 20', done: true },
                            { step: 'Confirmed', icon: CheckCircle2, date: 'Feb 21', done: true },
                            { step: 'In Transit', icon: Truck, date: 'Today', active: true },
                            { step: 'Delivered', icon: Package, date: 'Est. Feb 23' },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.step} className="flex flex-col items-center gap-3">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${item.done ? 'bg-primary border-[#F5F7F7] dark:border-[#131921] text-[#131921]' :
                                        item.active ? 'bg-white dark:bg-gray-800 border-primary text-primary animate-pulse' :
                                            'bg-white dark:bg-gray-800 border-[#E6E6E6] dark:border-white/10 text-white/20'
                                        }`}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="text-center">
                                        <p className={`text-xs font-black uppercase tracking-tight ${item.done || item.active ? 'text-[#111] dark:text-white' : 'text-white/20'}`}>
                                            {item.step}
                                        </p>
                                        <p className="text-[10px] font-medium text-[#888] mt-0.5">{item.date}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-4 p-4 bg-[#F5F7F7] dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                        <div className="w-16 h-16 rounded-xl bg-white dark:bg-gray-800 border border-white/10 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1543256283-42c206511a76?w=200" alt="Order" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#111] dark:text-white">Premium Wholesale Energy (Case of 24)</span>
                            <span className="text-xs text-[#888]">Order ID: #MPC-99421 • $1,250.00</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#F5F7F7] dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-primary">
                                <MapPin size={16} />
                                <span className="text-xs font-black uppercase">Shipping to</span>
                            </div>
                            <span className="text-[11px] font-bold text-[#111] dark:text-white mt-1 uppercase">Cairo Logistics Hub, Gate 4</span>
                        </div>
                        <ChevronRight className="text-[#888]" />
                    </div>
                </div>
            </div>

            {/* Personalized Recommendations */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-[#111] dark:text-white tracking-tight flex items-center gap-3">
                        <Heart className="text-primary" fill="currentColor" /> Handpicked for You
                    </h2>
                    <Link href="/categories" className="text-sm font-bold text-[#888] hover:text-primary transition-colors inline-flex items-center gap-2">
                        Browse all <ChevronRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS.slice(4, 8).map((product, i) => (
                        <div key={product.id} className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-[#FF8C33] rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
                            <div className="relative">
                                <ProductCard product={product} index={i} />
                            </div>
                            {/* Recommendation Badge */}
                            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg border border-black/5 flex items-center gap-1.5 shadow-sm transform -rotate-1 group-hover:rotate-0 transition-transform">
                                <Star size={10} className="text-primary" fill="currentColor" />
                                <span className="text-[9px] font-black uppercase text-primary">Best Match</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
