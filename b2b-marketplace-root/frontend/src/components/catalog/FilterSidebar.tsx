'use client';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

const FILTERS = [
    {
        id: 'brand',
        name: 'Brand',
        options: ['Pepsi', 'Coca-Cola', 'Red Bull', 'Nestle', 'Lipton']
    },
    {
        id: 'category',
        name: 'Category',
        options: ['Soft Drinks', 'Water', 'Energy Drinks', 'Juice', 'Tea & Coffee']
    },
    {
        id: 'status', // Changed from stock to status to match backend/logic if needed
        name: 'Availability',
        options: ['In Stock', 'Pre-order']
    }
];

interface FilterSidebarProps {
    onFilterChange?: (sectionId: string, value: string, checked: boolean) => void;
    activeFilters?: Record<string, string[]>;
}

export default function FilterSidebar({ onFilterChange, activeFilters }: FilterSidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [openSections, setOpenSections] = useState<string[]>(['brand', 'category', 'price']);

    // State for price range
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

    const toggleSection = (id: string) => {
        setOpenSections(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleFilterChange = (sectionId: string, value: string, checked: boolean) => {
        // If external handler provided (e.g., Home Page), use it
        if (onFilterChange) {
            onFilterChange(sectionId, value, checked);
            return;
        }

        // Default: URL-based filtering (Catalog Page)
        const params = new URLSearchParams(searchParams.toString());

        // Get existing values for this section
        const currentValues = params.get(sectionId)?.split(',') || [];

        if (checked) {
            currentValues.push(value);
        } else {
            const index = currentValues.indexOf(value);
            if (index > -1) {
                currentValues.splice(index, 1);
            }
        }

        if (currentValues.length > 0) {
            params.set(sectionId, currentValues.join(','));
        } else {
            params.delete(sectionId);
        }

        router.push(`/catalog?${params.toString()}`);
    };

    const applyPriceFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (minPrice) params.set('minPrice', minPrice);
        else params.delete('minPrice');

        if (maxPrice) params.set('maxPrice', maxPrice);
        else params.delete('maxPrice');

        router.push(`/catalog?${params.toString()}`);
    };

    // Check if a specific filter option is active
    const isChecked = (sectionId: string, value: string) => {
        if (activeFilters) {
            return activeFilters[sectionId]?.includes(value) || false;
        }
        const currentValues = searchParams.get(sectionId)?.split(',') || [];
        return currentValues.includes(value);
    };

    return (
        <div className="w-64 flex-shrink-0 hidden lg:block pr-6 border-r border-slate-100 min-h-screen">
            <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold">
                <Filter size={20} />
                <h3>Filters</h3>
            </div>

            <div className="space-y-6">
                {/* Price Range - Custom UI */}
                <div className="border-b border-slate-100 pb-6">
                    <button
                        onClick={() => toggleSection('price')}
                        className="flex items-center justify-between w-full text-sm font-bold text-slate-800 mb-3"
                    >
                        <span>Price Range</span>
                        {openSections.includes('price') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <AnimatePresence>
                        {openSections.includes('price') && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        className="w-1/2 p-2 border border-slate-200 rounded text-sm"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                    />
                                    <span className="text-slate-400">-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        className="w-1/2 p-2 border border-slate-200 rounded text-sm"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={applyPriceFilter}
                                    className="w-full mt-3 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold py-2 rounded"
                                >
                                    APPLY
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Checkbox Filters */}
                {FILTERS.map((section) => (
                    <div key={section.id} className="border-b border-slate-100 pb-6">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="flex items-center justify-between w-full text-sm font-bold text-slate-800 mb-3"
                        >
                            <span>{section.name}</span>
                            {openSections.includes(section.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        <AnimatePresence>
                            {openSections.includes(section.id) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="space-y-2 overflow-hidden"
                                >
                                    {section.options.map((option) => (
                                        <label key={option} className="flex items-center gap-2 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer h-4 w-4 border-slate-300 rounded text-primary focus:ring-primary/20"
                                                    checked={isChecked(section.id, option)}
                                                    onChange={(e) => handleFilterChange(section.id, option, e.target.checked)}
                                                />
                                            </div>
                                            <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">
                                                {option}
                                            </span>
                                        </label>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
