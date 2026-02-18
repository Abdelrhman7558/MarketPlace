'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function AdminDashboardPage() {
    const { data: session } = useSession();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) fetchStats();
    }, [session]);

    const fetchStats = async () => {
        try {
            const accessToken = (session?.user as any).accessToken;
            const res = await axios.get('http://localhost:3001/admin/stats', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setStats(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading Admin Stats...</div>;
    if (!stats) return <div>Failed to load stats</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Suppliers</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalSuppliers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Buyers</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalBuyers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Products</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                    <p className="text-3xl font-bold text-green-600">${stats.totalRevenue}</p>
                </div>
            </div>
        </div>
    );
}
