'use client';

import { useState } from 'react';
import { Eye, Search, Filter, CheckCircle, Clock, Truck, User, Store, Package } from 'lucide-react';

// Mock Data
const MOCK_ORDERS = [
    {
        id: 'ORD-2023-001',
        date: '2023-10-25',
        buyer: { name: 'Al-Amal Supermarket', type: 'Retailer', contact: '+20 123 456 789' },
        supplier: { name: 'Coca-Cola Egypt', type: 'Manufacturer', contact: '+20 100 000 000' },
        status: 'Delivered',
        total: '15,400 EGP',
        items: [
            { name: 'Coca-Cola Can 330ml', quantity: 50, price: '8,000 EGP' },
            { name: 'Sprite Bottle 1L', quantity: 30, price: '7,400 EGP' }
        ],
        shippingAddress: '123 Main St, Cairo, Egypt'
    },
    {
        id: 'ORD-2023-002',
        date: '2023-10-26',
        buyer: { name: 'Metro Market', type: 'Chain', contact: '+20 111 222 333' },
        supplier: { name: 'Juhayna Dairy', type: 'Manufacturer', contact: '+20 155 555 555' },
        status: 'Processing',
        total: '8,250 EGP',
        items: [
            { name: 'Full Cream Milk 1L', quantity: 100, price: '8,250 EGP' }
        ],
        shippingAddress: '456 Nile Corniche, Giza, Egypt'
    },
    {
        id: 'ORD-2023-003',
        date: '2023-10-27',
        buyer: { name: 'Fresh Food Market', type: 'Retailer', contact: '+20 123 456 789' },
        supplier: { name: 'Edita', type: 'Distributor', contact: '+20 100 111 222' },
        status: 'Pending',
        total: '3,100 EGP',
        items: [
            { name: 'Molto Croissant', quantity: 200, price: '3,100 EGP' }
        ],
        shippingAddress: '789 Downtown, Alexandria, Egypt'
    }
];

export const dynamic = 'force-dynamic';

export default function ManagerOrdersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<any>(null); // For Details Modal

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Processing': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Delivered': return <CheckCircle size={14} className="mr-1" />;
            case 'Processing': return <Truck size={14} className="mr-1" />;
            case 'Pending': return <Clock size={14} className="mr-1" />;
            default: return null;
        }
    };

    const handleDownloadInvoice = () => {
        if (!selectedOrder) return;

        const headers = ['Item', 'Quantity', 'Price'];
        const rows = selectedOrder.items.map((item: any) => [item.name, item.quantity, item.price]);

        const csvContent = [
            `Order ID: ${selectedOrder.id}`,
            `Date: ${selectedOrder.date}`,
            `Buyer: ${selectedOrder.buyer.name}`,
            `Supplier: ${selectedOrder.supplier.name}`,
            `Total: ${selectedOrder.total}`,
            '',
            headers.join(','),
            ...rows.map((row: any[]) => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `invoice_${selectedOrder.id}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredOrders = MOCK_ORDERS.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Orders Oversight</h1>
                    <p className="text-slate-500 dark:text-slate-400">Track and manage all marketplace transactions.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-medium">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Buyer (Requester)</th>
                                <th className="px-6 py-4">Supplier (Provider)</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{order.id}</td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                                {order.buyer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900 dark:text-white">{order.buyer.name}</div>
                                                <div className="text-xs text-slate-500">{order.buyer.type}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                                                {order.supplier.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900 dark:text-white">{order.supplier.name}</div>
                                                <div className="text-xs text-slate-500">{order.supplier.type}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{order.total}</td>
                                    <td className="px-6 py-4 text-slate-500">{order.date}</td>

                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden scale-100 transition-transform">
                        {/* Modal Header */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Package className="text-blue-600" />
                                    Order Details: {selectedOrder.id}
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Placed on {selectedOrder.date}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600 bg-white dark:bg-slate-800 p-2 rounded-full border border-slate-200 dark:border-slate-700">
                                <Search className="rotate-45" size={20} /> {/* Close Icon Simulation */}
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Buyer Info */}
                            <div className="space-y-3">
                                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b pb-2 dark:border-slate-700">
                                    <User size={18} className="text-blue-500" /> Buyer Details
                                </h3>
                                <div className="text-sm space-y-1">
                                    <p className="font-medium text-slate-800 dark:text-slate-200">{selectedOrder.buyer.name}</p>
                                    <p className="text-slate-500">{selectedOrder.buyer.type}</p>
                                    <p className="text-slate-500">{selectedOrder.buyer.contact}</p>
                                    <p className="text-slate-500 mt-2 bg-slate-50 dark:bg-slate-900 p-2 rounded text-xs">
                                        <span className="font-semibold block mb-0.5">Shipping Address:</span>
                                        {selectedOrder.shippingAddress}
                                    </p>
                                </div>
                            </div>

                            {/* Supplier Info */}
                            <div className="space-y-3">
                                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b pb-2 dark:border-slate-700">
                                    <Store size={18} className="text-emerald-500" /> Supplier Details
                                </h3>
                                <div className="text-sm space-y-1">
                                    <p className="font-medium text-slate-800 dark:text-slate-200">{selectedOrder.supplier.name}</p>
                                    <p className="text-slate-500">{selectedOrder.supplier.type}</p>
                                    <p className="text-slate-500">{selectedOrder.supplier.contact}</p>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="px-6 pb-6">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                <Package size={18} className="text-purple-500" /> Order Items
                            </h3>
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-medium">
                                        <tr>
                                            <th className="px-4 py-2">Item</th>
                                            <th className="px-4 py-2 text-center">Qty</th>
                                            <th className="px-4 py-2 text-right">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                        {selectedOrder.items.map((item: any, idx: number) => (
                                            <tr key={idx}>
                                                <td className="px-4 py-2 font-medium text-slate-800 dark:text-slate-200">{item.name}</td>
                                                <td className="px-4 py-2 text-center">{item.quantity}</td>
                                                <td className="px-4 py-2 text-right">{item.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-slate-50 dark:bg-slate-900 font-bold border-t border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                                        <tr>
                                            <td colSpan={2} className="px-4 py-2 text-right">Total Amount:</td>
                                            <td className="px-4 py-2 text-right text-emerald-600">{selectedOrder.total}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-sm"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleDownloadInvoice}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm"
                            >
                                Download Invoice
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
