'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/lib/motion';

export default function HeroSection() {
    return (
        <section className="relative bg-primary-dark overflow-hidden">
            {/* Background Pattern / Gradient */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent via-primary to-transparent" />

            <div className="container mx-auto px-4 py-12 md:py-20 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Text Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={slideUp}
                    className="max-w-2xl text-center md:text-left"
                >
                    <motion.span
                        variants={fadeIn}
                        className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-wider mb-4 uppercase"
                    >
                        Wholesale B2B Marketplace
                    </motion.span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                        Sourcing Beverages <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                            Made Simple & Fast
                        </span>
                    </h1>
                    <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
                        Connect directly with top beverage suppliers. Get bulk pricing, automated logistics, and net-terms financing for your business.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            href="/catalog"
                            className="bg-accent hover:bg-accent-hover text-white px-8 py-3.5 rounded-lg font-bold text-lg shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95"
                        >
                            Browse Catalog
                        </Link>
                        <Link
                            href="/auth/register"
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-lg font-bold text-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
                        >
                            Register Business
                        </Link>
                    </div>
                </motion.div>

                {/* Visual / Image Placeholder */}
                {/* Ideally this would be an Image component with a real asset, using a div for now as per instructions to not rely on missing assets */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="hidden md:block relative w-full max-w-lg aspect-square"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent to-primary rounded-full opacity-20 blur-3xl animate-pulse" />
                    <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        {/* Mock Card Interface */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">RB</div>
                            <div>
                                <div className="h-4 w-32 bg-white/20 rounded mb-2" />
                                <div className="h-3 w-20 bg-white/10 rounded" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-32 w-full bg-white/5 rounded-lg mb-4" />
                            <div className="flex justify-between">
                                <div className="h-8 w-24 bg-white/20 rounded" />
                                <div className="h-8 w-24 bg-accent rounded" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
