'use client';

import KPIStatCard from '@/components/dashboard/KPIStatCard';
import DataTable from '@/components/ui/DataTable';
import { Package, ShoppingBag, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, slideUp } from '@/lib/motion';

const MOCK_ORDERS = [
    { id: 'ORD-001', date: '2024-02-15', total: '$1,250.00', status: 'Delivered', items: 12 },
    { id: 'ORD-002', date: '2024-02-18', total: '$850.50', status: 'Shipped', items: 8 },
    { id: 'ORD-003', date: '2024-02-20', total: '$2,100.00', status: 'Processing', items: 24 },
    { id: 'ORD-004', date: '2024-02-21', total: '$450.00', status: 'Confirmed', items: 5 },
];

import { Column } from '@/components/ui/DataTable';

type Order = typeof MOCK_ORDERS[0];

const COLUMNS: Column<Order>[] = [
    { header: 'Order ID', accessor: 'id', className: 'w-32' },
    { header: 'Date', accessor: 'date' },
    { header: 'Items', accessor: 'items' },
    { header: 'Total Amount', accessor: 'total', className: 'font-bold' },
    {
        header: 'Status',
        accessor: (row: Order) => (
            <span className={`
                px-2 py-1 rounded-full text-xs font-bold uppercase
                ${row.status === 'Delivered' ? 'bg-green-100 text-green-700' : ''}
                ${row.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : ''}
                ${row.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' : ''}
                ${row.status === 'Confirmed' ? 'bg-purple-100 text-purple-700' : ''}
            `}>
                {row.status}
            </span>
        )
    },
];

export const dynamic = 'force-dynamic';

export default function BuyerDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-bold shadow-sm transition-colors">
                    + New Order
                </button>
            </div>

            {/* KPI Cards */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <motion.div variants={slideUp}>
                    <KPIStatCard
                        title="Total Spend (Feb)"
                        value="$4,650.50"
                        trend={12.5}
                        icon={ShoppingBag}
                    />
                </motion.div>
                <motion.div variants={slideUp}>
                    <KPIStatCard
                        title="Active Orders"
                        value="3"
                        trend={-1}
                        trendLabel="vs yesterday"
                        icon={Clock}
                    />
                </motion.div>
                <motion.div variants={slideUp}>
                    <KPIStatCard
                        title="Total Items Received"
                        value="1,240"
                        trend={8.2}
                        icon={Package}
                    />
                </motion.div>
            </motion.div>

            {/* Recent Orders */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
                <DataTable data={MOCK_ORDERS} columns={COLUMNS} />
            </div>
        </div>
    );
}
