'use client';

import { useState } from 'react';
import {
    Users, Package, Store, Activity,
    Settings, ShieldAlert, CheckCircle2,
    Search, Filter, ExternalLink, RefreshCcw
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const MOCK_PLATFORM_STATS = [
    { label: 'Total Users', value: '1,280', delta: '+45 this week', icon: Users, color: 'text-primary' },
    { label: 'Total Products', value: '4,500', delta: '+120 new', icon: Package, color: 'text-secondary' },
    { label: 'Approved Suppliers', value: '85', delta: '4 pending', icon: Store, color: 'text-success' },
    { label: 'Weekly GMV', value: '$850k', delta: '+15%', icon: Activity, color: 'text-accent' },
];

const PENDING_APPROVALS = [
    { id: 'SUP-991', name: 'Global Bev Co.', type: 'Supplier', date: '2h ago', status: 'Pending Review' },
    { id: 'PRD-882', name: 'Zesto Lemonade 24pk', type: 'Product', date: '5h ago', status: 'In Validation' },
    { id: 'USR-773', name: 'Ahmad Freight Ltd.', type: 'Buyer', date: '1d ago', status: 'Pending KYC' },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-poppins font-black tracking-tight">Platform Governance</h1>
                    <p className="text-foreground/60">Global control panel for users, inventory, and system health.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-full gap-2 border-foreground/10">
                        <RefreshCcw className="w-4 h-4" />
                        Sync Data
                    </Button>
                    <Button className="rounded-full gap-2 shadow-xl shadow-destructive/20 bg-destructive hover:bg-destructive/90 text-white">
                        <ShieldAlert className="w-4 h-4" />
                        System Logs
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_PLATFORM_STATS.map((stat, i) => (
                    <div key={i} className="bg-surface border border-border/50 p-6 rounded-[2rem] hover:shadow-xl transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center transition-transform group-hover:scale-110")}>
                                <stat.icon className={cn("w-5 h-5", stat.color)} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-success">{stat.delta}</span>
                        </div>
                        <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest leading-none">{stat.label}</p>
                        <p className="text-3xl font-black mt-2">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pending Actions */}
                <div className="lg:col-span-2 bg-surface border border-border/50 rounded-[2.5rem] overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-border/50 flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-success" />
                            Approval Queue
                        </h2>
                        <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-full">
                            {['all', 'suppliers', 'products'].map(tab => (
                                <button
                                    key={tab}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tight transition-all",
                                        activeTab === tab ? "bg-white text-foreground shadow-sm" : "text-foreground/40 hover:text-foreground"
                                    )}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="divide-y divide-border/50">
                        {PENDING_APPROVALS.map((item) => (
                            <div key={item.id} className="p-8 flex items-center justify-between hover:bg-muted/10 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center font-black text-foreground/40 text-xs">
                                        {item.type[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{item.name}</h3>
                                        <div className="flex items-center gap-2 text-xs text-foreground/40">
                                            <span className="font-mono uppercase tracking-tighter">{item.id}</span>
                                            <span>•</span>
                                            <span>Requested {item.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant="accent">{item.status}</Badge>
                                    <Button variant="outline" size="sm" className="rounded-full px-5 h-10 font-black border-foreground/10 hover:bg-primary/5 hover:text-primary">Review</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 bg-muted/10 text-center">
                        <Button variant="ghost" className="text-primary font-bold text-sm">View full audit queue (12 more)</Button>
                    </div>
                </div>

                {/* System Health / Shortcuts */}
                <div className="space-y-6">
                    <div className="bg-surface border border-border/50 p-8 rounded-[2.5rem] space-y-6">
                        <h3 className="text-xl font-bold">System Status</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Payment API', status: 'Healthy', color: 'bg-success' },
                                { name: 'Excel Engine', status: 'Healthy', color: 'bg-success' },
                                { name: 'Prisma DB', status: 'Healthy', color: 'bg-success' },
                                { name: 'Mail Server', status: 'Degraded', color: 'bg-accent' },
                            ].map(sys => (
                                <div key={sys.name} className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-foreground/60">{sys.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-foreground/40">{sys.status}</span>
                                        <div className={cn("w-2 h-2 rounded-full", sys.color)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full rounded-2xl h-12 border-foreground/10">Run Diagnostics</Button>
                    </div>

                    <div className="bg-surface border border-border/50 p-8 rounded-[2.5rem] space-y-4">
                        <h3 className="text-xl font-bold">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="ghost" className="h-20 flex-col rounded-2xl border border-border/50 hover:bg-primary/5 hover:text-primary gap-1">
                                <Users className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase">Users</span>
                            </Button>
                            <Button variant="ghost" className="h-20 flex-col rounded-2xl border border-border/50 hover:bg-secondary/5 hover:text-secondary gap-1">
                                <Package className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase">Catalog</span>
                            </Button>
                            <Button variant="ghost" className="h-20 flex-col rounded-2xl border border-border/50 hover:bg-success/5 hover:text-success gap-1">
                                <Filter className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase">Filters</span>
                            </Button>
                            <Button variant="ghost" className="h-20 flex-col rounded-2xl border border-border/50 hover:bg-accent/5 hover:text-accent gap-1">
                                <Settings className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase">Settings</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
