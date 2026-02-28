'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) { setError('Please fill in all fields'); return; }

        setLoading(true);
        try {
            const result = await login(email, password);
            if (!result.success) {
                setError(result.message || 'Invalid credentials. Please verify your details.');
                setLoading(false);
                return;
            }

            const user = result.user;
            if (user?.role === 'admin' || user?.role === 'ADMIN') {
                router.push('/admin');
            } else if (user?.role === 'supplier' || user?.role === 'SUPPLIER') {
                router.push('/supplier');
            } else {
                router.push('/');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex overflow-hidden font-sans">
            {/* Left Side: Brand Visual Panel */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex lg:w-1/2 relative bg-[#0A1A2F] items-center justify-center p-12 overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF8A00] opacity-[0.05] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500 opacity-[0.03] blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 max-w-lg">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mb-12"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF8A00] bg-[#FF8A00]/10 px-4 py-2 rounded-full">
                            Enterprise B2B Distribution
                        </span>
                    </motion.div>

                    <h2 className="text-5xl font-black text-white leading-tight mb-8">
                        The Future of <span className="text-[#FF8A00]">Beverage</span> Sourcing.
                    </h2>

                    <div className="space-y-6 text-[#B0B0C8] text-lg leading-relaxed">
                        <div className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                                <ShieldCheck size={14} className="text-emerald-500" />
                            </div>
                            <p>Military-grade security for bulk transactions and smart contracts.</p>
                        </div>
                        <p>Streamline your supply chain with Atlantis's automated AI-driven procurement engine.</p>
                    </div>

                    {/* Mini Dashboard Teaser */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-16 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[40px] p-8 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400/40" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400/40" />
                                <div className="w-3 h-3 rounded-full bg-green-400/40" />
                            </div>
                            <div className="h-6 w-24 bg-white/5 rounded-full" />
                        </div>
                        <div className="space-y-4">
                            <div className="h-4 w-full bg-white/5 rounded-full" />
                            <div className="h-4 w-3/4 bg-white/5 rounded-full" />
                            <div className="h-8 w-1/4 bg-[#FF8A00]/20 rounded-full mt-6" />
                        </div>
                    </motion.div>
                </div>

                {/* Vertical Brand Label */}
                <div className="absolute left-12 bottom-12 overflow-hidden">
                    <span className="text-[100px] font-black text-white/[0.02] select-none leading-none">ATLANTIS</span>
                </div>
            </motion.div>

            {/* Right Side: Form Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-24 bg-[#F8FAFC]">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Logo Mobile */}
                    <div className="lg:hidden mb-12 text-center">
                        <Link href="/" className="inline-block group">
                            <span className="font-heading font-black text-4xl tracking-tighter text-[#0A1A2F]">
                                Atlan<span className="text-[#FF8A00]">tis</span>
                            </span>
                        </Link>
                    </div>

                    <div className="mb-12">
                        <h1 className="text-4xl font-black text-[#0A1A2F] tracking-tight mb-3">Sign In.</h1>
                        <p className="text-[#64748B] font-medium">Access your global procurement dashboard.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-8 flex items-start gap-4"
                        >
                            <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-red-600 font-black text-xs">!</span>
                            </div>
                            <p className="text-red-700 text-sm font-bold leading-snug">{error}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0A1A2F]/40 ml-1">Work Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-slate-300 group-focus-within:text-[#FF8A00] transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@atlantis.com"
                                    className="w-full bg-white border-2 border-slate-100 rounded-[24px] pl-14 pr-6 py-5 text-[#0A1A2F] font-bold outline-none focus:border-[#FF8A00]/30 focus:shadow-[0_0_0_8px_rgba(255,138,0,0.05)] transition-all placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0A1A2F]/40">Password</label>
                                <Link href="/auth/forgot-password" className="text-xs font-black text-[#FF8A00] hover:underline uppercase tracking-wider">
                                    Recovery
                                </Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-slate-300 group-focus-within:text-[#FF8A00] transition-colors" />
                                </div>
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white border-2 border-slate-100 rounded-[24px] pl-14 pr-14 py-5 text-[#0A1A2F] font-bold outline-none focus:border-[#FF8A00]/30 focus:shadow-[0_0_0_8px_rgba(255,138,0,0.05)] transition-all placeholder:text-slate-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#0A1A2F] transition-colors"
                                >
                                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-[72px] bg-[#0A1A2F] hover:bg-[#162a44] text-white rounded-[24px] font-black uppercase tracking-[0.3em] text-xs transition-all shadow-2xl shadow-[#0A1A2F]/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 relative overflow-hidden group/btn"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                            {loading ? (
                                <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Authenticate</span>
                                    <ArrowRight size={20} className="transition-transform group-hover/btn:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-[#64748B] font-medium text-sm">
                            Partnership Inquiry?{' '}
                            <Link href="/auth/register" className="text-[#FF8A00] font-black hover:underline ml-1 uppercase text-xs tracking-widest">
                                Create Brand Profile
                            </Link>
                        </p>
                    </div>

                    {/* Social/Trust Badges Placeholder */}
                    <div className="mt-16 pt-8 border-t border-slate-100">
                        <div className="flex justify-center items-center gap-8 opacity-[0.4] grayscale hover:grayscale-0 transition-all duration-700">
                            <div className="h-4 w-16 bg-slate-300 rounded" />
                            <div className="h-4 w-16 bg-slate-300 rounded" />
                            <div className="h-4 w-16 bg-slate-300 rounded" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
