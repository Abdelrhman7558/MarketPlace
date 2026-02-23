'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutList, CheckCircle2, XCircle, Search, Target, MonitorPlay, Crown, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type PlacementStatus = 'PENDING' | 'ACTIVE' | 'REJECTED' | 'EXPIRED';
type PlacementCategory = 'HERO' | 'SPONSORED_PRODUCT' | 'SEARCH_LISTING' | 'DISPLAY_AD';

interface PlacementRequest {
    id: string;
    supplier: string;
    product: string;
    category: PlacementCategory;
    duration: string;
    price: number;
    status: PlacementStatus;
    requestedAt: string;
    impressions?: number;
    clicks?: number;
}

const MOCK_PLACEMENTS: PlacementRequest[] = [
    {
        id: 'PL-101',
        supplier: 'BeverageGroup Inc.',
        product: 'Premium Energy Bundle',
        category: 'HERO',
        duration: '7 Days',
        price: 1500,
        status: 'ACTIVE',
        requestedAt: '2026-02-20',
        impressions: 125000,
        clicks: 3420
    },
    {
        id: 'PL-102',
        supplier: 'SnackCo',
        product: 'Organic Nut Mix',
        category: 'SPONSORED_PRODUCT',
        duration: '14 Days',
        price: 800,
        status: 'PENDING',
        requestedAt: '2026-02-21'
    },
    {
        id: 'PL-103',
        supplier: 'AquaPure',
        product: 'Spring Water 500ml',
        category: 'SEARCH_LISTING',
        duration: '30 Days',
        price: 500,
        status: 'PENDING',
        requestedAt: '2026-02-22'
    },
    {
        id: 'PL-104',
        supplier: 'Global Foods Retail',
        product: 'Imported Chocolates',
        category: 'DISPLAY_AD',
        duration: '7 Days',
        price: 450,
        status: 'ACTIVE',
        requestedAt: '2026-02-18',
        impressions: 45000,
        clicks: 890
    }
];

const CATEGORY_MAP: Record<PlacementCategory, { label: string, icon: any, desc: string }> = {
    HERO: { label: 'Hero Banners', icon: Crown, desc: 'Prime home page billboard' },
    SPONSORED_PRODUCT: { label: 'Sponsored Products', icon: Target, desc: 'High visibility in category grids' },
    SEARCH_LISTING: { label: 'Search Listings', icon: Search, desc: 'Top of search results priority' },
    DISPLAY_AD: { label: 'Display Ads', icon: MonitorPlay, desc: 'Sidebar and contextual placements' }
};

