'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    CheckCircle,
    XCircle,
    Ban,
    ShieldCheck,
    Phone,
    Activity,
    ShieldAlert,
    Building2,
    Globe,
    Link as LinkIcon,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';

type UserStatus = 'PENDING_APPROVAL' | 'ACTIVE' | 'REJECTED' | 'BLOCKED';

interface ManagedUser {
    name: string;
    email: string;
    phone?: string;
    role: string;
    status: UserStatus;
    createdAt?: string;
    companyName?: string;
    website?: string;
    socialLinks?: string;
    avatar?: string;
}

export default function AdminUsersPage() {
    const [activeTab, setActiveTab] = React.useState<UserStatus>('PENDING_APPROVAL');
    const [users, setUsers] = React.useState<ManagedUser[]>([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedUser, setSelectedUser] = React.useState<ManagedUser | null>(null);

    React.useEffect(() => {
        const loadUsers = async () => {
            try {
                const token = localStorage.getItem('bev-token');
                const res = await fetch('http://localhost:3005/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    // Only show real Suppliers and Buyers, not ADMIN users
                    setUsers(data.filter((u: any) => u.role !== 'ADMIN'));
                }
            } catch (err) {
                console.error("Failed to load users:", err);
            }
        };

        loadUsers();
        // Poll for new users every 15 seconds
        const interval = setInterval(loadUsers, 15000);
        return () => clearInterval(interval);
    }, []);

    const updateStatus = async (email: string, status: UserStatus) => {
        try {
            const token = localStorage.getItem('bev-token');
            const user = users.find(u => u.email === email);
            if (!user) return;

            const res = await fetch(`http://localhost:3005/users/${(user as any).id}/status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                setUsers(users.map(u => u.email === email ? { ...u, status } : u));
                if (selectedUser?.email === email) {
                    setSelectedUser(null);
                }
            }
        } catch (err) {
            console.error("Failed to update status:", err);
        }
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
                    <h1 className="text-3xl font-black text-foreground tracking-tight">User Management</h1>
                    <p className="text-muted-foreground font-medium">Control access and roles for all system participants.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-12 pl-12 pr-6 bg-card rounded-xl border border-border/50 outline-none focus:border-primary/50 text-foreground text-sm w-[300px] transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-card rounded-2xl border border-border/50 w-fit">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as UserStatus)}
                        className={cn(
                            "px-6 py-2.5 rounded-xl text-sm font-black transition-all whitespace-nowrap",
                            activeTab === tab.id
                                ? "bg-muted text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Users Table */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-muted/30">
                                        <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">User Entity</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">Role</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    <AnimatePresence mode="popLayout">
                                        {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                                            <motion.tr
                                                key={user.email}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="group hover:bg-muted/30 transition-colors cursor-pointer"
                                                onClick={() => setSelectedUser(user)}
                                            >
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        {user.avatar ? (
                                                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-primary/30" />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center font-black text-primary border border-border/50">
                                                                {user.name[0]}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="text-sm font-black text-foreground">{user.name}</p>
                                                            <p className="text-[11px] text-muted-foreground font-bold">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50">
                                                        <ShieldCheck size={12} className="text-primary" />
                                                        <span className="text-[10px] text-foreground font-black uppercase tracking-tighter">{user.role}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className={cn(
                                                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border",
                                                        user.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                            user.status === 'PENDING_APPROVAL' ? "bg-amber-400/10 text-amber-500 border-amber-400/20" :
                                                                "bg-destructive/10 text-destructive border-destructive/20"
                                                    )}>
                                                        <div className={cn("w-1 h-1 rounded-full",
                                                            user.status === 'ACTIVE' ? "bg-emerald-500" :
                                                                user.status === 'PENDING_APPROVAL' ? "bg-amber-500" : "bg-destructive"
                                                        )} />
                                                        {user.status === 'PENDING_APPROVAL' ? 'Pending' : user.status}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {user.status === 'PENDING_APPROVAL' ? (
                                                            <>
                                                                <button onClick={(e) => { e.stopPropagation(); updateStatus(user.email, 'ACTIVE'); }} className="p-2 hover:bg-emerald-500/20 text-emerald-500 rounded-lg transition-colors" title="Approve">
                                                                    <CheckCircle size={18} />
                                                                </button>
                                                                <button onClick={(e) => { e.stopPropagation(); updateStatus(user.email, 'REJECTED'); }} className="p-2 hover:bg-destructive/20 text-destructive rounded-lg transition-colors" title="Reject">
                                                                    <XCircle size={18} />
                                                                </button>
                                                            </>
                                                        ) : user.status === 'ACTIVE' ? (
                                                            <button onClick={(e) => { e.stopPropagation(); updateStatus(user.email, 'BLOCKED'); }} className="p-2 hover:bg-amber-500/20 text-amber-500 rounded-lg transition-colors" title="Block">
                                                                <ShieldAlert size={18} />
                                                            </button>
                                                        ) : (
                                                            <button onClick={(e) => { e.stopPropagation(); updateStatus(user.email, 'ACTIVE'); }} className="p-2 hover:bg-emerald-500/20 text-emerald-500 rounded-lg transition-colors" title="Unblock">
                                                                <CheckCircle size={18} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={4} className="px-8 py-12 text-center text-muted-foreground text-sm font-medium">
                                                    No users found for this status segment.
                                                </td>
                                            </tr>
                                        )}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Audit Log Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <Activity className="text-primary" size={20} />
                            <h3 className="text-sm font-black text-foreground uppercase tracking-widest">System Audit</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="text-center py-8 text-muted-foreground text-sm font-medium">
                                No recent audit events available.
                            </div>
                        </div>

                        <button className="w-full mt-8 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border border-border/50 rounded-xl hover:bg-muted transition-colors">
                            View Full Logs
                        </button>
                    </div>
                </div>
            </div>

            {/* User Details Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedUser(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-card w-full max-w-2xl rounded-3xl border border-border/50 overflow-hidden shadow-xl relative z-10 flex flex-col max-h-[90vh]"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-border/50">
                                <div className="flex items-center gap-4">
                                    {selectedUser.avatar ? (
                                        <img src={selectedUser.avatar} alt={selectedUser.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/30" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center font-black text-xl text-primary border border-border/50">
                                            {selectedUser.name[0]}
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-xl font-black text-foreground">{selectedUser.name}</h2>
                                        <p className="text-sm font-bold text-muted-foreground">{selectedUser.email}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedUser(null)} className="p-2 text-muted-foreground hover:text-foreground bg-muted/50 rounded-full hover:bg-muted transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto space-y-8 flex-1">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Role</p>
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                                            <ShieldCheck size={14} className="text-primary" />
                                            <span className="text-xs text-foreground font-black uppercase tracking-widest">{selectedUser.role}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</p>
                                        <p className="text-sm font-black text-foreground">{selectedUser.status === 'PENDING_APPROVAL' ? 'Pending Approval' : selectedUser.status}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-black text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
                                        <Building2 size={16} className="text-muted-foreground" /> Business Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Company Name</p>
                                            <p className="text-sm font-bold text-foreground">{selectedUser.companyName || 'Not Provided'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1"><Phone size={10} /> Phone</p>
                                            <p className="text-sm font-bold text-foreground">{selectedUser.phone || 'Not Provided'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1"><Globe size={10} /> Website</p>
                                            {selectedUser.website ? (
                                                <a href={selectedUser.website} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:underline">{selectedUser.website}</a>
                                            ) : (
                                                <p className="text-sm font-bold text-muted-foreground/50">Not Provided</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1"><LinkIcon size={10} /> Social Links</p>
                                            <p className="text-sm font-bold text-foreground break-words">{selectedUser.socialLinks || 'Not Provided'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-muted/30 border-t border-border/50 flex gap-4 justify-end">
                                {selectedUser.status === 'PENDING_APPROVAL' ? (
                                    <>
                                        <button onClick={() => updateStatus(selectedUser.email, 'REJECTED')} className="px-6 py-3 bg-destructive/10 hover:bg-destructive hover:text-white text-destructive rounded-xl font-black text-xs uppercase tracking-widest transition-colors flex items-center gap-2 border border-destructive/20">
                                            <XCircle size={16} /> Reject
                                        </button>
                                        <button onClick={() => updateStatus(selectedUser.email, 'ACTIVE')} className="px-6 py-3 bg-emerald-500 text-primary-foreground hover:bg-emerald-600 rounded-xl font-black text-xs uppercase tracking-widest transition-colors flex items-center gap-2 shadow-sm shadow-emerald-500/20">
                                            <CheckCircle size={16} /> Approve Access
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => setSelectedUser(null)} className="px-6 py-3 bg-muted/50 hover:bg-muted text-foreground rounded-xl font-black text-xs uppercase tracking-widest transition-colors">
                                        Close Details
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
