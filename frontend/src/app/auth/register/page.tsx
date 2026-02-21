'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Mail, Lock, User, Phone, ShieldCheck,
    ArrowRight, CheckCircle2, Sparkles, Building2,
    Eye, EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../lib/auth';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', role: 'customer' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const router = useRouter();
    const { register } = useAuth();

    const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!form.name || !form.email || !form.password) { setError('Please fill in all required fields'); return; }
        if (form.password.length < 6) { setError('Passwords must be at least 6 characters.'); return; }
        if (form.password !== form.confirmPassword) { setError('Passwords must match.'); return; }

        setLoading(true);
        setTimeout(() => {
            const success = register({
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
                role: form.role,
            });
            if (!success) {
                setError('An account with this email already exists.');
                setLoading(false);
                return;
            }
            router.push('/');
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#050B18] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#FF7A1A]/10 rounded-full blur-[150px] animate-pulse-slow" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow" />

            <div className="w-full max-w-[1100px] grid lg:grid-cols-2 gap-12 z-10">

                {/* Visual Left Side */}
                <div className="hidden lg:flex flex-col justify-center space-y-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link href="/" className="inline-block group">
                            <span className="font-black text-5xl tracking-tighter text-white">
                                Market<span className="text-[#FF7A1A]">Place</span>
                            </span>
                        </Link>
                        <h2 className="text-5xl font-black text-white leading-tight mt-10">
                            Empowering Your <br />
                            <span className="text-gray-400">Business Growth.</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-6">
                        {[
                            { title: 'Verified Network', desc: 'Access 50,000+ certified global suppliers.', icon: ShieldCheck },
                            { title: 'Wholesale Pricing', desc: 'Get direct manufacturer rates on everything.', icon: Sparkles },
                            { title: 'Business Tools', desc: 'Manage orders, logistics, and financing.', icon: Building2 },
                        ].map((item, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                key={i}
                                className="flex gap-5 group"
                            >
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#FF7A1A] group-hover:scale-110 group-hover:bg-[#FF7A1A]/10 transition-all border border-white/5">
                                    <item.icon size={24} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-lg font-black text-white">{item.title}</h4>
                                    <p className="text-gray-500 font-medium max-w-xs">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Registration Form Right Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-12 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                    <div className="mb-10 lg:hidden">
                        <Link href="/" className="font-black text-3xl tracking-tighter text-white">
                            Market<span className="text-[#FF7A1A]">Place</span>
                        </Link>
                    </div>

                    <h1 className="text-3xl font-black text-white mb-2">Create Account</h1>
                    <p className="text-gray-400 font-medium mb-10">Join the world's most trusted B2B network.</p>

                    {error && (
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-8 flex items-center gap-3"
                        >
                            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-black text-xs">!</div>
                            <p className="text-red-400 text-sm font-bold">{error}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Full Legal Name</label>
                            <div className="relative">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white outline-none focus:border-[#FF7A1A] transition-all font-medium placeholder:text-gray-700"
                                    placeholder="e.g. John Smith"
                                    value={form.name}
                                    onChange={e => update('name', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Work Email</label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white outline-none focus:border-[#FF7A1A] transition-all font-medium placeholder:text-gray-700"
                                    placeholder="name@company.com"
                                    value={form.email}
                                    onChange={e => update('email', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white outline-none focus:border-[#FF7A1A] transition-all font-medium placeholder:text-gray-700"
                                    placeholder="+1 234 567 890"
                                    value={form.phone}
                                    onChange={e => update('phone', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white outline-none focus:border-[#FF7A1A] transition-all font-medium placeholder:text-gray-700"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={e => update('password', e.target.value)}
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors">
                                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white outline-none focus:border-[#FF7A1A] transition-all font-medium placeholder:text-gray-700"
                                    placeholder="••••••••"
                                    value={form.confirmPassword}
                                    onChange={e => update('confirmPassword', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Business Role</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => update('role', 'customer')}
                                    className={`py-4 rounded-2xl font-black text-sm border transition-all ${form.role === 'customer' ? 'bg-[#FF7A1A] border-[#FF7A1A] text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'}`}
                                >
                                    Retail Buyer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => update('role', 'supplier')}
                                    className={`py-4 rounded-2xl font-black text-sm border transition-all ${form.role === 'supplier' ? 'bg-[#FF7A1A] border-[#FF7A1A] text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'}`}
                                >
                                    Wholesale Supplier
                                </button>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="md:col-span-2 bg-[#FF7A1A] hover:bg-[#e66c17] text-white py-5 rounded-2xl font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Create Professional Account <ArrowRight size={22} /></>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/10 text-center">
                        <p className="text-gray-500 font-medium">
                            Already part of our network? {' '}
                            <Link href="/auth/login" className="text-white font-black hover:text-[#FF7A1A] underline-offset-8 hover:underline transition-all">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
