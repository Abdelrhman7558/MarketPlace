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
                setError(result.message || 'Invalid email or password. Please try again.');
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
            setError(err.message || 'An error occurred during login.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Orbs for Depth */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[420px] relative"
            >
                {/* Logo */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block group">
                        <span className="font-heading font-black text-5xl tracking-tighter text-[#0A1A2F] italic">
                            Atlan<span className="text-[#FF8A00] not-italic">tis</span>
                        </span>
                    </Link>
                    <p className="text-muted-foreground text-sm font-medium mt-2">B2B Wholesale Excellence</p>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-slate-200 rounded-[32px] p-10 shadow-2xl shadow-slate-200/50">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-[#0A1A2F] mb-2">Welcome Back</h1>
                        <p className="text-muted-foreground text-sm">Enter your credentials to access your account</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6 flex items-start gap-3"
                        >
                            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-red-600 font-bold text-xs">!</span>
                            </div>
                            <p className="text-red-600 text-sm font-medium leading-tight">
                                {error}
                            </p>
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-[#0A1A2F] ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-4 text-[#0A1A2F] text-sm outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-xs font-black uppercase tracking-widest text-[#0A1A2F]">Password</label>
                                <Link href="/auth/forgot-password" className="text-xs font-bold text-primary hover:underline p-0 h-auto">Forgot Password?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-4 text-[#0A1A2F] text-sm outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                                >
                                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0A1A2F] hover:bg-[#162a44] text-white rounded-2xl py-4 text-sm font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-xs text-slate-400 text-center leading-relaxed font-medium">
                        By signing in, you agree to our <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                    </div>
                </div>

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    <p className="text-slate-500 text-sm font-medium">
                        New to Atlantis?{' '}
                        <Link
                            href="/auth/register"
                            className="text-secondary font-black hover:underline uppercase tracking-wider text-xs ml-1"
                        >
                            Create an Account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
