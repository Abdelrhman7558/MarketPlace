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
    Image as ImageIcon,
    Upload
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
    const [requests, setRequests] = React.useState<OfferRequest[]>([]);

    const handleAction = (id: string, action: 'APPROVED' | 'REJECTED') => {
        setRequests(requests.map(req => req.id === id ? { ...req, status: action } : req));
    };

    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-3">
                        <Tag className="text-primary" size={32} />
                        Offer Approvals
                    </h1>
                    <p className="text-muted-foreground font-medium">Review and moderate supplier promotion and placement requests.</p>
                </div>

                <button
                    className="h-12 px-6 bg-card border border-border/50 text-foreground font-black text-sm rounded-xl hover:bg-muted transition-all flex items-center gap-2"
                >
                    <Upload size={18} /> Bulk Upload Sheet
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Pending Review', value: requests.filter(r => r.status === 'PENDING').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                    { label: 'Approved Today', value: '12', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { label: 'Placement Revenue', value: '$4,200', icon: CircleDollarSign, color: 'text-primary', bg: 'bg-primary/10' },
                    { label: 'Active Offers', value: '45', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border/50 p-6 rounded-3xl hover:border-primary/20 transition-all group">
                        <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                            <stat.icon size={20} />
                        </div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
                        <p className="text-2xl font-black text-foreground mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Requests Table */}
            <div className="bg-card border border-border/50 rounded-[32px] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search by supplier or offer..."
                            className="w-full h-12 bg-background rounded-xl border border-border/50 pl-12 pr-6 outline-none focus:border-primary/50 text-foreground text-sm font-medium transition-all"
                        />
                    </div>
                    <button className="h-12 px-6 bg-background text-muted-foreground font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-muted transition-all flex items-center gap-2 border border-border/50">
                        <Filter size={14} /> Filter Requests
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/30">
                                <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Supplier</th>
                                <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Offer Details</th>
                                <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Slot & Price</th>
                                <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {requests.map((req) => (
                                <tr key={req.id} className="group hover:bg-muted/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-colors">
                                                <Building2 className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-foreground truncate max-w-[150px]">{req.supplier}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">ID: {req.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-foreground">{req.offerTitle}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[8px] font-black uppercase tracking-widest border border-blue-500/20">{req.type}</span>
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <Calendar size={10} />
                                                <span className="text-[9px] font-medium">{req.requestedAt}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-foreground">{req.slot} SLOT</span>
                                            <span className="text-[10px] font-bold text-emerald-500">${req.price}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border",
                                            req.status === 'APPROVED' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                req.status === 'PENDING' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
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
                                                    className="h-10 px-4 rounded-xl bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-all flex items-center gap-2 border border-border/50 text-[10px] font-black uppercase tracking-widest"
                                                >
                                                    <Eye size={16} /> View Details
                                                </button>
                                                <button
                                                    onClick={() => handleAction(req.id, 'APPROVED')}
                                                    className="w-10 h-10 rounded-xl bg-emerald-500/5 text-emerald-500/60 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all flex items-center justify-center border border-emerald-500/20"
                                                >
                                                    <CheckCircle size={20} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="w-10 h-10 rounded-xl bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-all flex items-center justify-center border border-border/50">
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
                            className="bg-card w-full max-w-2xl rounded-[32px] border border-border/50 overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedOffer(null)}
                                className="absolute top-6 right-6 p-2 text-muted-foreground/50 hover:text-foreground transition-colors z-20"
                            >
                                <X size={20} />
                            </button>

                            {/* Modal Header Image */}
                            <div className="h-64 w-full relative group">
                                {selectedOffer.image ? (
                                    <img src={selectedOffer.image} className="w-full h-full object-cover" alt={selectedOffer.offerTitle} />
                                ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center">
                                        <ImageIcon className="text-muted-foreground" size={64} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-6 left-8">
                                    <span className="px-2 py-1 rounded bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
                                        {selectedOffer.slot} PLACEMENT
                                    </span>
                                    <h2 className="text-3xl font-black text-foreground tracking-tight">{selectedOffer.offerTitle}</h2>
                                </div>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="flex items-center justify-between border-b border-border/50 pb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-background rounded-2xl flex items-center justify-center border border-border/50">
                                            <Building2 className="text-primary" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Requested By</p>
                                            <p className="text-lg font-black text-foreground">{selectedOffer.supplier}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Placement Value</p>
                                        <p className="text-2xl font-black text-emerald-500">${selectedOffer.price}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="text-muted-foreground" size={16} />
                                            <div>
                                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Display Location</p>
                                                <p className="text-xs font-bold text-foreground">{selectedOffer.location || 'Not Specified'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock className="text-muted-foreground" size={16} />
                                            <div>
                                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Visual Duration</p>
                                                <p className="text-xs font-bold text-foreground">{selectedOffer.duration || 'Flexible'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Request Memo</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">
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
                                        className="flex-[2] h-14 bg-primary text-primary-foreground border border-primary/20 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,140,51,0.3)]"
                                    >
                                        <CheckCircle size={18} /> Approve Placement
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
