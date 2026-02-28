'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search, Plus, Building2, ShieldCheck, X, Trash2, DollarSign, Tag, Mail, Phone, Globe, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Supplier {
    id: string;
    name: string;
    email: string;
    phone?: string;
    companyName?: string;
    website?: string;
    socialLinks?: string;
    avatar?: string;
    status: string;
    role: string;
    createdAt: string;
}

export default function AdminSuppliersPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedSupplier, setSelectedSupplier] = React.useState<Supplier | null>(null);
    const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadSuppliers = async () => {
            try {
                const token = localStorage.getItem('bev-token');
                const res = await fetch('http://localhost:3005/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setSuppliers(data.filter((u: any) => u.role === 'SUPPLIER'));
                }
            } catch (err) {
                console.error("Failed to load suppliers:", err);
            } finally {
                setLoading(false);
            }
        };
        loadSuppliers();
        const interval = setInterval(loadSuppliers, 15000);
        return () => clearInterval(interval);
    }, []);

    const filteredSuppliers = suppliers.filter(s =>
        (s.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (s.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (s.companyName?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const activeSuppliers = suppliers.filter(s => s.status === 'ACTIVE');
    const pendingSuppliers = suppliers.filter(s => s.status === 'PENDING_APPROVAL');

    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-foreground tracking-tight">Supplier Directory</h1>
                    <p className="text-muted-foreground font-medium">Manage enterprise vendor relationships and verification status.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search suppliers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-12 pl-12 pr-6 bg-card rounded-xl border border-border/50 outline-none focus:border-primary/50 text-foreground text-sm w-[250px] transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-3xl border border-border/50 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                    <div className="relative z-10 flex items-center gap-5">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                            <Package size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Suppliers</p>
                            <p className="text-3xl font-black text-foreground mt-1">{suppliers.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-3xl border border-border/50 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
                    <div className="relative z-10 flex items-center gap-5">
                        <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active / Verified</p>
                            <p className="text-3xl font-black text-foreground mt-1">{activeSuppliers.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-3xl border border-amber-500/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Pending Approval</p>
                            <p className="text-3xl font-black text-foreground mt-1">{pendingSuppliers.length}</p>
                        </div>
                        <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20">
                            {pendingSuppliers.length > 0 && <div className="w-4 h-4 rounded-full bg-amber-500 animate-pulse border-2 border-background" />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Suppliers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-20 text-muted-foreground font-bold">Loading suppliers...</div>
                ) : filteredSuppliers.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-muted-foreground font-bold">No suppliers found.</div>
                ) : (
                    <AnimatePresence>
                        {filteredSuppliers.map((supplier, i) => (
                            <motion.div
                                key={supplier.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-card border border-border/50 rounded-3xl p-6 hover:border-primary/50 transition-all group relative overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:bg-muted/30"
                                onClick={() => setSelectedSupplier(supplier)}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 bg-muted/50 rounded-2xl flex items-center justify-center border border-border/50 group-hover:border-primary/20 transition-colors overflow-hidden">
                                        {supplier.avatar ? (
                                            <img src={supplier.avatar} className="w-full h-full object-cover" alt={supplier.name} />
                                        ) : (
                                            <span className="text-xl font-black text-primary">{supplier.name?.[0] || '?'}</span>
                                        )}
                                    </div>
                                    <div className={cn(
                                        "px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
                                        supplier.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                            supplier.status === 'PENDING_APPROVAL' ? "bg-amber-400/10 text-amber-500 border-amber-400/20" :
                                                "bg-destructive/10 text-destructive border-destructive/20"
                                    )}>
                                        {supplier.status === 'ACTIVE' ? 'VERIFIED' : supplier.status === 'PENDING_APPROVAL' ? 'PENDING' : supplier.status}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">{supplier.name}</h3>
                                        <p className="text-xs text-muted-foreground font-medium mt-1">{supplier.email}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Company</p>
                                            <p className="text-sm font-black text-foreground truncate">{supplier.companyName || 'Not set'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Phone</p>
                                            <p className="text-sm font-black text-foreground">{supplier.phone || 'Not set'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <button
                                        className="flex-1 h-10 bg-muted/50 hover:bg-muted text-foreground font-black text-[10px] uppercase rounded-xl transition-all border border-border/50"
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Supplier Profile Modal */}
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
                            className="bg-card w-full max-w-3xl max-h-[90vh] rounded-[32px] border border-border/50 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] relative flex flex-col"
                        >
                            {/* Mac Window Controls */}
                            <div className="h-12 bg-muted/50 border-b border-border/50 flex items-center px-4 justify-between sticky top-0 z-10">
                                <div className="flex gap-2">
                                    <button onClick={() => setSelectedSupplier(null)} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57e6] border border-black/10 flex items-center justify-center group">
                                        <X size={8} className="text-black/40 opacity-0 group-hover:opacity-100" />
                                    </button>
                                    <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/10" />
                                    <div className="w-3 h-3 rounded-full bg-[#28c840] border border-black/10" />
                                </div>
                                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{selectedSupplier.name} – Supplier Profile</p>
                                <div className="w-12" />
                            </div>

                            <div className="flex-1 overflow-y-auto no-scrollbar">
                                {/* Header */}
                                <div className="p-8 pb-0 flex flex-col md:flex-row gap-8">
                                    <div className="w-32 h-32 rounded-3xl bg-muted/30 flex items-center justify-center border border-border/50 overflow-hidden shrink-0 shadow-inner">
                                        {selectedSupplier.avatar ? (
                                            <img src={selectedSupplier.avatar} className="w-full h-full object-cover" alt={selectedSupplier.name} />
                                        ) : (
                                            <span className="text-4xl font-black text-primary">{selectedSupplier.name?.[0] || '?'}</span>
                                        )}
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <div>
                                            <h2 className="text-3xl font-black text-foreground tracking-tight">{selectedSupplier.name}</h2>
                                            <p className="text-primary font-black text-xs uppercase tracking-[0.2em] mt-1">
                                                {selectedSupplier.status === 'ACTIVE' ? 'VERIFIED SUPPLIER' : selectedSupplier.status}
                                            </p>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                                            {selectedSupplier.companyName || selectedSupplier.name} — registered supplier on the Atlantis platform.
                                        </p>
                                    </div>
                                </div>

                                {/* Contact Details */}
                                <div className="p-8 space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Contact Information</h3>
                                    <div className="bg-muted/30 rounded-2xl p-4 space-y-4 border border-border/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center text-muted-foreground border border-border/50"><Mail size={18} /></div>
                                            <div>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email</p>
                                                <p className="text-sm font-bold text-foreground">{selectedSupplier.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center text-muted-foreground border border-border/50"><Phone size={18} /></div>
                                            <div>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Phone</p>
                                                <p className="text-sm font-bold text-foreground">{selectedSupplier.phone || 'Not provided'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center text-muted-foreground border border-border/50"><Building2 size={18} /></div>
                                            <div>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Company</p>
                                                <p className="text-sm font-bold text-foreground">{selectedSupplier.companyName || 'Not provided'}</p>
                                            </div>
                                        </div>
                                        {selectedSupplier.website && (
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center text-muted-foreground border border-border/50"><Globe size={18} /></div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Website</p>
                                                    <a href={selectedSupplier.website} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:underline">{selectedSupplier.website}</a>
                                                </div>
                                            </div>
                                        )}
                                        {selectedSupplier.socialLinks && (
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center text-muted-foreground border border-border/50"><LinkIcon size={18} /></div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Social Links</p>
                                                    <p className="text-sm font-bold text-foreground break-words">{selectedSupplier.socialLinks}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Member Since</p>
                                        <p className="text-sm font-bold text-foreground mt-1">{new Date(selectedSupplier.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
