'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useProducts, Product } from '@/context/ProductContext'; // Valid Import
import ProductCard from '@/components/product/ProductCard';

export const dynamic = 'force-dynamic';

export default function CatalogPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { products } = useProducts(); // Use Global State

    // Local filtering state
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const searchTerm = searchParams.get('search') || '';
    const brandFilter = searchParams.get('brand') || '';
    const categoryFilter = searchParams.get('category') || '';
    const subcategoryFilter = searchParams.get('subcategory') || '';

    useEffect(() => {
        setLoading(true);
        // Simulate filtered fetch from context
        let result = [...products];

        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(lowerSearch) ||
                p.brand.toLowerCase().includes(lowerSearch)
            );
        }

        if (brandFilter) {
            const brands = brandFilter.toLowerCase().split(',');
            result = result.filter(p => brands.includes(p.brand.toLowerCase()));
        }

        if (categoryFilter) {
            result = result.filter(p => p.category?.toLowerCase() === categoryFilter.toLowerCase());
        }

        if (subcategoryFilter) {
            // Assuming products might have a subcategory field, or checking description/tags
            // For now, let's assume loose matching if field missing, or just ignore if data schema doesn't support it yet
            // Ideally: p.subcategory?.toLowerCase() === subcategoryFilter.toLowerCase()
            // Fallback: Check if title/desc contains it to yield SOME results
            result = result.filter(p =>
                (p as any).subcategory?.toLowerCase() === subcategoryFilter.toLowerCase() ||
                p.title.toLowerCase().includes(subcategoryFilter.toLowerCase())
            );
        }

        // Availability / Status Filter
        const statusFilter = searchParams.get('status') || '';
        if (statusFilter) {
            const statuses = statusFilter.split(',');
            const inStock = statuses.includes('In Stock');
            const preOrder = statuses.includes('Pre-order');

            result = result.filter(p => {
                if (inStock && !preOrder) return (p.stock || 0) > 0;
                if (preOrder && !inStock) return (p.stock || 0) <= 0;
                return true; // Both or neither (though if neither, we wouldn't be in this block)
            });
        }

        setFilteredProducts(result);
        setLoading(false);
    }, [searchParams, products]); // Re-run if query OR global/context products change

    const updateSearch = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (term) params.set('search', term);
        else params.delete('search');
        router.push(`/catalog?${params.toString()}`);
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="rounded-md border border-slate-300 px-4 py-2 focus:ring-primary focus:border-primary w-64"
                            value={searchTerm}
                            onChange={(e) => updateSearch(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500 animate-pulse">Loading items...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-y-10 gap-x-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="h-full">
                                <ProductCard
                                    {...product}
                                    id={product.id}
                                    title={product.title}
                                    brand={product.brand}
                                    price={Number(product.price)}
                                    // Map catalog usage to new component
                                    minOrder={1} // Default if missing
                                    stock={product.stock || 0}
                                />
                            </div>
                        ))}
                    </div>
                )}
                {!loading && filteredProducts.length === 0 && (
                    <div className="text-center text-slate-500 mt-20">
                        <p className="text-lg">No products found.</p>
                        <p className="text-sm">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
