'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, Phone, Package } from 'lucide-react';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'customer' });

    const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-12 relative">
            <div className="absolute top-10 right-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-brand-red/10 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative z-10 animate-fade-in-up">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-brand-orange to-brand-red rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Package className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-white text-2xl font-bold">إنشاء حساب جديد</h1>
                    <p className="text-text-muted text-sm mt-1">انضم لأكبر marketplace للمشروبات</p>
                </div>

                {/* Card */}
                <div className="glass-card p-8">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <label className="text-text-secondary text-sm font-medium block mb-2">الاسم</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="اسمك الكامل" className="auth-input pl-10" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-text-secondary text-sm font-medium block mb-2">البريد الإلكتروني</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="email@example.com" className="auth-input pl-10" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-text-secondary text-sm font-medium block mb-2">رقم الهاتف</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="01xxxxxxxxx" className="auth-input pl-10" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-text-secondary text-sm font-medium block mb-2">كلمة المرور</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="6 أحرف على الأقل" className="auth-input pl-10" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-text-secondary text-sm font-medium block mb-2">نوع الحساب</label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { value: 'customer', label: '🛒 عميل' },
                                    { value: 'supplier', label: '📦 مورد' },
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => update('role', opt.value)}
                                        className={`py-3 rounded-xl text-sm font-medium transition-all border ${form.role === opt.value
                                                ? 'bg-brand-orange/10 border-brand-orange text-brand-orange'
                                                : 'bg-dark-bg border-dark-border text-text-secondary hover:border-dark-border-light'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full py-3 text-base">
                            إنشاء الحساب
                        </button>
                    </form>

                    <p className="text-center text-text-secondary text-sm mt-6">
                        عندك حساب بالفعل؟{' '}
                        <Link href="/auth/login" className="text-brand-orange hover:text-brand-orange-hover font-medium">
                            سجل الدخول
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
