'use client';

import * as React from 'react';
import AmazonNavbar from '@/components/layout/AmazonNavbar';
import AmazonHero from '@/components/ui/AmazonHero';
import AmazonCardTile from '@/components/ui/AmazonCardTile';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';

function CatalogSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="bg-white dark:bg-[#1A1F26] p-4 md:p-6 mt-6 shadow-sm border border-black/5 dark:border-white/5 rounded-sm">
            <h2 className="text-lg md:text-xl font-extrabold mb-4 text-[#111] dark:text-white tracking-tight">
                {title}
            </h2>
            {children}
        </section>
    );
}

export default function Home() {
    const [selectedPopularBrand, setSelectedPopularBrand] = useState<string | null>(null);

    const popularProducts = useMemo(() => {
        let filtered = PRODUCTS.slice(0, 20); // Initial set of popular products
        if (selectedPopularBrand) {
            filtered = filtered.filter(p => p.brand === selectedPopularBrand);
        }
        return filtered.slice(0, 8); // Show up to 8
    }, [selectedPopularBrand]);

    return (
        <div className="flex flex-col min-h-screen bg-[#F5F7F7] dark:bg-[#0A0D12] transition-colors duration-500">
            <AmazonNavbar />

            <main className="flex-1 relative">
                {/* Hero Section with Glassmorphism Overlay */}
                <div className="relative">
                    <AmazonHero />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#F5F7F7] dark:to-[#0A0D12] h-full" />
                </div>

                {/* Overlapping Content - Catalog Section */}
                <div className="container mx-auto px-4 -mt-24 md:-mt-64 relative z-20 pb-20">
                    {/* Catalog Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        <AmazonCardTile
                            title="Energy Drinks"
                            items={[
                                { label: 'Bloom Energy', image: '/images/ads/bloom-hero.jpg', link: '/categories?brand=Bloom' },
                                { label: 'Red Bull', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Red_Bull_new_logo.svg/1200px-Red_Bull_new_logo.svg.png', link: '/categories?brand=Red Bull' },
                                { label: 'Celsius Fit', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400', link: '/categories?category=Energy Drinks' },
                                { label: 'Monster Bulk', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400', link: '/categories?category=Energy Drinks' },
                            ]}
                            footerLink="/categories?category=Energy Drinks"
                            footerText="Explore energy products"
                        />
                        <AmazonCardTile
                            title="Soft Drinks"
                            items={[
                                { label: 'Coca-Cola', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/2560px-Coca-Cola_logo.svg.png', link: '/categories?brand=Coca-Cola' },
                                { label: 'Pepsi Co.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pepsi_logo_2014.svg/2000px-Pepsi_logo_2014.svg.png', link: '/categories?brand=Pepsi' },
                                { label: 'Fanta Orange', image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=400', link: '/categories?brand=Fanta' },
                                { label: 'Sprite Lemon', image: 'https://images.unsplash.com/photo-1625772290748-39126ddd92bf?w=400', link: '/categories?brand=Sprite' },
                            ]}
                            footerLink="/categories?category=Soft Drinks"
                            footerText="Browse all sodas"
                        />
                        <AmazonCardTile
                            title="Coffee & Tea"
                            items={[
                                { label: 'Nescafe Classic', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400', link: '/categories?brand=Nescafe' },
                                { label: 'Lavazza Oro', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400', link: '/categories?brand=Lavazza' },
                                { label: 'Starbucks Box', image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=400', link: '/categories?brand=Starbucks' },
                                { label: 'Davidoff Rich', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400', link: '/categories?brand=Davidoff' },
                            ]}
                            footerLink="/categories?category=Coffee & Tea"
                            footerText="View wholesale coffee"
                        />
                        <AmazonCardTile
                            title="Snacks & Gums"
                            items={[
                                { label: 'Oreo Original', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', link: '/categories?brand=Oreo' },
                                { label: 'KitKat Bars', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400', link: '/categories?brand=KitKat' },
                                { label: 'Orbit Gum', image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400', link: '/categories?brand=Orbit' },
                                { label: 'Trident Pack', image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400', link: '/categories?brand=Trident' },
                            ]}
                            footerLink="/categories?category=Snacks & Sweets"
                            footerText="Treats & Bulk Gums"
                        />
                    </div>

                    {/* Best Sellers Scroller */}
                    <CatalogSection title="Trending Global Beverages">
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 pt-2 -mx-2 px-2">
                            {PRODUCTS.slice(0, 10).map((product, i) => (
                                <div key={product.id} className="min-w-[180px] md:min-w-[220px] max-w-[220px]">
                                    <ProductCard product={product} index={i} />
                                </div>
                            ))}
                        </div>
                    </CatalogSection>

                    {/* Popular Products with Filter */}
                    <CatalogSection title="Popular Wholesale Picks">
                        <div className="flex flex-col gap-8">
                            {/* Simple Brand Filter */}
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                                <button
                                    onClick={() => setSelectedPopularBrand(null)}
                                    className={cn(
                                        "px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border",
                                        selectedPopularBrand === null
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-white dark:bg-white/5 text-foreground border-border hover:border-primary/50"
                                    )}
                                >
                                    All Brands
                                </button>
                                {['Coca-Cola', 'Pepsi', 'Red Bull', 'Oreo', 'KitKat', 'Doritos', 'Pringles'].map(brand => (
                                    <button
                                        key={brand}
                                        onClick={() => setSelectedPopularBrand(brand)}
                                        className={cn(
                                            "px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border",
                                            selectedPopularBrand === brand
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "bg-white dark:bg-white/5 text-foreground border-border hover:border-primary/50"
                                        )}
                                    >
                                        {brand}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {popularProducts.map((product, i) => (
                                    <ProductCard key={product.id} product={product} index={i} />
                                ))}
                            </div>

                            {popularProducts.length === 0 && (
                                <div className="py-12 text-center text-muted-foreground font-medium">
                                    No products found for this brand in the popular selection.
                                </div>
                            )}
                        </div>
                    </CatalogSection>

                    {/* Secondary Catalog Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-8">
                        <AmazonCardTile
                            title="Wholesale Case Rates"
                            singleItem={{
                                image: "https://images.unsplash.com/photo-1621466561502-0ca08436cd16?w=800",
                                link: "/categories"
                            }}
                            footerLink="/categories"
                            footerText="Explore wholesale"
                        />
                        <AmazonCardTile
                            title="Refresh Your Inventory"
                            singleItem={{
                                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
                                link: "/categories"
                            }}
                            footerLink="/categories"
                            footerText="Shop business supplies"
                        />
                        <AmazonCardTile
                            title="Global Distribution"
                            singleItem={{
                                image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=800",
                                link: "/categories"
                            }}
                            footerLink="/categories"
                            footerText="Learn about shipping"
                        />
                        <AmazonCardTile
                            title="Net Terms Financing"
                            singleItem={{
                                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
                                link: "/categories"
                            }}
                            footerLink="/categories"
                            footerText="Apply now"
                        />
                    </div>
                </div>
            </main>

            {/* Simple Amazon Footer */}
            <footer className="mt-12">
                <div className="bg-[#37475A] hover:bg-[#485769] transition-colors py-4 text-center text-white text-sm cursor-pointer">
                    Back to top
                </div>
                <div className="bg-[#232F3E] py-12 px-4 border-b border-white/10">
                    <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-white">
                        <div className="space-y-4">
                            <h4 className="font-bold">Get to Know Us</h4>
                            <ul className="text-sm text-gray-300 space-y-2">
                                <li>About MarketPlace</li>
                                <li>Careers</li>
                                <li>Press Releases</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold">Make Money with Us</h4>
                            <ul className="text-sm text-gray-300 space-y-2">
                                <li>Sell on MarketPlace</li>
                                <li>Supplier Central</li>
                                <li>Fulfillment</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold">Payment Products</h4>
                            <ul className="text-sm text-gray-300 space-y-2">
                                <li>Business Card</li>
                                <li>Shop with Points</li>
                                <li>Net Terms</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold">Let Us Help You</h4>
                            <ul className="text-sm text-gray-300 space-y-2">
                                <li>Your Account</li>
                                <li>Your Orders</li>
                                <li>Shipping Rates</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="bg-[#131921] py-8 text-center text-xs text-gray-400 space-y-4">
                    <div className="flex justify-center gap-6">
                        <span>Conditions of Use</span>
                        <span>Privacy Notice</span>
                        <span>Interest-Based Ads</span>
                    </div>
                    <p>© 2026, MarketPlace, Inc. or its affiliates</p>
                </div>
            </footer>
        </div>
    );
}
