'use client';

import { useState } from 'react';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';

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

const BRAND_COLORS: Record<string, string> = {
    'Coca-Cola': 'bg-red-500',
    'Pepsi': 'bg-blue-500',
    'Red Bull': 'bg-yellow-500',
    'Monster': 'bg-green-500',
    'Lipton': 'bg-yellow-400',
    'Tropicana': 'bg-orange-400',
    'Nestle': 'bg-sky-400',
};

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left mb-3 group"
            >
                <h3 className="text-sm font-bold text-brand-navy group-hover:text-brand-orange transition-colors">{title}</h3>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                {children}
            </div>
        </div>
    );
}

export default function ProductFilters(props: FilterProps) {
    const totalFilters = props.selectedBrands.length + props.selectedCategories.length;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-brand-orange" />
                    <h2 className="font-bold text-brand-navy">Filters</h2>
                </div>
                {totalFilters > 0 && (
                    <button
                        onClick={() => {
                            props.selectedBrands.forEach(b => props.onBrandChange(b));
                            props.selectedCategories.forEach(c => props.onCategoryChange(c));
                        }}
                        className="text-xs text-brand-orange hover:text-brand-orange-hover font-semibold transition-colors"
                    >
                        Clear All ({totalFilters})
                    </button>
                )}
            </div>

            {/* Categories */}
            <FilterSection title="Categories">
                <div className="space-y-1.5">
                    {props.categories.map(cat => {
                        const isActive = props.selectedCategories.includes(cat);
                        return (
                            <button
                                key={cat}
                                onClick={() => props.onCategoryChange(cat)}
                                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                                    ? 'bg-brand-orange/10 text-brand-orange font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-brand-navy'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${isActive
                                    ? 'bg-brand-orange border-brand-orange'
                                    : 'border-gray-300'
                                    }`}>
                                    {isActive && (
                                        <svg className="w-2.5 h-2.5 text-white animate-scale-in" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Brands */}
            <FilterSection title="Brands">
                <div className="space-y-1.5">
                    {props.brands.map(brand => {
                        const isActive = props.selectedBrands.includes(brand);
                        const dotColor = BRAND_COLORS[brand] || 'bg-gray-400';
                        return (
                            <button
                                key={brand}
                                onClick={() => props.onBrandChange(brand)}
                                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                                    ? 'bg-brand-orange/10 text-brand-orange font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-brand-navy'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${isActive
                                    ? 'bg-brand-orange border-brand-orange'
                                    : 'border-gray-300'
                                    }`}>
                                    {isActive && (
                                        <svg className="w-2.5 h-2.5 text-white animate-scale-in" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                                {brand}
                            </button>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Price Range" defaultOpen={false}>
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                            <input
                                type="number"
                                placeholder="Min"
                                value={props.priceRange.min}
                                onChange={(e) => props.onPriceChange({ ...props.priceRange, min: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition-all"
                            />
                        </div>
                        <span className="text-gray-400 self-center">—</span>
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={props.priceRange.max}
                                onChange={(e) => props.onPriceChange({ ...props.priceRange, max: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition-all"
                            />
                        </div>
                    </div>
                    <button
                        onClick={props.onApplyPrice}
                        className="w-full bg-brand-navy text-white text-sm font-semibold py-2 rounded-lg hover:bg-brand-navy-light transition-colors"
                    >
                        Apply Price
                    </button>
                </div>
            </FilterSection>
        </div>
    );
}
