'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
        <div className="border-b border-[#e7e7e7] pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left mb-2 py-1"
            >
                <h3 className="text-[13px] font-bold text-amz-text">{title}</h3>
                <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div>{children}</div>}
        </div>
    );
}

export default function ProductFilters(props: FilterProps) {
    return (
        <div className="text-amz-text">
            {/* Department */}
            <FilterSection title="Department">
                <ul className="space-y-[2px]">
                    {props.categories.map(cat => {
                        const isActive = props.selectedCategories.includes(cat);
                        return (
                            <li key={cat}>
                                <button
                                    onClick={() => props.onCategoryChange(cat)}
                                    className={`text-[13px] py-[2px] block w-full text-left ${isActive
                                            ? 'font-bold text-amz-text'
                                            : 'text-amz-text hover:text-amz-blue-hover hover:underline'
                                        }`}
                                >
                                    {isActive && <span className="mr-1">›</span>}
                                    {cat}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </FilterSection>

            {/* Brand */}
            <FilterSection title="Brand">
                <div className="space-y-[4px]">
                    {props.brands.map(brand => {
                        const isActive = props.selectedBrands.includes(brand);
                        return (
                            <label key={brand} className="flex items-center gap-2 cursor-pointer py-[1px]">
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={() => props.onBrandChange(brand)}
                                    className="w-[13px] h-[13px] accent-amz-dark2 cursor-pointer"
                                />
                                <span className="text-[13px] text-amz-text">{brand}</span>
                            </label>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Price */}
            <FilterSection title="Price" defaultOpen={false}>
                <div className="space-y-2">
                    <div className="flex items-center gap-1">
                        <div className="flex items-center border border-[#888c8c] rounded-[4px] px-1 bg-white">
                            <span className="text-[12px] text-gray-500">$</span>
                            <input
                                type="number"
                                placeholder="Min"
                                value={props.priceRange.min}
                                onChange={(e) => props.onPriceChange({ ...props.priceRange, min: e.target.value })}
                                className="w-full text-[13px] py-1 px-1 outline-none bg-transparent"
                            />
                        </div>
                        <span className="text-gray-400 text-[11px]">to</span>
                        <div className="flex items-center border border-[#888c8c] rounded-[4px] px-1 bg-white">
                            <span className="text-[12px] text-gray-500">$</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={props.priceRange.max}
                                onChange={(e) => props.onPriceChange({ ...props.priceRange, max: e.target.value })}
                                className="w-full text-[13px] py-1 px-1 outline-none bg-transparent"
                            />
                        </div>
                        <button
                            onClick={props.onApplyPrice}
                            className="btn-amz !py-1 !px-2 text-[11px]"
                        >
                            Go
                        </button>
                    </div>
                    <div className="space-y-[2px]">
                        {['Under $10', '$10 to $20', '$20 to $30', '$30 & Above'].map(range => (
                            <button key={range} className="text-[13px] text-amz-text block hover:text-amz-blue-hover hover:underline py-[1px]">
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
            </FilterSection>

            {/* Availability */}
            <FilterSection title="Availability" defaultOpen={false}>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-[13px] h-[13px] accent-amz-dark2 cursor-pointer" />
                    <span className="text-[13px] text-amz-text">Include Out of Stock</span>
                </label>
            </FilterSection>
        </div>
    );
}
