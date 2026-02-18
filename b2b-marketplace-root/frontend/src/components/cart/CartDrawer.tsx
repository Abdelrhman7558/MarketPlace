'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { slideInRight } from '@/lib/motion';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items: cart, total } = useCart();

    // Prevent scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-overlay"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={slideInRight}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-modal border-l border-slate-100 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900">Your Order</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-50 rounded-full text-slate-500 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Scrollable Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                                    <span className="text-4xl opacity-20">🛒</span>
                                    <p>Your cart is empty</p>
                                    <button onClick={onClose} className="text-accent underline text-sm">
                                        Browse Catalog
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                            <div>
                                                <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                                                <p className="text-xs text-slate-500">
                                                    Qty: {item.quantity} x ${item.price.toFixed(2)}
                                                </p>
                                            </div>
                                            <span className="font-bold text-slate-900">
                                                ${(item.quantity * item.price).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length >= 0 && ( // Always show footer for now to demo
                            <div className="p-4 border-t border-slate-100 bg-slate-50">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-slate-600">Subtotal</span>
                                    <span className="text-xl font-bold text-slate-900">
                                        ${total.toLocaleString()}
                                    </span>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={onClose}
                                    className="block w-full bg-accent hover:bg-accent-hover text-white text-center py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
