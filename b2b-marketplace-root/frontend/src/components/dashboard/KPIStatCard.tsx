'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

interface KPIStatCardProps {
    title: string;
    value: string;
    trend: number; // percentage
    trendLabel?: string;
    icon?: any;
}

export default function KPIStatCard({ title, value, trend, trendLabel = 'vs last month', icon: Icon }: KPIStatCardProps) {
    const isPositive = trend >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</h3>
                {Icon && <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Icon size={20} /></div>}
            </div>

            <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-slate-900">{value}</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium">
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {Math.abs(trend)}%
                </span>
                <span className="text-slate-400">{trendLabel}</span>
            </div>
        </motion.div>
    );
}
