'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, UserCircle2, Mail, Download, MoreVertical, X, Shield, CircleDollarSign, Phone, Globe, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Buyer {
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

export default function AdminBuyersPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedBuyer, setSelectedBuyer] = React.useState<Buyer | null>(null);
    const [buyers, setBuyers] = React.useState<Buyer[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadBuyers = async () => {
            try {
                const token = localStorage.getItem('bev-token');
                const res = await fetch('http://localhost:3005/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setBuyers(data.filter((u: any) => u.role === 'CUSTOMER'));
                }
            } catch (err) {
                console.error("Failed to load buyers:", err);
            } finally {
                setLoading(false);
            }
        };
        loadBuyers();
        const interval = setInterval(loadBuyers, 15000);
        return () => clearInterval(interval);
    }, []);

    const filteredBuyers = buyers.filter(b =>
        (b.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (b.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (b.companyName?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const activeBuyers = buyers.filter(b => b.status === 'ACTIVE');
    const pendingBuyers = buyers.filter(b => b.status === 'PENDING_APPROVAL');

    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-foreground tracking-tight">Enterprise Buyers</h1>
                    <p className="text-muted-foreground font-medium">Manage procurement corporate accounts and buyer profiles.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search buyers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-12 pl-12 pr-6 bg-card rounded-xl border border-border/50 outline-none focus:border-primary/50 text-foreground text-sm w-[250px] transition-all"
                        />
                    </div>
                    <button className="h-12 w-12 bg-card rounded-xl border border-border/50 flex items-center justify-center text-foreground hover:border-primary/50 hover:bg-muted/50 transition-all">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-3xl border border-border/50 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                    <div className="relative z-10 flex items-center gap-5">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                            <Building2 size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Buyers</p>
                            <p className="text-3xl font-black text-foreground mt-1">{buyers.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-3xl border border-border/50 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
                    <div className="relative z-10 flex items-center gap-5">
                        <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                            <CircleDollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Buyers</p>
                            <p className="text-3xl font-black text-foreground mt-1">{activeBuyers.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-3xl border border-amber-500/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Pending Approval</p>
                            <p className="text-3xl font-black text-foreground mt-1">{pendingBuyers.length}</p>
                        </div>
                        <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20">
                            {pendingBuyers.length > 0 && <div className="w-4 h-4 rounded-full bg-amber-500 animate-pulse border-2 border-background" />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Buyers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-20 text-muted-foreground font-bold">Loading buyers...</div>
                ) : filteredBuyers.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-muted-foreground font-bold">No buyers found.</div>
                ) : (
                    <AnimatePresence>
                        {filteredBuyers.map((buyer) => (
                            <motion.div
                                key={buyer.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-card rounded-3xl border border-border/50 p-8 relative group hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-md"
                                onClick={() => setSelectedBuyer(buyer)}
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex items-start justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center border border-border/50 overflow-hidden">
                                            {buyer.avatar ? (
                                                <img src={buyer.avatar} alt={buyer.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-2xl font-black text-primary">{buyer.name?.[0] || '?'}</span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-foreground text-lg">{buyer.name}</h3>
                                            <p className="text-xs text-muted-foreground font-medium">{buyer.email}</p>
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border",
                                        buyer.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                            buyer.status === 'PENDING_APPROVAL' ? "bg-amber-400/10 text-amber-500 border-amber-400/20" :
                                                "bg-destructive/10 text-destructive border-destructive/20"
                                    )}>
                                        {buyer.status === 'PENDING_APPROVAL' ? 'PENDING' : buyer.status}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-muted/30 border border-border/50 rounded-2xl">
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Company</p>
                                        <p className="font-black text-foreground text-sm truncate">{buyer.companyName || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Phone</p>
                                        <p className="font-black text-muted-foreground text-sm">{buyer.phone || 'Not set'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <p className="text-[10px] text-muted-foreground font-bold">
                                        Joined {new Date(buyer.createdAt).toLocaleDateString()}
                                    </p>
                                    <button className="w-8 h-8 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
                                        <MoreVertical size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Selected Buyer Details Sidebar */}
            <AnimatePresence>
                {selectedBuyer && (
                    <div className="fixed inset-0 z-[100] flex justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedBuyer(null)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="bg-card w-full max-w-xl h-full relative z-10 border-l border-border/50 shadow-2xl overflow-y-auto no-scrollbar"
                        >
                            <div className="sticky top-0 bg-card/80 backdrop-blur-xl border-b border-border/50 p-6 flex items-center justify-between z-20">
                                <h2 className="text-xl font-black text-foreground">Buyer Profile</h2>
                                <button onClick={() => setSelectedBuyer(null)} className="w-10 h-10 rounded-xl hover:bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8 space-y-10">
                                {/* Buyer Identity */}
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 bg-muted/30 rounded-3xl flex items-center justify-center border border-border/50 relative overflow-hidden">
                                        {selectedBuyer.avatar ? (
                                            <img src={selectedBuyer.avatar} alt={selectedBuyer.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-3xl font-black text-primary">{selectedBuyer.name?.[0] || '?'}</span>
                                        )}
                                        <div className={cn(
                                            "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-card",
                                            selectedBuyer.status === 'ACTIVE' ? "bg-emerald-500" :
                                                selectedBuyer.status === 'PENDING_APPROVAL' ? "bg-amber-500" : "bg-destructive"
                                        )} />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-black text-foreground">{selectedBuyer.name}</h1>
                                        <p className="text-sm font-medium text-muted-foreground mt-1">{selectedBuyer.role} • {selectedBuyer.status === 'PENDING_APPROVAL' ? 'Pending' : selectedBuyer.status}</p>
                                    </div>
                                </div>

                                {/* Contact Details */}
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Contact Information</h3>
                                    <div className="bg-muted/30 rounded-2xl p-4 space-y-4 border border-border/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center text-muted-foreground border border-border/50"><Mail size={18} /></div>
                                            <div>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email</p>
                                                <p className="text-sm font-bold text-foreground">{selectedBuyer.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center text-muted-foreground border border-border/50"><Phone size={18} /></div>
                                            <div>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Phone</p>
                                                <p className="text-sm font-bold text-foreground">{selectedBuyer.phone || 'Not provided'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center text-muted-foreground border border-border/50"><Building2 size={18} /></div>
                                            <div>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Company</p>
                                                <p className="text-sm font-bold text-foreground">{selectedBuyer.companyName || 'Not provided'}</p>
                                            </div>
                                        </div>
                                        {selectedBuyer.website && (
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center text-muted-foreground border border-border/50"><Globe size={18} /></div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Website</p>
                                                    <a href={selectedBuyer.website} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:underline">{selectedBuyer.website}</a>
                                                </div>
                                            </div>
                                        )}
                                        {selectedBuyer.socialLinks && (
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center text-muted-foreground border border-border/50"><LinkIcon size={18} /></div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Social Links</p>
                                                    <p className="text-sm font-bold text-foreground break-words">{selectedBuyer.socialLinks}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Joined */}
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Member Since</p>
                                    <p className="text-sm font-bold text-foreground mt-1">{new Date(selectedBuyer.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
