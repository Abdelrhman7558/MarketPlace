'use client';
import Link from 'next/link';

export default function PromotionalBanner() {
    return (
        <section className="container mx-auto px-4 py-6">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900 to-slate-900 text-white shadow-xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-6 text-center md:text-left">
                    <div className="max-w-xl">
                        <div className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                            Limited Time Offer
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                            Grand Opening Sale!
                        </h2>
                        <p className="text-blue-100 text-lg mb-6">
                            Get up to <span className="font-bold text-white">40% OFF</span> on top beverage brands for your first bulk order.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                href="/catalog"
                                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
                            >
                                Shop Now
                            </Link>
                            <span className="text-sm text-blue-200 flex items-center justify-center">
                                *Terms apply. Valid until stock lasts.
                            </span>
                        </div>
                    </div>

                    {/* Visual Element (Right Side) */}
                    <div className="hidden md:block relative w-64 h-64 flex-shrink-0">
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl animate-pulse" />
                        <div className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
                            <div className="text-center">
                                <span className="block text-6xl font-black text-white mb-2">40%</span>
                                <span className="block text-xl uppercase tracking-widest text-blue-200">OFF</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
