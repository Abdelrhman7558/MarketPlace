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
        <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
            {/* Header / Breadcrumbs */}
            <div className="bg-muted/30 border-b border-border">
                <div className="container mx-auto px-6 py-12">
                    <nav className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground mb-6 uppercase tracking-[0.2em]">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-foreground">Wholesale Catalog</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-xl"
                            >
                                <Package className="text-primary" size={20} />
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">Verified Inventory</span>
                            </motion.div>
                            <h1 className="text-foreground max-w-xl">
                                Explore Our Wholesale <span className="text-secondary">Collections</span>
                            </h1>
                            <p className="text-muted-foreground text-lg font-medium">{filteredProducts.length} premium products available for bulk order</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative flex-1 min-w-[300px]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search brands, SKU, or category..."
                                    value={localQuery}
                                    onChange={(e) => setLocalQuery(e.target.value)}
                                    className="w-full h-14 bg-card border border-border rounded-2xl pl-12 pr-4 text-sm font-medium focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
                                />
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="h-14 bg-card border border-border rounded-2xl px-6 text-sm font-bold text-foreground outline-none hover:border-primary transition-all cursor-pointer shadow-sm appearance-none min-w-[180px]"
                            >
                                <option value="featured">Featured First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Brand Name A-Z</option>
                            </select>
                            <Button
                                variant="outline"
                                className="lg:hidden h-14 px-6 rounded-2xl border-border hover:bg-muted"
                                onClick={() => setShowFilters(true)}
                            >
                                <SlidersHorizontal size={18} className="mr-2" /> Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* PC Filters */}
                    <aside className="hidden lg:block w-80 flex-shrink-0 space-y-10">
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

                        {/* Premium Sidebar Banner */}
                        <div className="relative bg-primary rounded-[40px] p-8 text-white overflow-hidden group premium-shadow">
                            <div className="relative z-10 space-y-4">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                    <Users className="text-white" size={24} />
                                </div>
                                <h4 className="font-heading font-bold text-2xl leading-tight">Need Custom Sourcing?</h4>
                                <p className="text-white/60 text-sm leading-relaxed">Our logistics experts can help you source rare SKUs and manage complex multi-brand logistics.</p>
                                <button className="w-full bg-secondary text-secondary-foreground py-4 rounded-2xl font-black text-sm btn-hover transition-all">
                                    Talk to an Expert
                                </button>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                        </div>
                    </aside>

                    {/* Products Area */}
                    <div className="flex-1 space-y-8">
                        {activeFilters.length > 0 && (
                            <div className="flex flex-wrap gap-2 items-center">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mr-2">Active Filters:</span>
                                {activeFilters.map((f) => (
                                    <motion.button
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        key={f}
                                        onClick={() => BRANDS.includes(f) ? handleBrandChange(f) : handleCategoryChange(f)}
                                        className="bg-card border border-border px-4 py-2 rounded-xl text-xs font-bold text-foreground flex items-center gap-2 hover:border-primary transition-all shadow-sm"
                                    >
                                        {f} <X size={14} className="text-muted-foreground" />
                                    </motion.button>
                                ))}
                                <button
                                    onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setAppliedPrice({ min: '', max: '' }); }}
                                    className="text-xs font-bold text-highlight hover:underline ml-2"
                                >
                                    Clear All
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-card rounded-[40px] p-24 text-center border border-border shadow-sm flex flex-col items-center"
                            >
                                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8">
                                    <Package className="text-muted-foreground" size={48} />
                                </div>
                                <h3 className="text-2xl font-black mb-4">No matching results found</h3>
                                <p className="text-muted-foreground mb-8 max-w-sm font-medium">Try broadening your filters or searching for more general terms.</p>
                                <Button
                                    onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setLocalQuery(''); }}
                                    className="h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-black btn-hover"
                                >
                                    Reset Selection
                                </Button>
                            </motion.div>
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
                        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md lg:hidden"
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-card p-8 shadow-2xl overflow-y-auto border-l border-border"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-heading font-bold">Filters</h2>
                                <button onClick={() => setShowFilters(false)} className="w-10 h-10 flex items-center justify-center bg-muted rounded-xl">
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

import { Users } from 'lucide-react';
