'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0D0D1A] via-[#1A1A2E] to-[#16213E] py-20 md:py-28">
            {/* Background Glow Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6B00] opacity-[0.06] blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E94560] opacity-[0.04] blur-[100px] rounded-full"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="inline-block bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
                            Wholesale B2B Marketplace
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                            Sourcing Beverages<br />
                            <span className="text-gray-400">Made Simple & Fast</span>
                        </h1>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
                            Connect directly with top beverage suppliers. Get bulk pricing, automated logistics, and net-terms financing for your business.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/catalog" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 rounded-xl">
                                Browse Catalog
                            </Link>
                            <Link href="/auth/register" className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-2 rounded-xl">
                                Register Business
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right - Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:block"
                    >
                        <div className="glass-card p-6 relative">
                            <div className="absolute top-4 left-4 flex gap-2">
                                <div className="w-8 h-8 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold text-sm">RB</div>
                            </div>
                            <div className="mt-12 space-y-4">
                                <div className="h-3 bg-white/10 rounded-full w-3/4"></div>
                                <div className="h-3 bg-white/10 rounded-full w-1/2"></div>
                                <div className="h-20 bg-white/5 rounded-xl mt-4"></div>
                                <div className="flex gap-3 mt-4">
                                    <div className="h-8 bg-white/10 rounded-lg flex-1"></div>
                                    <div className="h-8 bg-[#FF6B00] rounded-lg w-24"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
