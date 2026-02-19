'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, Zap, ArrowRight, Check } from 'lucide-react';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'customer' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

    const passwordStrength = () => {
        const p = form.password;
        if (!p) return 0;
        let s = 0;
        if (p.length >= 6) s++;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    };

    const strengthLevel = passwordStrength();
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-400', 'bg-green-500'];
    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!form.name || !form.email || !form.password) { setError('Please fill in all required fields'); return; }
        if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
        setLoading(true);
        setTimeout(() => {
            router.push('/auth/login');
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-10 left-10 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl animate-float animation-delay-500" />
                <div className="absolute top-[20%] left-[5%] text-4xl animate-float opacity-10">🥤</div>
                <div className="absolute bottom-[10%] right-[10%] text-5xl animate-float animation-delay-300 opacity-10">📦</div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8 animate-fade-in-down">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-orange to-brand-red rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-glow-orange hover:scale-110 transition-transform duration-300">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-white text-3xl font-extrabold">Create Account</h1>
                    <p className="text-text-muted text-sm mt-2">Join the #1 beverage marketplace</p>
                </div>

                {/* Card */}
                <div className="glass-card p-8 animate-fade-in-up animation-delay-200">
                    <form onSubmit={handleRegister}>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-5 animate-fade-in">
                                {error}
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="text-gray-400 text-sm font-medium block mb-2">Full Name *</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-brand-orange transition-colors" />
                                <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" className="auth-input pl-11" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-400 text-sm font-medium block mb-2">Email Address *</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-brand-orange transition-colors" />
                                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@example.com" className="auth-input pl-11" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-400 text-sm font-medium block mb-2">Phone Number</label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-brand-orange transition-colors" />
                                <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+20 xxxxxxxxx" className="auth-input pl-11" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-400 text-sm font-medium block mb-2">Password *</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-brand-orange transition-colors" />
                                <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="Min 6 characters" className="auth-input pl-11" />
                            </div>
                            {/* Strength Bar */}
                            {form.password && (
                                <div className="mt-2 animate-fade-in">
                                    <div className="flex gap-1 mb-1">
                                        {[0, 1, 2, 3, 4].map(i => (
                                            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i < strengthLevel ? strengthColors[strengthLevel - 1] : 'bg-dark-border'}`} />
                                        ))}
                                    </div>
                                    <span className={`text-[10px] font-medium ${strengthLevel <= 2 ? 'text-red-400' : 'text-green-400'}`}>
                                        {strengthLabels[strengthLevel - 1] || ''}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Role Selector */}
                        <div className="mb-6">
                            <label className="text-gray-400 text-sm font-medium block mb-2">Account Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { value: 'customer', label: 'Customer', emoji: '🛒' },
                                    { value: 'supplier', label: 'Supplier', emoji: '📦' },
                                ].map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => update('role', opt.value)}
                                        className={`py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 border flex items-center justify-center gap-2 ${form.role === opt.value
                                            ? 'bg-brand-orange/15 border-brand-orange text-brand-orange shadow-glow-orange/20'
                                            : 'bg-dark-bg border-dark-border text-gray-400 hover:border-dark-border-light'
                                            }`}
                                    >
                                        <span className="text-lg">{opt.emoji}</span>
                                        {opt.label}
                                        {form.role === opt.value && <Check className="w-4 h-4" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-gray-400 text-sm mt-6">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-brand-orange hover:text-brand-orange-hover font-bold transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
