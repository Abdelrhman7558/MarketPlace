'use client';

import { useState } from 'react';
import {
    BarChart3, Check, X, AlertCircle,
    ExternalLink, Calendar, Search, Filter,
    History, Settings2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const PENDING_PLACEMENTS = [
    { id: 'PLC-101', supplier: 'Alpha Distrib.', product: 'Coca Cola 24pk', slot: 'Hero Banner', date: 'Feb 24 - Feb 28', cost: '$1,250', status: 'Pending' },
    { id: 'PLC-102', supplier: 'Beta Drinks', product: 'Monster Energy', slot: 'Featured Grid', date: 'Feb 22 - Feb 25', cost: '$480', status: 'Pending' },
    { id: 'PLC-103', supplier: 'Gamma Water', product: 'Evian 500ml', slot: 'Category Ad', date: 'Feb 23 - Feb 24', cost: '$75', status: 'Pending' },
];

export default function PlacementManagement() {
    const [filter, setFilter] = useState('pending');

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-poppins font-black tracking-tight">Placement Oversight</h1>
                    <p className="text-foreground/60">Moderate premium ad spots and resolve priority conflicts.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-full gap-2 border-foreground/10">
                        <History className="w-4 h-4" />
                        Audit Log
                    </Button>
                    <Button className="rounded-full gap-2 shadow-xl shadow-secondary/20 bg-secondary hover:bg-secondary/90 text-white">
                        <Settings2 className="w-4 h-4" />
                        Configure Slots
                    </Button>
                </div>
            </div>

            {/* Control Bar */}
            <div className="bg-surface border border-border/50 p-4 rounded-3xl flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-full">
                    {['pending', 'active', 'rejected', 'expired'].map(t => (
                        <button
                            key={t}
                            className={cn(
                                "px-5 py-2 rounded-full text-xs font-black uppercase tracking-tight transition-all",
                                filter === t ? "bg-white text-foreground shadow-sm" : "text-foreground/40 hover:text-foreground"
                            )}
                            onClick={() => setFilter(t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                        <input className="h-10 pl-10 pr-4 rounded-full border border-border/50 bg-muted/10 text-xs focus:outline-none" placeholder="Search supplier..." />
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-full"><Filter className="w-4 h-4" /></Button>
                </div>
            </div>

            {/* Inbox Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {PENDING_PLACEMENTS.map((item) => (
                    <div key={item.id} className="bg-surface border border-border/50 p-8 rounded-[2.5rem] space-y-6 hover:shadow-2xl transition-all group relative overflow-hidden">
                        {/* Abstract background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 blur-3xl" />

                        <div className="flex items-center justify-between">
                            <Badge variant="accent">{item.slot}</Badge>
                            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">{item.id}</span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-black text-xl leading-tight">{item.product}</h3>
                                <p className="text-sm font-bold text-primary">{item.supplier}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Duration</p>
                                    <div className="flex items-center gap-2 text-xs font-black">
                                        <Calendar className="w-3 h-3 text-secondary" />
                                        {item.date}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Est. Revenue</p>
                                    <p className="text-sm font-black text-success">{item.cost}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button className="flex-1 rounded-2xl h-12 bg-success hover:bg-success/90 text-white font-black shadow-lg shadow-success/10 gap-2">
                                <Check className="w-4 h-4" />
                                Approve
                            </Button>
                            <Button variant="outline" className="flex-1 rounded-2xl h-12 border-destructive/20 text-destructive hover:bg-destructive/5 font-black gap-2">
                                <X className="w-4 h-4" />
                                Reject
                            </Button>
                        </div>

                        <Button variant="ghost" className="w-full h-10 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            Live Preview <ExternalLink className="w-3 h-3 ml-2" />
                        </Button>
                    </div>
                ))}

                {/* Conflict Warning Card */}
                <div className="bg-accent/5 border border-accent/20 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold">Conflict Detected</h3>
                    <p className="text-xs text-foreground/60 leading-relaxed px-6">
                        2 suppliers requested the <span className="font-bold text-foreground">Hero Banner</span> for Feb 25th. Resolve priority manually.
                    </p>
                    <Button variant="outline" className="rounded-full border-accent/20 text-accent hover:bg-accent/5 font-black text-xs">
                        Resolve Priority
                    </Button>
                </div>
            </div>
        </div>
    );
}
