'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

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
            if (email === '7bd02025@gmail.com') {
                router.push('/dashboard/super-admin-7bd0');
            } else {
                router.push('/');
            }
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#f0f0f0] flex flex-col">
            {/* Amazon-style top bar */}
            <div className="bg-white py-4 flex justify-center">
                <Link href="/" className="text-[28px] font-bold text-amz-dark hover:no-underline">
                    Bev<span className="text-amz-orange">Market</span>
                    <span className="text-[12px] text-amz-dark">.eg</span>
                </Link>
            </div>

            {/* Login Form */}
            <div className="flex-1 flex items-center justify-center px-4 py-6">
                <div className="w-full max-w-[350px]">
                    <div className="bg-white border border-[#ddd] rounded-[4px] p-[26px]">
                        <h1 className="text-[28px] font-normal text-amz-text mb-5">Sign in</h1>

                        {error && (
                            <div className="bg-white border border-[#cc0c39] rounded-[4px] p-3 mb-4">
                                <div className="flex items-start gap-2">
                                    <span className="text-[#c40000] text-[20px] mt-[-2px]">!</span>
                                    <div>
                                        <p className="text-[13px] font-bold text-[#c40000]">There was a problem</p>
                                        <p className="text-[13px] text-amz-text">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="text-[13px] font-bold text-amz-text block mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-[#888c8c] rounded-[3px] px-[7px] py-[3px] text-[13px] h-[31px] outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#c8f3fa]"
                                />
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-1">
                                    <label className="text-[13px] font-bold text-amz-text">Password</label>
                                    <a href="#" className="text-[13px] text-amz-link hover:text-amz-blue-hover hover:underline">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full border border-[#888c8c] rounded-[3px] px-[7px] py-[3px] text-[13px] h-[31px] outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#c8f3fa] pr-8"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-amz-text2"
                                    >
                                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-[6px] text-[13px] rounded-[3px] border border-[#a88734] cursor-pointer disabled:opacity-60"
                                style={{ background: 'linear-gradient(to bottom, #f7dfa5, #f0c14b)' }}
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>

                        <p className="text-[12px] text-amz-text mt-4 leading-[18px]">
                            By continuing, you agree to BevMarket&apos;s{' '}
                            <a href="#" className="text-amz-link hover:text-amz-blue-hover hover:underline">Conditions of Use</a>{' '}
                            and{' '}
                            <a href="#" className="text-amz-link hover:text-amz-blue-hover hover:underline">Privacy Notice</a>.
                        </p>

                        {/* Admin hint */}
                        <div className="mt-4 pt-4 border-t border-[#e7e7e7]">
                            <p className="text-[11px] text-amz-text2 text-center">
                                Admin? Use <span className="font-mono text-amz-link">7bd02025@gmail.com</span>
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative my-5">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#e7e7e7]" />
                        </div>
                        <div className="relative text-center">
                            <span className="bg-[#f0f0f0] px-2 text-[12px] text-[#767676]">New to BevMarket?</span>
                        </div>
                    </div>

                    {/* Create Account Button */}
                    <Link
                        href="/auth/register"
                        className="block w-full text-center py-[6px] text-[13px] rounded-[3px] border border-[#adb1b8] hover:no-underline text-amz-text"
                        style={{ background: 'linear-gradient(to bottom, #f7f8fa, #e7e9ec)' }}
                    >
                        Create your BevMarket account
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-b from-transparent to-[#f0f0f0] pt-8 pb-4 text-center">
                <div className="flex items-center justify-center gap-4 text-[11px] text-amz-link mb-2">
                    <a href="#" className="hover:text-amz-blue-hover hover:underline">Conditions of Use</a>
                    <a href="#" className="hover:text-amz-blue-hover hover:underline">Privacy Notice</a>
                    <a href="#" className="hover:text-amz-blue-hover hover:underline">Help</a>
                </div>
                <p className="text-[11px] text-[#555]">© 2026, BevMarket.com, Inc. or its affiliates</p>
            </div>
        </div>
    );
}
