'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Tag, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface AdItem {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    color: string;
    link: string;
    badge: string;
}

const ADS: AdItem[] = [
    {
        id: 'ad-1',
        title: 'Coca-Cola Summer Edition',
        subtitle: 'Bulk orders now open with 15% discount on all flavors.',
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&fit=crop',
        color: '#F40009',
        link: '/categories?brand=Coca-Cola',
        badge: 'Top Seller'
    },
    {
        id: 'ad-2',
        title: 'Red Bull Energy Pack',
        subtitle: 'Keep your inventory energized. Buy 10 cases, get 1 free.',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&fit=crop',
        color: '#000B47',
        link: '/categories?brand=Red Bull',
        badge: 'Deal of the Day'
    },
    {
        id: 'ad-3',
        title: 'Premium Coffee Selection',
        subtitle: 'Arabica beans starting from $45/kg for wholesale.',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&fit=crop',
        color: '#4B3621',
        link: '/categories?category=Coffee & Tea',
        badge: 'New Arrival'
    }
];

export function AdPlacements() {
    return (
        <section className="py-12 px-4 container mx-auto">
            <div className="flex items-center justify-between mb-8 px-2">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black text-[#111] dark:text-white tracking-tight flex items-center gap-2">
                        <Zap className="text-primary fill-primary" size={24} />
                        Sponsored Highlights
                    </h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Premium Vendor Placements</p>
                </div>
                <Link href="/categories" className="text-sm font-black text-primary hover:underline flex items-center gap-1">
                    Manage Ads <ArrowRight size={14} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ADS.map((ad) => (
                    <AdCard key={ad.id} ad={ad} />
                ))}
            </div>
        </section>
    );
}

function AdCard({ ad }: { ad: AdItem }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative h-[400px] w-full rounded-[32px] bg-gradient-to-br from-white/5 to-white/10 border border-white/10 overflow-hidden cursor-pointer group shadow-2xl"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 rounded-[24px] bg-white dark:bg-[#131921] shadow-xl overflow-hidden"
            >
                <div className="absolute inset-0">
                    <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131921] via-[#131921]/20 to-transparent" />
                </div>

                <div
                    style={{
                        transform: "translateZ(50px)",
                    }}
                    className="absolute inset-0 p-8 flex flex-col justify-end"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary text-[#131921] text-[9px] font-black uppercase tracking-widest rounded-full">
                            {ad.badge}
                        </span>
                        <div className="flex items-center gap-1 text-white/40 text-[9px] font-bold uppercase tracking-widest">
                            <Tag size={10} />
                            Sponsored
                        </div>
                    </div>

                    <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                        {ad.title}
                    </h3>
                    <p className="text-white/60 text-xs font-medium leading-relaxed mb-6 max-w-[80%]">
                        {ad.subtitle}
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            href={ad.link}
                            className="h-10 px-6 bg-white text-[#131921] font-black text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                        >
                            View Deal
                            <ArrowRight size={14} />
                        </Link>
                        <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all">
                            <ExternalLink size={16} />
                        </button>
                    </div>
                </div>

                {/* Perspective Elements */}
                <motion.div
                    style={{
                        transform: "translateZ(100px)",
                    }}
                    className="absolute top-8 right-8 w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center shadow-2xl pointer-events-none group-hover:bg-primary/20 transition-colors"
                >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                        <div className="w-4 h-4 rounded-full bg-primary" />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
