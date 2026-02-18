'use client';

import KPIStatCard from '@/components/dashboard/KPIStatCard';
import DataTable from '@/components/ui/DataTable';
import { DollarSign, Package, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, slideUp } from '@/lib/motion';

const MOCK_PRODUCTS = [
    { id: '1', name: 'Coca-Cola 330ml', sku: 'CC-330-24', stock: 150, price: '$18.50', status: 'Active' },
    { id: '2', name: 'Red Bull 250ml', sku: 'RB-250-24', stock: 80, price: '$32.00', status: 'Active' },
    { id: '3', name: 'Pepsi Max 330ml', sku: 'PM-330-24', stock: 0, price: '$17.50', status: 'Out of Stock' },
    { id: '4', name: 'Monster Energy', sku: 'MN-500-12', stock: 40, price: '$22.00', status: 'Low Stock' },
];

import { Column } from '@/components/ui/DataTable';

type SupplierProduct = typeof MOCK_PRODUCTS[0];

const COLUMNS: Column<SupplierProduct>[] = [
    { header: 'Product Name', accessor: 'name' },
    { header: 'SKU', accessor: 'sku' },
    { header: 'Price', accessor: 'price' },
    {
        header: 'Stock Level',
        accessor: (row: SupplierProduct) => (
            <div className="w-full max-w-[100px]">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-1">
                    <div
                        className={`h-full rounded-full ${row.stock > 50 ? 'bg-green-500' : row.stock > 0 ? 'bg-orange-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(row.stock, 100)}%` }}
                    />
                </div>
                <span className="text-xs text-slate-400">{row.stock} units</span>
            </div>
        )
    },
    {
        header: 'Status',
        accessor: (row: SupplierProduct) => (
            <span className={`
                px-2 py-1 rounded-full text-xs font-bold uppercase
                ${row.status === 'Active' ? 'bg-green-100 text-green-700' : ''}
                ${row.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' : ''}
                ${row.status === 'Out of Stock' ? 'bg-red-100 text-red-700' : ''}
            `}>
                {row.status}
            </span>
        )
    },
];

export const dynamic = 'force-dynamic';

export default function SupplierDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Supplier Overview</h1>
                    <p className="text-slate-500">Manage your inventory and sales performance.</p>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-bold shadow-sm transition-colors">
                    + Add Product
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
                        title="Total Revenue (Feb)"
                        value="$12,450.00"
                        trend={18.5}
                        icon={DollarSign}
                    />
                </motion.div>
                <motion.div variants={slideUp}>
                    <KPIStatCard
                        title="Active Products"
                        value="24"
                        trend={2}
                        trendLabel="added this week"
                        icon={Package}
                    />
                </motion.div>
                <motion.div variants={slideUp}>
                    <KPIStatCard
                        title="Conversion Rate"
                        value="3.2%"
                        trend={-0.5}
                        icon={TrendingUp}
                    />
                </motion.div>
            </motion.div>

            {/* Products Table */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">Top Performing Products</h2>
                    <button className="text-sm font-bold text-primary hover:underline">View All</button>
                </div>
                <DataTable data={MOCK_PRODUCTS} columns={COLUMNS} />
            </div>
        </div>
    );
}
