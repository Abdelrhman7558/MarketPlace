'use client';

import { DollarSign, Users, ShoppingCart, Activity, TrendingUp, TrendingDown, ArrowUp, ArrowDown } from 'lucide-react';

const KPIS = [
    { title: "Total GMV", value: "$1,245,392", change: "+12.5%", trend: "up", icon: DollarSign, color: "bg-green-500", text: "text-green-500" },
    { title: "Active Users", value: "8,942", change: "+143", trend: "up", icon: Users, color: "bg-blue-500", text: "text-blue-500" },
    { title: "Avg. Order Value", value: "$482", change: "-2.1%", trend: "down", icon: ShoppingCart, color: "bg-brand-orange", text: "text-brand-orange" },
    { title: "System Health", value: "99.98%", change: "Stable", trend: "neutral", icon: Activity, color: "bg-purple-500", text: "text-purple-500" },
];

export default function AdminDashboard() {
    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-brand-navy">Platform Overview</h1>
                    <p className="text-gray-500 text-sm">Real-time marketplace performance metrics.</p>
                </div>
                <button className="bg-brand-navy text-white px-4 py-2 rounded-lg text-sm font-bold hover:shadow-lg transition-all">
                    Download Report
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {KPIS.map((kpi, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${kpi.color}/10 p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                                <kpi.icon className={`w-6 h-6 ${kpi.text}`} />
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${kpi.trend === 'up' ? 'bg-green-50 text-green-700' :
                                    kpi.trend === 'down' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {kpi.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : kpi.trend === 'down' ? <ArrowDown className="w-3 h-3" /> : null}
                                {kpi.change}
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium mb-1">{kpi.title}</h3>
                        <p className="text-2xl font-bold text-brand-navy">{kpi.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visualizations (Mocked with CSS) */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-4 items-center">
                            <h3 className="font-bold text-brand-navy">Revenue Growth</h3>
                            <span className="text-gray-400 text-xs">(Last 30 Days)</span>
                        </div>
                        <div className="flex gap-2">
                            <button className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-600 rounded-lg">Last 30 Days</button>
                        </div>
                    </div>

                    {/* Bar Chart Mock */}
                    <div className="h-64 flex items-end justify-between gap-2 md:gap-4 border-b border-gray-100 pb-2">
                        {[40, 65, 45, 70, 55, 80, 60, 90, 75, 85, 70, 95].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer h-full relative">
                                <div
                                    className="bg-brand-navy/80 hover:bg-brand-orange rounded-t-sm w-full transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.3)] relative"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        ${h * 850}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                        <span>Week 1</span>
                        <span>Week 2</span>
                        <span>Week 3</span>
                        <span>Week 4</span>
                    </div>
                </div>

                {/* User Demographics / Activity */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-bold text-brand-navy mb-6">Platform Activity</h3>
                    <div className="space-y-6">
                        <div className="group">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-600 group-hover:text-brand-navy transition-colors">Suppliers Online</span>
                                <span className="font-bold text-brand-navy">142</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[65%] group-hover:bg-blue-600 transition-colors" />
                            </div>
                        </div>
                        <div className="group">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-600 group-hover:text-brand-navy transition-colors">Active Buyers</span>
                                <span className="font-bold text-brand-navy">1,023</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[85%] group-hover:bg-green-600 transition-colors" />
                            </div>
                        </div>
                        <div className="group">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-600 group-hover:text-brand-navy transition-colors">New Signups (Today)</span>
                                <span className="font-bold text-brand-navy">45</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-orange w-[30%] group-hover:bg-brand-orange-hover transition-colors" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-sm text-brand-navy">Pending Approvals</h4>
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">3</span>
                        </div>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                            S{i}
                                        </div>
                                        <div className="leading-tight">
                                            <p className="text-xs font-bold text-brand-navy">Supplier Corp {i}</p>
                                            <p className="text-[10px] text-gray-400">Requesting verification</p>
                                        </div>
                                    </div>
                                    <button className="text-[10px] font-bold text-white bg-brand-navy hover:bg-brand-orange px-2 py-1 rounded transition-colors">Review</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
