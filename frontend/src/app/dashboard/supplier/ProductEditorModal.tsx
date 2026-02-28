'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Save, Image as ImageIcon, Sparkles, Truck, ShieldCheck, DollarSign, Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ProductData {
    id?: string;
    name: string;
    brand: string;
    price: number;
    stock: number;
    image: string;
    category: string;
    description: string;
    unit: string;
    minOrder: number;
}

interface ProductEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: ProductData | null;
    onSave: (data: ProductData) => void;
}

export default function ProductEditorModal({ isOpen, onClose, product, onSave }: ProductEditorModalProps) {
    const defaultData: ProductData = {
        name: '', brand: '', price: 0, stock: 0, image: '', category: 'Beverages', description: '', unit: 'Case (24 units)', minOrder: 1
    };

    const [formData, setFormData] = useState<ProductData>(defaultData);

    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData(defaultData);
        }
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-background border border-border/50 rounded-[40px] premium-shadow z-10 hide-scrollbar"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 w-12 h-12 bg-muted/50 hover:bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all z-50"
                    >
                        <X size={24} />
                    </button>

                    <form onSubmit={handleSubmit} className="p-8 lg:p-12">
                        <div className="mb-10">
                            <h2 className="text-3xl font-heading font-black">{product ? 'Edit Product' : 'Create New Product'}</h2>
                            <p className="text-muted-foreground mt-2">Design and configure your product presentation.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                            {/* Left Column: Visuals */}
                            <div className="lg:col-span-5 space-y-8">
                                <div className="bg-card rounded-[40px] p-8 border border-border/50 flex flex-col items-center justify-center relative group min-h-[400px] overflow-hidden">
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {formData.image ? (
                                        <img src={formData.image} alt="Preview" className="max-w-full max-h-[300px] object-contain relative z-10" />
                                    ) : (
                                        <div className="text-muted-foreground flex flex-col items-center gap-4 relative z-10">
                                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                                                <ImageIcon size={32} />
                                            </div>
                                            <span className="font-bold text-sm uppercase tracking-widest">No Image Selected</span>
                                        </div>
                                    )}

                                    <div className="absolute bottom-6 left-0 right-0 px-6 z-20">
                                        <div className="bg-background/80 backdrop-blur-md rounded-2xl p-2 flex items-center border border-border/50 shadow-xl">
                                            <input
                                                type="text"
                                                placeholder="Paste Image URL here..."
                                                value={formData.image}
                                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                                className="flex-1 bg-transparent px-4 py-2 outline-none text-sm font-medium"
                                                required
                                            />
                                            <Button type="button" size="sm" variant="secondary" className="rounded-xl h-10 px-4">
                                                <Upload size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-card rounded-[32px] p-6 border border-border/50 space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Sparkles size={14} className="text-primary" /> Display Badges
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        <div className="bg-primary/10 text-primary text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                                            New Arrival
                                        </div>
                                        <div className="bg-highlight/10 text-highlight text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                                            Wholesale Verified
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Details */}
                            <div className="lg:col-span-7 space-y-8">

                                {/* Basic Info */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Brand Name</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Coca Cola"
                                                value={formData.brand}
                                                onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                                className="w-full bg-card border border-border/50 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 text-foreground font-bold transition-all"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Category</label>
                                            <select
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full bg-card border border-border/50 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 text-foreground font-bold transition-all appearance-none"
                                            >
                                                <option>Beverages</option>
                                                <option>Snacks</option>
                                                <option>Dairy</option>
                                                <option>Personal Care</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Product Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Classic Cola 330ml Can (24 Pack)"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-card border border-border/50 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 text-foreground font-black text-2xl transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Sales Description</label>
                                        <textarea
                                            placeholder="Highlight key selling points..."
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full h-32 bg-card border border-border/50 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 text-foreground font-medium resize-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Pricing & Inventory */}
                                <div className="p-8 bg-card rounded-[32px] border border-border/50 space-y-8">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2 relative">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Unit Price / Case</label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    required
                                                    value={formData.price || ''}
                                                    onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                                                    className="w-full bg-background border border-border/50 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-primary/50 text-foreground font-black text-2xl transition-all"
                                                />
                                            </div>
                                            <p className="text-[10px] text-muted-foreground mt-2 ml-2 italic">Note: A 5% platform margin is automatically added.</p>
                                        </div>
                                        <div className="space-y-2 relative">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Available Stock (Units)</label>
                                            <div className="relative">
                                                <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-accent w-5 h-5" />
                                                <input
                                                    type="number"
                                                    required
                                                    value={formData.stock || ''}
                                                    onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                                                    className="w-full bg-background border border-border/50 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-primary/50 text-foreground font-black text-2xl transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                                        <div className="flex-1 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Unit Metric</label>
                                            <input
                                                type="text"
                                                value={formData.unit}
                                                onChange={e => setFormData({ ...formData, unit: e.target.value })}
                                                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-sm font-bold"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Min. Order</label>
                                            <input
                                                type="number"
                                                value={formData.minOrder || ''}
                                                onChange={e => setFormData({ ...formData, minOrder: parseInt(e.target.value) || 1 })}
                                                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-sm font-bold"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button type="submit" size="xl" className="w-full rounded-2xl font-black text-lg gap-3">
                                        <Save size={24} />
                                        {product ? 'Save Changes' : 'Publish Product to Atlantis'}
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
