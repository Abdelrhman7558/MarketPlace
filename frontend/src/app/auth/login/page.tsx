'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-4">
            {/* Logo */}
            <Link href="/" className="mb-5">
                <span className="text-[#0f1111] font-bold text-3xl">market</span>
                <span className="text-[#ff9900] font-bold text-3xl">.eg</span>
            </Link>

            {/* Login Card */}
            <div className="amz-auth-card">
                <h1>Sign in</h1>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label>Email or mobile phone number</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="amz-btn-primary w-full py-2 text-sm mb-4">
                        Continue
                    </button>

                    <p className="text-xs text-[#111] leading-5 mb-4">
                        By continuing, you agree to MarketPlace&apos;s{' '}
                        <a href="#" className="amz-link">Conditions of Use</a> and{' '}
                        <a href="#" className="amz-link">Privacy Notice</a>.
                    </p>

                    <details className="mb-4">
                        <summary className="text-xs text-[#111] cursor-pointer flex items-center gap-1">
                            <span className="text-[#2b2b2b]">▶</span> Need help?
                        </summary>
                        <div className="mt-2 pl-4">
                            <a href="#" className="amz-link block mb-1">Forgot your password?</a>
                            <a href="#" className="amz-link block">Other issues with Sign-In</a>
                        </div>
                    </details>
                </form>
            </div>

            {/* Divider */}
            <div className="max-w-[350px] w-full mt-6 mb-4 relative">
                <div className="amz-divider" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-[#767676]">
                    New to MarketPlace?
                </span>
            </div>

            {/* Create Account */}
            <Link
                href="/auth/register"
                className="max-w-[350px] w-full block text-center border border-[#a2a6ac] rounded-[3px] py-2 text-[13px] text-[#0f1111] bg-gradient-to-b from-[#f7f8fa] to-[#e7e9ec] hover:from-[#e7e9ec] hover:to-[#d9dce1] transition-all"
            >
                Create your MarketPlace account
            </Link>

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
