'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Register</h1>
            <p className="mt-4">
                Already have an account? <Link href="/api/auth/signin" className="text-blue-600 underline">Sign in</Link>
            </p>
        </div>
    );
}
