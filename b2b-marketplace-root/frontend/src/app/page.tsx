'use client';

import { useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import FilterSidebar from '@/components/catalog/FilterSidebar';
import FeaturedProductCard from '@/components/product/FeaturedProductCard';
import PromotionalDeals from '@/components/home/PromotionalDeals';
import PromotionalBanner from '@/components/home/PromotionalBanner';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, slideUp } from '@/lib/motion';

// Mock Data for MVP
const PRODUCTS = [
    { id: '1', title: 'Coca-Cola Original Taste, 330ml Can (Case of 24)', brand: 'Coca-Cola', category: 'Beverages', subcategory: 'Soft Drinks', price: 18.50, minOrder: 10, stock: 150, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=500' },
    { id: '2', title: 'Red Bull Energy Drink, 250ml (Case of 24)', brand: 'Red Bull', category: 'Beverages', subcategory: 'Energy Drinks', price: 32.00, minOrder: 5, stock: 80, image: 'https://images.unsplash.com/photo-1598614187854-26a60e982dc4?auto=format&fit=crop&q=80&w=500' },
    { id: '3', title: 'Pepsi Max No Sugar, 330ml Can (Case of 24)', brand: 'Pepsi', category: 'Beverages', subcategory: 'Soft Drinks', price: 17.50, minOrder: 10, stock: 200, image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&q=80&w=500' },
    { id: '4', title: 'Nestle Pure Life Water, 500ml (Pack of 12)', brand: 'Nestle', category: 'Beverages', subcategory: 'Water', price: 4.50, minOrder: 20, stock: 500, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=500' },
    { id: '5', title: 'Lipton Yellow Label Tea Bags (Pack of 100)', brand: 'Lipton', category: 'Beverages', subcategory: 'Tea & Coffee', price: 8.90, minOrder: 5, stock: 100, image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=500' },
    { id: '6', title: 'Monster Energy Green, 500ml (Case of 12)', brand: 'Monster', category: 'Beverages', subcategory: 'Energy Drinks', price: 22.00, minOrder: 5, stock: 40, image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&q=80&w=500' },
    { id: '7', title: 'Tropicana Orange Juice, 1L (Case of 6)', brand: 'Tropicana', category: 'Beverages', subcategory: 'Juices', price: 18.00, minOrder: 5, stock: 0, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=500' }, // Out of stock demo
    { id: '8', title: 'Evian Natural Mineral Water, 500ml (Case of 24)', brand: 'Evian', category: 'Beverages', subcategory: 'Water', price: 24.50, minOrder: 5, stock: 60, image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&q=80&w=500' },
];

export const dynamic = 'force-dynamic';

export default function Home() {
    const [sortBy, setSortBy] = useState('featured');
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
        brand: [],
        category: [],
        status: []
    });

    const handleFilterChange = (sectionId: string, value: string, checked: boolean) => {
        setActiveFilters(prev => {
            const current = prev[sectionId] || [];
            const updated = checked
                ? [...current, value]
                : current.filter(item => item !== value);
            return { ...prev, [sectionId]: updated };
        });
    };

    // Filter & Sort Logic
    const filteredProducts = PRODUCTS.filter(product => {
        // Brand Filter
        if (activeFilters.brand.length > 0 && !activeFilters.brand.includes(product.brand)) {
            return false;
        }

        // Availability Filter (Status)
        if (activeFilters.status.length > 0) {
            const inStockSelected = activeFilters.status.includes('In Stock');
            const preOrderSelected = activeFilters.status.includes('Pre-order');

            // If both selected, show all (or logic depending on business rule, usually OR)
            // If only 'In Stock' selected
            if (inStockSelected && !preOrderSelected && product.stock <= 0) {
                return false;
            }
            // If only 'Pre-order' selected (Assuming Pre-order means Out of Stock or explicit flag)
            // For MVP, let's assume stock <= 0 is pre-orderable stuff or "Out of Stock"
            if (preOrderSelected && !inStockSelected && product.stock > 0) {
                return false;
            }
        }

        // Category Filter
        if (activeFilters.category.length > 0) {
            // Check based on subcategory as that's what the sidebar 'Category' options map to
            // e.g. Sidebar Category options: 'Soft Drinks', 'Energy Drinks', etc.
            if (!activeFilters.category.includes((product as any).subcategory)) {
                return false;
            }
        }

        return true;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return parseInt(b.id) - parseInt(a.id);
        return 0; // featured
    });

    return (
        <main className="min-h-screen bg-background-main pb-20">
            {/* 1. Hero Section */}
            <HeroSection />

            {/* 1.5 Promotional Banner (Demo Ad) */}
            <PromotionalBanner />

            {/* 2. Promotional Offers Section */}
            <PromotionalDeals />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* 2. Sidebar Filters */}
                    <FilterSidebar
                        activeFilters={activeFilters}
                        onFilterChange={handleFilterChange}
                    />

                    {/* 3. Main Content Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                            <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>

                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <button className="lg:hidden flex items-center gap-2 text-slate-600 font-medium px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 w-1/2 sm:w-auto justify-center">
                                    <SlidersHorizontal size={18} />
                                    <span>Filters</span>
                                </button>

                                <div className="relative w-1/2 sm:w-auto">
                                    <select
                                        className="appearance-none w-full sm:w-48 bg-white border border-slate-300 text-slate-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-primary cursor-pointer font-medium"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="newest">Newest Arrivals</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                        <ChevronDown size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                        >
                            {sortedProducts.map((product) => (
                                <motion.div key={product.id} variants={slideUp}>
                                    <FeaturedProductCard {...product} className="h-[445px]" imageAspect="aspect-square" />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination / Load More */}
                        <div className="mt-12 text-center">
                            <button className="bg-white border border-slate-300 text-slate-600 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-sm">
                                Load More Products
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
