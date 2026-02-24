'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search, Plus, MapPin, Star, Building2, ShieldCheck, ExternalLink, X, Trash2, DollarSign, Tag, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ManagedSupplier {
    id: string;
    company: string;
    category: string;
    location: string;
    rating: number;
    status: 'VERIFIED' | 'PENDING' | 'SUSPENDED';
    productCount: number;
    offerCount: number;
    avatar?: string;
    description?: string;
    totalEarnings?: number;
}

export default function AdminSuppliersPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedSupplier, setSelectedSupplier] = React.useState<ManagedSupplier | null>(null);
    const [suppliers, setSuppliers] = React.useState<ManagedSupplier[]>([
        {
            id: 'SUP-01',
            company: 'Coca-Cola Hellenic',
            category: 'Beverages',
            location: 'Athens, GR',
            rating: 4.9,
            status: 'VERIFIED',
            productCount: 142,
            offerCount: 8,
            description: 'Global leader in beverage manufacturing and distribution, specializing in carbonated soft drinks and juices.',
            totalEarnings: 124500,
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1200px-Coca-Cola_logo.svg.png'
        },
        { id: 'SUP-02', company: 'Nestlé Professional', category: 'Multi-Category', location: 'Vevey, CH', rating: 4.8, status: 'VERIFIED', productCount: 850, offerCount: 15, totalEarnings: 85400 },
        { id: 'SUP-03', company: 'Red Bull Trading', category: 'Energy', location: 'Fuschl, AT', rating: 4.7, status: 'VERIFIED', productCount: 24, offerCount: 2, totalEarnings: 32000 },
        { id: 'SUP-04', company: 'Local Brew Co.', category: 'Craft Beverages', location: 'London, UK', rating: 4.5, status: 'PENDING', productCount: 12, offerCount: 0, totalEarnings: 1500 },
    ]);

    // Mock products for the selected supplier
    const [mockProducts, setMockProducts] = React.useState([
        { id: 'P1', name: 'Original Taste 330ml', price: 12.50, stock: 450 },
        { id: 'P2', name: 'Zero Sugar 500ml', price: 15.00, stock: 220 },
        { id: 'P3', name: 'Diet Coke 330ml', price: 11.50, stock: 180 },
    ]);

    const deleteSupplier = (id: string) => {
        setSuppliers(suppliers.filter(s => s.id !== id));
        setSelectedSupplier(null);
    };

    const deleteProduct = (id: string) => {
        setMockProducts(mockProducts.filter(p => p.id !== id));
    };

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
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/20 transition-colors overflow-hidden p-2">
                                {supplier.avatar ? (
                                    <img src={supplier.avatar} className="w-full h-full object-contain" alt={supplier.company} />
                                ) : (
                                    <Building2 className="text-primary" size={24} />
                                )}
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
                            <button
                                onClick={() => setSelectedSupplier(supplier)}
                                className="flex-1 h-10 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase rounded-xl transition-all border border-white/5"
                            >
                                View Profile
                            </button>
                            <button
                                onClick={() => deleteSupplier(supplier.id)}
                                className="w-10 h-10 bg-white/5 hover:bg-red-500 hover:text-white text-white/40 rounded-xl transition-all border border-white/5 flex items-center justify-center group/del"
                            >
                                <Trash2 size={16} className="group-hover/del:scale-110 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mac-style Profile Popup */}
            <AnimatePresence>
                {selectedSupplier && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSupplier(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#1c1c1e] w-full max-w-6xl max-h-[90vh] rounded-[32px] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] relative flex flex-col"
                        >
                            {/* Mac Window Controls */}
                            <div className="h-12 bg-[#2c2c2e] border-b border-black/20 flex items-center px-4 justify-between sticky top-0 z-10">
                                <div className="flex gap-2">
                                    <button onClick={() => setSelectedSupplier(null)} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57e6] border border-black/10 flex items-center justify-center group">
                                        <X size={8} className="text-black/40 opacity-0 group-hover:opacity-100" />
                                    </button>
                                    <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/10" />
                                    <div className="w-3 h-3 rounded-full bg-[#28c840] border border-black/10" />
                                </div>
                                <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest">{selectedSupplier.company} – Vendor Intelligence</p>
                                <div className="w-12" />
                            </div>

                            <div className="flex-1 overflow-y-auto no-scrollbar">
                                {/* Header / Hero */}
                                <div className="p-8 pb-0 flex flex-col md:flex-row gap-8">
                                    <div className="w-32 h-32 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden p-4 shrink-0 shadow-inner">
                                        {selectedSupplier.avatar ? (
                                            <img src={selectedSupplier.avatar} className="w-full h-full object-contain" alt={selectedSupplier.company} />
                                        ) : (
                                            <Building2 className="text-primary" size={48} />
                                        )}
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <div>
                                            <h2 className="text-3xl font-black text-white tracking-tight">{selectedSupplier.company}</h2>
                                            <p className="text-primary font-black text-xs uppercase tracking-[0.2em] mt-1">{selectedSupplier.category}</p>
                                        </div>
                                        <p className="text-sm text-white/60 leading-relaxed font-medium">
                                            {selectedSupplier.description || "No company description provided. This enterprise vendor specializes in high-volume distribution and supply chain logistics for modern retail markets."}
                                        </p>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <DollarSign className="text-emerald-400 mb-2" size={18} />
                                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Total Earnings</p>
                                        <p className="text-lg font-black text-white">${(selectedSupplier.totalEarnings || 0).toLocaleString()}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <Tag className="text-primary mb-2" size={18} />
                                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Active Offers</p>
                                        <p className="text-lg font-black text-white">{selectedSupplier.offerCount || 0}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <ShoppingBag className="text-blue-400 mb-2" size={18} />
                                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Active SKU</p>
                                        <p className="text-lg font-black text-white">{selectedSupplier.productCount}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <Star className="text-amber-400 mb-2" size={18} />
                                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Trust Rating</p>
                                        <p className="text-lg font-black text-white">{selectedSupplier.rating} / 5.0</p>
                                    </div>
                                </div>

                                {/* Secondary Content Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 pb-10">
                                    {/* Products List */}
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                                <Package size={16} className="text-primary" />
                                                Active Inventory
                                            </h3>
                                            <button className="h-8 px-3 bg-primary/10 text-primary border border-primary/20 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-primary/20 transition-all flex items-center gap-2">
                                                <Plus size={12} strokeWidth={3} /> Add Product
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            {mockProducts.map((product) => (
                                                <div key={product.id} className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/5 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                                            <ImageIcon size={18} className="text-white/20" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-white mb-0.5">{product.name}</p>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-[10px] text-white/40 font-bold">${product.price.toFixed(2)}</span>
                                                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                                                <span className="text-[10px] text-emerald-400/60 font-black">{product.stock} in stock</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Link href={`/products/${product.id}`} className="p-2 text-white/20 hover:text-white transition-colors">
                                                            <ExternalLink size={14} />
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteProduct(product.id)}
                                                            className="p-2 text-red-500/40 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Offers List */}
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                                <Tag size={16} className="text-emerald-400" />
                                                Live Offers
                                            </h3>
                                            <button className="h-8 px-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500/20 transition-all flex items-center gap-2">
                                                <Plus size={12} strokeWidth={3} /> Create Offer
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                { id: 'O1', name: 'Summer Bulk Pack', discount: '-15%', status: 'Active' },
                                                { id: 'O2', name: 'New Client Special', discount: '-10%', status: 'Pending' },
                                            ].map((offer) => (
                                                <div key={offer.id} className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/5 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                                            <Tag size={18} className="text-emerald-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-white mb-0.5">{offer.name}</p>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-[10px] text-emerald-400 font-black tracking-widest">{offer.discount} OFF</span>
                                                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                                                <span className={cn(
                                                                    "text-[10px] font-black uppercase tracking-tighter",
                                                                    offer.status === 'Active' ? "text-emerald-400/60" : "text-amber-400/60"
                                                                )}>{offer.status}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Link href="/admin/offers" className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-white transition-all">
                                                        <ExternalLink size={14} />
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-6 bg-[#2c2c2e]/50 border-t border-white/5 flex justify-between items-center">
                                <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                                    <ShieldCheck size={16} />
                                    <span className="text-[11px] font-black uppercase tracking-widest">Verify Documents</span>
                                </button>
                                <button
                                    onClick={() => deleteSupplier(selectedSupplier.id)}
                                    className="h-11 px-6 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                                >
                                    <Trash2 size={14} /> Delete Supplier
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Helper icons
function ImageIcon({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
    );
}
