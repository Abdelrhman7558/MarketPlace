'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Box, Tag, Edit2, Trash2, ExternalLink, X, Settings2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { CATEGORIES_LIST } from '@/lib/products';
import { fetchProducts } from '@/lib/api';
import { cn } from '@/lib/utils';
import ProductEditorModal from '@/app/dashboard/supplier/ProductEditorModal';
import Link from 'next/link';

interface AdminProduct {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    image: string;
    brand: string;
}

export default function AdminProductsPage() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [previewProduct, setPreviewProduct] = React.useState<AdminProduct | null>(null);
    const [editingProduct, setEditingProduct] = React.useState<AdminProduct | null>(null);
    const [isEditorOpen, setIsEditorOpen] = React.useState(false);

    const [allProducts, setAllProducts] = React.useState<AdminProduct[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const loadProducts = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await fetchProducts();
            const mapped = data.map(p => ({
                id: p.id,
                name: p.name,
                price: p.price,
                category: p.category || 'General',
                stock: p.minOrder * 10 || 100,
                image: p.image,
                brand: p.brand || 'Generic'
            }));
            setAllProducts(mapped);
        } catch (error) {
            console.error("Failed to load products", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    React.useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const filteredProducts = allProducts.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleSaveProduct = async (productData: any) => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('bev-token') || localStorage.getItem('bev-token');
            const url = editingProduct ? `http://localhost:3005/products/${editingProduct.id}` : 'http://localhost:3005/products';
            const method = editingProduct ? 'PATCH' : 'POST';

            // Send actual request if you want real state updates, else mock the state for UI immediately
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify(productData)
            });

            if (!res.ok) throw new Error('Action failed');

            // Optimistic UI update
            if (editingProduct) {
                setAllProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
                alert('Product updated successfully');
            } else {
                setAllProducts(prev => [{ ...productData, id: Math.random().toString(36).substr(2, 9), stock: 100 }, ...prev]);
                alert('Product created successfully');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to save product. Is the backend running?');
            // Mock UI update anyway so the user sees something happened
            if (editingProduct) {
                setAllProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
            }
        } finally {
            setIsSubmitting(false);
            setIsEditorOpen(false);
            setEditingProduct(null);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('Are you sure you want to permanently delete this product?')) return;

        try {
            const token = localStorage.getItem('bev-token') || localStorage.getItem('bev-token');
            const res = await fetch(`http://localhost:3005/products/${id}`, {
                method: 'DELETE',
                headers: {
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                }
            });

            if (!res.ok) throw new Error('Delete failed');

            // UI update
            setAllProducts(prev => prev.filter(p => p.id !== id));
            alert('Product deleted successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to delete product from database.');
            // Optimistically remove it on frontend anyway for responsiveness
            setAllProducts(prev => prev.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Settings2 className="text-primary" size={24} />
                        <h1 className="text-3xl font-black text-foreground tracking-tight">Global Catalog</h1>
                    </div>
                    <p className="text-muted-foreground font-medium">Manage and moderate all products across the entire marketplace.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, brand, or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-12 pl-12 pr-6 bg-card rounded-xl border border-border/50 outline-none focus:border-primary/50 text-foreground text-sm w-[250px] transition-all"
                        />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="h-12 px-4 bg-card rounded-xl border border-border/50 outline-none focus:border-primary/50 text-foreground text-sm appearance-none cursor-pointer min-w-[160px]"
                    >
                        <option value="All">All Categories</option>
                        {CATEGORIES_LIST.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <Link
                        href="/admin/products/new"
                        className="h-12 px-6 bg-primary text-primary-foreground font-black text-sm rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/20 flex items-center gap-2"
                    >
                        <Plus size={18} strokeWidth={3} /> Add Product
                    </Link>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                {isLoading ? (
                    <div className="col-span-full py-20 text-center text-muted-foreground font-medium flex flex-col items-center gap-4">
                        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                        Loading global inventory...
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="bg-card rounded-[2rem] border border-border/50 overflow-hidden group hover:border-primary/50 transition-all shadow-xl hover:shadow-2xl"
                            >
                                {/* Image Section */}
                                <div className="relative h-48 bg-white flex items-center justify-center p-6 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="p-5 space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-start gap-2">
                                            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-widest bg-muted/50 px-2 py-1 rounded">
                                                <Tag size={10} className="text-primary" /> {product.category}
                                            </div>
                                            <span className="text-[10px] font-bold text-foreground/50 truncate max-w-[80px]">ID: {product.id.substring(0, 6)}</span>
                                        </div>
                                        <h3 className="text-sm text-foreground font-bold group-hover:text-primary transition-colors line-clamp-2 leading-tight pt-1" title={product.name}>{product.name}</h3>
                                        <p className="text-xs text-muted-foreground font-medium">{product.brand}</p>
                                    </div>

                                    <div className="flex items-end justify-between pt-2 border-t border-border/50">
                                        <div>
                                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">Price</p>
                                            <p className="text-lg font-black text-foreground">${Number(product.price).toFixed(2)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">Stock</p>
                                            <p className="text-sm font-bold text-foreground">{product.stock}</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 pt-2">
                                        <button
                                            onClick={() => { setEditingProduct(product); setIsEditorOpen(true); }}
                                            className="flex-1 h-9 bg-muted/50 hover:bg-primary/10 hover:text-primary text-foreground font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-all group/btn"
                                        >
                                            <Edit2 size={14} className="group-hover/btn:scale-110 transition-transform" /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className="h-9 w-9 bg-destructive/5 hover:bg-destructive/10 text-destructive rounded-lg flex items-center justify-center transition-all group/btn"
                                            title="Delete permanently"
                                        >
                                            <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                        <button
                                            onClick={() => setPreviewProduct(product)}
                                            className="h-9 w-9 bg-muted/50 hover:bg-primary/10 hover:text-primary text-foreground rounded-lg flex items-center justify-center transition-all group/btn"
                                            title="Quick Look"
                                        >
                                            <ExternalLink size={14} className="group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Reusable Editor Modal */}
            <ProductEditorModal
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                product={editingProduct as any}
                onSave={handleSaveProduct}
            />

            {/* Preview Modal */}
            <AnimatePresence>
                {previewProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
                        onClick={() => setPreviewProduct(null)}
                    >
                        <motion.div
                            onClick={e => e.stopPropagation()}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-card w-full max-w-4xl rounded-[32px] border border-border/50 overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
                        >
                            <button
                                onClick={() => setPreviewProduct(null)}
                                className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/10 backdrop-blur-md rounded-full flex items-center justify-center text-foreground hover:bg-black/20 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="w-full md:w-1/2 p-8 bg-white flex items-center justify-center relative min-h-[300px]">
                                <img src={previewProduct.image} className="w-full h-full max-h-[400px] object-contain mix-blend-multiply" alt={previewProduct.name} />
                            </div>

                            <div className="w-full md:w-1/2 p-8 lg:p-12 relative flex flex-col justify-center">
                                <div className="space-y-6 relative z-10">
                                    <div className="space-y-2">
                                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">{previewProduct.brand}</span>
                                        <h2 className="text-3xl font-black text-foreground tracking-tight leading-tight">{previewProduct.name}</h2>
                                        <p className="text-muted-foreground text-sm mt-2">Category: <span className="text-foreground font-medium">{previewProduct.category}</span></p>
                                    </div>

                                    <div className="py-4 border-y border-border/50 flex items-center gap-8">
                                        <div>
                                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Price</p>
                                            <p className="text-3xl font-black text-primary flex items-start">
                                                <span className="text-lg mt-1 mr-1">$</span>
                                                {Number(previewProduct.price).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <p className="text-sm text-muted-foreground font-medium">As an admin, you can edit or delete this product globally from the marketplace directory using the Actions menu.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
