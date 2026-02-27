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

    const inputClass = "w-full bg-white border border-[#888] rounded-md px-3 pl-10 py-2.5 text-[#0F1111] text-sm outline-none focus:border-[#E77600] focus:shadow-[0_0_0_3px_rgba(228,121,17,0.5)] transition-all placeholder:text-gray-400";
    const labelClass = "text-xs font-bold text-[#0F1111] ml-0.5";
    const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]";

    return (
        <div className="min-h-screen bg-[#EAEDED] flex items-center justify-center p-6">
            <div className="w-full max-w-[500px]">
                {/* Logo */}
                <div className="text-center mb-5">
                    <Link href="/" className="inline-block">
                        <span className="font-black text-3xl tracking-tighter text-[#0F1111]">
                            Market<span className="text-[#FF9900]">Place</span>
                        </span>
                    </Link>
                </div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-[#DDD] rounded-lg p-6 shadow-sm"
                >
                    {isSuccess ? (
                        <div className="flex flex-col items-center text-center py-8 space-y-4">
                            <div className="w-16 h-16 rounded-full bg-[#067D62]/10 border-2 border-[#067D62]/20 flex items-center justify-center">
                                <CheckCircle2 size={36} className="text-[#067D62]" />
                            </div>
                            <h2 className="text-xl font-bold text-[#0F1111]">Application Submitted</h2>
                            <p className="text-[#555] text-sm max-w-sm leading-relaxed">
                                Thank you for registering with MarketPlace. Your account is currently <strong className="text-[#0F1111]">pending admin review.</strong>
                            </p>
                            <div className="p-4 bg-[#FEF8E8] border border-[#F0C14B] rounded-md w-full text-left space-y-2 text-sm text-[#0F1111]">
                                <p className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" /> We will verify your business details.</p>
                                <p className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" /> You will receive an email upon approval.</p>
                            </div>
                            <Link href="/" className="mt-4 inline-block text-sm text-[#007185] hover:text-[#C45500] hover:underline font-medium">
                                Return to Home
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold text-[#0F1111] mb-1">Create account</h1>
                            <p className="text-sm text-[#555] mb-5">Join the world's most trusted B2B network.</p>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-[#FCF4F4] border border-[#C40000] rounded-md p-3 mb-4"
                                >
                                    <p className="text-[#C40000] text-sm font-medium">{error}</p>
                                </motion.div>
                            )}

                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="space-y-1">
                                    <label className={labelClass}>Your name</label>
                                    <div className="relative">
                                        <User className={iconClass} />
                                        <input className={inputClass} placeholder="First and last name" value={form.name} onChange={e => update('name', e.target.value)} />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClass}>Email</label>
                                    <div className="relative">
                                        <Mail className={iconClass} />
                                        <input className={inputClass} placeholder="name@company.com" value={form.email} disabled={!!inviteEmail} onChange={e => update('email', e.target.value)} />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClass}>Phone number</label>
                                    <div className="relative">
                                        <Phone className={iconClass} />
                                        <input className={inputClass} placeholder="+1 234 567 890" value={form.phone} onChange={e => update('phone', e.target.value)} />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClass}>Company name <span className="text-[#888] font-normal">(optional)</span></label>
                                    <div className="relative">
                                        <Building2 className={iconClass} />
                                        <input className={inputClass} placeholder="e.g. Acme Corp" value={form.companyName} onChange={e => update('companyName', e.target.value)} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className={labelClass}>Website <span className="text-[#888] font-normal">(optional)</span></label>
                                        <div className="relative">
                                            <Globe className={iconClass} />
                                            <input className={inputClass} placeholder="https://..." value={form.website} onChange={e => update('website', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className={labelClass}>Social links <span className="text-[#888] font-normal">(optional)</span></label>
                                        <div className="relative">
                                            <LinkIcon className={iconClass} />
                                            <input className={inputClass} placeholder="LinkedIn, etc." value={form.socialLinks} onChange={e => update('socialLinks', e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClass}>Password</label>
                                    <div className="relative">
                                        <Lock className={iconClass} />
                                        <input
                                            type={showPass ? 'text' : 'password'}
                                            className={inputClass + ' pr-10'}
                                            placeholder="At least 8 characters"
                                            value={form.password}
                                            onChange={e => update('password', e.target.value)}
                                        />
                                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#0F1111]">
                                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {[
                                            { label: '8+ chars', met: form.password.length >= 8 },
                                            { label: 'A-Z', met: /[A-Z]/.test(form.password) },
                                            { label: 'a-z', met: /[a-z]/.test(form.password) },
                                            { label: '0-9', met: /[0-9]/.test(form.password) },
                                            { label: 'Symbol', met: /[^A-Za-z0-9]/.test(form.password) }
                                        ].map((req, idx) => (
                                            <span key={idx} className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${req.met ? 'bg-[#067D62]/10 text-[#067D62] border-[#067D62]/20' : 'bg-[#F3F3F3] text-[#888] border-[#DDD]'}`}>
                                                {req.met && <CheckCircle2 size={9} className="inline mr-0.5" />}
                                                {req.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClass}>Re-enter password</label>
                                    <div className="relative">
                                        <Lock className={iconClass} />
                                        <input type={showPass ? 'text' : 'password'} className={inputClass} placeholder="••••••••" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className={labelClass}>Business role</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => update('role', 'customer')}
                                            className={`py-2.5 rounded-md text-sm font-bold border transition-all ${form.role === 'customer' ? 'bg-[#FEF8E8] border-[#FF9900] text-[#0F1111] shadow-sm' : 'bg-white border-[#DDD] text-[#555] hover:border-[#888]'}`}
                                        >
                                            Retail Buyer
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => update('role', 'supplier')}
                                            className={`py-2.5 rounded-md text-sm font-bold border transition-all ${form.role === 'supplier' ? 'bg-[#FEF8E8] border-[#FF9900] text-[#0F1111] shadow-sm' : 'bg-white border-[#DDD] text-[#555] hover:border-[#888]'}`}
                                        >
                                            Wholesale Supplier
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-b from-[#F7DFA5] to-[#F0C14B] border border-[#A88734] rounded-md py-2.5 text-sm font-bold text-[#0F1111] hover:from-[#F5D78E] hover:to-[#EEB933] disabled:opacity-50 transition-all shadow-sm mt-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-[#0F1111]/30 border-t-[#0F1111] rounded-full animate-spin mx-auto" />
                                    ) : (
                                        'Create your MarketPlace account'
                                    )}
                                </button>
                            </form>

                            <div className="mt-5 pt-4 border-t border-[#DDD] text-center">
                                <p className="text-sm text-[#555]">
                                    Already have an account?{' '}
                                    <Link href="/auth/login" className="text-[#007185] hover:text-[#C45500] hover:underline font-medium">
                                        Sign in
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
        <Suspense fallback={<div className="min-h-screen bg-[#EAEDED] flex justify-center items-center text-[#0F1111]">Loading...</div>}>
            <RegisterForm />
        </Suspense>
    );
}
