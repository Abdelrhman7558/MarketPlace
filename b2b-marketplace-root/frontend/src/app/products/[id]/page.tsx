'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetailsPanel from '@/components/product/ProductDetailsPanel';
import RelatedProductsCarousel from '@/components/product/RelatedProductsCarousel';
import MobileStickyPurchaseBar from '@/components/product/MobileStickyPurchaseBar';
import { useProducts, Product } from '@/context/ProductContext'; // Import Context

// Keep related products mock for now
const RELATED_PRODUCTS = [
    { id: '2', title: 'Red Bull Energy Drink, 250ml', brand: 'Red Bull', price: 32.00, minOrder: 5, stock: 80, image: 'https://images.unsplash.com/photo-1598614187854-26a60e982dc4?auto=format&fit=crop&q=80&w=500' },
    { id: '3', title: 'Pepsi Max No Sugar, 330ml', brand: 'Pepsi', price: 17.50, minOrder: 10, stock: 200, image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&q=80&w=500' },
    { id: '4', title: 'Nestle Pure Life Water, 500ml', brand: 'Nestle', price: 4.50, minOrder: 20, stock: 500, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=500' },
    { id: '6', title: 'Monster Energy Green, 500ml', brand: 'Monster', price: 22.00, minOrder: 5, stock: 40, image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&q=80&w=500' },
];

export default function ProductPage() {
    const params = useParams();
    const { getProduct } = useProducts(); // Helper to find product by ID
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (params.id) {
            const foundProduct = getProduct(params.id as string);
            if (foundProduct) {
                setProduct(foundProduct);
                setLoading(false);
            } else {
                setError('Product not found in demo catalog');
                setLoading(false);
            }
        }
    }, [params.id, getProduct]);

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>;
    if (!product) return <div className="h-screen flex items-center justify-center">Product not found</div>;

    return (
        <div className="container mx-auto px-4 pb-20 pt-8">
            <Breadcrumb items={[
                { label: 'Catalog', href: '/catalog' },
                { label: product.brand, href: `/catalog?brand=${product.brand}` },
                { label: product.title }
            ]} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Left: Gallery - Handle multiple strings vs single string image */}
                <ProductGallery
                    images={product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : [])}
                    title={product.title}
                />

                {/* Right: Details */}
                <ProductDetailsPanel product={{ ...product, sku: product.sku || '' }} />
            </div>

            {/* Description / Metadata Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 mb-16">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Product Description</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                    {product.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <span className="block text-xs text-slate-500 uppercase font-bold mb-1">Origin</span>
                        <span className="font-medium text-slate-900">USA</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <span className="block text-xs text-slate-500 uppercase font-bold mb-1">Unit Weight</span>
                        <span className="font-medium text-slate-900">330g</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <span className="block text-xs text-slate-500 uppercase font-bold mb-1">Items/Case</span>
                        <span className="font-medium text-slate-900">24</span>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <RelatedProductsCarousel products={RELATED_PRODUCTS} />

            {/* Mobile Sticky Bar */}
            <MobileStickyPurchaseBar price={product.price} stock={product.stock} />
        </div>
    );
}
