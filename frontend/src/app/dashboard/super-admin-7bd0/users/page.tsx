'use client';

import { useState } from 'react';
import { Search, Users as UsersIcon, UserCheck, UserX, ShieldCheck } from 'lucide-react';

const USERS_DATA = [
    { id: 1, name: 'Ahmed Hassan', email: 'ahmed@example.com', phone: '+20 100 111 2222', role: 'Customer', joinDate: '2026-01-15', orders: 12, totalSpent: '$4,320', status: 'Active', avatar: null },
    { id: 2, name: 'Mohamed Ali', email: 'mohamed@example.com', phone: '+20 102 333 4444', role: 'Customer', joinDate: '2026-01-20', orders: 8, totalSpent: '$2,180', status: 'Active', avatar: null },
    { id: 3, name: 'Sara Ibrahim', email: 'sara@example.com', phone: '+20 111 555 6666', role: 'Supplier', joinDate: '2026-01-10', orders: 24, totalSpent: '$12,500', status: 'Active', avatar: null },
    { id: 4, name: 'Youssef Khaled', email: 'youssef@example.com', phone: '+20 105 777 8888', role: 'Customer', joinDate: '2026-02-01', orders: 3, totalSpent: '$450', status: 'Active', avatar: null },
    { id: 5, name: 'Nour ElDin', email: 'nour@example.com', phone: '+20 109 999 0000', role: 'Customer', joinDate: '2026-02-05', orders: 5, totalSpent: '$1,200', status: 'Inactive', avatar: null },
    { id: 6, name: 'Layla Ahmed', email: 'layla@example.com', phone: '+20 108 222 3333', role: 'Supplier', joinDate: '2025-12-20', orders: 42, totalSpent: '$28,900', status: 'Active', avatar: null },
    { id: 7, name: 'Omar Farouk', email: 'omar@example.com', phone: '+20 106 444 5555', role: 'Customer', joinDate: '2026-02-10', orders: 2, totalSpent: '$1,524', status: 'Active', avatar: null },
    { id: 8, name: 'Hana Mostafa', email: 'hana@example.com', phone: '+20 107 666 7777', role: 'Customer', joinDate: '2026-02-12', orders: 1, totalSpent: '$510', status: 'Active', avatar: null },
];

const ROLE_COLORS: Record<string, string> = {
    'Customer': 'bg-blue-100 text-blue-700',
    'Supplier': 'bg-purple-100 text-purple-700',
    'Admin': 'bg-orange-100 text-orange-700',
};

export default function UsersPage() {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');

    const filtered = USERS_DATA.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === 'All' || u.role === roleFilter;
        return matchSearch && matchRole;
    });

    const activeCount = USERS_DATA.filter(u => u.status === 'Active').length;
    const supplierCount = USERS_DATA.filter(u => u.role === 'Supplier').length;

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-extrabold text-brand-navy">Users</h2>
                <p className="text-text-muted text-sm">{USERS_DATA.length} registered users</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Total Users', value: USERS_DATA.length, icon: UsersIcon, color: 'from-blue-500 to-indigo-600' },
                    { label: 'Active Users', value: activeCount, icon: UserCheck, color: 'from-green-500 to-emerald-600' },
                    { label: 'Suppliers', value: supplierCount, icon: ShieldCheck, color: 'from-purple-500 to-violet-600' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 flex items-center gap-4 hover:shadow-card-hover transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                            <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold text-brand-navy">{stat.value}</p>
                            <p className="text-xs text-text-muted">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 focus-within:border-brand-orange transition-all shadow-card">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="flex-1 outline-none text-sm text-gray-700"
                    />
                </div>
                <div className="flex gap-2">
                    {['All', 'Customer', 'Supplier'].map(r => (
                        <button
                            key={r}
                            onClick={() => setRoleFilter(r)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${roleFilter === r
                                ? 'bg-brand-orange text-white shadow-glow-orange'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-orange'
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs text-text-muted uppercase tracking-wider border-b border-gray-100">
                                <th className="px-6 py-4 font-semibold">User</th>
                                <th className="px-6 py-4 font-semibold hidden md:table-cell">Phone</th>
                                <th className="px-6 py-4 font-semibold">Role</th>
                                <th className="px-6 py-4 font-semibold hidden lg:table-cell">Orders</th>
                                <th className="px-6 py-4 font-semibold hidden lg:table-cell">Total Spent</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold hidden sm:table-cell">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((user, i) => (
                                <tr key={user.id} className="table-row-animate border-b border-gray-50 last:border-0 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-orange to-brand-red flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-brand-navy truncate">{user.name}</p>
                                                <p className="text-[11px] text-text-muted truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{user.phone}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${ROLE_COLORS[user.role]}`}>{user.role}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-brand-navy hidden lg:table-cell">{user.orders}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-green-600 hidden lg:table-cell">{user.totalSpent}</td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center gap-1.5 text-xs font-semibold ${user.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>
                                            <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500 animate-pulse-slow' : 'bg-gray-300'}`} />
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-text-muted hidden sm:table-cell">{user.joinDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-text-muted">
                        <UsersIcon className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm">No users found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
