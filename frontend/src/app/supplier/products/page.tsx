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
    status: 'ACTIVE' | 'DRAFT' | 'OUT_OF_STOCK' | 'DELETED';
    image: string;
    supplierId: string;
}

export default function SupplierProductsPage() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState<string>('https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400');
    const [previewProduct, setPreviewProduct] = React.useState<SupplierProduct | null>(null);

    // Form State
    const [formData, setFormData] = React.useState({
        name: '',
        price: '',
        stock: '',
        category: CATEGORIES_LIST[0],
        status: 'ACTIVE' as 'ACTIVE' | 'DRAFT'
    });

    // Initialize with products that match the current user's supplierId
    // STRICT ISOLATION: Only show products where supplierId === user.id
    const [myProducts, setMyProducts] = React.useState<SupplierProduct[]>(() => {
        // Seed some data for the current user
        return PRODUCTS.slice(0, 5).map((p, idx) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            category: p.category || 'General',
            stock: 100 + (idx * 15),
            status: idx === 0 ? 'DRAFT' : 'ACTIVE',
            image: p.image,
            supplierId: user?.id || 'default-supplier'
        }));
    });

    const filteredProducts = myProducts.filter(p =>
        p.status !== 'DELETED' && (
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            const newProduct: SupplierProduct = {
                id: Math.random().toString(36).substr(2, 9),
                name: formData.name,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                category: formData.category,
                status: formData.status as any,
                image: imagePreview,
                supplierId: user?.id || 'default-supplier'
            };

            setMyProducts([newProduct, ...myProducts]);
            setIsSubmitting(false);
            setIsAddModalOpen(false);
            setFormData({ name: '', price: '', stock: '', category: CATEGORIES_LIST[0], status: 'ACTIVE' });
        }, 800);
    };

    const handleDeleteProduct = (id: string) => {
        if (confirm('Move this product to archives (Soft Delete)?')) {
            // SOFT DELETE: Change status instead of removing from DB
            setMyProducts(myProducts.map(p => p.id === id ? { ...p, status: 'DELETED' } : p));
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
                                            product.status === 'DRAFT' ? "bg-white/5 text-white/60 border-white/10" :
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
                                    <button
                                        onClick={() => setPreviewProduct(product)}
                                        className="h-10 w-10 bg-white/5 hover:bg-primary hover:text-[#131921] text-white rounded-lg border border-white/5 flex items-center justify-center transition-all"
                                    >
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
                            className="bg-[#131921] w-full max-w-5xl rounded-[40px] border border-white/10 overflow-hidden shadow-3xl flex flex-col md:flex-row"
                        >
                            {/* Left Side: Image Upload */}
                            <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-white/5 bg-black/20 flex flex-col items-center justify-center relative group cursor-pointer hover:bg-white/5 transition-colors min-h-[400px]">
                                {imagePreview ? (
                                    <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="Preview" />
                                ) : (
                                    <Camera size={48} className="text-white/10 group-hover:text-primary transition-colors mb-4" />
                                )}
                                <div className="z-10 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 flex items-center gap-2">
                                    <Camera size={16} className="text-primary" />
                                    <span className="text-xs font-black text-white uppercase tracking-widest">Upload Product Image</span>
                                </div>
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) setImagePreview(URL.createObjectURL(file));
                                    }}
                                />
                            </div>

                            {/* Right Side: Form Details */}
                            <div className="w-full md:w-1/2 flex flex-col">
                                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-black text-white tracking-tight">New Listing</h2>
                                        <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">Product Details</p>
                                    </div>
                                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="p-8 space-y-6 flex-1 overflow-y-auto no-scrollbar">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-white/30 uppercase tracking-widest">Product Name</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full h-14 bg-white/5 rounded-xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium"
                                            placeholder="e.g. Premium Mineral Water Case"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
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
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-white/30 uppercase tracking-widest">Pricing Model</label>
                                        <select
                                            value={formData.status}
                                            onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                                            className="w-full h-14 bg-white/5 rounded-xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium appearance-none cursor-pointer"
                                        >
                                            <option value="ACTIVE" className="bg-[#1A222C]">Market Ready (Active)</option>
                                            <option value="DRAFT" className="bg-[#1A222C]">Draft Mode (Hidden)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="p-8 border-t border-white/5 bg-white/[0.02] flex gap-4">
                                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 h-14 bg-white/5 text-white font-bold rounded-xl border border-white/5 hover:bg-white/10 transition-colors">Cancel</button>
                                    <button
                                        disabled={isSubmitting}
                                        className="flex-[2] h-14 bg-primary text-[#131921] font-black rounded-xl px-8 shadow-xl shadow-primary/10 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? 'Publishing...' : <><CheckCircle2 size={18} /> Publish Listing</>}
                                    </button>
                                </div>
                            </div>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Preview Modal */}
            <AnimatePresence>
                {previewProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
                        onClick={() => setPreviewProduct(null)}
                    >
                        <motion.div
                            onClick={e => e.stopPropagation()}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-[#131921] w-full max-w-5xl rounded-[40px] border border-white/10 overflow-hidden shadow-3xl flex flex-col md:flex-row relative"
                        >
                            {/* Close Button placed absolutely */}
                            <button
                                onClick={() => setPreviewProduct(null)}
                                className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
                            >
                                <X size={24} />
                            </button>

                            {/* Left Side: Product Image View */}
                            <div className="w-full md:w-1/2 p-12 border-b md:border-b-0 md:border-r border-white/5 bg-white/5 flex items-center justify-center relative min-h-[400px]">
                                <img src={previewProduct.image} className="w-full h-full object-contain filter drop-shadow-2xl mix-blend-normal" alt={previewProduct.name} />
                                <div className="absolute bottom-8 left-8">
                                    <div className={cn(
                                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md shadow-xl",
                                        previewProduct.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                            previewProduct.status === 'DRAFT' ? "bg-white/5 text-white/60 border-white/10" :
                                                previewProduct.status === 'OUT_OF_STOCK' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                                    "bg-white/5 text-white/40 border-white/10"
                                    )}>
                                        STATUS: {previewProduct.status.replace(/_/g, ' ')}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Buyer View Details */}
                            <div className="w-full md:w-1/2 flex flex-col justify-center p-10 lg:p-14 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none -mr-20 -mt-20" />

                                <div className="relative z-10 space-y-8">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                                            <Tag size={12} /> {previewProduct.category}
                                        </div>
                                        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">{previewProduct.name}</h2>
                                    </div>

                                    <div className="py-6 border-y border-white/10 flex items-center gap-8">
                                        <div>
                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1 pb-1 border-b border-primary/20 inline-block">Wholesale Price</p>
                                            <p className="text-4xl font-black text-primary flex items-start gap-1">
                                                <span className="text-xl mt-1">$</span>
                                                {previewProduct.price.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="w-[1px] h-12 bg-white/10" />
                                        <div>
                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1 pb-1">Available Stock</p>
                                            <div className="flex items-center gap-2 text-2xl font-black text-white">
                                                <Box size={24} className="text-white/40" />
                                                {previewProduct.stock} Units
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4">
                                        <button className="w-full h-16 bg-white border border-white/20 text-black font-black text-lg rounded-2xl flex items-center justify-center gap-3 opacity-50 cursor-not-allowed">
                                            <DollarSign size={20} /> Preview Buy Button
                                        </button>
                                        <p className="text-center text-xs text-white/30 font-bold uppercase tracking-widest">
                                            This is exactly how buyers view your listing.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}
