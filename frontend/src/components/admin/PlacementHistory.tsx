'use client';

import {
    FileSearch, User, Clock, ShieldCheck,
    ArrowRight, Download, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const AUDIT_LOGS = [
    { id: 'LOG-001', user: 'Admin Sarah', action: 'Approved Placement', target: 'PLC-101 (Alpha Distrib.)', time: '10 mins ago', level: 'info' },
    { id: 'LOG-002', user: 'Supplier John', action: 'Requested Placement', target: 'Hero Slot (Coca Cola)', time: '25 mins ago', level: 'warning' },
    { id: 'LOG-003', user: 'System', action: 'Slot Expired', target: 'PLC-098 (Pepsi Co)', time: '1 hour ago', level: 'error' },
    { id: 'LOG-004', user: 'Admin Sarah', action: 'Updated Product Price', target: 'Monster Energy 500ml', time: '3 hours ago', level: 'info' },
    { id: 'LOG-005', user: 'Admin Mike', action: 'Approved Supplier', target: 'Zesto Drinks Ltd.', time: '5 hours ago', level: 'success' },
];

export default function PlacementHistory() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-poppins font-black tracking-tight">Audit Trail</h1>
                    <p className="text-foreground/60">Complete history of all platform changes and placements.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-full gap-2 border-foreground/10">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <div className="bg-surface border border-border/50 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <FileSearch className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold">System Event Logs</h2>
                    </div>
                    <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-full">
                        {['all', 'security', 'placements', 'system'].map(tab => (
                            <button key={tab} className="px-5 py-2 rounded-full text-xs font-black uppercase tracking-tight text-foreground/40 hover:text-foreground transition-all">
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="divide-y divide-border/50">
                    {AUDIT_LOGS.map((log) => (
                        <div key={log.id} className="p-8 flex items-center justify-between hover:bg-muted/10 transition-colors group">
                            <div className="flex items-center gap-6">
                                <div className={cn(
                                    "w-2 h-12 rounded-full",
                                    log.level === 'info' ? "bg-primary" :
                                        log.level === 'warning' ? "bg-accent" :
                                            log.level === 'error' ? "bg-destructive" : "bg-success"
                                )} />
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-black text-foreground">{log.action}</span>
                                        <Badge variant="outline" className="text-[8px] h-4">#{log.id}</Badge>
                                    </div>
                                    <p className="text-sm text-foreground/60">
                                        <span className="font-bold text-foreground/80">{log.user}</span> affected <span className="font-medium">{log.target}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs font-bold text-foreground/40">
                                <Clock className="w-3 h-3" />
                                {log.time}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-6 bg-muted/10 text-center">
                    <Button variant="ghost" className="text-primary font-bold text-sm">Load earlier logs (Yesterday)</Button>
                </div>
            </div>
        </div>
    );
}
