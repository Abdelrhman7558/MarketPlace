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
        <div className="min-h-screen bg-[#EAEDED] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-[380px]"
            >
                {/* Logo */}
                <div className="text-center mb-6">
                    <Link href="/" className="inline-block">
                        <span className="font-black text-3xl tracking-tighter text-[#0A1A2F]">
                            ATLANTIS
                        </span>
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-[#DDD] rounded-lg p-6 shadow-sm">
                    <h1 className="text-2xl font-bold text-[#0F1111] mb-5">Sign in</h1>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-[#FCF4F4] border border-[#C40000] rounded-md p-3 mb-4"
                        >
                            <p className="text-[#C40000] text-sm font-medium flex items-center gap-2">
                                <span className="font-bold">!</span>
                                {error}
                            </p>
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-[#0F1111]">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full bg-white border border-[#888] rounded-md px-3 py-2 text-[#0F1111] text-sm outline-none focus:border-[#E77600] focus:shadow-[0_0_0_3px_rgba(228,121,17,0.5)] transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-[#0F1111]">Password</label>
                                <Link href="/auth/forgot-password" className="text-xs text-[#007185] hover:text-[#C45500] hover:underline">Forgot your password?</Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white border border-[#888] rounded-md px-3 pr-10 py-2 text-[#0F1111] text-sm outline-none focus:border-[#E77600] focus:shadow-[0_0_0_3px_rgba(228,121,17,0.5)] transition-all placeholder:text-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#0F1111] transition-colors"
                                >
                                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-b from-[#F7DFA5] to-[#F0C14B] border border-[#A88734] rounded-md py-2.5 text-sm font-bold text-[#0F1111] hover:from-[#F5D78E] hover:to-[#EEB933] disabled:opacity-50 transition-all shadow-sm"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-[#0F1111]/30 border-t-[#0F1111] rounded-full animate-spin mx-auto" />
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    <div className="mt-5 text-xs text-[#555] text-center leading-relaxed">
                        By signing in, you agree to MarketPlace's <a href="#" className="text-[#007185] hover:text-[#C45500] hover:underline">Terms</a> and <a href="#" className="text-[#007185] hover:text-[#C45500] hover:underline">Privacy Policy</a>.
                    </div>
                </div>

                {/* Footer Link */}
                <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#DDD]" />
                    </div>
                    <div className="relative text-center">
                        <span className="bg-[#EAEDED] px-3 text-xs text-[#767676]">New to Atlantis?</span>
                    </div>
                </div>
                <Link
                    href="/auth/register"
                    className="mt-3 block w-full text-center bg-gradient-to-b from-[#F7F8FA] to-[#E7E9EC] border border-[#ADB1B8] rounded-md py-2 text-sm font-medium text-[#0F1111] hover:from-[#E7E8EA] hover:to-[#D8DADC] transition-all shadow-sm"
                >
                    Create your Atlantis account
                </Link>
            </motion.div>
        </div>
    );
}
