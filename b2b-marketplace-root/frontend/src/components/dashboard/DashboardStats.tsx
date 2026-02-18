'use client';

import { TrendingUp, TrendingDown, CheckCircle, Smile, DollarSign, ShoppingBag, Users, AlertCircle } from 'lucide-react';

export default function DashboardStats() {
    const stats = [
        {
            label: 'Total Revenue',
            value: '$124,500',
            change: '+12.5%',
            isPositive: true,
            icon: DollarSign,
            color: 'text-emerald-600',
            bg: 'bg-emerald-100',
            border: 'border-emerald-200'
        },
        {
            label: 'Active Orders',
            value: '45',
            change: '+8.2%',
            isPositive: true,
            icon: ShoppingBag,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
            border: 'border-blue-200'
        },
        {
            label: 'New Customers',
            value: '12',
            change: '-2.4%',
            isPositive: false,
            icon: Users,
            color: 'text-violet-600',
            bg: 'bg-violet-100',
            border: 'border-violet-200'
        },
        {
            label: 'Pending Requests',
            value: '5',
            change: 'Action Needed',
            isPositive: false, // Neutral/Warning
            icon: AlertCircle,
            color: 'text-amber-600',
            bg: 'bg-amber-100',
            border: 'border-amber-200'
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-200"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} ${stat.border} border`}>
                            <stat.icon size={24} />
                        </div>
                        <div className={`text-xs font-bold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                            {stat.change}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
