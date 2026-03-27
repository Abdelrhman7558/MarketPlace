'use client';

import * as React from 'react';

const BRAND_LOGOS = [
    // Chocolates
    { name: "Tony's Chocolonely", color: '#E8001C', bg: '#FFF5F5' },
    { name: 'Ferrero Rocher', color: '#8B6914', bg: '#FFF8E7' },
    { name: 'Lindt', color: '#C8102E', bg: '#FFF5F5' },
    { name: 'Milka', color: '#6B2D8B', bg: '#F8F0FF' },
    { name: 'KitKat', color: '#C8102E', bg: '#FFF5F5' },
    { name: 'Toblerone', color: '#8B6914', bg: '#FFF8E7' },
    { name: 'Snickers', color: '#2C3E50', bg: '#F5F7FA' },
    { name: 'Kinder', color: '#E8001C', bg: '#FFF5F5' },
    { name: 'Godiva', color: '#8B6914', bg: '#FFF8E7' },
    { name: 'Cadbury', color: '#4B0082', bg: '#F8F0FF' },
    { name: 'Nutella', color: '#C8102E', bg: '#FFF5F5' },
    { name: 'Bounty', color: '#1A5C38', bg: '#F0FFF4' },
    { name: 'Mars', color: '#E8001C', bg: '#FFF5F5' },
    { name: 'Twix', color: '#C8902E', bg: '#FFF8E7' },
    { name: "Hershey's", color: '#4A2C0A', bg: '#FFF8E7' },
    { name: 'Oreo', color: '#1A1A2E', bg: '#F5F5FA' },
    { name: 'Reese\'s', color: '#E8721C', bg: '#FFF5EB' },
    { name: 'M&M\'s', color: '#C8102E', bg: '#FFF5F5' },
    { name: 'Ritter Sport', color: '#E8001C', bg: '#FFF5F5' },
    { name: 'Guylian', color: '#6B2D8B', bg: '#F8F0FF' },
    // Beverages
    { name: 'Coca-Cola', color: '#E8001C', bg: '#FFF5F5' },
    { name: 'Pepsi', color: '#0032A0', bg: '#F0F4FF' },
    { name: 'Red Bull', color: '#CC0000', bg: '#FFF5F5' },
    { name: 'Fanta', color: '#FF6600', bg: '#FFF5EB' },
    { name: 'Sprite', color: '#1A7A2E', bg: '#F0FFF4' },
    { name: 'Dr Pepper', color: '#6B0F1A', bg: '#FFF5F5' },
    // Snacks
    { name: 'Lay\'s', color: '#D4A017', bg: '#FFFBEB' },
    { name: 'Doritos', color: '#C8102E', bg: '#FFF5F5' },
    { name: 'Pringles', color: '#C8102E', bg: '#FFF5F5' },
    { name: 'Tostitos', color: '#D4A017', bg: '#FFFBEB' },
    { name: 'Takis', color: '#7B0099', bg: '#F8F0FF' },
    // Coffee
    { name: 'Nescafé', color: '#E8001C', bg: '#FFF5F5' },
    { name: 'Starbucks', color: '#1A5C38', bg: '#F0FFF4' },
    { name: 'Lavazza', color: '#003DA5', bg: '#F0F4FF' },
    { name: 'Jacobs', color: '#003DA5', bg: '#F0F4FF' },
    { name: 'illy', color: '#C8102E', bg: '#FFF5F5' },
    { name: 'Davidoff', color: '#1A1A2E', bg: '#F5F5FA' },
    { name: 'Costa Coffee', color: '#6B0F1A', bg: '#FFF5F5' },
    { name: 'Tchibo', color: '#8B4513', bg: '#FFF8F0' },
    // Unilever brands
    { name: 'Dove', color: '#003DA5', bg: '#F0F4FF' },
    { name: 'Lipton', color: '#D4A017', bg: '#FFFBEB' },
    { name: 'Knorr', color: '#1A5C38', bg: '#F0FFF4' },
    { name: 'Axe', color: '#1A1A2E', bg: '#F5F5FA' },
    { name: 'Vaseline', color: '#003DA5', bg: '#F0F4FF' },
    { name: 'Rexona', color: '#003DA5', bg: '#F0F4FF' },
    { name: 'Sunsilk', color: '#FFD700', bg: '#FFFBEB' },
    { name: 'Lux', color: '#C8902E', bg: '#FFF8E7' },
    { name: 'Surf', color: '#003DA5', bg: '#F0F4FF' },
    { name: 'Persil', color: '#1A5C38', bg: '#F0FFF4' },
];

// Duplicate for seamless infinite loop
const ALL_BRANDS = [...BRAND_LOGOS, ...BRAND_LOGOS];

export function BrandLogosMarquee() {
    return (
        <div className="w-full overflow-hidden bg-white dark:bg-[#1A1F26] border-y border-black/5 dark:border-white/5 py-5">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-4">
                Trusted Brands We Work With
            </p>
            <div className="relative flex">
                {/* Fade edges */}
                <div className="absolute start-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white dark:from-[#1A1F26] to-transparent pointer-events-none" />
                <div className="absolute end-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white dark:from-[#1A1F26] to-transparent pointer-events-none" />

                <div className="flex gap-3 animate-marquee whitespace-nowrap">
                    {ALL_BRANDS.map((brand, i) => (
                        <div
                            key={`${brand.name}-${i}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/8 dark:border-white/10 shrink-0"
                            style={{ backgroundColor: brand.bg }}
                        >
                            <div
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: brand.color }}
                            />
                            <span
                                className="text-xs font-black whitespace-nowrap"
                                style={{ color: brand.color }}
                            >
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
