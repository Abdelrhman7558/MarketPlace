'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/ToastProvider";
import GlobalLoadingOverlay from "@/components/ui/GlobalLoadingOverlay";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');

    return (
        <ToastProvider>
            <GlobalLoadingOverlay />
            {!isDashboard && <Navbar />}
            <main className="flex-grow">
                {children}
            </main>
            {!isDashboard && <Footer />}
        </ToastProvider>
    );
}
