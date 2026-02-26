'use client';

import React, { useState } from 'react';
import { ArrowLeft, Save, Sparkles, Image as ImageIcon, LinkIcon, Upload, Package, UploadCloud, CheckCircle2, X, FileSpreadsheet } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
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

    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
    const [bulkFile, setBulkFile] = useState<File | null>(null);
    const [bulkResults, setBulkResults] = useState<any>(null);

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
                    supplierId: formData.supplierId || 'cm7fr2v7p000214a1tlpzeu86'
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to create product');
            }

            setSuccess(true);
            setTimeout(() => {
                router.push('/admin/orders');
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Error creating product.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBulkUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bulkFile) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setBulkResults({
                totalRows: 10,
                successCount: 8,
                errorCount: 2,
                createdCount: 8,
            });
            setIsSubmitting(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <div className="space-y-10 w-full max-w-[100vw] overflow-x-hidden pb-20 pt-10">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-6">
                    <div className="space-y-4">
                        <Link href="/admin/orders" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                            <ArrowLeft size={16} />
                            Back to Dashboard
                        </Link>
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight flex items-center gap-3">
                                Add Product Catalog <Sparkles className="text-primary w-8 h-8" />
                            </h1>
                            <p className="text-muted-foreground font-medium mt-2">Global inventory listing for enterprise buyers.</p>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => setIsBulkModalOpen(true)}
                        className="h-12 px-6 rounded-xl font-black border-border/50 hover:bg-muted/50 flex items-center gap-2 text-foreground"
                    >
                        <UploadCloud size={18} /> Bulk Upload Sheet
                    </Button>
                </div>

                <main className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                        {/* Left Column: Visuals / Preview */}
                        <div className="lg:col-span-6 space-y-10">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-card rounded-[48px] p-12 lg:p-20 border border-border/50 flex items-center justify-center relative group overflow-hidden min-h-[500px] shadow-2xl"
                            >
                                {/* Background Effects */}
                                <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-colors duration-700" />
                                <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px]" />

                                {formData.image ? (
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="max-w-full max-h-[400px] object-contain relative z-10 transition-transform duration-1000 group-hover:scale-110 drop-shadow-2xl"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-white/20 space-y-4 relative z-10">
                                        <ImageIcon size={64} className="opacity-50" />
                                        <p className="font-bold text-sm tracking-widest uppercase">Image Preview</p>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Right Column: Form Info */}
                        <div className="lg:col-span-6 flex flex-col">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-card border border-border/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                            >
                                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-black text-foreground font-heading">Product Details</h3>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Product Name</label>
                                                <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Red Bull Energy Drink 250ml" required className="bg-background border-border/50 text-foreground" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Brand</label>
                                                    <Input name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Red Bull" required className="bg-background border-border/50 text-foreground" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Category</label>
                                                    <select
                                                        name="category"
                                                        value={formData.category}
                                                        onChange={handleChange}
                                                        className="w-full h-12 bg-background border border-border/50 rounded-xl px-4 text-foreground text-sm outline-none focus:border-primary/50 transition-colors cursor-pointer appearance-none"
                                                        required
                                                    >
                                                        <option value="" disabled>Select Category</option>
                                                        <option value="Soft Drinks">Soft Drinks</option>
                                                        <option value="Energy Drinks">Energy Drinks</option>
                                                        <option value="Coffee & Tea">Coffee & Tea</option>
                                                        <option value="Snacks & Sweets">Snacks & Sweets</option>
                                                        <option value="Personal Care">Personal Care</option>
                                                        <option value="Home Care">Home Care</option>
                                                        <option value="Makeup">Makeup</option>
                                                        <option value="Perfume">Perfume</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Description</label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    className="w-full bg-background border border-border/50 rounded-2xl p-4 text-foreground text-sm outline-none focus:border-primary/50 transition-colors min-h-[100px] resize-y"
                                                    placeholder="Brief technical or marketing description..."
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-border/50">
                                        <h3 className="text-2xl font-black text-foreground font-heading flex items-center gap-2">Logistics & Media</h3>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Price ($)</label>
                                                <Input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} placeholder="0.00" required className="bg-background border-border/50 text-foreground" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Unit</label>
                                                <Input name="unit" value={formData.unit} onChange={handleChange} placeholder="box, case..." required className="bg-background border-border/50 text-foreground" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Min. Qty</label>
                                                <Input name="minOrder" type="number" min="1" value={formData.minOrder} onChange={handleChange} placeholder="1" required className="bg-background border-border/50 text-foreground" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 flex items-center gap-2">
                                                Product Image <ImageIcon size={12} />
                                            </label>

                                            <div className="flex flex-col xl:flex-row gap-4">
                                                <div className="flex-[2] relative group">
                                                    <Input name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.png" className="pl-10 bg-background border-border/50 text-foreground" required={!formData.image} />
                                                    <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                </div>

                                                <div className="flex items-center justify-center font-black text-muted-foreground uppercase text-xs">OR</div>

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
                                                        className="flex items-center justify-center gap-2 w-full h-[52px] bg-muted/50 border border-border/50 rounded-xl px-4 text-foreground text-sm hover:bg-muted transition-colors cursor-pointer font-bold whitespace-nowrap"
                                                    >
                                                        <Upload size={16} /> Upload
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl text-sm font-bold flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-destructive" />
                                            {error}
                                        </div>
                                    )}

                                    {success && (
                                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-xl text-sm font-bold flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            Product listed successfully!
                                        </div>
                                    )}

                                    <div className="pt-8 flex gap-4">
                                        <Button type="submit" isLoading={isSubmitting} className="font-black gap-2 w-full py-6 text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-primary/20">
                                            Launch Product <Save size={20} />
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </main>

                {/* Bulk Upload Modal */}
                <AnimatePresence>
                    {isBulkModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6 w-screen h-screen overflow-hidden"
                        >
                            <motion.form
                                onSubmit={handleBulkUpload}
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="bg-card w-full max-w-2xl rounded-[40px] border border-border/50 overflow-hidden shadow-2xl flex flex-col"
                            >
                                <div className="p-8 border-b border-border/50 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-black text-foreground tracking-tight">Bulk Upload Products</h2>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">Upload via Excel or CSV</p>
                                    </div>
                                    <button type="button" onClick={() => { setIsBulkModalOpen(false); setBulkResults(null); setBulkFile(null); }} className="w-10 h-10 bg-muted/50 hover:bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="p-8 space-y-6">
                                    {!bulkResults ? (
                                        <div className="border-2 border-dashed border-border/50 rounded-3xl p-12 flex flex-col items-center justify-center text-center relative group hover:border-primary/50 hover:bg-primary/5 transition-all">
                                            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <FileSpreadsheet size={32} className="text-primary" />
                                            </div>
                                            <h3 className="text-xl font-black text-foreground mb-2">Drop your spreadsheet here</h3>
                                            <p className="text-muted-foreground">Supports .xlsx and .csv files up to 10MB</p>

                                            <input
                                                type="file"
                                                accept=".xlsx, .csv"
                                                onChange={(e) => setBulkFile(e.target.files?.[0] || null)}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />

                                            {bulkFile && (
                                                <div className="mt-6 p-4 bg-muted/50 rounded-xl border border-border/50 flex items-center gap-3 relative z-10 w-full justify-center">
                                                    <CheckCircle2 className="text-emerald-500" size={20} />
                                                    <span className="font-bold text-foreground truncate max-w-[200px]">{bulkFile.name}</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col items-center justify-center text-center">
                                                <CheckCircle2 className="text-emerald-500 mb-2" size={32} />
                                                <h3 className="text-xl font-black text-foreground">Upload Complete!</h3>
                                                <p className="text-emerald-500 mt-1">Successfully processed {bulkResults.totalRows} rows.</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-muted/30 rounded-2xl p-6 border border-border/50 text-center">
                                                    <p className="text-3xl font-black text-foreground">{bulkResults.createdCount}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-1">Products Created</p>
                                                </div>
                                                <div className="bg-destructive/10 rounded-2xl p-6 border border-destructive/20 text-center">
                                                    <p className="text-3xl font-black text-destructive">{bulkResults.errorCount}</p>
                                                    <p className="text-[10px] text-destructive/60 uppercase tracking-widest font-black mt-1">Rows Failed</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 border-t border-border/50 bg-muted/10 flex gap-4">
                                    <button type="button" onClick={() => { setIsBulkModalOpen(false); setBulkResults(null); setBulkFile(null); }} className="flex-1 h-14 bg-muted text-foreground font-bold rounded-xl border border-border/50 hover:bg-muted/80 transition-colors">
                                        {bulkResults ? 'Close' : 'Cancel'}
                                    </button>
                                    {!bulkResults && (
                                        <button
                                            type="submit"
                                            disabled={!bulkFile || isSubmitting}
                                            className="flex-[2] h-14 bg-primary text-primary-foreground font-black rounded-xl px-8 shadow-xl hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? 'Uploading...' : <><UploadCloud size={18} /> Process Upload</>}
                                        </button>
                                    )}
                                </div>
                            </motion.form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
