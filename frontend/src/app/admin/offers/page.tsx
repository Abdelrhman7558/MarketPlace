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
    ExternalLink,
    X,
    MapPin,
    Eye,
    Image as ImageIcon
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
    description?: string;
    image?: string;
    location?: string;
    duration?: string;
}

export default function AdminOffersPage() {
    const [selectedOffer, setSelectedOffer] = React.useState<OfferRequest | null>(null);
    const [requests, setRequests] = React.useState<OfferRequest[]>([
        {
            id: 'REQ-01',
            supplier: 'Coca-Cola Hellenic',
            offerTitle: 'Summer Beverage Blast',
            type: 'Flash Sale',
            slot: 'HERO',
            price: 500,
            status: 'PENDING',
            requestedAt: '2026-02-21',
            description: 'Exclusive 15% discount on all carbonated beverages for bulk orders exceeding 50 units. Aimed at restocking for the summer peak season.',
            image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=800&auto=format&fit=crop',
            location: 'Main Carousel - Hero Slot',
            duration: 'June 1st - Aug 31st'
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
                                                    onClick={() => setSelectedOffer(req)}
                                                    className="h-10 px-4 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 border border-white/5 text-[10px] font-black uppercase tracking-widest"
                                                >
                                                    <Eye size={16} /> View Details
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
            {/* Detail Modal */}
            <AnimatePresence>
                {selectedOffer && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOffer(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#1c1c1e] w-full max-w-2xl rounded-[32px] border border-white/10 overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedOffer(null)}
                                className="absolute top-6 right-6 p-2 text-white/20 hover:text-white transition-colors z-20"
                            >
                                <X size={20} />
                            </button>

                            {/* Modal Header Image */}
                            <div className="h-64 w-full relative group">
                                {selectedOffer.image ? (
                                    <img src={selectedOffer.image} className="w-full h-full object-cover" alt={selectedOffer.offerTitle} />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-tr from-[#131921] to-white/5 flex items-center justify-center">
                                        <ImageIcon className="text-white/10" size={64} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/20 to-transparent" />
                                <div className="absolute bottom-6 left-8">
                                    <span className="px-2 py-1 rounded bg-primary text-[#131921] text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
                                        {selectedOffer.slot} PLACEMENT
                                    </span>
                                    <h2 className="text-3xl font-black text-white tracking-tight">{selectedOffer.offerTitle}</h2>
                                </div>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="flex items-center justify-between border-b border-white/5 pb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                                            <Building2 className="text-primary" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Requested By</p>
                                            <p className="text-lg font-black text-white">{selectedOffer.supplier}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Placement Value</p>
                                        <p className="text-2xl font-black text-emerald-400">${selectedOffer.price}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="text-white/20" size={16} />
                                            <div>
                                                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Display Location</p>
                                                <p className="text-xs font-bold text-white">{selectedOffer.location || 'Not Specified'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock className="text-white/20" size={16} />
                                            <div>
                                                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Visual Duration</p>
                                                <p className="text-xs font-bold text-white">{selectedOffer.duration || 'Flexible'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Request Memo</p>
                                        <p className="text-xs text-white/60 leading-relaxed font-medium">
                                            {selectedOffer.description || 'No additional details provided by the supplier for this request.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button
                                        onClick={() => { handleAction(selectedOffer.id, 'REJECTED'); setSelectedOffer(null); }}
                                        className="flex-1 h-14 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        <XCircle size={18} /> Reject Request
                                    </button>
                                    <button
                                        onClick={() => { handleAction(selectedOffer.id, 'APPROVED'); setSelectedOffer(null); }}
                                        className="flex-[2] h-14 bg-primary text-[#131921] border border-primary/20 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,140,51,0.3)]"
                                    >
                                        <CheckCircle size={18} /> Approve Placement
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
