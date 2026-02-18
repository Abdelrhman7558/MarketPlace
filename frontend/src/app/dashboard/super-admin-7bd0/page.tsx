'use client';

import { useState } from 'react';
import { TrendingUp, MoreVertical } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function ManagerDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20 p-8">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
            <p>Welcome back, Manager.</p>
        </div>
    );
}
