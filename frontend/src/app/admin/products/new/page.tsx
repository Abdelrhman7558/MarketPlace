'use client';

import React, { useState } from 'react';
import { Package, ArrowLeft, Save, Sparkles, Image as ImageIcon, LinkIcon, Upload } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';

export default function AdminNewProductPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        brand: '',
        category: '',
        price: '',
        unit: 'case',
        minOrder: '1',
        image: '',
        supplierId: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:3005/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    minOrder: parseInt(formData.minOrder, 10),
                    inStock: true,
                    // Supply a fallback supplier ID if empty since admin might not know IDs offhand in MVP
                    supplierId: formData.supplierId || 'cm7fr2v7p000214a1tlpzeu86'
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to create product');
            }

            setSuccess(true);
            setTimeout(() => {
                router.push('/admin/orders'); // Push to admin dashboard or products list
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Error creating product.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-10 max-w-4xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <Link href="/admin/orders" className="inline-flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest">
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            Add Product Catalog <Sparkles className="text-primary w-6 h-6" />
                        </h1>
                        <p className="text-white/40 font-medium mt-1">Global inventory listing for enterprise buyers.</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#131921] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
                {/* Decorative background blur */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
                    {/* Basic Info */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <Package className="text-primary" size={20} />
                            <h2 className="text-xl font-bold text-white">Core Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1">Product Name</label>
                                <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Red Bull Energy Drink 250ml" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1">Brand</label>
                                <Input name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Red Bull" required />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full bg-[#0A0D14] border border-white/10 rounded-2xl p-4 text-white text-sm outline-none focus:border-primary/50 transition-colors min-h-[120px] resize-y"
                                    placeholder="Brief technical or marketing description..."
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Taxonomy & Pricing */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <ImageIcon className="text-primary" size={20} />
                            <h2 className="text-xl font-bold text-white">Logistics & Media</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full h-12 bg-[#0A0D14] border border-white/10 rounded-xl px-4 text-white text-sm outline-none focus:border-primary/50 transition-colors cursor-pointer appearance-none"
                                    required
                                >
                                    <option value="" disabled>Select Category</option>
                                    <option value="Beverages">Beverages</option>
                                    <option value="Snacks">Snacks</option>
                                    <option value="Personal Care">Personal Care</option>
                                    <option value="Home Care">Home Care</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1">Base Price ($)</label>
                                <Input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} placeholder="e.g. 24.50" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1">Unit of Measure</label>
                                <Input name="unit" value={formData.unit} onChange={handleChange} placeholder="e.g. case, pallet, unit" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1">Minimum Order Qty</label>
                                <Input name="minOrder" type="number" min="1" value={formData.minOrder} onChange={handleChange} placeholder="e.g. 10" required />
                            </div>
                        </div>

                        <div className="space-y-4 pb-6">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1 flex items-center gap-2">
                                Product Image <ImageIcon size={12} />
                            </label>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-[2] relative group">
                                    <Input name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.png" className="pl-10" required={!formData.image} />
                                    <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" />
                                </div>

                                <div className="flex items-center justify-center font-black text-white/20 uppercase text-xs">OR</div>

                                <div className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="flex items-center justify-center gap-2 w-full h-[52px] bg-white/5 border border-white/10 rounded-xl px-4 text-white text-sm hover:bg-white/10 transition-colors cursor-pointer font-bold"
                                    >
                                        <Upload size={16} /> Upload Image File
                                    </label>
                                </div>
                            </div>
                            {formData.image && (
                                <div className="mt-4 w-32 h-32 bg-[#0A0D14] rounded-xl border border-white/10 p-2 flex items-center justify-center overflow-hidden">
                                    <img src={formData.image} alt="Preview" className="max-w-full max-h-full object-contain" />
                                </div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm font-bold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-bold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Product successfully deployed to global catalog. Redirecting...
                        </div>
                    )}

                    <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                        <Link href="/admin/orders">
                            <Button variant="outline" type="button" className="border-white/10 hover:bg-white/5">Cancel</Button>
                        </Link>
                        <Button type="submit" isLoading={isSubmitting} className="font-black gap-2 min-w-[200px]">
                            Launch Product <Save size={18} />
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
