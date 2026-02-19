'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Package } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-12 relative">
            {/* Background blobs */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative z-10 animate-fade-in-up">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-brand-orange to-brand-red rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Package className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-white text-2xl font-bold">مرحبا بك</h1>
                    <p className="text-text-muted text-sm mt-1">سجل دخولك للمتابعة</p>
                </div>

                {/* Card */}
                <div className="glass-card p-8">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <label className="text-text-secondary text-sm font-medium block mb-2">البريد الإلكتروني</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@example.com"
                                    className="auth-input pl-10"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-text-secondary text-sm font-medium block mb-2">كلمة المرور</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="auth-input pl-10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
                                >
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full py-3 text-base">
                            تسجيل الدخول
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dark-border" /></div>
                        <div className="relative text-center"><span className="bg-dark-surface px-3 text-text-muted text-xs">أو</span></div>
                    </div>

                    <p className="text-center text-text-secondary text-sm">
                        ما عندك حساب؟{' '}
                        <Link href="/auth/register" className="text-brand-orange hover:text-brand-orange-hover font-medium">
                            سجل الآن
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
