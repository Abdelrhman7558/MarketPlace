'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Tag,
    CheckCircle,
    XCircle,
    Clock,
    Search,
    Filter,
    Building2,
    Calendar,
    CircleDollarSign,
    Zap,
    ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfferRequest {
    id: string;
    supplier: string;
    offerTitle: string;
    type: 'Flash Sale' | 'Bundle' | 'Discount';
    slot: 'HERO' | 'FEATURED' | 'BANNER';
    price: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    requestedAt: string;
}

export default function AdminOffersPage() {
    const [requests, setRequests] = React.useState<OfferRequest[]>([
        {
            id: 'REQ-01',
            supplier: 'Coca-Cola Hellenic',
            offerTitle: 'Summer Beverage Blast',
            type: 'Flash Sale',
            slot: 'HERO',
            price: 500,
            status: 'PENDING',
            requestedAt: '2026-02-21'
        },
        {
            id: 'REQ-02',
            supplier: 'Red Bull Trading',
            offerTitle: 'New Year Energy',
            type: 'Discount',
            slot: 'FEATURED',
            price: 300,
            status: 'PENDING',
            requestedAt: '2026-02-22'
        },
        {
            id: 'REQ-03',
            supplier: 'Nestlé Professional',
            offerTitle: 'Coffee Bulk Deal',
            type: 'Bundle',
            slot: 'BANNER',
            price: 200,
            status: 'APPROVED',
            requestedAt: '2026-02-20'
        },
    ]);

    const handleAction = (id: string, action: 'APPROVED' | 'REJECTED') => {
        setRequests(requests.map(req => req.id === id ? { ...req, status: action } : req));
    };

    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                        <Tag className="text-primary" size={32} />
                        Offer Approvals
                    </h1>
                    <p className="text-white/40 font-medium">Review and moderate supplier promotion and placement requests.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Pending Review', value: requests.filter(r => r.status === 'PENDING').length, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                    { label: 'Approved Today', value: '12', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                    { label: 'Placement Revenue', value: '$4,200', icon: CircleDollarSign, color: 'text-primary', bg: 'bg-primary/10' },
                    { label: 'Active Offers', value: '45', icon: Zap, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#131921] border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all group">
                        <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                            <stat.icon size={20} />
                        </div>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{stat.label}</p>
                        <p className="text-2xl font-black text-white mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Requests Table */}
            <div className="bg-[#131921] border border-white/5 rounded-[32px] overflow-hidden">
                <div className="p-8 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="Search by supplier or offer..."
                            className="w-full h-12 bg-white/5 rounded-xl border border-white/5 pl-12 pr-6 outline-none focus:border-primary/50 text-white text-sm font-medium transition-all"
                        />
                    </div>
                    <button className="h-12 px-6 bg-white/5 text-white/60 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                        <Filter size={14} /> Filter Requests
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02]">
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-widest">Supplier</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-widest">Offer Details</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-widest">Slot & Price</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {requests.map((req) => (
                                <tr key={req.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-colors">
                                                <Building2 className="text-white/40 group-hover:text-primary transition-colors" size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-white truncate max-w-[150px]">{req.supplier}</p>
                                                <p className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">ID: {req.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-white/80">{req.offerTitle}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[8px] font-black uppercase tracking-widest border border-blue-500/20">{req.type}</span>
                                            <div className="flex items-center gap-1 text-white/20">
                                                <Calendar size={10} />
                                                <span className="text-[9px] font-medium">{req.requestedAt}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-white">{req.slot} SLOT</span>
                                            <span className="text-[10px] font-bold text-emerald-400/80">${req.price}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border",
                                            req.status === 'APPROVED' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                req.status === 'PENDING' ? "bg-amber-400/10 text-amber-400 border-amber-400/20" :
                                                    "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}>
                                            {req.status === 'APPROVED' ? <CheckCircle size={10} /> : req.status === 'PENDING' ? <Clock size={10} /> : <XCircle size={10} />}
                                            {req.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        {req.status === 'PENDING' ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleAction(req.id, 'REJECTED')}
                                                    className="w-10 h-10 rounded-xl bg-red-400/5 text-red-400/40 hover:text-red-400 hover:bg-red-400/10 transition-all flex items-center justify-center border border-white/5"
                                                >
                                                    <XCircle size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleAction(req.id, 'APPROVED')}
                                                    className="w-10 h-10 rounded-xl bg-emerald-400/5 text-emerald-400/40 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all flex items-center justify-center border border-white/5"
                                                >
                                                    <CheckCircle size={20} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="w-10 h-10 rounded-xl bg-white/5 text-white/20 hover:text-white transition-all flex items-center justify-center border border-white/5">
                                                <ExternalLink size={18} />
                                            </button>
                                        )}
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
