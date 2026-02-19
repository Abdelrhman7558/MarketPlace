'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import { PRODUCTS, BRANDS, CATEGORIES_LIST } from '@/lib/products';
import { SlidersHorizontal, X, ChevronRight, Package } from 'lucide-react';
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
        <div className="min-h-screen bg-dark-bg">
            {/* Header */}
            <div className="border-b border-dark-border">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
                        <Link href="/" className="hover:text-brand-orange">الرئيسية</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-text-secondary">جميع المنتجات</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Package className="w-6 h-6 text-brand-orange" />
                            <div>
                                <h1 className="text-white text-2xl font-bold">المنتجات</h1>
                                <p className="text-text-muted text-sm">{filteredProducts.length} منتج</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                className="lg:hidden flex items-center gap-2 text-sm text-text-secondary border border-dark-border rounded-xl px-4 py-2 hover:border-brand-orange transition-colors"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <SlidersHorizontal className="w-4 h-4" /> فلاتر
                            </button>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-dark-surface border border-dark-border text-text-secondary rounded-xl px-4 py-2 text-sm outline-none focus:border-brand-orange transition-colors cursor-pointer"
                            >
                                <option value="featured">الأكثر شيوعاً</option>
                                <option value="price-low">السعر: الأقل</option>
                                <option value="price-high">السعر: الأعلى</option>
                                <option value="name">الاسم: A-Z</option>
                            </select>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {activeFilters.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {activeFilters.map((f) => (
                                <span key={f} className="inline-flex items-center gap-1.5 text-xs bg-brand-orange/10 text-brand-orange border border-brand-orange/30 rounded-full px-3 py-1">
                                    {f}
                                    <button onClick={() => BRANDS.includes(f) ? handleBrandChange(f) : handleCategoryChange(f)}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                            <button
                                onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setAppliedPrice({ min: '', max: '' }); setPriceRange({ min: '', max: '' }); }}
                                className="text-xs text-brand-red hover:text-red-400"
                            >
                                مسح الكل
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex gap-6">
                    {/* Filters Sidebar */}
                    <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-dark-bg p-4 overflow-auto' : 'hidden'} lg:block lg:relative lg:w-[240px] lg:flex-shrink-0`}>
                        {showFilters && (
                            <div className="flex justify-between items-center mb-4 lg:hidden">
                                <h2 className="text-white text-lg font-bold">الفلاتر</h2>
                                <button onClick={() => setShowFilters(false)} className="text-text-muted hover:text-white">
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-text-secondary text-lg mb-2">لا توجد نتائج</p>
                                <p className="text-text-muted text-sm mb-4">جرب تغير الفلاتر أو البحث</p>
                                <button
                                    onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setPriceRange({ min: '', max: '' }); setAppliedPrice({ min: '', max: '' }); }}
                                    className="text-brand-orange hover:text-brand-orange-hover text-sm font-medium"
                                >
                                    مسح كل الفلاتر
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
