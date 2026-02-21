'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Filter,
    Box,
    Tag,
    DollarSign,
    Archive,
    Edit2,
    Trash2,
    ExternalLink,
    Camera,
    CheckCircle2,
    X
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { PRODUCTS, CATEGORIES_LIST } from '@/lib/products';
import { cn } from '@/lib/utils';

interface SupplierProduct {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    status: 'ACTIVE' | 'DRAFT' | 'OUT_OF_STOCK';
    image: string;
}

export default function SupplierProductsPage() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Form State
    const [formData, setFormData] = React.useState({
        name: '',
        price: '',
        stock: '',
        category: CATEGORIES_LIST[0],
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400'
    });

    // Initialize with products that match a "supplier" profile (e.g., Beverages)
    // In a real app, this would be filtered by session.user.id or supplier_id
    const [myProducts, setMyProducts] = React.useState<SupplierProduct[]>(() => {
        return PRODUCTS.slice(0, 5).map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            category: p.category || 'General',
            stock: Math.floor(Math.random() * 200),
            status: 'ACTIVE',
            image: p.image
        }));
    });

    const filteredProducts = myProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API delay
        setTimeout(() => {
            const newProduct: SupplierProduct = {
                id: Math.random().toString(36).substr(2, 9),
                name: formData.name,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                category: formData.category,
                status: 'ACTIVE',
                image: formData.image
            };

            setMyProducts([newProduct, ...myProducts]);
            setIsSubmitting(false);
            setIsAddModalOpen(false);
            setFormData({ name: '', price: '', stock: '', category: CATEGORIES_LIST[0], image: formData.image });
        }, 800);
    };

    const handleDeleteProduct = (id: string) => {
        if (confirm('Are you sure you want to delete this listing?')) {
            setMyProducts(myProducts.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Box className="text-primary" size={24} />
                        <h1 className="text-3xl font-black text-white tracking-tight">Inventory Manager</h1>
                    </div>
                    <p className="text-white/40 font-medium">Control your wholesale catalog and stock levels.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-12 pl-12 pr-6 bg-[#131921] rounded-xl border border-white/5 outline-none focus:border-primary/50 text-white text-sm w-[250px] transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="h-12 px-6 bg-primary text-[#131921] font-black text-sm rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/20 flex items-center gap-2"
                    >
                        <Plus size={18} strokeWidth={3} /> List Product
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="bg-[#131921] rounded-3xl border border-white/5 overflow-hidden group hover:border-primary/20 transition-all layered-3d-shadow"
                        >
                            {/* Image Section */}
                            <div className="relative h-48 bg-white/5 flex items-center justify-center p-8 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full object-contain mix-blend-multiply dark:mix-blend-normal transform transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4">
                                    <div className={cn(
                                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border backdrop-blur-md",
                                        product.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                            product.status === 'OUT_OF_STOCK' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                                "bg-white/5 text-white/40 border-white/10"
                                    )}>
                                        {product.status.replace(/_/g, ' ')}
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                                        <Tag size={10} className="text-primary" /> {product.category}
                                    </div>
                                    <h3 className="text-white font-bold group-hover:text-primary transition-colors truncate">{product.name}</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <p className="text-[10px] text-white/30 font-black uppercase tracking-tighter">Price</p>
                                        <p className="text-lg font-black text-white">${product.price}</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <p className="text-[10px] text-white/30 font-black uppercase tracking-tighter">Stock</p>
                                        <p className="text-lg font-black text-white">{product.stock}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <button className="flex-1 h-10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-lg border border-white/5 flex items-center justify-center gap-2 transition-all">
                                        <Edit2 size={14} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="h-10 w-10 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-lg border border-red-500/10 flex items-center justify-center transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <button className="h-10 w-10 bg-white/5 hover:bg-primary hover:text-[#131921] text-white rounded-lg border border-white/5 flex items-center justify-center transition-all">
                                        <ExternalLink size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Add Card */}
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#131921]/50 rounded-3xl border-2 border-dashed border-white/5 h-[410px] flex flex-col items-center justify-center gap-4 group hover:border-primary/20 hover:bg-[#131921] transition-all"
                >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        <Plus size={32} />
                    </div>
                    <div className="text-center">
                        <p className="text-white/60 font-black uppercase tracking-widest text-sm">Add New Product</p>
                        <p className="text-[10px] text-white/20 font-bold mt-1">List a new item to the store.</p>
                    </div>
                </button>
            </div>

            {/* Add Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <motion.form
                            onSubmit={handleAddProduct}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-[#131921] w-full max-w-2xl rounded-3xl border border-white/10 overflow-hidden shadow-3xl"
                        >
                            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                <h2 className="text-2xl font-black text-white tracking-tight">New Wholesale Listing</h2>
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-8 grid grid-cols-2 gap-6">
                                <div className="col-span-2 space-y-2">
                                    <label className="text-[11px] font-black text-white/30 uppercase tracking-widest">Product Name</label>
                                    <input
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full h-14 bg-white/5 rounded-xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium"
                                        placeholder="e.g. Premium Mineral Water Case"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-white/30 uppercase tracking-widest">Base Price ($)</label>
                                    <input
                                        required
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full h-14 bg-white/5 rounded-xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium"
                                        placeholder="19.99"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-white/30 uppercase tracking-widest">Initial Stock</label>
                                    <input
                                        required
                                        type="number"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full h-14 bg-white/5 rounded-xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium"
                                        placeholder="100"
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-[11px] font-black text-white/30 uppercase tracking-widest">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full h-14 bg-[#1a212c] rounded-xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium appearance-none"
                                    >
                                        {CATEGORIES_LIST.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2 p-10 bg-white/5 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 group relative cursor-pointer hover:bg-white/10 transition-colors">
                                    <Camera size={40} className="text-white/10 group-hover:text-primary transition-colors" />
                                    <p className="text-[11px] font-black text-white/20 uppercase tracking-widest">Upload High-Res Product Image</p>
                                    <p className="text-[9px] text-white/10 italic">Experimental: AI Auto-Enhancement Active</p>
                                </div>
                            </div>

                            <div className="p-8 bg-black/20 flex gap-4">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 h-14 bg-white/5 text-white font-bold rounded-xl border border-white/5 hover:bg-white/10 transition-colors">Cancel</button>
                                <button
                                    disabled={isSubmitting}
                                    className="flex-2 h-14 bg-primary text-[#131921] font-black rounded-xl px-12 shadow-xl shadow-primary/10 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
                                >
                                    {isSubmitting ? 'Publishing...' : 'Publish Listing'}
                                </button>
                            </div>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
