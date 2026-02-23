'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutList, CheckCircle, XCircle, Clock, AlertTriangle, Eye, ArrowUpRight, Filter, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type PlacementStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';

interface PlacementRequest {
    id: string;
    supplier: string;
    product: string;
    slot: 'HERO' | 'FEATURED' | 'BANNER';
    duration: string;
    price: number;
    status: PlacementStatus;
    requestedAt: string;
}

const MOCK_PLACEMENTS: PlacementRequest[] = [
    {
        id: 'PL-101',
        supplier: 'BeverageGroup Inc.',
        product: 'Premium Energy Bundle',
        slot: 'HERO',
        duration: '7 Days',
        price: 450,
        status: 'PENDING',
        requestedAt: '2026-02-21'
    },
    {
        id: 'PL-102',
        supplier: 'SnackCo',
        product: 'Organic Nut Mix',
        slot: 'FEATURED',
        duration: '14 Days',
        price: 800,
        status: 'APPROVED',
        requestedAt: '2026-02-20'
    },
    {
        id: 'PL-103',
        supplier: 'AquaPure',
        product: 'Spring Water 500ml',
        slot: 'BANNER',
        duration: '30 Days',
        price: 1200,
        status: 'REJECTED',
        requestedAt: '2026-02-19'
    }
];

export default function AdminPlacementsPage() {
    const [placements, setPlacements] = React.useState<PlacementRequest[]>(MOCK_PLACEMENTS);
    const [filter, setFilter] = React.useState<PlacementStatus | 'ALL'>('ALL');

    const handleAction = (id: string, status: PlacementStatus) => {
        setPlacements(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    };

    const filtered = placements.filter(p => filter === 'ALL' || p.status === filter);

    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white tracking-tight">Placement Management</h1>
                    <p className="text-white/40 font-medium">Review and approve visibility requests from suppliers.</p>
                </div>

                <div className="flex items-center gap-2 p-1 bg-[#131921] rounded-xl border border-white/5">
                    {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s as any)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-xs font-black transition-all whitespace-nowrap",
                                filter === s ? "bg-primary text-[#131921]" : "text-white/40 hover:text-white"
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence mode="popLayout">
                    {filtered.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-[#131921] border border-white/5 rounded-3xl p-6 hover:border-primary/20 transition-all group overflow-hidden relative"
                        >
                            {/* Abstract Background Detail */}
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <LayoutList size={120} />
                            </div>

                            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/20 transition-all">
                                        <LayoutList className="text-primary" size={24} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{p.id}</span>
                                            <div className={cn(
                                                "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter",
                                                p.status === 'PENDING' ? "bg-amber-400/10 text-amber-400 border border-amber-400/20" :
                                                    p.status === 'APPROVED' ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20" :
                                                        "bg-red-400/10 text-red-400 border border-red-400/20"
                                            )}>
                                                {p.status}
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-black text-white">{p.product}</h3>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{p.supplier}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:border-x border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Target Slot</p>
                                        <p className="text-sm font-bold text-white flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary" /> {p.slot}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Duration</p>
                                        <p className="text-sm font-bold text-white uppercase">{p.duration}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Revenue</p>
                                        <p className="text-sm font-black text-emerald-400">${p.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {p.status === 'PENDING' ? (
                                        <>
                                            <button
                                                onClick={() => handleAction(p.id, 'APPROVED')}
                                                className="flex-1 lg:flex-none h-12 px-6 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-black text-xs rounded-xl border border-emerald-500/20 transition-all flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle size={16} /> Approve
                                            </button>
                                            <button
                                                onClick={() => handleAction(p.id, 'REJECTED')}
                                                className="flex-1 lg:flex-none h-12 px-6 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-black text-xs rounded-xl border border-red-500/20 transition-all flex items-center justify-center gap-2"
                                            >
                                                <XCircle size={16} /> Reject
                                            </button>
                                        </>
                                    ) : p.status === 'APPROVED' ? (
                                        <button
                                            onClick={() => handleAction(p.id, 'REJECTED')}
                                            className="h-12 px-6 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-black text-xs rounded-xl border border-red-500/20 transition-all flex items-center justify-center gap-2"
                                        >
                                            <XCircle size={16} /> Revoke Offer
                                        </button>
                                    ) : (
                                        <button
                                            disabled
                                            className="h-12 px-6 bg-white/5 text-white/40 font-black text-xs rounded-xl border border-white/10 opacity-50 flex items-center gap-2"
                                        >
                                            Rejected
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
