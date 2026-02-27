'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import SponsoredProductCard from '@/components/ads/SponsoredProductCard';
import SponsoredBrandBanner from '@/components/ads/SponsoredBrandBanner';
import { BRANDS, CATEGORIES_LIST, type Product } from '@/lib/products';
import { fetchProducts } from '@/lib/api';
import { SlidersHorizontal, X, ChevronRight, Package, Search } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Users } from 'lucide-react';
import { Suspense } from 'react';

function CategoriesContent() {
    const searchParams = useSearchParams();
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedAudience, setSelectedAudience] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [appliedPrice, setAppliedPrice] = useState({ min: '', max: '' });
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);
    const [localQuery, setLocalQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sponsoredBrand, setSponsoredBrand] = useState<any>(null);
    const [sponsoredProducts, setSponsoredProducts] = useState<any[]>([]);

    useEffect(() => {
        const loadPageData = async () => {
            const [productsP, brandAdsP, productAdsP] = await Promise.allSettled([
                fetchProducts(),
                fetch('http://localhost:3005/ads?placement=SPONSORED_BRAND').then(res => res.json()),
                fetch('http://localhost:3005/ads?placement=SPONSORED_PRODUCT').then(res => res.json())
            ]);

            if (productsP.status === 'fulfilled') {
                setProducts(productsP.value);
            }

            if (brandAdsP.status === 'fulfilled' && brandAdsP.value && brandAdsP.value.length > 0) {
                const data = brandAdsP.value;
                const brandItem = data[0].product;
                const brandName = brandItem.brand || brandItem.supplier?.name || "Premium Selection";
                setSponsoredBrand({
                    brandName,
                    products: data.map((d: any) => d.product)
                });
            }

            if (productAdsP.status === 'fulfilled' && productAdsP.value && productAdsP.value.length > 0) {
                setSponsoredProducts(productAdsP.value.map((d: any) => d.product));
            }

            setIsLoading(false);
        };

        loadPageData();
    }, []);

    useEffect(() => {
        const query = searchParams.get('q');
        const brand = searchParams.get('brand');
        const category = searchParams.get('category');

        if (query) setLocalQuery(query);
        if (brand) setSelectedBrands(brand.split(','));
        if (category) setSelectedCategories(category.split(','));
    }, [searchParams]);

    const handleBrandChange = (brand: string) => {
        setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
    };
    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) => prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]);
    };
    const handleAudienceChange = (audience: string) => {
        setSelectedAudience((prev) => prev.includes(audience) ? prev.filter((a) => a !== audience) : [...prev, audience]);
    };

    const filteredProducts = useMemo(() => {
        let result = [...products];
        if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
        if (selectedCategories.length > 0) result = result.filter((p) => selectedCategories.includes(p.category));

        if (selectedAudience.length > 0) {
            result = result.filter(p => {
                const searchStr = (p.name + ' ' + p.brand).toLowerCase();
                const isMen = searchStr.includes('homme') || searchStr.includes('men') || searchStr.includes('boy') || searchStr.includes('bulldog') || searchStr.includes('diesel') || searchStr.includes('nautica') || searchStr.includes('(m)');
                const isWomen = searchStr.includes('femme') || searchStr.includes('women') || searchStr.includes('girl') || searchStr.includes('pregnacare') || searchStr.includes('lady') || searchStr.includes('her') || searchStr.includes('(w)') || searchStr.includes('beauty') || searchStr.includes('makeup') || searchStr.includes('mascara') || searchStr.includes('lipstick');

                if (selectedAudience.includes('Men') && isMen) return true;
                if (selectedAudience.includes('Women') && isWomen) return true;
                if (selectedAudience.includes('Unisex') && !isMen && !isWomen) return true;

                return false;
            });
        }

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
    }, [products, selectedBrands, selectedCategories, selectedAudience, appliedPrice, sortBy, localQuery]);

    const activeFilters = [...selectedBrands, ...selectedCategories, ...selectedAudience];

    return (
        <div className="min-h-screen bg-muted/10 pb-20 overflow-x-hidden">
            {/* Header / Breadcrumbs */}
            <div className="bg-background border-b border-border shadow-sm">
                <div className="container mx-auto px-4 lg:px-6 py-4">
                    {/* Top Row: Breadcrumb & Title */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-foreground font-medium">B2B Catalog</span>
                            <span className="text-muted-foreground ml-2">({filteredProducts.length} results)</span>
                        </div>
                    </div>

                    {/* Bottom Row: Search & Sort */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 min-w-[280px] max-w-lg">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search by brand, SKU, product..."
                                value={localQuery}
                                onChange={(e) => setLocalQuery(e.target.value)}
                                className="w-full h-10 bg-background border border-border/80 rounded-md pl-10 pr-4 text-sm focus:border-primary outline-none transition-colors"
                            />
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="h-10 bg-background border border-border/80 rounded-md px-4 text-sm text-foreground outline-none focus:border-primary cursor-pointer min-w-[160px]"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="name">Alphabetical A-Z</option>
                        </select>
                        <Button
                            variant="outline"
                            className="lg:hidden h-10 px-4 rounded-md border-border"
                            onClick={() => setShowFilters(true)}
                        >
                            <SlidersHorizontal size={14} className="mr-2" /> Filter
                        </Button>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 lg:px-6 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* PC Filters */}
                    <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6 shrink-0">
                        <ProductFilters
                            brands={BRANDS}
                            categories={CATEGORIES_LIST}
                            selectedBrands={selectedBrands}
                            selectedCategories={selectedCategories}
                            selectedAudience={selectedAudience}
                            priceRange={priceRange}
                            onBrandChange={handleBrandChange}
                            onCategoryChange={handleCategoryChange}
                            onAudienceChange={handleAudienceChange}
                            onPriceChange={setPriceRange}
                            onApplyPrice={() => setAppliedPrice(priceRange)}
                        />

                        {/* Text Banner */}
                        <div className="border border-border/80 rounded-md p-4 bg-background">
                            <h4 className="font-bold text-sm mb-2 text-foreground">Need Bulk Pricing?</h4>
                            <p className="text-muted-foreground text-xs leading-relaxed mb-3">Our agents negotiate custom palettes and enterprise orders directly with manufacturers.</p>
                            <button className="w-full bg-foreground text-background py-2 rounded-md font-bold text-xs hover:bg-foreground/90 transition-colors">
                                Contact Logistics
                            </button>
                        </div>
                    </aside>

                    {/* Products Area */}
                    <div className="flex-1 space-y-4">
                        {activeFilters.length > 0 && (
                            <div className="flex flex-wrap gap-2 items-center bg-background p-3 rounded-md border border-border/80">
                                <span className="text-xs font-bold text-muted-foreground mr-1">Active:</span>
                                {selectedBrands.map((brand) => (
                                    <button
                                        key={brand}
                                        onClick={() => handleBrandChange(brand)}
                                        className="inline-flex items-center gap-1.5 bg-muted text-foreground px-2.5 py-1 rounded-[4px] text-[11px] font-medium border border-border hover:bg-muted/80 transition-colors"
                                    >
                                        {brand} <X size={12} />
                                    </button>
                                ))}
                                {selectedCategories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className="inline-flex items-center gap-1.5 bg-muted text-foreground px-2.5 py-1 rounded-[4px] text-[11px] font-medium border border-border hover:bg-muted/80 transition-colors"
                                    >
                                        {category} <X size={12} />
                                    </button>
                                ))}
                                {selectedAudience.map((audience) => (
                                    <button
                                        key={audience}
                                        onClick={() => handleAudienceChange(audience)}
                                        className="inline-flex items-center gap-1.5 bg-muted text-foreground px-2.5 py-1 rounded-[4px] text-[11px] font-medium border border-border hover:bg-muted/80 transition-colors"
                                    >
                                        {audience} <X size={12} />
                                    </button>
                                ))}
                                <button
                                    onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setSelectedAudience([]); setLocalQuery(''); }}
                                    className="text-[11px] text-primary hover:underline ml-2 font-medium"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}

                        {sponsoredBrand && (
                            <SponsoredBrandBanner
                                brandName={sponsoredBrand.brandName}
                                products={sponsoredBrand.products}
                            />
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {isLoading ? (
                                <div className="col-span-full py-20 text-center text-muted-foreground font-medium">
                                    Loading products...
                                </div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {/* Interleave sponsored products at specific positions (e.g., 0, 4) if available */}
                                    {sponsoredProducts[0] && (
                                        <motion.div layout key="sp-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <SponsoredProductCard product={sponsoredProducts[0]} index={0} />
                                        </motion.div>
                                    )}
                                    {filteredProducts.map((product, i) => (
                                        <motion.div
                                            layout
                                            key={product.id}
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ProductCard product={product} index={i} />
                                        </motion.div>
                                    ))}
                                    {sponsoredProducts[1] && (
                                        <motion.div layout key="sp-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <SponsoredProductCard product={sponsoredProducts[1]} index={1} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-center bg-background border border-border/80 rounded-md mt-4">
                                <Search size={32} className="text-muted-foreground mb-4" />
                                <h3 className="text-lg font-bold">No products found</h3>
                                <p className="text-muted-foreground text-sm max-w-xs mt-1 mb-6">We couldn't find any products matching your specific filters. Try broadening your search.</p>
                                <Button
                                    onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setSelectedAudience([]); setLocalQuery(''); }}
                                    className="h-10 px-6 rounded-md font-bold"
                                >
                                    Clear Filters
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
                                selectedAudience={selectedAudience}
                                priceRange={priceRange}
                                onBrandChange={handleBrandChange}
                                onCategoryChange={handleCategoryChange}
                                onAudienceChange={handleAudienceChange}
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

export default function CategoriesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Catalog...</div>}>
            <CategoriesContent />
        </Suspense>
    );
}
