'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, Filter } from 'lucide-react';

interface FiltersProps {
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
        <div className="border-b border-gray-200 pb-4 mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left font-bold text-gray-900 text-sm mb-3"
            >
                {title}
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {isOpen && <div className="space-y-2">{children}</div>}
        </div>
    );
}

export default function ProductFilters({
    brands,
    categories,
    selectedBrands,
    selectedCategories,
    priceRange,
    onBrandChange,
    onCategoryChange,
    onPriceChange,
    onApplyPrice,
}: FiltersProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-5">
                <Filter className="w-5 h-5 text-gray-700" />
                <h2 className="font-bold text-gray-900">Filters</h2>
            </div>

            {/* Price Range */}
            <FilterSection title="Price Range">
                <div className="flex items-center gap-2 mb-2">
                    <input
                        type="number"
                        placeholder="Min"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6B00] transition-colors"
                        value={priceRange.min}
                        onChange={(e) => onPriceChange({ ...priceRange, min: e.target.value })}
                    />
                    <span className="text-gray-400">-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6B00] transition-colors"
                        value={priceRange.max}
                        onChange={(e) => onPriceChange({ ...priceRange, max: e.target.value })}
                    />
                </div>
                <button
                    onClick={onApplyPrice}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg text-sm transition-colors"
                >
                    APPLY
                </button>
            </FilterSection>

            {/* Brand Filter */}
            <FilterSection title="Brand">
                {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => onBrandChange(brand)}
                            className="w-4 h-4 rounded border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00] accent-[#FF6B00]"
                        />
                        <span className="text-sm text-gray-700">{brand}</span>
                    </label>
                ))}
            </FilterSection>

            {/* Category Filter */}
            <FilterSection title="Category">
                {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => onCategoryChange(category)}
                            className="w-4 h-4 rounded border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00] accent-[#FF6B00]"
                        />
                        <span className="text-sm text-gray-700">{category}</span>
                    </label>
                ))}
            </FilterSection>
        </div>
    );
}
