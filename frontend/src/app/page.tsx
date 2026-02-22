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
import { AdPlacements } from '@/components/marketplace/AdPlacements';

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
                    {/* 3D Ad Placements */}
                    <div className="mb-12">
                        <AdPlacements />
                    </div>

                    {/* Catalog Grid */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        <AmazonCardTile
                            title="Makeup for Everyone"
                            items={[
                                { label: "Women's Beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop", link: "/categories?category=Makeup" },
                                { label: "Men's Grooming", image: "https://images.unsplash.com/photo-1590156221122-c748c789d36a?w=200&h=200&fit=crop", link: "/categories?category=Makeup" },
                                { label: "Skincare", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop", link: "/categories?category=Personal Care" },
                                { label: "Bestsellers", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop", link: "/categories?category=Makeup" }
                            ]}
                            footerLink="/categories?category=Makeup"
                            footerText="Shop all Beauty"
                        />
                        <AmazonCardTile
                            title="Premium Fragrances"
                            items={[
                                { label: "For Men", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop", link: "/categories?category=Perfume" },
                                { label: "For Women", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200&h=200&fit=crop", link: "/categories?category=Perfume" },
                                { label: "Gift Sets", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=200&h=200&fit=crop", link: "/categories?category=Perfume" },
                                { label: "New Arrivals", image: "https://images.unsplash.com/photo-1583467875263-d50dec37a88c?w=200&h=200&fit=crop", link: "/categories?category=Perfume" }
                            ]}
                            footerLink="/categories?category=Perfume"
                            footerText="See all Perfumes"
                        />
                        <AmazonCardTile
                            title="Personal Care"
                            items={[
                                { label: "Body Care", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200&h=200&fit=crop", link: "/categories?category=Personal Care" },
                                { label: "Hair Care", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=200&h=200&fit=crop", link: "/categories?category=Personal Care" },
                                { label: "Oral Care", image: "https://images.unsplash.com/photo-1559613122-02ec9d898a00?w=200&h=200&fit=crop", link: "/categories?category=Personal Care" },
                                { label: "Shaving", image: "https://images.unsplash.com/photo-1626285492eda-fa605a9a4734?w=200&h=200&fit=crop", link: "/categories?category=Personal Care" }
                            ]}
                            footerLink="/categories?category=Personal Care"
                            footerText="Essentials"
                        />
                        <AmazonCardTile
                            title="Home Cleaning"
                            items={[
                                { label: "Laundry", image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=200&h=200&fit=crop", link: "/categories?category=Home Care" },
                                { label: "Dishwashing", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop", link: "/categories?category=Home Care" },
                                { label: "Surface Care", image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=200&h=200&fit=crop", link: "/categories?category=Home Care" },
                                { label: "Paper & Plastic", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop", link: "/categories?category=Home Care" }
                            ]}
                            footerLink="/categories?category=Home Care"
                            footerText="Shop Household"
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
                            title="Bulk Beverages"
                            items={[
                                { label: "Energy Drinks", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=200&fit=crop", link: "/categories?category=Energy Drinks" },
                                { label: "Soft Drinks", image: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=200&h=200&fit=crop", link: "/categories?category=Soft Drinks" },
                                { label: "Juices", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=200&h=200&fit=crop", link: "/categories?category=Soft Drinks" },
                                { label: "Water", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop", link: "/categories?category=Soft Drinks" }
                            ]}
                            footerLink="/categories?category=Soft Drinks"
                            footerText="Restock drinks"
                        />
                        <AmazonCardTile
                            title="Snacks & Gums"
                            items={[
                                { label: "Biscuits", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop", link: "/categories?category=Snacks & Sweets" },
                                { label: "Chocolates", image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=200&h=200&fit=crop", link: "/categories?category=Snacks & Sweets" },
                                { label: "Chips", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop", link: "/categories?category=Snacks & Sweets" },
                                { label: "Gums", image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=200&h=200&fit=crop", link: "/categories?category=Snacks & Sweets" }
                            ]}
                            footerLink="/categories?category=Snacks & Sweets"
                            footerText="Treats in bulk"
                        />
                        <AmazonCardTile
                            title="Coffee & Tea"
                            items={[
                                { label: "Instant Coffee", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop", link: "/categories?category=Coffee & Tea" },
                                { label: "Ground Coffee", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop", link: "/categories?category=Coffee & Tea" },
                                { label: "Tea Bags", image: "https://images.unsplash.com/photo-1594631252845-29fc4586d517?w=200&h=200&fit=crop", link: "/categories?category=Coffee & Tea" },
                                { label: "Creamers", image: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=200&h=200&fit=crop", link: "/categories?category=Coffee & Tea" }
                            ]}
                            footerLink="/categories?category=Coffee & Tea"
                            footerText="Caffeine selection"
                        />
                        <AmazonCardTile
                            title="Net Terms Financing"
                            singleItem={{
                                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop",
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
