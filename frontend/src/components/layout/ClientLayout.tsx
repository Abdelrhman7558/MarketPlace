'use client';

import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');

    return (
        <div className="flex flex-col min-h-screen">
            {!isDashboard && <Navbar />}
            <main className={`flex-grow ${!isDashboard ? 'pt-20' : ''}`}>
                {children}
            </main>
            {!isDashboard && <Footer />}
        </div>
    );
}
