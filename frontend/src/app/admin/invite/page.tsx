'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    UserPlus,
    Link as LinkIcon,
    Mail,
    Copy,
    CheckCircle,
    Timer,
    ShieldCheck,
    ChevronRight,
    Search,
    Trash2,
    PauseCircle,
    PlayCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface InviteToken {
    token: string;
    role: 'supplier' | 'customer';
    email?: string;
    expiresAt: string;
    used: boolean;
    paused?: boolean;
}

export default function AdminInvitePage() {
    const [role, setRole] = React.useState<'supplier' | 'customer'>('supplier');
    const [email, setEmail] = React.useState('');
    const [generatedLink, setGeneratedLink] = React.useState('');
    const [copied, setCopied] = React.useState(false);
    const [invites, setInvites] = React.useState<InviteToken[]>([]);

    React.useEffect(() => {
        const saved = localStorage.getItem('marketplace-invites') || '[]';
        setInvites(JSON.parse(saved));
    }, []);

    const generateInvite = () => {
        // Secure Token Generation (Simulated)
        const token = `SECURE-${role.toUpperCase()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

        const newInvite: InviteToken = {
            token,
            role,
            email: email || undefined,
            expiresAt,
            used: false
        };

        const updated = [newInvite, ...invites];
        setInvites(updated);
        localStorage.setItem('marketplace-invites', JSON.stringify(updated));

        // Redirect to register with strictly locked role in query (Normally this would be verified server-side via token)
        const link = `${window.location.origin}/auth/register?invite=${token}&role=${role}${email ? `&email=${encodeURIComponent(email)}` : ''}`;
        setGeneratedLink(link);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const deleteInvite = (token: string) => {
        const updated = invites.filter(inv => inv.token !== token);
        setInvites(updated);
        localStorage.setItem('marketplace-invites', JSON.stringify(updated));
    };

    const togglePause = (token: string) => {
        const updated = invites.map(inv => inv.token === token ? { ...inv, paused: !inv.paused } : inv);
        setInvites(updated);
        localStorage.setItem('marketplace-invites', JSON.stringify(updated));
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-3xl font-black text-white tracking-tight">Invite Center</h1>
                <p className="text-white/40 font-medium">Generate secure, single-use onboarding links for verified partners.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Generation Form */}
                <div className="bg-[#131921] p-8 rounded-3xl border border-white/5 space-y-8 layered-3d-shadow">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-widest text-white/40">Select Target Role</label>
                            <div className="flex gap-3">
                                {['supplier', 'customer'].map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setRole(r as any)}
                                        className={cn(
                                            "flex-1 py-4 rounded-xl font-black text-sm border transition-all uppercase tracking-tighter",
                                            role === r
                                                ? "bg-primary text-[#131921] border-primary shadow-lg shadow-primary/20"
                                                : "bg-white/5 text-white/40 border-white/5 hover:border-white/10"
                                        )}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-widest text-white/40">Partner Email (Optional)</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full h-14 bg-white/5 rounded-xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium"
                            />
                        </div>

                        <button
                            onClick={generateInvite}
                            className="w-full py-5 bg-primary text-[#131921] font-black rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-3"
                        >
                            <UserPlus size={20} strokeWidth={3} /> Generate Secure Link
                        </button>
                    </div>

                    <AnimatePresence>
                        {generatedLink && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="pt-8 border-t border-white/5 space-y-4"
                            >
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                                    <ShieldCheck className="text-emerald-400" size={20} />
                                    <span className="text-[11px] text-emerald-400 font-black uppercase tracking-widest">Token Secured (24h Expiry)</span>
                                </div>
                                <div className="flex items-center gap-2 group">
                                    <div className="flex-1 h-12 bg-black/40 rounded-xl px-4 flex items-center font-mono text-xs text-primary truncate border border-white/5">
                                        {generatedLink}
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className="h-12 w-12 bg-white/5 hover:bg-white/10 text-white rounded-xl flex items-center justify-center transition-all border border-white/5"
                                    >
                                        {copied ? <CheckCircle size={18} className="text-emerald-400" /> : <Copy size={18} />}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* History */}
                <div className="space-y-6">
                    <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                        <Timer className="text-primary" /> Active Invites
                    </h3>

                    <div className="space-y-4 max-h-[500px] overflow-y-auto no-scrollbar pb-10">
                        {invites.length > 0 ? invites.map((invite, i) => (
                            <div key={invite.token} className="p-5 bg-[#131921] rounded-2xl border border-white/5 flex items-center justify-between group hover:border-primary/20 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center font-black text-[10px] uppercase",
                                        invite.role === 'supplier' ? "bg-primary/10 text-primary" : "bg-blue-500/10 text-blue-400"
                                    )}>
                                        {invite.role[0]}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white uppercase tracking-tight truncate max-w-[150px]">
                                            {invite.email || 'Open Invite'}
                                        </span>
                                        <span className="text-[10px] text-white/30 font-medium">Exp: {new Date(invite.expiresAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {invite.used ? (
                                        <div className="px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                            <span className="text-[9px] font-black text-emerald-400 uppercase">Onboarded</span>
                                        </div>
                                    ) : (
                                        <div className="px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
                                            <span className="text-[9px] font-black text-amber-400 uppercase italic">
                                                {invite.paused ? 'Paused' : 'Pending'}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 border-l border-white/5 pl-3 ml-1">
                                        {!invite.used && (
                                            <button
                                                onClick={() => togglePause(invite.token)}
                                                className="p-1.5 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                                                title={invite.paused ? "Resume Invite" : "Pause Invite"}
                                            >
                                                {invite.paused ? <PlayCircle size={16} /> : <PauseCircle size={16} />}
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteInvite(invite.token)}
                                            className="p-1.5 text-red-500/40 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10 group/btn"
                                            title="Delete Invite"
                                        >
                                            <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                                <LinkIcon size={40} className="mx-auto text-white/10 mb-4" />
                                <p className="text-white/20 text-sm font-medium">No active invite tokens found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
