'use client';

import { Package, Truck, Clock, RotateCcw, ChevronRight, MapPin } from 'lucide-react';
import Link from 'next/link';

const ACTIVE_SHIPMENTS = [
    { id: '#ORD-8821', status: 'Out for Delivery', eta: 'Today, 2:00 PM', items: '24x Pepsi Can Case', progress: 80 },
    { id: '#ORD-8820', status: 'Shipped', eta: 'Tomorrow', items: '10x Water Carton', progress: 50 },
];

const PAST_ORDERS = [
    { id: '#ORD-8819', date: 'Oct 24, 2025', items: '5x Red Bull Case, 2x Chips Box', total: '$420.00', status: 'Delivered' },
    { id: '#ORD-8815', date: 'Oct 12, 2025', items: 'Bulk Tea Pack', total: '$150.00', status: 'Delivered' },
];

export default function BuyerDashboard() {
    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-brand-navy">My Orders</h1>
                    <p className="text-gray-500 text-sm">Track shipments and reorder your favorites.</p>
                </div>
                <Link href="/catalog" className="bg-brand-orange hover:bg-brand-orange-hover text-white px-4 py-2 rounded-lg font-bold shadow-sm text-sm transition-colors">
                    Browse Catalog
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Active Shipments */}
                    <div className="space-y-4">
                        <h2 className="font-bold text-brand-navy text-lg flex items-center gap-2">
                            <Truck className="w-5 h-5 text-brand-orange" /> Active Shipments
                        </h2>
                        {ACTIVE_SHIPMENTS.map((shipment) => (
                            <div key={shipment.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-brand-navy">{shipment.status}</span>
                                            <span className="text-xs text-gray-400">• {shipment.id}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">{shipment.items}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xs text-gray-400 uppercase tracking-wide">Estimated Arrival</span>
                                        <span className="font-bold text-green-600">{shipment.eta}</span>
                                    </div>
                                </div>
                                {/* Progress Bar */}
                                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-brand-orange transition-all duration-1000"
                                        style={{ width: `${shipment.progress}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-gray-400 font-medium">
                                    <span>Processing</span>
                                    <span>Shipped</span>
                                    <span className={shipment.progress >= 80 ? 'text-brand-orange' : ''}>Out for Delivery</span>
                                    <span>Delivered</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order History */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-bold text-brand-navy flex items-center gap-2">
                                <Clock className="w-5 h-5 text-gray-400" /> Past Orders
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {PAST_ORDERS.map((order) => (
                                <div key={order.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-brand-navy">{order.id}</span>
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700 border border-green-100">{order.status}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1">{order.items}</p>
                                        <p className="text-xs text-gray-400">Ordered on {order.date}</p>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-2">
                                        <span className="font-bold text-brand-navy">{order.total}</span>
                                        <button className="flex items-center gap-1 text-xs font-bold text-brand-orange hover:underline">
                                            <RotateCcw className="w-3 h-3" /> Buy Again
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-gray-50 text-center">
                            <Link href="/dashboard/buyer/orders" className="text-brand-navy text-sm font-bold hover:underline flex items-center justify-center gap-1">
                                View All Orders <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column: Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-brand-navy text-white rounded-xl p-6 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                        <h3 className="font-bold mb-2 relative z-10">Your Account Manager</h3>
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className="w-10 h-10 bg-gray-200 rounded-full" />
                            <div>
                                <p className="font-bold text-sm">Ahmed Hassan</p>
                                <p className="text-xs text-gray-300">Senior Sales Rep</p>
                            </div>
                        </div>
                        <button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-2 rounded-lg text-sm transition-colors relative z-10">
                            Contact Support
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-gray-400" /> Default Address
                        </h3>
                        <p className="text-sm font-bold text-brand-navy mb-1">Cairo Coffee House</p>
                        <p className="text-sm text-gray-500 mb-4">
                            12 El Gezira St,<br />
                            Zamalek, Cairo,<br />
                            Egypt
                        </p>
                        <button className="text-brand-orange text-sm font-bold hover:underline">Edit Address</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
