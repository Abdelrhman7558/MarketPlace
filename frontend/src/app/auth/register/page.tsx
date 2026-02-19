'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, ChevronRight } from 'lucide-react';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', role: 'customer' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!form.name || !form.email || !form.password) { setError('Please fill in all required fields'); return; }
        if (form.password.length < 6) { setError('Passwords must be at least 6 characters.'); return; }
        if (form.password !== form.confirmPassword) { setError('Passwords must match.'); return; }
        setLoading(true);
        setTimeout(() => {
            router.push('/auth/login');
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#f0f0f0] flex flex-col">
            {/* Top bar */}
            <div className="bg-white py-4 flex justify-center border-b border-[#e7e7e7]">
                <Link href="/" className="text-[28px] font-bold text-amz-dark hover:no-underline">
                    Bev<span className="text-amz-orange">Market</span>
                    <span className="text-[12px] text-amz-dark">.eg</span>
                </Link>
            </div>

            {/* Register Form */}
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

                        <form onSubmit={handleRegister} className="mt-4">
                            <div className="mb-3">
                                <label className="text-[13px] font-bold text-amz-text block mb-1">Your name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={e => update('name', e.target.value)}
                                    placeholder="First and last name"
                                    className="w-full border border-[#888c8c] rounded-[3px] px-[7px] py-[3px] text-[13px] h-[31px] outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#c8f3fa]"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="text-[13px] font-bold text-amz-text block mb-1">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={e => update('email', e.target.value)}
                                    className="w-full border border-[#888c8c] rounded-[3px] px-[7px] py-[3px] text-[13px] h-[31px] outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#c8f3fa]"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="text-[13px] font-bold text-amz-text block mb-1">Mobile number (optional)</label>
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={e => update('phone', e.target.value)}
                                    placeholder="+20 xxx xxx xxxx"
                                    className="w-full border border-[#888c8c] rounded-[3px] px-[7px] py-[3px] text-[13px] h-[31px] outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#c8f3fa]"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="text-[13px] font-bold text-amz-text block mb-1">Password</label>
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={e => update('password', e.target.value)}
                                    placeholder="At least 6 characters"
                                    className="w-full border border-[#888c8c] rounded-[3px] px-[7px] py-[3px] text-[13px] h-[31px] outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#c8f3fa]"
                                />
                                <p className="text-[12px] text-amz-text2 mt-1 flex items-center gap-1">
                                    <span className="text-[11px]">ⓘ</span> Passwords must be at least 6 characters.
                                </p>
                            </div>

                            <div className="mb-4">
                                <label className="text-[13px] font-bold text-amz-text block mb-1">Re-enter password</label>
                                <input
                                    type="password"
                                    value={form.confirmPassword}
                                    onChange={e => update('confirmPassword', e.target.value)}
                                    className="w-full border border-[#888c8c] rounded-[3px] px-[7px] py-[3px] text-[13px] h-[31px] outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#c8f3fa]"
                                />
                            </div>

                            {/* Account Type */}
                            <div className="mb-5">
                                <label className="text-[13px] font-bold text-amz-text block mb-2">Account type</label>
                                <div className="space-y-2">
                                    {[
                                        { value: 'customer', label: 'Customer', desc: 'Buy products at wholesale prices' },
                                        { value: 'supplier', label: 'Supplier', desc: 'Sell your products on BevMarket' },
                                    ].map(opt => (
                                        <label
                                            key={opt.value}
                                            className={`flex items-start gap-2 p-3 border rounded-[4px] cursor-pointer transition-colors ${form.role === opt.value
                                                    ? 'border-[#e77600] bg-[#fef8f2]'
                                                    : 'border-[#d5d9d9] hover:border-[#a6a6a6]'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="role"
                                                value={opt.value}
                                                checked={form.role === opt.value}
                                                onChange={() => update('role', opt.value)}
                                                className="mt-0.5 accent-[#e77600]"
                                            />
                                            <div>
                                                <span className="text-[13px] font-bold text-amz-text">{opt.label}</span>
                                                <p className="text-[12px] text-amz-text2">{opt.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-[6px] text-[13px] rounded-[3px] border border-[#a88734] cursor-pointer disabled:opacity-60"
                                style={{ background: 'linear-gradient(to bottom, #f7dfa5, #f0c14b)' }}
                            >
                                {loading ? 'Creating account...' : 'Create your BevMarket account'}
                            </button>
                        </form>

                        <p className="text-[12px] text-amz-text mt-4 leading-[18px]">
                            By creating an account, you agree to BevMarket&apos;s{' '}
                            <a href="#" className="text-amz-link hover:text-amz-blue-hover hover:underline">Conditions of Use</a>{' '}
                            and{' '}
                            <a href="#" className="text-amz-link hover:text-amz-blue-hover hover:underline">Privacy Notice</a>.
                        </p>

                        <div className="mt-6 pt-4 border-t border-[#e7e7e7]">
                            <p className="text-[13px] text-amz-text">
                                Already have an account?{' '}
                                <Link href="/auth/login" className="text-amz-link hover:text-amz-blue-hover hover:underline">
                                    Sign in
                                    <ChevronRight className="w-3 h-3 inline ml-0.5" />
                                </Link>
                            </p>
                        </div>
                    </div>
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
