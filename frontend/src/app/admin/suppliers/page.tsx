'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search, Plus, MapPin, Star, Building2, ShieldCheck, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ManagedSupplier {
    id: string;
    company: string;
    category: string;
    location: string;
    rating: number;
    status: 'VERIFIED' | 'PENDING' | 'SUSPENDED';
    productCount: number;
}

export default function AdminSuppliersPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [suppliers] = React.useState<ManagedSupplier[]>([
        { id: 'SUP-01', company: 'Coca-Cola Hellenic', category: 'Beverages', location: 'Athens, GR', rating: 4.9, status: 'VERIFIED', productCount: 142 },
        { id: 'SUP-02', company: 'Nestlé Professional', category: 'Multi-Category', location: 'Vevey, CH', rating: 4.8, status: 'VERIFIED', productCount: 850 },
        { id: 'SUP-03', company: 'Red Bull Trading', category: 'Energy', location: 'Fuschl, AT', rating: 4.7, status: 'VERIFIED', productCount: 24 },
        { id: 'SUP-04', company: 'Local Brew Co.', category: 'Craft Beverages', location: 'London, UK', rating: 4.5, status: 'PENDING', productCount: 12 },
    ]);

    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white tracking-tight">Supplier Directory</h1>
                    <p className="text-white/40 font-medium">Manage enterprise vendor relationships and verification status.</p>
                </div>

                <button className="h-12 px-6 bg-primary text-[#131921] font-black text-sm rounded-xl hover:scale-105 transition-transform flex items-center gap-2">
                    <Plus size={18} strokeWidth={3} /> Add Manual Supplier
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suppliers.map((supplier, i) => (
                    <motion.div
                        key={supplier.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-[#131921] border border-white/5 rounded-3xl p-6 hover:border-primary/20 transition-all group relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/20 transition-colors">
                                <Building2 className="text-primary" size={24} />
                            </div>
                            <div className={cn(
                                "px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
                                supplier.status === 'VERIFIED' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-400/10 text-amber-400 border-amber-400/20"
                            )}>
                                {supplier.status}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors">{supplier.company}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">{supplier.category}</p>
                                    <span className="w-1 h-1 rounded-full bg-white/10" />
                                    <div className="flex items-center gap-1 text-amber-400">
                                        <Star size={10} fill="currentColor" />
                                        <span className="text-[10px] font-black">{supplier.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Active SKU</p>
                                    <p className="text-sm font-black text-white">{supplier.productCount}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Headquarters</p>
                                    <p className="text-sm font-black text-white/60 flex items-center gap-1">
                                        <MapPin size={10} /> {supplier.location.split(',')[0]}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button className="flex-1 h-10 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase rounded-xl transition-all border border-white/5">
                                View Profile
                            </button>
                            <button className="w-10 h-10 bg-white/5 hover:bg-primary hover:text-[#131921] text-white/40 rounded-xl transition-all border border-white/5 flex items-center justify-center">
                                <ExternalLink size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
