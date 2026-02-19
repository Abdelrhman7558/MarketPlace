'use client';

import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');

    return (
        <>
            {/* {!isDashboard && <Navbar />} */}
            <main className="flex-grow">
                {children}
            </main>
        </>
    );
}
