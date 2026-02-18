'use client';

import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePlaceOrder = async () => {
        if (!session) {
            router.push('/auth/login?redirect=/checkout');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const accessToken = (session.user as any).accessToken;
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

            const orderData = {
                items: items.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            };

            await axios.post(`${apiUrl}/orders`, orderData, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            clearCart();
            router.push('/checkout/success');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
                    <Link href="/catalog" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                {error && <div className="bg-red-50 text-red-500 p-4 rounded mb-6">{error}</div>}

                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                    <ul className="divide-y divide-gray-200">
                        {items.map((item) => (
                            <li key={item.id} className="px-4 py-4 sm:px-6 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-lg font-medium text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-xl font-bold text-indigo-600">${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
}
