'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Shield,
    Mail,
    MoreVertical,
    Plus,
    ShieldCheck,
    ShieldAlert,
    CheckCircle2,
    X,
    Search,
    Lock,
    Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Moderator' | 'Support' | 'Editor';
    status: 'ACTIVE' | 'INACTIVE';
    lastActive: string;
    permissions: string[];
}

export default function AdminTeamPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

    // Permissions State
    const [isPermissionsModalOpen, setIsPermissionsModalOpen] = React.useState(false);
    const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null);
    const [tempPermissions, setTempPermissions] = React.useState<string[]>([]);

    const AVAILABLE_PERMISSIONS = [
        'ALL_ACCESS',
        'APPROVE_OFFERS',
        'MANAGE_USERS',
        'VIEW_ORDERS',
        'CHAT_SUPPORT',
        'MANAGE_PLACEMENTS',
        'FINANCIAL_REPORTS'
    ];

    const [team, setTeam] = React.useState<TeamMember[]>([]);

    const filteredTeam = team.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openPermissionsModal = (member: TeamMember) => {
        setSelectedMember(member);
        setTempPermissions([...member.permissions]);
        setIsPermissionsModalOpen(true);
    };

    const handleTogglePermission = (perm: string) => {
        if (perm === 'ALL_ACCESS') {
            setTempPermissions(tempPermissions.includes('ALL_ACCESS') ? [] : ['ALL_ACCESS']);
            return;
        }

        // If they click a specific permission but currently have ALL_ACCESS, clear ALL_ACCESS first
        let newPerms = tempPermissions.filter(p => p !== 'ALL_ACCESS');

        if (newPerms.includes(perm)) {
            newPerms = newPerms.filter(p => p !== perm);
        } else {
            newPerms.push(perm);
        }
        setTempPermissions(newPerms);
    };

    const handleSavePermissions = () => {
        if (!selectedMember) return;
        setTeam(team.map(m => m.id === selectedMember.id ? { ...m, permissions: tempPermissions } : m));
        setIsPermissionsModalOpen(false);
        setSelectedMember(null);
    };

    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-poppins font-black tracking-tight">Atlantis Force</h1>
                    <p className="text-foreground/60">Manage your Atlantis internal team and permissions.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={18} />
                        <input
                            type="text"
                            placeholder="Filter team members..."
                            className="h-12 pl-12 pr-6 bg-card rounded-xl border border-border/50 outline-none focus:border-primary/50 text-foreground text-sm w-[250px] transition-all shadow-sm"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="h-12 px-6 bg-primary text-primary-foreground font-black text-sm rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-sm"
                    >
                        <Plus size={18} strokeWidth={3} /> Add Member
                    </button>
                </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredTeam.map((member, i) => (
                        <motion.div
                            key={member.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-card border border-border/50 rounded-[32px] p-8 hover:border-primary/40 transition-all group relative overflow-hidden shadow-sm hover:shadow-md"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-colors">
                                    <Shield className={cn(
                                        "transition-colors",
                                        member.role === 'Admin' ? "text-primary" : "text-blue-500"
                                    )} size={28} />
                                </div>
                                <div className={cn(
                                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                    member.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted text-muted-foreground border-border/50"
                                )}>
                                    {member.status}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors">{member.name}</h3>
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <Mail size={12} className="text-muted-foreground/50" />
                                        <p className="text-xs font-bold text-muted-foreground tracking-tight">{member.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 py-4 border-y border-border/50">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-widest">Authority</p>
                                        <p className="text-xs font-black text-foreground">{member.role}</p>
                                    </div>
                                    <div className="w-[1px] h-8 bg-border/50" />
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-widest">Last Access</p>
                                        <p className="text-xs font-bold text-muted-foreground">{member.lastActive}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-widest mb-3">Privileges</p>
                                    <div className="flex flex-wrap gap-2">
                                        {member.permissions.map(p => (
                                            <span key={p} className="px-2 py-0.5 rounded-lg bg-muted border border-border/50 text-[8px] font-black text-muted-foreground uppercase tracking-tighter">
                                                {p.replace('_', ' ')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3 pt-4">
                                <button
                                    onClick={() => openPermissionsModal(member)}
                                    className="flex-1 h-10 bg-muted/50 hover:bg-muted text-foreground font-black text-[10px] uppercase rounded-xl transition-all border border-border/50 flex items-center justify-center gap-2"
                                >
                                    <Lock size={12} /> Permissions
                                </button>
                                <button className="w-10 h-10 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-xl transition-all border border-border/50 flex items-center justify-center">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Invite Placeholder */}
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="border-2 border-dashed border-border/50 rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 group hover:border-primary/40 hover:bg-primary/5 transition-all outline-none"
                >
                    <div className="w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors border border-border/50 group-hover:border-primary/20">
                        <Plus className="text-muted-foreground/50 group-hover:text-primary transition-colors" size={24} />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-black text-muted-foreground group-hover:text-foreground transition-colors">Add Team Member</p>
                        <p className="text-[10px] text-muted-foreground/50 mt-1 uppercase font-black tracking-widest">Assign new role</p>
                    </div>
                </button>
            </div>

            {/* Add Member Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-card w-full max-w-lg rounded-[32px] border border-border/50 p-10 overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="absolute top-6 right-6 p-2 text-muted-foreground/50 hover:text-foreground transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-8">
                                <h2 className="text-2xl font-black text-foreground tracking-tight">New Member</h2>
                                <p className="text-muted-foreground text-sm mt-1">Invite a new administrator or moderator.</p>
                            </div>

                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full h-12 bg-muted/50 border border-border/50 rounded-xl px-4 text-foreground text-sm outline-none focus:border-primary/50 transition-all font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full h-12 bg-muted/50 border border-border/50 rounded-xl px-4 text-foreground text-sm outline-none focus:border-primary/50 transition-all font-medium"
                                        placeholder="john@marketplace.eg"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Assigned Role</label>
                                    <select className="w-full h-12 bg-muted/50 border border-border/50 rounded-xl px-4 text-foreground text-sm outline-none focus:border-primary/50 transition-all font-medium appearance-none">
                                        <option value="Admin">Super Admin</option>
                                        <option value="Moderator">Moderator</option>
                                        <option value="Support">Support Staff</option>
                                        <option value="Editor">Content Editor</option>
                                    </select>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="flex-1 h-12 bg-muted/50 text-muted-foreground font-black text-xs uppercase tracking-widest rounded-xl hover:bg-muted transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button className="flex-[2] h-12 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-transform">
                                        Send Invitation
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Permissions Modal */}
            <AnimatePresence>
                {isPermissionsModalOpen && selectedMember && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsPermissionsModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-card w-full max-w-lg rounded-[32px] border border-border/50 p-10 overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsPermissionsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 text-muted-foreground/50 hover:text-foreground transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-8">
                                <h2 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
                                    <ShieldCheck className="text-primary" size={28} />
                                    Access Controls
                                </h2>
                                <p className="text-muted-foreground text-sm mt-1">
                                    Configuring permissions for <strong className="text-foreground">{selectedMember.name}</strong> ({selectedMember.role})
                                </p>
                            </div>

                            <div className="space-y-4 max-h-[50vh] overflow-y-auto no-scrollbar pr-2 mb-8">
                                {AVAILABLE_PERMISSIONS.map((perm) => {
                                    const isAllowed = tempPermissions.includes(perm) || (perm !== 'ALL_ACCESS' && tempPermissions.includes('ALL_ACCESS'));

                                    return (
                                        <button
                                            key={perm}
                                            onClick={() => handleTogglePermission(perm)}
                                            className={cn(
                                                "w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left",
                                                isAllowed
                                                    ? "bg-primary/10 border-primary/30 text-primary"
                                                    : "bg-muted/50 border-border/50 text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-5 h-5 rounded flex items-center justify-center transition-colors",
                                                    isAllowed ? "bg-primary text-primary-foreground" : "bg-muted/50 border border-border/50"
                                                )}>
                                                    {isAllowed && <CheckCircle2 size={14} strokeWidth={3} />}
                                                </div>
                                                <span className="font-black text-sm tracking-wide">{perm.replace('_', ' ')}</span>
                                            </div>
                                            {perm === 'ALL_ACCESS' && (
                                                <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full z-10">Dangerous</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="pt-4 flex gap-4 border-t border-border/50 mt-4">
                                <button
                                    onClick={() => setIsPermissionsModalOpen(false)}
                                    className="flex-1 h-12 bg-muted/50 text-muted-foreground font-black text-xs uppercase tracking-widest rounded-xl hover:bg-muted transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSavePermissions}
                                    className="flex-[2] h-12 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-transform shadow-md"
                                >
                                    Save Controls
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
