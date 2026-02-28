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
                    setError('Unable to reach the registration server.');
                }
                setLoading(false);
                return;
            }
            setIsSuccess(true);
            setLoading(false);
        };
        submitRegister();
    };

    const inputClass = "w-full bg-slate-50 border-2 border-slate-50 rounded-[20px] px-6 py-4 text-[#0A1A2F] text-sm font-bold outline-none focus:bg-white focus:border-[#FF8A00]/30 focus:shadow-[0_0_0_8px_rgba(255,138,0,0.05)] transition-all placeholder:text-slate-300";
    const labelClass = "text-[10px] font-black uppercase tracking-[0.2em] text-[#0A1A2F]/40 ml-2";

    return (
        <div className="min-h-screen bg-white flex overflow-hidden font-sans">
            {/* Left Side: Onboarding Content */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex lg:w-[40%] relative bg-[#0A1A2F] items-center justify-center p-16 overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FF8A00]/10 via-transparent to-blue-500/5" />

                <div className="relative z-10 space-y-12">
                    <Link href="/" className="inline-block mb-12">
                        <span className="font-heading font-black text-4xl tracking-tighter text-white">
                            Atlan<span className="text-[#FF8A00]">tis</span>
                        </span>
                    </Link>

                    <div className="space-y-6">
                        <h2 className="text-4xl font-black text-white leading-tight">Scale Your <span className="text-[#FF8A00]">Distribution</span> Globally.</h2>
                        <p className="text-[#B0B0C8] text-lg font-medium leading-relaxed">Join 500+ verified enterprise partners sourcing premium inventory through our secure B2B framework.</p>
                    </div>

                    <div className="space-y-8 pt-12 border-t border-white/10">
                        {[
                            { title: 'Verified Profiles', desc: 'Secure KYC validation for every partner.' },
                            { title: 'Smart Logistics', desc: 'Automated bulk shipping and warehousing.' },
                            { title: 'Net-Terms Credit', desc: 'Flexible financing for scale-up orders.' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] mt-2.5 shrink-0 shadow-[0_0_10px_#FF8A00]" />
                                <div>
                                    <h4 className="text-white font-black text-xs uppercase tracking-widest mb-1">{item.title}</h4>
                                    <p className="text-[#6B6B8D] text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Right Side: Form Panel */}
            <div className="w-full lg:w-[60%] flex items-center justify-center p-8 md:p-12 lg:p-20 bg-[#F8FAFC] overflow-y-auto hide-scrollbar">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-2xl"
                >
                    {isSuccess ? (
                        <div className="flex flex-col items-center text-center py-20 space-y-8">
                            <div className="w-24 h-24 rounded-[32px] bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                                <CheckCircle2 size={48} className="text-white" />
                            </div>
                            <div className="space-y-3">
                                <h1 className="text-4xl font-black text-[#0A1A2F] tracking-tight">Onboarding Initiated.</h1>
                                <p className="text-[#64748B] text-lg font-medium">Your enterprise profile is now under priority review.</p>
                            </div>
                            <div className="p-10 bg-white border border-slate-100 rounded-[40px] w-full text-left space-y-6 shadow-xl shadow-slate-200/50">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#0A1A2F]/5 flex items-center justify-center shrink-0">
                                        <ShieldCheck size={24} className="text-[#0A1A2F]" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-xs uppercase tracking-[0.2em] text-[#0A1A2F]">Identity Validation</h4>
                                        <p className="text-sm text-[#64748B] font-medium mt-2 leading-relaxed">Our compliance team is verifying your business credentials and tax documentation.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#FF8A00]/10 flex items-center justify-center shrink-0">
                                        <Mail size={24} className="text-[#FF8A00]" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-xs uppercase tracking-[0.2em] text-[#FF8A00]">Approval Protocol</h4>
                                        <p className="text-sm text-[#64748B] font-medium mt-2 leading-relaxed">You will receive an activation encrypted link once the review phase is completed.</p>
                                    </div>
                                </div>
                            </div>
                            <Link href="/" className="h-16 px-12 bg-[#0A1A2F] text-white text-xs font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-[#162a44] transition-all flex items-center shadow-xl">
                                Return to Atlantis
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="mb-12">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-1 w-12 bg-[#FF8A00] rounded-full" />
                                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Onboarding Flow</span>
                                </div>
                                <h1 className="text-4xl font-black text-[#0A1A2F] tracking-tight">Register Business.</h1>
                                <p className="text-[#64748B] font-medium mt-2">Professional onboarding for verified B2B partners.</p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-10 text-red-700 text-sm font-bold"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <form onSubmit={handleRegister} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className={labelClass}>Full Name</label>
                                        <input className={inputClass} placeholder="Authorized Signatory" value={form.name} onChange={e => update('name', e.target.value)} />
                                    </div>
                                    <div className="space-y-3">
                                        <label className={labelClass}>Work Email</label>
                                        <input className={inputClass} placeholder="business@company.com" value={form.email} disabled={!!inviteEmail} onChange={e => update('email', e.target.value)} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className={labelClass}>Phone Context</label>
                                        <input className={inputClass} placeholder="+20..." value={form.phone} onChange={e => update('phone', e.target.value)} />
                                    </div>
                                    <div className="space-y-3">
                                        <label className={labelClass}>Legal Entity</label>
                                        <input className={inputClass} placeholder="Company Name" value={form.companyName} onChange={e => update('companyName', e.target.value)} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className={labelClass}>Corporate URL</label>
                                        <input className={inputClass} placeholder="https://..." value={form.website} onChange={e => update('website', e.target.value)} />
                                    </div>
                                    <div className="space-y-3">
                                        <label className={labelClass}>Linked Services</label>
                                        <input className={inputClass} placeholder="LinkedIn / Portfolio" value={form.socialLinks} onChange={e => update('socialLinks', e.target.value)} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className={labelClass}>Account Security</label>
                                    <div className="relative group">
                                        <input
                                            type={showPass ? 'text' : 'password'}
                                            className={inputClass + ' pr-16'}
                                            placeholder="Complexity-compliant password"
                                            value={form.password}
                                            onChange={e => update('password', e.target.value)}
                                        />
                                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#0A1A2F] transition-colors">
                                            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { label: '8+ Characters', met: form.password.length >= 8 },
                                            { label: 'Uppercase & Lowercase', met: /[A-Z]/.test(form.password) && /[a-z]/.test(form.password) },
                                            { label: 'Global Symbol', met: /[0-9]/.test(form.password) || /[^A-Za-z0-9]/.test(form.password) }
                                        ].map((req, idx) => (
                                            <span key={idx} className={`text-[9px] font-black uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${req.met ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                {req.met && <CheckCircle2 size={10} className="inline mr-1.5 -mt-0.5" />}
                                                {req.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className={labelClass}>Platform Operation Mode</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => update('role', 'customer')}
                                            className={`h-20 rounded-[24px] text-xs font-black uppercase tracking-widest border-2 transition-all flex flex-col items-center justify-center gap-1 ${form.role === 'customer' ? 'bg-[#0A1A2F] border-[#0A1A2F] text-white shadow-xl shadow-[#0A1A2F]/20' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                                        >
                                            <span className="text-lg">📦</span>
                                            Procurement Layer (Buyer)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => update('role', 'supplier')}
                                            className={`h-20 rounded-[24px] text-xs font-black uppercase tracking-widest border-2 transition-all flex flex-col items-center justify-center gap-1 ${form.role === 'supplier' ? 'bg-[#FF8A00] border-[#FF8A00] text-white shadow-xl shadow-[#FF8A00]/20' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                                        >
                                            <span className="text-lg">🏢</span>
                                            Provisioning Layer (Supplier)
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-20 bg-[#0A1A2F] hover:bg-[#162a44] text-white rounded-[24px] font-black uppercase tracking-[0.4em] text-xs transition-all shadow-2xl shadow-[#0A1A2F]/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 mt-8 group/btn relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                    {loading ? (
                                        <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Create Profile</span>
                                            <ArrowRight size={20} className="transition-transform group-hover/btn:translate-x-1" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-16 pt-8 border-t border-slate-100 text-center">
                                <p className="text-sm text-[#64748B] font-medium">
                                    Registered Partner?{' '}
                                    <Link href="/auth/login" className="text-[#FF8A00] font-black uppercase tracking-widest text-xs hover:underline ml-2">
                                        Authenticate
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
        <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex justify-center items-center text-[#0A1A2F] font-black uppercase tracking-[0.4em] text-xs">Synchronizing Atlantis Node...</div>}>
            <RegisterForm />
        </Suspense>
    );
}
