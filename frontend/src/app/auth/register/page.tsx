'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-4">
            {/* Logo */}
            <Link href="/" className="mb-5">
                <span className="text-[#0f1111] font-bold text-3xl">market</span>
                <span className="text-[#ff9900] font-bold text-3xl">.eg</span>
            </Link>

            {/* Register Card */}
            <div className="amz-auth-card">
                <h1>Create account</h1>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-3">
                        <label>Your name</label>
                        <input
                            type="text"
                            placeholder="First and last name"
                            value={form.name}
                            onChange={(e) => update('name', e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => update('email', e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="At least 6 characters"
                            value={form.password}
                            onChange={(e) => update('password', e.target.value)}
                        />
                        <p className="text-xs text-[#2b2b2b] mt-1 flex items-center gap-1">
                            <span className="text-[#007185]">ⓘ</span> Passwords must be at least 6 characters.
                        </p>
                    </div>

                    <div className="mb-4">
                        <label>Re-enter password</label>
                        <input
                            type="password"
                            value={form.confirmPassword}
                            onChange={(e) => update('confirmPassword', e.target.value)}
                        />
                    </div>

                    <button type="submit" className="amz-btn-primary w-full py-2 text-sm mb-4">
                        Continue
                    </button>

                    <p className="text-xs text-[#111] leading-5 mb-4">
                        By creating an account, you agree to MarketPlace&apos;s{' '}
                        <a href="#" className="amz-link">Conditions of Use</a> and{' '}
                        <a href="#" className="amz-link">Privacy Notice</a>.
                    </p>

                    <div className="border-t pt-3">
                        <p className="text-[13px] text-[#111]">
                            Already have an account?{' '}
                            <Link href="/auth/login" className="amz-link">Sign in ▸</Link>
                        </p>
                    </div>

                    <div className="mt-3 pt-3 border-t">
                        <p className="text-[13px] text-[#111]">
                            Buying for work?{' '}
                            <a href="#" className="amz-link">Create a free business account ▸</a>
                        </p>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-[#e7e7e7] w-full text-center">
                <div className="flex justify-center gap-6 mb-2">
                    <a href="#" className="amz-link">Conditions of Use</a>
                    <a href="#" className="amz-link">Privacy Notice</a>
                    <a href="#" className="amz-link">Help</a>
                </div>
                <p className="text-[11px] text-[#555]">© 1996-{new Date().getFullYear()}, MarketPlace.eg, Inc. or its affiliates</p>
            </div>
        </div>
    );
}
