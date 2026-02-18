'use client';
import { useState } from 'react';
import { Minus, Plus, ShoppingCart, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { buttonClick } from '@/lib/motion';
import { useToast } from '@/components/ui/ToastProvider';
import ShippingInfoCard from './ShippingInfoCard';

interface ProductDetailsPanelProps {
    product: {
        id: string;
        title: string;
        brand: string;
        sku: string;
        price: number;
        stock: number;
        minOrder: number;
        bulkTiers?: { quantity: number; price: number }[];
    };
}

export default function ProductDetailsPanel({ product }: ProductDetailsPanelProps) {
    const [quantity, setQuantity] = useState(product.minOrder);
    const { showToast } = useToast();

    const handleQuantityChange = (val: number) => {
        if (val >= product.minOrder && val <= product.stock) {
            setQuantity(val);
        }
    };

    const addToCart = () => {
        showToast(`Added ${quantity} units to cart`, 'success');
    };

    // Calculate dynamic price based on tier
    const currentPrice = product.bulkTiers?.slice().reverse().find(t => quantity >= t.quantity)?.price || product.price;

    return (
        <div className="space-y-6">
            {/* Header Info */}
            <div className="border-b border-slate-100 pb-4">
                <div className="text-sm font-medium text-accent mb-2">{product.brand}</div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.title}</h1>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>SKU: {product.sku}</span>
                    <span className={product.stock > 0 ? "text-status-success font-medium" : "text-status-error"}>
                        {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                    </span>
                </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-bold text-slate-900">${currentPrice.toFixed(2)}</span>
                    <span className="text-slate-500 mb-1">/ unit</span>
                </div>

                {/* Bulk Pricing Tiers */}
                {product.bulkTiers && (
                    <div className="mb-6 space-y-2">
                        <p className="text-xs font-bold text-slate-500 uppercase">Bulk Savings</p>
                        <div className="grid grid-cols-3 gap-2">
                            {product.bulkTiers.map((tier) => (
                                <div
                                    key={tier.quantity}
                                    className={`
                                        p-2 rounded border text-center text-sm transition-colors
                                        ${quantity >= tier.quantity ? 'bg-primary/5 border-primary text-primary font-bold' : 'bg-white border-slate-200 text-slate-600'}
                                    `}
                                >
                                    <div className="font-bold">{tier.quantity}+</div>
                                    <div>${tier.price.toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between bg-white rounded-lg border border-slate-300 p-1">
                        <button
                            onClick={() => handleQuantityChange(quantity - 1)}
                            className="p-3 text-slate-500 hover:text-primary disabled:opacity-50"
                            disabled={quantity <= product.minOrder}
                        >
                            <Minus size={20} />
                        </button>
                        <span className="font-bold text-lg w-12 text-center">{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            className="p-3 text-slate-500 hover:text-primary disabled:opacity-50"
                            disabled={quantity >= product.stock}
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <motion.button
                        variants={buttonClick}
                        whileTap="tap"
                        onClick={addToCart}
                        disabled={product.stock === 0}
                        className="w-full bg-accent text-white py-4 rounded-lg font-bold text-lg shadow-lg shadow-accent/20 hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ShoppingCart size={24} />
                        Add to Cart
                    </motion.button>

                    <button className="w-full bg-slate-200 text-slate-800 py-3 rounded-lg font-bold hover:bg-slate-300 transition-colors">
                        Buy Now
                    </button>
                </div>
            </div>

            {/* Shipping Info */}
            <ShippingInfoCard />
        </div>
    );
}
