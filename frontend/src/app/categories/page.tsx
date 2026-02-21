'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import { PRODUCTS, BRANDS, CATEGORIES_LIST } from '@/lib/products';
import { SlidersHorizontal, X, ChevronRight, Package, Search } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function CategoriesPage() {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [appliedPrice, setAppliedPrice] = useState({ min: '', max: '' });
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);
    const [localQuery, setLocalQuery] = useState('');

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

        if (localQuery.trim()) {
            const q = localQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        }

        switch (sortBy) {
            case 'price-low': result.sort((a, b) => a.price - b.price); break;
            case 'price-high': result.sort((a, b) => b.price - a.price); break;
            case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
        }
        return result;
    }, [selectedBrands, selectedCategories, appliedPrice, sortBy, localQuery]);

    const activeFilters = [...selectedBrands, ...selectedCategories];

    return (
        <div className="min-h-screen bg-[#F0F2F5] pb-20 overflow-x-hidden">
            {/* Header / Breadcrumbs */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-wide px-4 py-6">
                    <nav className="flex items-center gap-2 text-[12px] font-bold text-gray-500 mb-4 uppercase tracking-wider">
                        <Link href="/" className="hover:text-[#FF7A1A] transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-[#050B18]">Wholesale Catalog</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h1 className="text-4xl font-black text-[#050B18] tracking-tight flex items-center gap-3">
                                <Package className="text-[#FF7A1A]" size={32} />
                                Browse Collections
                            </h1>
                            <p className="text-gray-500 font-medium">{filteredProducts.length} verified wholesale products</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative flex-1 lg:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Filter these results..."
                                    value={localQuery}
                                    onChange={(e) => setLocalQuery(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-[#FF7A1A] focus:ring-4 focus:ring-[#FF7A1A]/10 outline-none transition-all"
                                />
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-[#050B18] outline-none hover:border-[#FF7A1A] transition-all cursor-pointer shadow-sm"
                            >
                                <option value="featured">Featured First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Brand Name A-Z</option>
                            </select>
                            <Button
                                variant="outline"
                                className="lg:hidden flex items-center gap-2 h-[46px]"
                                onClick={() => setShowFilters(true)}
                            >
                                <SlidersHorizontal size={18} /> Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container-wide px-4 py-8">
                <div className="flex gap-10">
                    {/* PC Filters */}
                    <aside className="hidden lg:block w-72 flex-shrink-0 space-y-8">
                        <ProductFilters
                            brands={BRANDS}
                            categories={CATEGORIES_LIST}
                            selectedBrands={selectedBrands}
                            selectedCategories={selectedCategories}
                            priceRange={priceRange}
                            onBrandChange={handleBrandChange}
                            onCategoryChange={handleCategoryChange}
                            onPriceChange={setPriceRange}
                            onApplyPrice={() => setAppliedPrice(priceRange)}
                        />

                        {/* Static Banner */}
                        <div className="bg-[#050B18] rounded-3xl p-6 text-white overflow-hidden relative group">
                            <div className="relative z-10">
                                <h4 className="text-xl font-black mb-2">Need Bulk Help?</h4>
                                <p className="text-gray-400 text-sm mb-4">Our sourcing agents are ready to assist with custom orders.</p>
                                <button className="w-full bg-white/10 hover:bg-[#FF7A1A] text-white py-3 rounded-xl font-bold transition-all text-sm">
                                    Contact Agent
                                </button>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FF7A1A]/20 rounded-full blur-2xl" />
                        </div>
                    </aside>

                    {/* Products Area */}
                    <div className="flex-1">
                        {activeFilters.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8 items-center">
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">Active:</span>
                                {activeFilters.map((f) => (
                                    <motion.button
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        key={f}
                                        onClick={() => BRANDS.includes(f) ? handleBrandChange(f) : handleCategoryChange(f)}
                                        className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold text-[#050B18] flex items-center gap-2 hover:border-[#FF7A1A] transition-all"
                                    >
                                        {f} <X size={12} className="text-gray-400" />
                                    </motion.button>
                                ))}
                                <button
                                    onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setAppliedPrice({ min: '', max: '' }); }}
                                    className="text-xs font-black text-red-600 hover:underline ml-2"
                                >
                                    Clear All
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, i) => (
                                    <motion.div
                                        layout
                                        key={product.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2, delay: i * 0.05 }}
                                    >
                                        <ProductCard product={product} index={i} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
                                <div className="text-6xl mb-6">📦</div>
                                <h3 className="text-2xl font-black text-[#050B18] mb-2">No matching products</h3>
                                <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">Try adjusting your filters or search terms to find what you're looking for.</p>
                                <Button
                                    onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setLocalQuery(''); }}
                                    className="bg-[#FF7A1A] text-white px-8 h-12 rounded-xl font-black"
                                >
                                    Reset All Search & Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Mobile Filters Overlay */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 shadow-2xl overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-[#050B18]">Filters</h2>
                                <button onClick={() => setShowFilters(false)} className="p-2 border border-gray-100 rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>
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
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
