'use client';

import { useState } from 'react';
import { Search, Mail, Shield, MoreVertical } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function UsersPage() {
    // Mock Users Data
    const [users] = useState([
        { id: 1, name: 'Alice Johnson', email: 'alice@retail.com', role: 'Buyer', status: 'Active', joined: '2023-09-12' },
        { id: 2, name: 'Bob Smith', email: 'bob@supplier.com', role: 'Supplier', status: 'Active', joined: '2023-10-05' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@manager.com', role: 'Manager', status: 'Active', joined: '2023-08-20' },
        { id: 4, name: 'David Wilson', email: 'david@retail.com', role: 'Buyer', status: 'Inactive', joined: '2023-11-01' },
    ]);

    const [search, setSearch] = useState('');

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">User Management</h1>
                <p className="text-slate-500 dark:text-slate-400">View and manage all registered users.</p>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm mb-6 border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                <Search className="text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search users..."
                    className="flex-1 outline-none text-slate-700 dark:text-gray-200 bg-transparent"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 text-sm border-b border-slate-200 dark:border-slate-700">
                            <th className="p-4">User</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Joined</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                                                <Mail size={10} className="mr-1" /> {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'Manager' ? 'bg-purple-100 text-purple-800' :
                                        user.role === 'Supplier' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        <Shield size={10} className="mr-1" /> {user.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-600 dark:text-slate-400 text-sm">{user.joined}</td>
                                <td className="p-4 text-right text-slate-400">
                                    <button className="hover:text-slate-600 dark:hover:text-white">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
