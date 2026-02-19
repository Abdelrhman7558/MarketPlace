'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Star, Truck, Shield, Clock, Package, Users, ShoppingCart, Award, Zap } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import { PRODUCTS } from '@/lib/products';
import CreditCard from '@/components/ui/CreditCard';

const CATEGORIES = [
    { name: 'Soft Drinks', image: 'https://images.unsplash.com/photo-1581098361633-15fb886efc90?auto=format&fit=crop&q=80', count: 120 },
    { name: 'Energy Drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80', count: 85 },
    { name: 'Water', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80', count: 45 },
    { name: 'Juices', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80', count: 92 },
    { name: 'Tea & Coffee', image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80', count: 64 },
    { name: 'Bulk Deals', image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80', count: 15 },
];

export default function Home() {
    const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [sortBy, setSortBy] = useState('popular');

    const allBrands = Array.from(new Set(PRODUCTS.map(p => p.brand)));
    const allCategories = Array.from(new Set(PRODUCTS.map(p => p.category)));

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    };

    // Filter products
    let filtered = PRODUCTS.filter(p => {
        if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
        if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
        if (priceRange.min && p.price < Number(priceRange.min)) return false;
        if (priceRange.max && p.price > Number(priceRange.max)) return false;
        return true;
    });

    // Sort
    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);

    return (
        <main className="min-h-screen bg-brand-light pb-20">
            {/* ===== PROFESSIONAL HERO SECTION ===== */}
            <section className="bg-brand-navy text-white relative overflow-hidden">
                {/* Subtle Clean Background Pattern (No more floating blobs) */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:20px_20px]"></div>

                <div className="container-wide relative z-10 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue-light text-xs font-semibold tracking-wide uppercase">
                            <Shield className="w-3 h-3" />
                            Trusted by 5,000+ Businesses
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white tracking-tight">
                            Wholesale Beverage <br />
                            <span className="text-brand-orange">Distribution Network</span>
                        </h1>

                        <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                            Streamline your supply chain with the #1 B2B Marketplace.
                            Direct access to premium brands, bulk pricing, and 24h delivery.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <a href="#products" className="btn-primary flex items-center gap-2 text-base px-8 py-3 rounded-md font-bold shadow-lg hover:translate-y-[-2px] transition-transform">
                                Start Ordering
                                <ChevronRight className="w-5 h-5" />
                            </a>
                            <Link href="/auth/register" className="btn-secondary flex items-center gap-2 text-base px-8 py-3 rounded-md font-bold text-brand-navy hover:bg-white transition-colors">
                                Create Business Account
                            </Link>
                        </div>

                        {/* Trust Values */}
                        <div className="flex items-center gap-6 pt-6 text-sm text-gray-400 font-medium">
                            <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4 text-brand-orange" />
                                <span>Free Shipping Over $500</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-brand-orange" />
                                <span>Next-Day Delivery</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Visual - Professional Card Display */}
                    <div className="flex-1 w-full max-w-md md:max-w-xl relative">
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl relative">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-white font-bold text-lg">Business Credit Line</h3>
                                    <p className="text-gray-400 text-sm">Apply for net-30 terms instantly.</p>
                                </div>
                                <Zap className="w-6 h-6 text-brand-orange" />
                            </div>

                            {/* NEW CREDIT CARD COMPONENT */}
                            <div className="transform hover:scale-105 transition-transform duration-500">
                                <CreditCard
                                    cardNumber="4923 1849 2203 9984"
                                    cardHolder="BUSINESS PREMIER"
                                    expiryDate="12/28"
                                    csv="844"
                                    variant="gold"
                                    isFlipped={false}
                                />
                            </div>

                            <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span>Active Status</span>
                                </div>
                                <span>High Limit Available</span>
                            </div>
                        </div>

                        {/* Decorative Element underneath */}
                        <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-brand-orange/5 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </section>

            {/* ===== CATEGORY STRIP ===== */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40 overflow-x-auto">
                <div className="container-wide flex items-center gap-1 py-2 min-w-max">
                    <span className="text-xs font-bold text-brand-navy uppercase tracking-wider mr-4">Departments:</span>
                    {CATEGORIES.map((cat, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                if (cat.name === 'Bulk Deals') return;
                                setSelectedCategories([cat.name]);
                                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-4 py-2 hover:bg-gray-100 rounded text-sm text-text-primary font-medium transition-colors whitespace-nowrap"
                        >
                            {cat.name}
                        </button>
                    ))}
                    <div className="h-4 w-px bg-gray-300 mx-2"></div>
                    <button className="px-4 py-2 hover:bg-gray-100 rounded text-sm text-brand-red font-bold transition-colors">
                        🔥 Clearance
                    </button>
                </div>
            </div>

            <div className="container-wide py-8">
                {/* Advertising Banners - Professional Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Main Big Banner */}
                    <div className="lg:col-span-2 relative h-64 rounded-lg overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2787&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt="Summer Deals"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center p-8 text-white">
                            <span className="text-brand-orange font-bold text-sm mb-1 uppercase tracking-wider">Summer Stock Up</span>
                            <h2 className="text-3xl font-bold mb-2">Save up to 30%</h2>
                            <p className="text-gray-300 mb-4 max-w-xs text-sm">On top energy drink brands including Red Bull and Monster.</p>
                            <button className="btn-primary w-fit text-xs px-4 py-2">See Deals</button>
                        </div>
                    </div>

                    {/* Side Banner 1 */}
                    <div className="relative h-64 rounded-lg overflow-hidden bg-white border border-gray-200 group">
                        <div className="p-6 h-full flex flex-col">
                            <h3 className="text-xl font-bold text-brand-navy mb-2">New Arrivals</h3>
                            <div className="flex-1 flex items-center justify-center">
                                <img src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80" className="h-32 object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300" alt="New Product" />
                            </div>
                            <Link href="#products" className="text-brand-blue text-sm font-medium hover:underline flex items-center gap-1">
                                Shop Now <ChevronRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Side Banner 2 (Account Promo) */}
                    <div className="relative h-64 rounded-lg overflow-hidden bg-[#f0f2f2] border border-gray-200">
                        <div className="p-6 h-full flex flex-col items-center text-center justify-center">
                            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-brand-navy" />
                            </div>
                            <h3 className="text-lg font-bold text-brand-navy mb-1">Sign in for best price</h3>
                            <p className="text-xs text-gray-500 mb-4">Registered businesses verify for wholesale pricing.</p>
                            <button className="btn-primary w-full text-sm">Sign In securely</button>
                        </div>
                    </div>
                </div>

                {/* Main Product Layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar Filters */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-20">
                            <h3 className="font-bold text-brand-navy mb-3">Filters</h3>
                            <ProductFilters
                                brands={allBrands}
                                categories={allCategories}
                                selectedBrands={selectedBrands}
                                selectedCategories={selectedCategories}
                                priceRange={priceRange}
                                onBrandChange={toggleBrand}
                                onCategoryChange={toggleCategory}
                                onPriceChange={setPriceRange}
                                onApplyPrice={() => { }}
                            />
                        </div>
                    </aside>

                    {/* Products Section */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-4 bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
                            <h2 className="font-bold text-brand-navy text-lg pl-2">
                                {selectedCategories.length > 0 ? selectedCategories.join(', ') : 'All Products'}
                                <span className="text-gray-400 font-normal text-sm ml-2">({filtered.length} items)</span>
                            </h2>

                            <div className="flex items-center gap-3">
                                <label className="text-sm text-gray-500">Sort by:</label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-sm rounded px-2 py-1 focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="popular">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {filtered.length === 0 ? (
                            <div className="bg-white p-12 text-center rounded-lg border border-gray-200">
                                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                                <p className="text-gray-500">Try changing your filters or search criteria.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {filtered.map((product, i) => (
                                    <ProductCard key={product.id} product={product} index={i} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
