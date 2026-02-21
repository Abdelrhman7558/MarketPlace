'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Percent, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterProps {
    brands: string[];
    categories: string[];
    selectedBrands: string[];
    selectedCategories: string[];
    priceRange: { min: string; max: string };
    onBrandChange: (brand: string) => void;
    onCategoryChange: (category: string) => void;
    onPriceChange: (range: { min: string; max: string }) => void;
    onApplyPrice: () => void;
}

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-border/50 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left mb-6 group"
            >
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] group-hover:text-primary transition-colors">{title}</h3>
                <ChevronDown className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-300",
                    isOpen ? 'rotate-180 text-primary' : ''
                )} />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ProductFilters(props: FilterProps) {
    const minVal = parseInt(props.priceRange.min) || 0;
    const maxVal = parseInt(props.priceRange.max) || 1000;

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const value = e.target.value;
        if (type === 'min') {
            if (parseInt(value) <= maxVal) {
                props.onPriceChange({ ...props.priceRange, min: value });
            }
        } else {
            if (parseInt(value) >= minVal) {
                props.onPriceChange({ ...props.priceRange, max: value });
            }
        }
    };

    return (
        <div className="bg-card rounded-[40px] p-8 border border-border/50 premium-shadow">
            {/* Categories */}
            <FilterSection title="Department">
                <div className="flex flex-col gap-2">
                    {props.categories.map(cat => {
                        const isActive = props.selectedCategories.includes(cat);
                        return (
                            <button
                                key={cat}
                                onClick={() => props.onCategoryChange(cat)}
                                className={cn(
                                    "group flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "bg-muted/30 text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <span className="tracking-wide">{cat}</span>
                                {isActive && <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                            </button>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Brand */}
            <FilterSection title="Brand Leader">
                <div className="grid grid-cols-1 gap-2">
                    {props.brands.map(brand => {
                        const isActive = props.selectedBrands.includes(brand);
                        return (
                            <label key={brand} className={cn(
                                "flex items-center gap-3 cursor-pointer p-3 rounded-2xl border transition-all duration-300 group",
                                isActive
                                    ? "bg-secondary/10 border-secondary/20 text-foreground"
                                    : "bg-muted/20 border-transparent hover:border-border text-muted-foreground"
                            )}>
                                <div className={cn(
                                    "w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-300",
                                    isActive ? "bg-secondary border-secondary" : "bg-card border-border"
                                )}>
                                    {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-secondary-foreground" />}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={() => props.onBrandChange(brand)}
                                    className="hidden"
                                />
                                <span className="text-xs font-bold uppercase tracking-wider">{brand}</span>
                            </label>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Price Slider */}
            <FilterSection title="Wholesale Price">
                <div className="space-y-8 pt-2">
                    <div className="relative h-2 bg-muted rounded-full group/slider">
                        <div
                            className="absolute h-full bg-primary rounded-full z-10 shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                            style={{
                                left: `${(minVal / 1000) * 100}%`,
                                right: `${100 - (maxVal / 1000) * 100}%`
                            }}
                        />

                        <div className="relative w-full h-full flex items-center">
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={minVal}
                                onChange={(e) => handleSliderChange(e, 'min')}
                                className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none z-30 cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-card [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125 hover:z-40"
                            />
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={maxVal}
                                onChange={(e) => handleSliderChange(e, 'max')}
                                className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none z-30 cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-card [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125 hover:z-40"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 bg-muted/30 rounded-2xl p-4 border border-border/50">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Floor</p>
                            <p className="text-sm font-black text-foreground">${minVal}</p>
                        </div>
                        <div className="w-4 h-px bg-border" />
                        <div className="flex-1 bg-muted/30 rounded-2xl p-4 border border-border/50 text-right">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Cap</p>
                            <p className="text-sm font-black text-foreground">${maxVal === 1000 ? '1000+' : maxVal}</p>
                        </div>
                    </div>

                    <button
                        onClick={props.onApplyPrice}
                        className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-black text-sm btn-hover premium-shadow uppercase tracking-widest"
                    >
                        APPLY RANGE
                    </button>
                </div>
            </FilterSection>

            {/* Special */}
            <FilterSection title="Options" defaultOpen={false}>
                <label className="flex items-center gap-3 cursor-pointer group p-3 hover:bg-muted/30 rounded-2xl transition-all">
                    <div className="w-5 h-5 rounded-lg border-2 border-border bg-card flex items-center justify-center group-hover:border-primary/30">
                        <Percent className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider group-hover:text-foreground">Discounted Items</span>
                </label>
            </FilterSection>
        </div>
    );
}
