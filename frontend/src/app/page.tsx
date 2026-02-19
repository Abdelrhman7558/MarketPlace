'use client';

import { useState, useMemo } from 'react';
import Hero from '@/components/ui/Hero';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import { PRODUCTS, BRANDS, CATEGORIES_LIST } from '@/lib/products';
import { ChevronDown } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function Home() {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [appliedPrice, setAppliedPrice] = useState({ min: '', max: '' });
    const [sortBy, setSortBy] = useState('featured');

    const handleBrandChange = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const filteredProducts = useMemo(() => {
        let result = [...PRODUCTS];

        if (selectedBrands.length > 0) {
            result = result.filter((p) => selectedBrands.includes(p.brand));
        }
        if (selectedCategories.length > 0) {
            result = result.filter((p) => selectedCategories.includes(p.category));
        }
        if (appliedPrice.min) {
            result = result.filter((p) => p.price >= parseFloat(appliedPrice.min));
        }
        if (appliedPrice.max) {
            result = result.filter((p) => p.price <= parseFloat(appliedPrice.max));
        }

        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return result;
    }, [selectedBrands, selectedCategories, appliedPrice, sortBy]);

    return (
        <div className="min-h-screen bg-[#F8F9FA]">
            {/* Hero */}
            <Hero />

            {/* Products Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-64 flex-shrink-0">
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
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-extrabold text-gray-900">Featured Products</h2>
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-[#FF6B00] cursor-pointer"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Name: A-Z</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-gray-500 text-lg">No products match your filters.</p>
                                <button
                                    onClick={() => {
                                        setSelectedBrands([]);
                                        setSelectedCategories([]);
                                        setPriceRange({ min: '', max: '' });
                                        setAppliedPrice({ min: '', max: '' });
                                    }}
                                    className="mt-4 text-[#FF6B00] font-semibold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0D0D1A] border-t border-[#2A2A4A] py-10 mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
                        <div className="flex items-center gap-1">
                            <span className="font-extrabold text-white">Market</span>
                            <span className="font-extrabold text-[#FF6B00]">Place</span>
                            <span className="ml-2">&copy; {new Date().getFullYear()} All rights reserved.</span>
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-[#FF6B00] transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-[#FF6B00] transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-[#FF6B00] transition-colors">Contact Support</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
