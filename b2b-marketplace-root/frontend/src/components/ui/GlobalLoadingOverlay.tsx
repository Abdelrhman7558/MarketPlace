'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function GlobalLoadingOverlay() {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Initial load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800); // Small delay for smooth entry
        return () => clearTimeout(timer);
    }, []);

    // Route change (optional: if you want it on navigation)
    useEffect(() => {
        // You could set isLoading(true) here but you need a way to turn it off 
        // when the new route is ready. 
        // Next.js App Router handles navigation loading via loading.tsx usually.
        // For this "splash screen", we just want it gone after initial mount.
        setIsLoading(false);
    }, [pathname, searchParams]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-white/80 backdrop-blur-sm"
                >
                    <motion.div
                        className="flex flex-col items-center gap-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="relative h-16 w-16">
                            <motion.span
                                className="absolute inset-0 border-4 border-slate-200 rounded-full"
                            />
                            <motion.span
                                className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                        <p className="text-sm font-medium text-slate-500 animate-pulse">
                            Loading Marketplace...
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
