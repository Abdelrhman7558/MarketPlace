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

    const isAuthPage = pathname?.startsWith('/auth');
    const isPendingPage = pathname === '/auth/pending';
    const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin') || pathname?.startsWith('/supplier');
    const isHome = pathname === '/';

    // Enforcement logic: Block unapproved users from everything except the pending page and auth flows
    useEffect(() => {
        if (isLoggedIn && user?.status === 'PENDING_APPROVAL') {
            if (!isPendingPage && pathname !== '/auth/login' && pathname !== '/auth/register') {
                router.push('/auth/pending');
            }
        }
    }, [user, isLoggedIn, pathname, isPendingPage, router]);

    return (
        <div className="flex flex-col min-h-screen">
            {(!isDashboard && !isHome) && <Navbar />}
            <main className={`flex-grow ${(!isDashboard && !isHome) ? 'pt-20' : ''}`}>
                {children}
            </main>
            {(!isDashboard) && <Footer />}
        </div>
    );
}
