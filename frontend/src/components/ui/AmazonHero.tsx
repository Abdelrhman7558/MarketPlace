'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
    {
        image: "C:/Users/AK/.gemini/antigravity/brain/c6a8e3a6-9bb6-4e8a-9ec6-466706da33a2/media__1771711698529.png",
        title: "Bloom Zero Sugar: 100% Obsessed",
        subtitle: "10 Calories. Guilt-Free. Bulk orders available now.",
        badge: "Hot Deal"
    },
    {
        image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000",
        title: "Limited Time Offer: 30% Off Energy Drinks",
        subtitle: "Bulk orders for Red Bull & Monster at exclusive wholesale prices.",
        badge: "Seasonal Deal"
    },
    {
        image: "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&q=80&w=2000",
        title: "Wholesale Beverages Direct",
        subtitle: "Global brands delivered to your doorstep. Verified suppliers only.",
        badge: "B2B Exclusive"
    },
    {
        image: "https://images.unsplash.com/photo-1543256283-42c206511a76?auto=format&fit=crop&q=80&w=2000",
        title: "Bulk Coffee & Tea Savings",
        subtitle: "Save up to 40% on case orders of Nescafe, Lavazza, and more.",
        badge: "Best Seller"
    },
    {
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000",
        title: "Supplier Spotlight: Bloom Energy",
        subtitle: "Check out the latest sparkling energy flavors from Bloom.",
        badge: "New Arrival"
    }
];

export default function AmazonHero() {
    const [current, setCurrent] = React.useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
    const prev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    React.useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-[600px] overflow-hidden group">
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${SLIDES[current].image})` }}
                    >
                        {/* Amazon Gradient Fade */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Content (Optional for Amazon style, usually just imagery) */}
            <div className="absolute top-1/4 left-10 z-10 hidden md:block">
                <motion.h1
                    key={`title-${current}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-white text-5xl font-black mb-4 drop-shadow-xl"
                >
                    {SLIDES[current].title}
                </motion.h1>
                <motion.p
                    key={`sub-${current}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-white/80 text-xl font-bold drop-shadow-md"
                >
                    {SLIDES[current].subtitle}
                </motion.p>
            </div>

            {/* Navigation */}
            <button
                onClick={prev}
                className="absolute left-0 top-0 bottom-0 w-20 flex items-center justify-center text-white/50 hover:text-white hover:bg-black/10 transition-all z-20 group-hover:opacity-100 opacity-0"
            >
                <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button
                onClick={next}
                className="absolute right-0 top-0 bottom-0 w-20 flex items-center justify-center text-white/50 hover:text-white hover:bg-black/10 transition-all z-20 group-hover:opacity-100 opacity-0"
            >
                <ChevronRight size={48} strokeWidth={1} />
            </button>
        </section>
    );
}
