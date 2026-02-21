'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ADS = [
    {
        id: 1,
        title: "Zero Sugar. 100% Obsessed.",
        subtitle: "10 Calories. Guilt-Free. Bloom Sparkling Energy - Now available for wholesale.",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=1600",
        cta: "Shop Now",
        theme: "purple"
    },
    {
        id: 2,
        title: "Sourcing Beverages Made Simple & Fast",
        subtitle: "Connect directly with top beverage suppliers. Get bulk pricing and automated logistics.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600",
        cta: "Browse Catalog",
        theme: "dark"
    }
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % ADS.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrent((prev) => (prev + 1) % ADS.length);
    const prev = () => setCurrent((prev) => (prev - 1 + ADS.length) % ADS.length);

    return (
        <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-[#050B18]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex items-center"
                >
                    {/* Background Image with Gradient Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src={ADS[current].image}
                            className="w-full h-full object-cover"
                            alt={ADS[current].title}
                        />
                        <div className={React.useMemo(() => {
                            if (ADS[current].theme === 'purple') return "absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-900/40 to-transparent";
                            return "absolute inset-0 bg-gradient-to-r from-[#050B18]/90 via-[#050B18]/40 to-transparent";
                        }, [current])} />
                    </div>

                    <div className="container-wide px-10 relative z-20 w-full">
                        <div className="max-w-2xl space-y-6">
                            <div className="inline-block px-3 py-1 rounded-sm bg-white/10 border border-white/20 backdrop-blur-md">
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Featured Deal</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white leading-[1] tracking-tighter">
                                {ADS[current].title}
                            </h1>
                            <p className="text-xl text-white/80 font-medium max-w-lg leading-relaxed">
                                {ADS[current].subtitle}
                            </p>
                            <div className="flex items-center gap-4 pt-4">
                                <button className="bg-[#FF7A1A] text-white font-black px-10 py-4 rounded-xl shadow-2xl hover:scale-105 transition-all text-xl">
                                    {ADS[current].cta}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation - Amazon Style */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-20 flex items-center justify-center bg-black/10 hover:bg-black/30 text-white rounded transition-all group"
            >
                <ChevronLeft className="w-10 h-10 group-active:scale-90 transition-transform" />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-20 flex items-center justify-center bg-black/10 hover:bg-black/30 text-white rounded transition-all group"
            >
                <ChevronRight className="w-10 h-10 group-active:scale-90 transition-transform" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {ADS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-3 h-3 rounded-full transition-all ${i === current ? "bg-[#FF7A1A] w-8" : "bg-white/30 hover:bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
