'use client';

import { useState } from 'react';
import { TrendingUp, MoreVertical } from 'lucide-react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import SalesChart from '@/components/dashboard/SalesChart';
import TopProducts from '@/components/dashboard/TopProducts';
import AIChatWidget from '@/components/dashboard/AIChatWidget';

export const dynamic = 'force-dynamic';

export default function ManagerDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Dashboard Overview</h1>
                <div className="text-sm text-slate-500 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                    {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stats Grid */}
            <DashboardStats />

            {/* Content Area - Split (Chart + Top Products) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[500px]">

                {/* Main Chart Area */}
                <div className="lg:col-span-2 flex flex-col">
                    <SalesChart />
                </div>

                {/* Top Products */}
                <div className="flex flex-col h-full">
                    <TopProducts />
                </div>
            </div>

            {/* AI Chat Widget (Floating) */}
            <AIChatWidget />
        </div>
    );
}
