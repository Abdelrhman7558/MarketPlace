'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    ShieldAlert,
    ShieldCheck,
    AlertTriangle,
    Eye,
    Lock,
    Unlock,
    RefreshCcw,
    UserX,
    Globe,
    Clock,
    ExternalLink,
    Search,
    Cpu,
    Activity,
    CheckCircle2,
    Wrench,
    Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SecurityLog {
    id: string;
    level: 'INFO' | 'WARN' | 'CRITICAL';
    eventType: string;
    description: string;
    ip: string;
    userId?: string;
    path: string;
    method: string;
    createdAt: string;
}

interface BlockedIp {
    ip: string;
    reason: string;
    expiresAt: string;
}

interface SecurityStatus {
    score: number;
    isLockedDown: boolean;
    recentLogs: SecurityLog[];
    blockedIps: BlockedIp[];
    timestamp: string;
}

export default function SecurityDashboard() {
    const [status, setStatus] = React.useState<SecurityStatus | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [locking, setLocking] = React.useState(false);
    const [lastScanSeconds, setLastScanSeconds] = React.useState(0);

    // Auto-Healer Agent State
    const [agentState, setAgentState] = React.useState<'IDLE' | 'ANALYZING' | 'PATCHING' | 'RESOLVED'>('IDLE');
    const [mockErrors, setMockErrors] = React.useState<any[]>([]);

    const fetchStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};

            const [statusRes, agentRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'}/admin/security/status`, { headers }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'}/admin/security/agent-status`, { headers })
            ]);

            if (statusRes.ok) {
                const data = await statusRes.json();
                setStatus(data);
            }
            if (agentRes.ok) {
                const agentData = await agentRes.json();
                setAgentState(agentData.state);
                setMockErrors(agentData.errors || []);
            }

            setLastScanSeconds(0);
        } catch (error) {
            console.error('Failed to fetch security status', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 3000); // Poll agents every 3s
        const ticker = setInterval(() => setLastScanSeconds(s => s + 1), 1000); // 1s tick
        return () => {
            clearInterval(interval);
            clearInterval(ticker);
        };
    }, []);

    const runAgentFix = async () => {
        if (agentState !== 'IDLE' && agentState !== 'RESOLVED') return;
        setAgentState('ANALYZING');
        try {
            const token = localStorage.getItem('token');
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'}/admin/security/agent-fix`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchStatus();
        } catch (error) {
            console.error('Failed to force agent fix', error);
        }
    };

    const toggleLockdown = async () => {
        if (!status) return;
        setLocking(true);
        try {
            const token = localStorage.getItem('token');
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'}/admin/security/lockdown`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ enabled: !status.isLockedDown }),
            });
            await fetchStatus();
        } catch (error) {
            console.error('Lockdown toggle failed', error);
        } finally {
            setLocking(false);
        }
    };

    const unblockIp = async (ip: string) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'}/admin/security/unblock`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ip }),
            });
            await fetchStatus();
        } catch (error) { }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="flex flex-col items-center gap-4">
                <RefreshCcw className="w-8 h-8 text-primary animate-spin" />
                <p className="text-white/40 font-medium">Initializing Security Protocols...</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                        <Shield className="text-primary w-10 h-10" />
                        Security Shield
                    </h1>
                    <p className="text-white/40 mt-1 font-medium italic">Autonomous 24/7 Threat Mitigation Agent</p>
                </div>

                <button
                    onClick={toggleLockdown}
                    disabled={locking}
                    className={cn(
                        "px-6 py-3 rounded-xl font-bold flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50",
                        status?.isLockedDown
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600"
                    )}
                >
                    {status?.isLockedDown ? <Unlock size={20} /> : <Lock size={20} />}
                    {status?.isLockedDown ? 'Release Lockdown' : 'Emergency Lockdown'}
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#131921] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:scale-125 duration-500">
                        <ShieldCheck size={80} className="text-primary" />
                    </div>
                    <p className="text-white/40 text-xs font-black uppercase tracking-widest">System Health</p>
                    <h3 className="text-4xl font-black text-white mt-2">🛡️ {status?.score}%</h3>
                    <p className="text-emerald-500 text-[10px] font-bold mt-2 uppercase">Integrity Verified</p>
                </div>

                <div className="bg-[#131921] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:scale-125 duration-500">
                        <UserX size={80} className="text-red-500" />
                    </div>
                    <p className="text-white/40 text-xs font-black uppercase tracking-widest">Blocked Threats</p>
                    <h3 className="text-4xl font-black text-white mt-2">{status?.blockedIps?.length || 0}</h3>
                    <p className="text-red-400 text-[10px] font-bold mt-2 uppercase">Active IP Blocks</p>
                </div>

                <div className="bg-[#131921] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:scale-125 duration-500">
                        <Clock size={80} className="text-amber-500" />
                    </div>
                    <p className="text-white/40 text-xs font-black uppercase tracking-widest">Monitoring Status</p>
                    <h3 className="text-4xl font-black text-white mt-2 flex items-center gap-2">ACTIVE <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse mt-1" /></h3>
                    <p className="text-amber-400 text-[10px] font-bold mt-2 uppercase underline underline-offset-4 decoration-2">Last Scan: {lastScanSeconds}s ago</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Threat Feed */}
                <div className="bg-[#131921] border border-white/5 rounded-3xl overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-white font-black flex items-center gap-2">
                            <ShieldAlert className="text-primary" size={20} />
                            Real-Time Threat Feed
                        </h3>
                        <button onClick={fetchStatus} className="text-white/40 hover:text-white transition-colors">
                            <RefreshCcw size={16} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-[500px] no-scrollbar">
                        {!status?.recentLogs || status?.recentLogs?.length === 0 ? (
                            <div className="h-full flex items-center justify-center p-12 text-white/20 italic">
                                No threats detected in the last session.
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                {status?.recentLogs?.map((log) => (
                                    <div key={log.id} className="p-4 hover:bg-white/5 transition-colors group">
                                        <div className="flex items-start gap-4">
                                            <div className={cn(
                                                "p-2 rounded-lg mt-1",
                                                log.level === 'CRITICAL' ? "bg-red-500/10 text-red-500" :
                                                    log.level === 'WARN' ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-500"
                                            )}>
                                                <AlertTriangle size={16} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                                                        {log.eventType}
                                                    </span>
                                                    <span className="text-[10px] text-white/20 font-medium">
                                                        {new Date(log.createdAt).toLocaleTimeString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-white/80 font-medium">{log.description}</p>
                                                <div className="mt-2 flex items-center gap-4 text-[10px] text-white/30">
                                                    <span className="flex items-center gap-1 font-mono">
                                                        <Globe size={10} /> {log.ip}
                                                    </span>
                                                    <span className="font-mono">{log.method} {log.path}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Blocked IPs & Actions */}
                <div className="space-y-8">
                    <div className="bg-[#131921] border border-white/5 rounded-3xl p-6">
                        <h3 className="text-white font-black mb-6 flex items-center gap-2">
                            <Lock className="text-red-500" size={20} />
                            Active IP Embargo
                        </h3>
                        <div className="space-y-3">
                            {status?.blockedIps?.map((block) => (
                                <div key={block.ip} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                            <Globe size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-white">{block.ip}</p>
                                            <p className="text-[10px] text-white/40">{block.reason}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => unblockIp(block.ip)}
                                        className="opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest transition-all"
                                    >
                                        Unblock
                                    </button>
                                </div>
                            ))}
                            {(!status?.blockedIps || status?.blockedIps?.length === 0) && (
                                <div className="text-center py-8 text-white/20 italic text-sm">No active embargoes.</div>
                            )}
                        </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                        <h3 className="text-primary font-black mb-2 uppercase tracking-tighter italic text-xl flex items-center gap-2">
                            <Cpu size={20} /> AI Resolution Agent
                        </h3>
                        <p className="text-white/60 text-xs leading-relaxed mb-6">
                            Autonomous diagnostic engine. Detects unhandled exceptions, backend lag, and hydration mismatches. Deploys hotfixes instantly without downtime.
                        </p>

                        <div className="space-y-4 mb-6 relative z-10">
                            <AnimatePresence mode="popLayout">
                                {mockErrors.length > 0 ? (
                                    mockErrors.map(err => (
                                        <motion.div
                                            key={err.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20, scale: 0.9 }}
                                            className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-between backdrop-blur-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                <AlertTriangle size={14} className="text-red-500" />
                                                <span className="text-xs font-bold text-white/80">{err.msg}</span>
                                            </div>
                                            <span className="text-[10px] text-red-400 font-mono tracking-widest uppercase">{err.time}</span>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="p-6 text-center border border-dashed border-emerald-500/30 rounded-xl bg-emerald-500/5 backdrop-blur-sm"
                                    >
                                        <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-3" />
                                        <p className="text-emerald-400 text-sm font-black tracking-widest uppercase">All Systems Optimized</p>
                                        <p className="text-emerald-400/60 text-[10px] font-bold mt-1">Agent returning to standby mode.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={runAgentFix}
                            disabled={(agentState !== 'IDLE' && agentState !== 'RESOLVED') || mockErrors.length === 0}
                            className="w-full relative h-14 bg-primary text-[#131921] font-black text-xs uppercase tracking-widest rounded-xl overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed group z-10 shadow-lg shadow-primary/20"
                        >
                            <AnimatePresence mode="wait">
                                {agentState === 'IDLE' && (
                                    <motion.div key="idle" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center justify-center gap-2 h-full absolute inset-0">
                                        <Activity size={18} /> Deploy Resolution Agent
                                    </motion.div>
                                )}
                                {agentState === 'ANALYZING' && (
                                    <motion.div key="analyzing" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center justify-center gap-2 h-full absolute inset-0 bg-blue-500 text-white">
                                        <Search size={18} className="animate-pulse" /> Analyzing Stack Trace...
                                    </motion.div>
                                )}
                                {agentState === 'PATCHING' && (
                                    <motion.div key="patching" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center justify-center gap-2 h-full absolute inset-0 bg-purple-500 text-white">
                                        <Wrench size={18} className="animate-spin" /> Compiling & Deploying Hotfix...
                                    </motion.div>
                                )}
                                {agentState === 'RESOLVED' && (
                                    <motion.div key="resolved" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center justify-center gap-2 h-full absolute inset-0 bg-emerald-500 text-white">
                                        <Check size={18} /> Automated Resolution Complete
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
