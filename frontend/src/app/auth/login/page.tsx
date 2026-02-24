'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
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
        <div className="min-h-screen bg-[#050B18] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FF7A1A]/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[450px] z-10"
            >
                {/* Logo Section */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block group">
                        <motion.span
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            className="font-black text-4xl tracking-tighter text-white"
                        >
                            Market<span className="text-[#FF7A1A]">Place</span>
                        </motion.span>
                    </Link>
                    <p className="text-gray-400 mt-2 font-medium">Wholesale Sourcing Excellence</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-10 shadow-2xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                    <h1 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                        Sign In <Sparkles className="text-[#FF7A1A] w-6 h-6" />
                    </h1>

                    {error && (
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6"
                        >
                            <p className="text-red-400 text-sm font-bold flex items-center gap-2">
                                <span className="bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">!</span>
                                {error}
                            </p>
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-300 uppercase tracking-widest ml-1">Work Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-[#FF7A1A] focus:ring-4 focus:ring-[#FF7A1A]/10 transition-all placeholder:text-gray-600 font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-sm font-black text-gray-300 uppercase tracking-widest">Password</label>
                                <Link href="/auth/forgot-password" className="text-xs font-bold text-[#FF7A1A] hover:underline">Forgot?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white outline-none focus:border-[#FF7A1A] focus:ring-4 focus:ring-[#FF7A1A]/10 transition-all placeholder:text-gray-600 font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FF7A1A] hover:bg-[#e66c17] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-[#FF7A1A]/20 flex items-center justify-center gap-3 disabled:opacity-50 transition-all"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight size={20} /></>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400 border-t border-white/10 pt-8">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        Verified Business Login
                    </div>
                </div>

                {/* Footer Link */}
                <p className="text-center mt-8 text-gray-500 font-medium tracking-tight">
                    Don't have an account? {' '}
                    <Link href="/auth/register" className="text-white font-black hover:text-[#FF7A1A] underline-offset-8 hover:underline transition-all">
                        Create Marketplace Account
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
