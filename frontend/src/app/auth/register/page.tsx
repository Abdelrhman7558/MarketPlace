'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, ChevronRight } from 'lucide-react';
import { useAuth } from '../../../lib/auth';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', role: 'customer' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#f0f0f0] flex flex-col">
            <div className="bg-white py-4 flex justify-center border-b border-[#e7e7e7]">
                <Link href="/" className="text-[28px] font-bold text-amz-dark hover:no-underline">
                    Bev<span className="text-amz-orange">Market</span>
                    <span className="text-[12px] text-amz-dark">.eg</span>
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center px-4 py-6">
                <div className="w-full max-w-[350px]">
                    <div className="bg-white border border-[#ddd] rounded-[4px] p-[26px]">
                        <h1 className="text-[28px] font-normal text-amz-text mb-1">Create account</h1>

                        {error && (
                            <div className="bg-white border border-[#cc0c39] rounded-[4px] p-3 mb-4 mt-3">
                                <div className="flex items-start gap-2">
                                    <span className="text-[#c40000] text-[20px] mt-[-2px]">!</span>
                                    <div>
                                        <p className="text-[13px] font-bold text-[#c40000]">There was a problem</p>
                                        <p className="text-[13px] text-amz-text">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleRegister} className="mt-4 space-y-3">
                            <div>
                                <label className="text-[13px] font-bold text-amz-text block mb-1">Your name</label>
                                <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="First and last name"
                                    className="w-full border border-[#888c8c] rounded-[3px] px-[7px] py-[3px] text-[13px] h-[31px] outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#c8f3fa]" />
                            </div>
                            <div>
                                <label className="text-[13px] font-bold text-amz-text block mb-1">Email</label>
                                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com"
                                    className="w-full border border-[#888c8c] rounded-[3px] px-[7px] py-[3px] text-[13px] h-[31px] outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#c8f3fa]" />
                            </div>
                            <div>
                                <label className="text-[13px] font-bold text-amz-text block mb-1">Phone (optional)</label>
                                <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+20 xxx xxx xxxx"
                                    className="w-full border border-[#888c8c] rounded-[3px] px-[7px] py-[3px] text-[13px] h-[31px] outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#c8f3fa]" />
                            </div>
                            <div>
                                <label className="text-[13px] font-bold text-amz-text block mb-1">Password</label>
                                <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="At least 6 characters"
                                    className="w-full border border-[#888c8c] rounded-[3px] px-[7px] py-[3px] text-[13px] h-[31px] outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#c8f3fa]" />
                                <p className="text-[11px] text-amz-text2 mt-1 flex items-center gap-1">
                                    <span className="text-amz-link">ⓘ</span> Passwords must be at least 6 characters.
                                </p>
                            </div>
                            <div>
                                <label className="text-[13px] font-bold text-amz-text block mb-1">Re-enter password</label>
                                <input type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)}
                                    className="w-full border border-[#888c8c] rounded-[3px] px-[7px] py-[3px] text-[13px] h-[31px] outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#c8f3fa]" />
                            </div>
                            <div>
                                <label className="text-[13px] font-bold text-amz-text block mb-1">Account Type</label>
                                <select value={form.role} onChange={e => update('role', e.target.value)}
                                    className="w-full border border-[#888c8c] rounded-[3px] px-[7px] py-[3px] text-[13px] h-[31px] outline-none cursor-pointer focus:border-[#e77600] focus:shadow-[0_0_0_3px_#c8f3fa]">
                                    <option value="customer">Customer</option>
                                    <option value="supplier">Supplier</option>
                                </select>
                            </div>
                            <button type="submit" disabled={loading}
                                className="w-full py-[6px] text-[13px] rounded-[3px] border border-[#a88734] cursor-pointer disabled:opacity-60 mt-2"
                                style={{ background: 'linear-gradient(to bottom, #f7dfa5, #f0c14b)' }}>
                                {loading ? 'Creating...' : 'Create your BevMarket account'}
                            </button>
                        </form>

                        <p className="text-[12px] text-amz-text mt-4 leading-[18px]">
                            By creating an account, you agree to BevMarket&apos;s{' '}
                            <span className="text-amz-link">Conditions of Use</span> and{' '}
                            <span className="text-amz-link">Privacy Notice</span>.
                        </p>

                        <div className="mt-5 pt-4 border-t border-[#e7e7e7]">
                            <p className="text-[13px] text-amz-text">
                                Already have an account?{' '}
                                <Link href="/auth/login" className="text-amz-link hover:text-amz-blue-hover hover:underline flex items-center gap-0.5 mt-1 inline-flex">
                                    Sign in <ChevronRight className="w-3 h-3" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-b from-transparent to-[#f0f0f0] pt-8 pb-4 text-center">
                <div className="flex items-center justify-center gap-4 text-[11px] text-amz-link mb-2">
                    <span className="hover:underline cursor-pointer">Conditions of Use</span>
                    <span className="hover:underline cursor-pointer">Privacy Notice</span>
                    <span className="hover:underline cursor-pointer">Help</span>
                </div>
                <p className="text-[11px] text-[#555]">© 2026, BevMarket.com, Inc. or its affiliates</p>
            </div>
        </div>
    );
}
