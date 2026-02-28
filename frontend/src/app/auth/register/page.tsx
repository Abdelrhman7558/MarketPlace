'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Mail, Lock, User, Phone, ShieldCheck,
    ArrowRight, CheckCircle2, Building2,
    Eye, EyeOff, Globe, Link as LinkIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { Suspense } from 'react';

function RegisterForm() {
    const searchParams = useSearchParams();
    const inviteEmail = searchParams.get('email') || '';
    const [form, setForm] = useState({ name: '', email: inviteEmail, phone: '', companyName: '', website: '', socialLinks: '', password: '', confirmPassword: '', role: 'customer' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();
    const { register } = useAuth();

    const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!form.name || !form.email || !form.password) { setError('Please fill in all required fields'); return; }
        if (form.password.length < 6) { setError('Passwords must be at least 6 characters.'); return; }
        if (form.password !== form.confirmPassword) { setError('Passwords must match.'); return; }

        const isStrong = form.password.length >= 8 && /[A-Z]/.test(form.password) && /[a-z]/.test(form.password) && /[0-9]/.test(form.password) && /[^A-Za-z0-9]/.test(form.password);
        if (!isStrong) { setError('Please meet all password requirements before submitting.'); return; }

        setLoading(true);
        const submitRegister = async () => {
            const success = await register({
                name: form.name,
                email: form.email,
                phone: form.phone,
                companyName: form.companyName,
                website: form.website,
                socialLinks: form.socialLinks,
                password: form.password,
                role: form.role,
            });

            if (!success) {
                if (typeof success === 'string') {
                    setError(success);
                } else {
                    setError('Unable to reach the registration server. Please check your internet or try again later.');
                }
                setLoading(false);
                return;
            }
            setIsSuccess(true);
            setLoading(false);
        };
        submitRegister();
    };

    const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-3.5 text-[#0A1A2F] text-sm outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400";
    const labelClass = "text-xs font-black uppercase tracking-widest text-[#0A1A2F] ml-1";
    const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors";

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-[600px] relative">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block group">
                        <span className="font-heading font-black text-4xl tracking-tighter text-[#0A1A2F] italic">
                            Atlan<span className="text-[#FF8A00] not-italic">tis</span>
                        </span>
                    </Link>
                </div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-slate-200 rounded-[32px] p-10 shadow-2xl shadow-slate-200/50"
                >
                    {isSuccess ? (
                        <div className="flex flex-col items-center text-center py-10 space-y-6">
                            <div className="w-24 h-24 rounded-[32px] bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                <CheckCircle2 size={48} className="text-emerald-500" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-[#0A1A2F]">Success!</h2>
                                <p className="text-slate-500 font-medium">Your application is being processed.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-[24px] w-full text-left space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <ShieldCheck size={18} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-black text-xs uppercase tracking-widest text-[#0A1A2F]">Security Review</p>
                                        <p className="text-sm text-slate-500 font-medium mt-1">We will verify your business and contact details.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                        <Mail size={18} className="text-secondary" />
                                    </div>
                                    <div>
                                        <p className="font-black text-xs uppercase tracking-widest text-[#0A1A2F]">Email Confirmation</p>
                                        <p className="text-sm text-slate-500 font-medium mt-1">Check your inbox for an approval notification.</p>
                                    </div>
                                </div>
                            </div>
                            <Link href="/" className="mt-4 px-8 py-3 bg-[#0A1A2F] text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#162a44] transition-all active:scale-[0.98]">
                                Return to Home
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="mb-10">
                                <h1 className="text-3xl font-black text-[#0A1A2F] mb-2">Create Account</h1>
                                <p className="text-slate-500 font-medium">Join the premier B2B distribution network</p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-8"
                                >
                                    <p className="text-red-600 text-sm font-medium">{error}</p>
                                </motion.div>
                            )}

                            <form onSubmit={handleRegister} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className={labelClass}>Full Name</label>
                                        <div className="relative group">
                                            <User className={iconClass} />
                                            <input className={inputClass} placeholder="John Doe" value={form.name} onChange={e => update('name', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className={labelClass}>Work Email</label>
                                        <div className="relative group">
                                            <Mail className={iconClass} />
                                            <input className={inputClass} placeholder="john@company.com" value={form.email} disabled={!!inviteEmail} onChange={e => update('email', e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className={labelClass}>Phone Number</label>
                                        <div className="relative group">
                                            <Phone className={iconClass} />
                                            <input className={inputClass} placeholder="+1..." value={form.phone} onChange={e => update('phone', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className={labelClass}>Company Name</label>
                                        <div className="relative group">
                                            <Building2 className={iconClass} />
                                            <input className={inputClass} placeholder="Acme Ltd" value={form.companyName} onChange={e => update('companyName', e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className={labelClass}>Website</label>
                                        <div className="relative group">
                                            <Globe className={iconClass} />
                                            <input className={inputClass} placeholder="https://..." value={form.website} onChange={e => update('website', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelClass}>Social Link</label>
                                        <div className="relative group">
                                            <LinkIcon className={iconClass} />
                                            <input className={inputClass} placeholder="LinkedIn..." value={form.socialLinks} onChange={e => update('socialLinks', e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className={labelClass}>Account Password</label>
                                    <div className="relative group">
                                        <Lock className={iconClass} />
                                        <input
                                            type={showPass ? 'text' : 'password'}
                                            className={inputClass + ' pr-12'}
                                            placeholder="Secure password"
                                            value={form.password}
                                            onChange={e => update('password', e.target.value)}
                                        />
                                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {[
                                            { label: '8+ Characters', met: form.password.length >= 8 },
                                            { label: 'Mixed Case', met: /[A-Z]/.test(form.password) && /[a-z]/.test(form.password) },
                                            { label: 'Number/Symbol', met: /[0-9]/.test(form.password) || /[^A-Za-z0-9]/.test(form.password) }
                                        ].map((req, idx) => (
                                            <span key={idx} className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all ${req.met ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                {req.met && <CheckCircle2 size={10} className="inline mr-1 -mt-0.5" />}
                                                {req.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className={labelClass}>Business Intent</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => update('role', 'customer')}
                                            className={`py-4 rounded-[20px] text-xs font-black uppercase tracking-[0.1em] border transition-all ${form.role === 'customer' ? 'bg-[#0A1A2F]/5 border-[#0A1A2F] text-[#0A1A2F] shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300'}`}
                                        >
                                            Buyer
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => update('role', 'supplier')}
                                            className={`py-4 rounded-[20px] text-xs font-black uppercase tracking-[0.1em] border transition-all ${form.role === 'supplier' ? 'bg-[#FF8A00]/5 border-[#FF8A00] text-[#FF8A00] shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300'}`}
                                        >
                                            Supplier
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#0A1A2F] hover:bg-[#162a44] text-white rounded-[20px] py-4 text-xs font-black uppercase tracking-[0.25em] transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                                <p className="text-sm text-slate-500 font-medium">
                                    Already a member?{' '}
                                    <Link href="/auth/login" className="text-primary font-black uppercase tracking-wider text-xs hover:underline ml-1">
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex justify-center items-center text-[#0A1A2F] font-black uppercase tracking-[0.2em] text-xs">Loading Atlantis...</div>}>
            <RegisterForm />
        </Suspense>
    );
}
