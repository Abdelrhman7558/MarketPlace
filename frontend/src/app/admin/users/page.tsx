'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MoreVertical, CheckCircle, XCircle, Ban, ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

type UserStatus = 'PENDING_APPROVAL' | 'ACTIVE' | 'REJECTED' | 'BLOCKED';

interface ManagedUser {
    name: string;
    email: string;
    phone?: string;
    role: string;
    status: UserStatus;
    createdAt?: string;
}

export default function AdminUsersPage() {
    const [activeTab, setActiveTab] = React.useState<UserStatus>('PENDING_APPROVAL');
    const [users, setUsers] = React.useState<ManagedUser[]>([]);
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        const loadUsers = () => {
            const raw = localStorage.getItem('bev-users') || '[]';
            setUsers(JSON.parse(raw));
        };
        loadUsers();
        window.addEventListener('storage', loadUsers);
        return () => window.removeEventListener('storage', loadUsers);
    }, []);

    const updateStatus = (email: string, status: UserStatus) => {
        const updated = users.map(u => u.email === email ? { ...u, status } : u);
        setUsers(updated);
        localStorage.setItem('bev-users', JSON.stringify(updated));
    };

    const filteredUsers = users.filter(u =>
        u.status === activeTab &&
        (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const TABS = [
        { id: 'PENDING_APPROVAL', label: 'Pending Request', color: 'text-amber-400' },
        { id: 'ACTIVE', label: 'Active Members', color: 'text-emerald-400' },
        { id: 'BLOCKED', label: 'Blocked Policy', color: 'text-red-400' },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white tracking-tight">User Management</h1>
                    <p className="text-white/40 font-medium">Control access and roles for all system participants.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-12 pl-12 pr-6 bg-[#131921] rounded-xl border border-white/5 outline-none focus:border-primary/50 text-white text-sm w-[300px] transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-[#131921] rounded-2xl border border-white/5 w-fit">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as UserStatus)}
                        className={cn(
                            "px-6 py-2.5 rounded-xl text-sm font-black transition-all whitespace-nowrap",
                            activeTab === tab.id
                                ? "bg-white/10 text-white shadow-inner"
                                : "text-white/40 hover:text-white/60"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Users List */}
                                                )}
            {activeTab === 'BLOCKED' && (
                <button
                    onClick={() => updateStatus(user.email, 'ACTIVE')}
                    className="h-10 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-xs rounded-lg border border-emerald-500/20 flex items-center gap-2 transition-all"
                >
                    <CheckCircle size={14} /> Unblock
                </button>
            )}
        </div>
                                        </td >
                                    </motion.tr >
                                )) : (
        <tr>
            <td colSpan={4} className="px-8 py-12 text-center text-white/20 text-sm font-medium">
                No users found for this status segment.
            </td>
        </tr>
    )
}
                            </AnimatePresence >
                        </tbody >
                    </table >
                </div >
            </div >
        </div >
    );
}
