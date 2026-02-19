'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    unit: string;
    minOrder: number;
    image: string;
    inStock: boolean;
    category: string;
    bulkSave?: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="product-card group">
            <div className="relative overflow-hidden bg-gray-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                {product.bulkSave && (
                    <span className="absolute top-3 right-3 badge-bulk flex items-center gap-1">
                        🏷️ BULK SAVE
                    </span>
                )}
            </div>
            <div className="p-4">
                <p className="text-xs text-[#FF6B00] font-semibold mb-1">{product.brand}</p>
                <h3 className="text-sm font-bold text-gray-900 mb-3 leading-snug line-clamp-2">
                    {product.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">Per {product.unit} (Min. {product.minOrder})</p>
                <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`text-xs font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
            </div>
        </div>
    );
}
