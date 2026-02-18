'use client';

import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl font-bold">
                Welcome to <a className="text-blue-600" href="#">B2B Marketplace!</a>
            </h1>
            <p className="mt-3 text-2xl">
                Get started by visiting the <Link href="/dashboard/super-admin-7bd0" className="text-blue-600 underline">Manager Dashboard</Link>
            </p>
        </div>
    )
}