export default function AdminPlacementsPage() {
    const [placements, setPlacements] = React.useState<PlacementRequest[]>(MOCK_PLACEMENTS);
    const [activeCategory, setActiveCategory] = React.useState<PlacementCategory>('HERO');
    const [filter, setFilter] = React.useState<PlacementStatus | 'ALL'>('ALL');

    const handleAction = (id: string, status: PlacementStatus) => {
        setPlacements(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    };

    const filtered = placements.filter(p =>
        p.category === activeCategory &&
        (filter === 'ALL' || p.status === filter)
    );

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white tracking-tight">Ad Placements</h1>
                    <p className="text-white/40 font-medium">Manage Amazon-style sponsored listings and banner approvals.</p>
                </div>

                <div className="flex items-center gap-2 p-1 bg-[#131921] rounded-xl border border-white/5">
                    {(['ALL', 'PENDING', 'ACTIVE', 'REJECTED'] as const).map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-[10px] uppercase tracking-widest font-black transition-all",
                                filter === s ? "bg-primary text-[#131921]" : "text-white/40 hover:text-white"
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {(Object.entries(CATEGORY_MAP) as [PlacementCategory, typeof CATEGORY_MAP[PlacementCategory]][]).map(([key, info]) => {
                    const Icon = info.icon;
                    const isActive = activeCategory === key;
                    const count = placements.filter(p => p.category === key && p.status === 'PENDING').length;

                    return (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key)}
                            className={cn(
                                "p-6 rounded-3xl border text-left flex flex-col gap-4 relative overflow-hidden transition-all duration-300",
                                isActive
                                    ? "bg-primary/5 border-primary shadow-[0_0_30px_rgba(255,215,0,0.1)]"
                                    : "bg-[#131921] border-white/5 hover:border-white/20"
                            )}
                        >
                            {isActive && <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />}

                            <div className="flex items-center justify-between relative z-10 w-full">
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                    isActive ? "bg-primary text-[#131921]" : "bg-white/5 text-white/40"
                                )}>
                                    <Icon size={20} />
                                </div>
                                {count > 0 && (
                                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg">
                                        {count} Pending
                                    </span>
                                )}
                            </div>

                            <div className="relative z-10">
                                <h3 className={cn("font-black mb-1", isActive ? "text-primary" : "text-white")}>{info.label}</h3>
                                <p className="text-xs font-medium text-white/40">{info.desc}</p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Request List */}
            <div className="bg-[#131921] rounded-3xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                    <h2 className="font-black text-white flex items-center gap-2">
                        {CATEGORY_MAP[activeCategory].icon({ size: 18, className: "text-primary" })}
                        {CATEGORY_MAP[activeCategory].label} Pipeline
                    </h2>
                </div>

                <div className="divide-y divide-white/5">
                    <AnimatePresence mode="popLayout">
                        {filtered.length === 0 ? (
                            <div className="p-12 text-center text-white/40 font-medium">
                                No {filter.toLowerCase()} placements in this category.
                            </div>
                        ) : filtered.map((p, i) => (
                            <motion.div
                                key={p.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-6 hover:bg-white/[0.02] transition-colors relative group flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                            >
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-12 h-12 bg-[#1A222C] rounded-xl flex items-center justify-center border border-white/5 flex-shrink-0">
                                        <Target size={20} className="text-white/20" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-black text-white text-lg">{p.product}</h3>
                                            <div className={cn(
                                                "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                                p.status === 'PENDING' ? "bg-amber-400/10 text-amber-400 border-amber-400/20" :
                                                    p.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                        "bg-red-500/10 text-red-500 border-red-500/20"
                                            )}>
                                                {p.status}
                                            </div>
                                        </div>
                                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{p.supplier}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:border-x border-white/5 flex-1 w-full lg:w-auto">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Duration</p>
                                        <p className="text-sm font-bold text-white">{p.duration}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Budget</p>
                                        <p className="text-sm font-black text-emerald-400">${p.price}</p>
                                    </div>
                                    {p.status === 'ACTIVE' ? (
                                        <>
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Impressions</p>
                                                <p className="text-sm font-bold text-white">{(p.impressions || 0).toLocaleString()}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Clicks</p>
                                                <p className="text-sm font-bold text-white">{(p.clicks || 0).toLocaleString()}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="col-span-2 flex items-center">
                                            <span className="text-xs font-medium text-white/30 italic">Metrics available when active</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-3 min-w-[180px]">
                                    {p.status === 'PENDING' ? (
                                        <>
                                            <button
                                                onClick={() => handleAction(p.id, 'ACTIVE')}
                                                className="w-10 h-10 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/20 transition-all flex items-center justify-center"
                                                title="Approve"
                                            >
                                                <CheckCircle2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleAction(p.id, 'REJECTED')}
                                                className="w-10 h-10 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition-all flex items-center justify-center"
                                                title="Reject"
                                            >
                                                <XCircle size={18} />
                                            </button>
                                        </>
                                    ) : p.status === 'ACTIVE' ? (
                                        <button
                                            onClick={() => handleAction(p.id, 'REJECTED')}
                                            className="h-10 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-black text-[10px] uppercase tracking-widest rounded-xl border border-red-500/20 transition-all"
                                        >
                                            Revoke
                                        </button>
                                    ) : (
                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Closed</span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
