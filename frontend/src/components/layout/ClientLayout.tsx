'use client';

import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, isLoggedIn } = useAuth();
    const router = useRouter();

    const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin') || pathname?.startsWith('/supplier');
    const isHome = pathname === '/';

    // Enforcement logic
    useEffect(() => {
        if (isLoggedIn && user?.status === 'PENDING_APPROVAL' && isDashboard) {
            router.push('/auth/pending');
        }
    }, [user, isLoggedIn, isDashboard, router]);

    return (
        <div className="flex flex-col min-h-screen">
            {(!isDashboard && !isHome) && <Navbar />}
            <main className={`flex-grow ${(!isDashboard && !isHome) ? 'pt-20' : ''}`}>
                {children}
            </main>
            {(!isDashboard && !isHome) && <Footer />}
        </div>
    );
}
