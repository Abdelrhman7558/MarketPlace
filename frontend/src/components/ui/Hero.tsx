'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, ShieldCheck, TrendingUp } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-100 blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-indigo-100 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-16 md:pt-28 md:pb-24">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
                            The Premium <span className="text-blue-600">B2B Marketplace</span> for Your Business
                        </h1>
                        <p className="mt-4 text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                            Connect with top suppliers, streamline your procurement, and scale your operations with our all-in-one B2B platform.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/dashboard/super-admin-7bd0" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                            Go to Dashboard <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/auth/register" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center justify-center">
                            Register Now
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {[
                        {
                            icon: <ShoppingBag className="w-8 h-8 text-blue-600" />,
                            title: "Wide Catalog",
                            desc: "Access thousands of verified products from top-tier suppliers."
                        },
                        {
                            icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />,
                            title: "Secure Trading",
                            desc: "Bank-grade security for all your transactions and data."
                        },
                        {
                            icon: <TrendingUp className="w-8 h-8 text-cyan-600" />,
                            title: "Growth Analytics",
                            desc: "Real-time insights to help you make smarter business decisions."
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
