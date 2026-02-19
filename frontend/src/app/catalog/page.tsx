'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import { PRODUCTS, BRANDS, CATEGORIES_LIST } from '@/lib/products';
import { ChevronDown, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import Link from 'next/link';

export default function CatalogPage() {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [appliedPrice, setAppliedPrice] = useState({ min: '', max: '' });
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);

    const handleBrandChange = (brand: string) => {
        setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
    };
    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) => prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]);
    };

    const filteredProducts = useMemo(() => {
        let result = [...PRODUCTS];
        if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
        if (selectedCategories.length > 0) result = result.filter((p) => selectedCategories.includes(p.category));
        if (appliedPrice.min) result = result.filter((p) => p.price >= parseFloat(appliedPrice.min));
        if (appliedPrice.max) result = result.filter((p) => p.price <= parseFloat(appliedPrice.max));
        switch (sortBy) {
            case 'price-low': result.sort((a, b) => a.price - b.price); break;
            case 'price-high': result.sort((a, b) => b.price - a.price); break;
            case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
        }
        return result;
    }, [selectedBrands, selectedCategories, appliedPrice, sortBy]);

    const activeFilters = [...selectedBrands, ...selectedCategories];

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumbs */}
            <div className="bg-white border-b border-[#e3e6e6]">
                <div className="max-w-[1500px] mx-auto px-4">
                    <div className="amz-breadcrumbs">
                        <Link href="/">Home</Link> <span className="mx-1">›</span>
                        <span>All Products</span>
                    </div>
                </div>
            </div>

            {/* Results Header */}
            <div className="bg-white border-b border-[#e3e6e6]">
                <div className="max-w-[1500px] mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                className="lg:hidden flex items-center gap-1 text-sm text-[#0f1111] border border-[#d5d9d9] rounded-full px-4 py-1.5 bg-white hover:bg-[#f7fafa]"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>
                            <span className="text-sm text-[#565959]">
                                1-{filteredProducts.length} of {filteredProducts.length} results
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-[#0f1111]">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-[#d5d9d9] rounded-lg px-3 py-1.5 text-sm bg-[#f0f2f2] shadow-sm cursor-pointer"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A-Z</option>
                            </select>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {activeFilters.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {activeFilters.map((f) => (
                                <span key={f} className="inline-flex items-center gap-1 text-xs bg-[#f0f2f2] border border-[#d5d9d9] rounded-full px-3 py-1">
                                    {f}
                                    <button onClick={() => {
                                        if (BRANDS.includes(f)) handleBrandChange(f);
                                        else handleCategoryChange(f);
                                    }}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                            <button
                                onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setAppliedPrice({ min: '', max: '' }); setPriceRange({ min: '', max: '' }); }}
                                className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-[1500px] mx-auto px-4">
                <div className="flex gap-6 py-4">
                    {/* Sidebar Filters */}
                    <aside className={`${showFilters ? 'block fixed inset-0 z-50 bg-white p-4 overflow-auto' : 'hidden'} lg:block lg:relative lg:w-[220px] lg:flex-shrink-0`}>
                        {showFilters && (
                            <div className="flex justify-between items-center mb-4 lg:hidden">
                                <h2 className="text-lg font-bold">Filters</h2>
                                <button onClick={() => setShowFilters(false)}>
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        )}
                        <ProductFilters
                            brands={BRANDS}
                            categories={CATEGORIES_LIST}
                            selectedBrands={selectedBrands}
                            selectedCategories={selectedCategories}
                            priceRange={priceRange}
                            onBrandChange={handleBrandChange}
                            onCategoryChange={handleCategoryChange}
                            onPriceChange={setPriceRange}
                            onApplyPrice={() => { setAppliedPrice(priceRange); setShowFilters(false); }}
                        />
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-[#e3e6e6] border border-[#e3e6e6]">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-lg text-[#0f1111] mb-2">No results found.</p>
                                <p className="text-sm text-[#565959]">Try different filters or search terms.</p>
                                <button
                                    onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setPriceRange({ min: '', max: '' }); setAppliedPrice({ min: '', max: '' }); }}
                                    className="mt-3 text-[#007185] hover:text-[#c7511f] hover:underline text-sm"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
