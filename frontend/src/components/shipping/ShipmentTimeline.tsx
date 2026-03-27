'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle2, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackingUpdate {
    id: string;
    status: string;
    description: string;
    location?: string;
    createdAt: string;
}

interface Shipment {
    trackingNumber: string;
    carrier?: string;
    status: string;
    expectedDelivery?: string;
    updates: TrackingUpdate[];
}

export function ShipmentTimeline({ shipment }: { shipment: Shipment }) {
    return (
        <div className="space-y-8 relative">
            {/* Vertical Line */}
            <div className="absolute start-4 top-2 bottom-2 w-0.5 bg-border" />

            {shipment.updates.map((update, idx) => {
                const isLatest = idx === 0;
                return (
                    <motion.div 
                        key={update.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative ps-12"
                    >
                        {/* Dot */}
                        <div className={cn(
                            "absolute start-2.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-card z-10",
                            isLatest ? "bg-secondary scale-125" : "bg-border"
                        )} />

                        <div className={cn(
                            "p-4 rounded-xl border transition-all",
                            isLatest ? "bg-secondary/5 border-secondary shadow-sm" : "bg-card border-border"
                        )}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                <h4 className={cn(
                                    "font-black uppercase tracking-widest text-xs",
                                    isLatest ? "text-secondary" : "text-foreground"
                                )}>
                                    {update.status.replace(/_/g, ' ')}
                                </h4>
                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold">
                                    <Clock size={12} />
                                    <span>{new Date(update.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{update.description}</p>
                            {update.location && (
                                <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                                    <MapPin size={12} />
                                    <span>{update.location}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}

            {shipment.updates.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No tracking updates available yet.
                </div>
            )}
        </div>
    );
}
