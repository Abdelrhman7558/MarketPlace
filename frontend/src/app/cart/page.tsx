'use client';

import { useCart } from '@/lib/cart';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, Package } from 'lucide-react';

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="text-center animate-fade-in-up">
                    <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-12 h-12 text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-brand-navy mb-2">Your Cart is Empty</h2>
                    <p className="text-text-muted mb-8">Looks like you haven&apos;t added any products yet.</p>
                    <Link href="/" className="btn-primary inline-flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-light py-8">
            <div className="container-wide">
                <div className="flex items-center justify-between mb-8 animate-fade-in-down">
                    <div>
                        <h1 className="text-3xl font-extrabold text-brand-navy">Shopping Cart</h1>
                        <p className="text-text-muted text-sm mt-1">{items.length} item{items.length > 1 ? 's' : ''} in your cart</p>
                    </div>
                    <button
                        onClick={clearCart}
                        className="text-sm text-red-500 hover:text-red-600 font-semibold flex items-center gap-1 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear All
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-4">
                        {items.map((item, i) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 flex gap-5 items-center hover:shadow-card-hover transition-all duration-300 animate-fade-in-up"
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                {/* Image */}
                                <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{item.brand}</span>
                                    <h3 className="font-semibold text-brand-navy text-sm line-clamp-2 mt-0.5">{item.name}</h3>
                                    <p className="text-brand-orange font-extrabold text-lg mt-1">${item.price.toFixed(2)}<span className="text-text-muted text-xs font-normal ml-1">/ {item.unit}</span></p>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all duration-200 active:scale-90"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-10 text-center font-bold text-brand-navy">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all duration-200 active:scale-90"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Subtotal */}
                                <div className="text-right hidden sm:block">
                                    <span className="text-xs text-text-muted">Subtotal</span>
                                    <p className="font-extrabold text-brand-navy">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="w-9 h-9 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200 flex items-center justify-center flex-shrink-0"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 sticky top-36 animate-fade-in-up animation-delay-300">
                            <h3 className="font-extrabold text-brand-navy text-lg mb-6">Order Summary</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-muted">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                                    <span className="font-semibold text-brand-navy">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-muted">Shipping</span>
                                    <span className={`font-semibold ${total >= 500 ? 'text-green-500' : 'text-brand-navy'}`}>
                                        {total >= 500 ? 'FREE' : '$25.00'}
                                    </span>
                                </div>
                                {total >= 500 && (
                                    <div className="bg-green-50 text-green-600 text-xs rounded-xl px-3 py-2 font-medium text-center animate-fade-in">
                                        ✓ You qualify for free shipping!
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-brand-navy text-lg">Total</span>
                                    <span className="font-extrabold text-2xl text-brand-navy">${(total + (total >= 500 ? 0 : 25)).toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2 group">
                                <Package className="w-5 h-5" />
                                Proceed to Checkout
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <Link href="/" className="block text-center text-sm text-brand-orange hover:text-brand-orange-hover font-semibold mt-4 transition-colors">
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
