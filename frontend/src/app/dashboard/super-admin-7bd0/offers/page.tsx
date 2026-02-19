'use client';

import { useState } from 'react';
import {
    Tag,
    Plus,
    Search,
    Calendar,
    Clock,
    TrendingUp,
    Package,
    Trash2,
    Edit3,
    X,
    CheckCircle2,
    AlertCircle,
    Zap
} from 'lucide-react';

interface Offer {
    id: string;
    title: string;
    description: string;
    code: string;
    discount: string;
    expiry: string;
    status: 'Active' | 'Expired' | 'Scheduled';
    usageCount: number;
    type: 'Bundle' | 'Discount' | 'Flash Sale';
}

const INITIAL_OFFERS: Offer[] = [
    {
        id: '1',
        title: 'Coca-Cola Mega Bundle',
        description: 'Buy 20 cases of Coca-Cola 330ml, get 2 cases free.',
        code: 'COKE2024',
        discount: '10% Free',
        expiry: '2026-03-31',
        status: 'Active',
        usageCount: 45,
        type: 'Bundle'
    },
    {
        id: '2',
        title: 'Pepsi Summer Blast',
        description: 'Flat 15% off on all Pepsi products for orders over $500.',
        code: 'PEPSISUMMER',
        discount: '15% OFF',
        expiry: '2026-04-15',
        status: 'Scheduled',
        usageCount: 0,
        type: 'Flash Sale'
    },
    {
        id: '3',
        title: 'Red Bull Energy Pack',
        description: 'Buy 5 trays of Red Bull, get 1 crate of Water free.',
        code: 'ENERGYUP',
        discount: 'Free Item',
        expiry: '2026-02-28',
        status: 'Active',
        usageCount: 128,
        type: 'Bundle'
    },
    {
        id: '4',
        title: 'Bulk Lipton Tea Deal',
        description: '$50 off on Lipton Tea bulk shipments.',
        code: 'LIPTON50',
        discount: '$50 OFF',
        expiry: '2026-01-31',
        status: 'Expired',
        usageCount: 89,
        type: 'Discount'
    }
];

export default function OffersPage() {
    const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newOffer, setNewOffer] = useState<Partial<Offer>>({
        type: 'Discount',
        status: 'Active'
    });

    const filteredOffers = offers.filter(offer =>
        offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: Offer['status']) => {
        switch (status) {
            case 'Active': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'Expired': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'Scheduled': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
        }
    };

    const getTypeIcon = (type: Offer['type']) => {
        switch (type) {
            case 'Bundle': return <Package className="w-4 h-4" />;
            case 'Discount': return <Tag className="w-4 h-4" />;
            case 'Flash Sale': return <Zap className="w-4 h-4" />;
        }
    };

    const handleAddOffer = () => {
        if (!newOffer.title || !newOffer.code) return;

        const offer: Offer = {
            id: Math.random().toString(36).substr(2, 9),
            title: newOffer.title!,
            description: newOffer.description || '',
            code: newOffer.code!,
            discount: newOffer.discount || 'Special',
            expiry: newOffer.expiry || '2026-12-31',
            status: 'Active',
            usageCount: 0,
            type: newOffer.type as Offer['type']
        };

        setOffers([offer, ...offers]);
        setIsModalOpen(false);
        setNewOffer({ type: 'Discount', status: 'Active' });
    };

    const deleteOffer = (id: string) => {
        setOffers(offers.filter(o => o.id !== id));
    };

    return (
        <div className="p-4 sm:p-8 space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Tag className="w-8 h-8 text-brand-orange" />
                        Offers & Promotions
                    </h1>
                    <p className="text-text-muted mt-1">Create and manage special deals for your B2B clients</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Create New Offer
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Active Offers', value: '12', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'Total Redemptions', value: '2,450', icon: TrendingUp, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
                    { label: 'Expiring Soon', value: '3', icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
                    { label: 'Revenue Generated', value: '$12,840', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform cursor-default">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-lg`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-text-muted text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-white mt-0.5">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-brand-orange transition-colors" />
                    <input
                        type="text"
                        placeholder="Search offers by title or code..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="auth-input pl-11 py-3"
                    />
                </div>
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredOffers.map((offer) => (
                    <div key={offer.id} className="glass-card overflow-hidden group hover:shadow-glow-orange/10 transition-all duration-300">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-white/5 text-brand-orange`}>
                                        {getTypeIcon(offer.type)}
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                                        {offer.type}
                                    </span>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(offer.status)} uppercase tracking-widest`}>
                                    {offer.status}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-orange transition-colors">
                                {offer.title}
                            </h3>
                            <p className="text-text-muted text-sm mb-6 line-clamp-2">
                                {offer.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <div className="bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-2 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-brand-orange" />
                                    <span className="font-mono text-white font-bold tracking-wider">{offer.code}</span>
                                </div>
                                <div className="bg-brand-orange/20 border border-brand-orange/30 text-brand-orange rounded-lg px-4 py-2 font-bold">
                                    {offer.discount}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 text-sm">
                                <div className="flex items-center gap-2 text-text-muted">
                                    <Calendar className="w-4 h-4" />
                                    <span>Expires: {offer.expiry}</span>
                                </div>
                                <div className="flex items-center gap-2 text-text-muted">
                                    <Clock className="w-4 h-4" />
                                    <span>Used: {offer.usageCount} times</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/[0.02] border-t border-white/5 p-4 flex justify-end gap-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <button className="p-2 text-text-muted hover:text-white transition-colors">
                                <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => deleteOffer(offer.id)}
                                className="p-2 text-text-muted hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {filteredOffers.length === 0 && (
                    <div className="lg:col-span-2 py-20 text-center glass-card border-dashed">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-text-muted">
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white">No offers found</h3>
                        <p className="text-text-muted mt-1">Try adjusting your search criteria</p>
                    </div>
                )}
            </div>

            {/* Add Offer Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-brand-navy/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="glass-card w-full max-w-lg relative z-10 animate-scale-in">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Plus className="w-5 h-5 text-brand-orange" />
                                Create New Offer
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-text-muted">Type</label>
                                    <select
                                        value={newOffer.type}
                                        onChange={(e) => setNewOffer({ ...newOffer, type: e.target.value as any })}
                                        className="auth-input"
                                    >
                                        <option value="Bundle">Bundle</option>
                                        <option value="Discount">Discount</option>
                                        <option value="Flash Sale">Flash Sale</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-text-muted">Discount Label</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 20% OFF"
                                        value={newOffer.discount}
                                        onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
                                        className="auth-input"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-muted">Offer Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter offer name"
                                    value={newOffer.title}
                                    onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                                    className="auth-input"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-muted">Promo Code</label>
                                <input
                                    type="text"
                                    placeholder="e.g. SUMMER2026"
                                    value={newOffer.code}
                                    onChange={(e) => setNewOffer({ ...newOffer, code: e.target.value.toUpperCase() })}
                                    className="auth-input font-mono uppercase"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-muted">Description</label>
                                <textarea
                                    placeholder="Describe the offer details..."
                                    rows={3}
                                    value={newOffer.description}
                                    onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                                    className="auth-input resize-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-muted">Expiry Date</label>
                                <input
                                    type="date"
                                    value={newOffer.expiry}
                                    onChange={(e) => setNewOffer({ ...newOffer, expiry: e.target.value })}
                                    className="auth-input"
                                />
                            </div>
                            <button
                                onClick={handleAddOffer}
                                className="btn-primary w-full py-3.5 mt-2 flex items-center justify-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Create Offer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
