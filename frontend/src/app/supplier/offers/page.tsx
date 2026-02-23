'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Tag,
    Plus,
    Search,
    Calendar,
    Clock,
    Zap,
    CircleDollarSign,
    Info,
    CheckCircle2,
    XCircle,
    LayoutList,
    Image as ImageIcon,
    Edit2,
    Trash
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRODUCTS } from '@/lib/products';

interface OfferPlacement {
    id: string;
    title: string;
    type: 'Flash Sale' | 'Bundle' | 'Discount';
    slot: 'HERO' | 'FEATURED' | 'BANNER';
    price: number;
    status: 'ACTIVE' | 'PENDING' | 'REJECTED' | 'EXPIRED';
    expiry: string;
    impressions: number;
}

const SLOT_PRICES = {
    'HERO': 500,
    'FEATURED': 300,
    'BANNER': 200
};

export default function SupplierOffersPage() {
    const [offers, setOffers] = React.useState<OfferPlacement[]>([
        {
            id: 'OFF-01',
            title: 'Summer Beverage Blast',
            type: 'Flash Sale',
            slot: 'HERO',
            price: 500,
            status: 'ACTIVE',
            expiry: '2026-03-01',
            impressions: 1240
        },
        {
            id: 'OFF-02',
            title: 'Energy Drink Bundle',
            type: 'Bundle',
            slot: 'FEATURED',
            price: 300,
            status: 'PENDING',
            expiry: '2026-03-15',
            impressions: 0
        },
    ]);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingId, setEditingId] = React.useState<string | null>(null);
    const [formData, setFormData] = React.useState({
        title: '',
        type: 'Discount' as any,
        slot: 'FEATURED' as 'HERO' | 'FEATURED' | 'BANNER',
        product: PRODUCTS[0]?.name || '',
        expiry: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            setOffers(offers.map(offer =>
                offer.id === editingId ? {
                    ...offer,
                    title: formData.title,
                    type: formData.type,
                    slot: formData.slot,
                    price: SLOT_PRICES[formData.slot],
                    status: 'PENDING', // Force Pending on Edit
                    expiry: formData.expiry || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                } : offer
            ));
        } else {
            const newOffer: OfferPlacement = {
                id: `OFF-${Math.floor(Math.random() * 1000)}`,
                title: formData.title,
                type: formData.type,
                slot: formData.slot,
                price: SLOT_PRICES[formData.slot],
                status: formData.slot === 'HERO' ? 'PENDING' : 'ACTIVE',
                expiry: formData.expiry || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                impressions: 0
            };
            setOffers([newOffer, ...offers]);
        }

        setIsModalOpen(false);
        setEditingId(null);
    };

    const handleDelete = (id: string) => {
        setOffers(offers.filter(o => o.id !== id));
    };

    const openEditModal = (offer: OfferPlacement) => {
        setFormData({
            title: offer.title,
            type: offer.type as any,
            slot: offer.slot,
            product: PRODUCTS[0]?.name || '',
            expiry: offer.expiry
        });
        setEditingId(offer.id);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                        <Tag className="text-primary" size={32} />
                        Offers & Ad Placements
                    </h1>
                    <p className="text-white/40 font-medium">Create performance-driven offers and boost visibility across the platform.</p>
                </div>

                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData({
                            title: '',
                            type: 'Discount' as any,
                            slot: 'FEATURED' as 'HERO' | 'FEATURED' | 'BANNER',
                            product: '',
                            expiry: ''
                        });
                        setIsModalOpen(true);
                    }}
                    className="h-12 px-6 bg-primary text-[#131921] font-black text-sm rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                    <Plus size={18} strokeWidth={3} /> Create New Offer
                </button>
            </div>

            {/* Pricing Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(SLOT_PRICES).map(([slot, price]) => (
                    <div key={slot} className="relative group overflow-hidden bg-[#131921] border border-white/5 p-8 rounded-3xl hover:border-primary/30 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ImageIcon size={64} />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-2">
                                <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    slot === 'HERO' ? "bg-primary animate-pulse" : "bg-emerald-500"
                                )} />
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{slot} PLACEMENT</p>
                            </div>
                            <h3 className="text-3xl font-black text-white">${price}</h3>
                            <p className="text-xs text-white/40 leading-relaxed">
                                {slot === 'HERO' && "Maximum platform visibility. Premium homepage hero section display. (Requires Admin Approval)"}
                                {slot === 'FEATURED' && "High visibility in search results and category featured sections."}
                                {slot === 'BANNER' && "Consistent brand awareness via footer and sidebar banner placements."}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {offers.map((offer) => (
                    <motion.div
                        layout
                        key={offer.id}
                        className="bg-[#131921] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all group overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />

                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                                    <Zap className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white">{offer.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-black text-primary uppercase tracking-widest">{offer.type}</span>
                                        <span className="w-1 h-1 rounded-full bg-white/10" />
                                        <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">{offer.slot} SLOT</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cn(
                                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border",
                                offer.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                    offer.status === 'PENDING' ? "bg-primary/10 text-primary border-primary/20" :
                                        "bg-red-500/10 text-red-500 border-red-500/20"
                            )}>
                                {offer.status}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5 mb-6">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Investment</p>
                                <p className="text-sm font-black text-white">${offer.price}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Expires</p>
                                <p className="text-sm font-black text-white/60">{offer.expiry}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Impressions</p>
                                <p className="text-sm font-black text-emerald-400">{offer.impressions.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 text-white/40">
                                <Clock size={12} />
                                <span className="text-[10px] font-bold">Last updated 2h ago</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => openEditModal(offer)} className="p-2 text-white/40 hover:text-primary transition-colors hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(offer.id)} className="p-2 text-white/40 hover:text-red-400 transition-colors hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10">
                                    <Trash size={16} />
                                </button>
                                <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors ml-2">
                                    Analytics
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Create Offer Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-[#131921] w-full max-w-xl rounded-[40px] border border-white/10 overflow-hidden shadow-3xl p-10 space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-black text-white tracking-tight">{editingId ? 'Edit Offer' : 'Create New Offer'}</h2>
                                    <p className="text-white/40 text-xs font-medium">Configure your promotion and ad placement.</p>
                                </div>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors">
                                    <XCircle size={24} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-white/30 uppercase tracking-widest">Offer Title</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Weekend Beverage Special"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full h-14 bg-white/5 rounded-2xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium placeholder:text-white/10"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-white/30 uppercase tracking-widest">Offer Type</label>
                                        <select
                                            value={formData.type}
                                            onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                                            className="w-full h-14 bg-white/5 rounded-2xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium appearance-none"
                                        >
                                            <option value="Discount">Percentage Discount</option>
                                            <option value="Bundle">Product Bundle</option>
                                            <option value="Flash Sale">Flash Sale</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-white/30 uppercase tracking-widest">Placement Slot</label>
                                        <select
                                            value={formData.slot}
                                            onChange={e => setFormData({ ...formData, slot: e.target.value as any })}
                                            className="w-full h-14 bg-white/5 rounded-2xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium appearance-none"
                                        >
                                            <option value="HERO">Hero Slot ($500)</option>
                                            <option value="FEATURED">Featured Slot ($300)</option>
                                            <option value="BANNER">Banner Slot ($200)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-white/30 uppercase tracking-widest">Expiry Date</label>
                                    <input
                                        required
                                        type="date"
                                        value={formData.expiry}
                                        onChange={e => setFormData({ ...formData, expiry: e.target.value })}
                                        className="w-full h-14 bg-white/5 rounded-2xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium"
                                    />
                                </div>

                                {formData.slot === 'HERO' && (
                                    <div className="p-6 bg-primary/10 rounded-3xl border border-primary/20 flex items-start gap-4 animate-in fade-in slide-in-from-top-2">
                                        <Info className="text-primary mt-1" size={24} />
                                        <div className="space-y-1">
                                            <p className="text-sm font-black text-white">Admin Approval Required</p>
                                            <p className="text-[10px] text-white/40 font-medium leading-relaxed">Hero placements are highly competitive and require review by our moderation team. Your offer will go live once approved.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full h-16 bg-primary text-[#131921] font-black rounded-2xl shadow-xl shadow-primary/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                            >
                                <CircleDollarSign size={20} className="group-hover:rotate-12 transition-transform" />
                                {editingId ? 'Update & Re-submit Offer' : 'Pay & Launch Offer'}
                            </button>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
