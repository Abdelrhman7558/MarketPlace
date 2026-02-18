'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useCart } from '../../../context/CartContext';

type Product = {
    id: string;
    name: string;
    description: string;
    price: string;
    stock: number;
    minQuantity: number;
    supplierId: string;
    supplier: {
        companyName: string;
    }
};

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { addItem } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            const res = await axios.get(`${apiUrl}/products/${id}`);
            setProduct(res.data);
            if (res.data.minQuantity) setQuantity(res.data.minQuantity);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (!product) return;
        addItem({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            quantity: quantity,
            supplierId: product.supplierId
        });
        alert('Added to cart!');
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!product) return <div className="p-8 text-center">Product not found</div>;

    return (
        <div className="bg-white min-h-screen">
            <div className="pt-6 pb-16 sm:pb-24">
                <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                        {/* Image gallery */}
                        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3 h-96 flex items-center justify-center">
                            <span className="text-gray-500">No Image Available</span>
                        </div>

                        {/* Product info */}
                        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

                            <div className="mt-3">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl text-gray-900">${product.price}</p>
                            </div>

                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>
                                <div className="text-base text-gray-700 space-y-6">
                                    <p>{product.description}</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <p className="text-sm text-gray-500">Sold by: {product.supplier?.companyName || 'Unknown Supplier'}</p>
                                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                                <p className="text-sm text-gray-500">Min Order Qty: {product.minQuantity}</p>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    min={product.minQuantity}
                                    max={product.stock}
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    className="mt-1 block w-24 rounded-md border border-gray-300 p-2"
                                />
                            </div>

                            <div className="mt-10 flex sm:flex-col1">
                                <button
                                    onClick={handleAddToCart}
                                    className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
