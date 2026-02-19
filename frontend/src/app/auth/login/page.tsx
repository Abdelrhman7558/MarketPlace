'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Zap, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) { setError('Please fill in all fields'); return; }
        setLoading(true);

        setTimeout(() => {
            // Admin redirect
            if (email === '7bd02025@gmail.com') {
                router.push('/dashboard/super-admin-7bd0');
            } else {
                router.push('/');
            }
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float animation-delay-500" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" />

                {/* Floating Icons */}
                <div className="absolute top-[10%] right-[20%] text-5xl animate-float opacity-10">🥤</div>
                <div className="absolute bottom-[15%] left-[15%] text-4xl animate-float animation-delay-300 opacity-10">⚡</div>
                <div className="absolute top-[60%] right-[10%] text-3xl animate-float animation-delay-700 opacity-10">💧</div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8 animate-fade-in-down">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-orange to-brand-red rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-glow-orange hover:scale-110 transition-transform duration-300">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-white text-3xl font-extrabold">Welcome Back</h1>
                    <p className="text-text-muted text-sm mt-2">Sign in to your BevMarket account</p>
                </div>

                {/* Card */}
                <div className="glass-card p-8 animate-fade-in-up animation-delay-200">
                    <form onSubmit={handleLogin}>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-5 animate-fade-in">
                                {error}
                            </div>
                        )}

                        <div className="mb-5">
                            <label className="text-gray-400 text-sm font-medium block mb-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-brand-orange transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="auth-input pl-11"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-gray-400 text-sm font-medium block mb-2">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-brand-orange transition-colors" />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="auth-input pl-11 pr-11"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                                >
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
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
                                    Sign In
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-7">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dark-border" /></div>
                        <div className="relative text-center"><span className="bg-dark-card px-4 text-text-muted text-xs">or</span></div>
                    </div>

                    <p className="text-center text-gray-400 text-sm">
                        Don&apos;t have an account?{' '}
                        <Link href="/auth/register" className="text-brand-orange hover:text-brand-orange-hover font-bold transition-colors">
                            Create Account
                        </Link>
                    </p>
                </div>

                {/* Admin hint */}
                <p className="text-center text-text-muted text-xs mt-6 animate-fade-in animation-delay-500">
                    Admin? Use <span className="text-brand-orange font-mono">7bd02025@gmail.com</span>
                </p>
            </div>
        </div>
    );
}
