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
    CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { PRODUCTS } from '@/lib/products';
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

    // In a real app, this would be filtered by session.user.id
    // Here we use a slice of mock data
    const [myProducts, setMyProducts] = React.useState<SupplierProduct[]>([
        { id: '1', name: 'Pepsi Classic Cases (x24)', price: 450, category: 'Beverages', stock: 120, status: 'ACTIVE', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pepsi_logo_2014.svg/2000px-Pepsi_logo_2014.svg.png' },
        { id: '2', name: 'Mountain Dew Cases (x12)', price: 280, category: 'Beverages', stock: 45, status: 'ACTIVE', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400' },
        { id: '3', name: 'Natural Mineral Water', price: 150, category: 'Water', stock: 0, status: 'OUT_OF_STOCK', image: 'https://images.unsplash.com/photo-1548839140-29ec703f21b7?w=400' },
    ]);

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
                {myProducts.map((product, i) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
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
                                <button className="h-10 w-10 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-lg border border-red-500/10 flex items-center justify-center transition-all">
                                    <Trash2 size={16} />
                                </button>
                                <button className="h-10 w-10 bg-white/5 hover:bg-primary hover:text-[#131921] text-white rounded-lg border border-white/5 flex items-center justify-center transition-all">
                                    <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Empty State / Add Card */}
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#131921]/50 rounded-3xl border-2 border-dashed border-white/5 h-[400px] flex flex-col items-center justify-center gap-4 group hover:border-primary/20 hover:bg-[#131921] transition-all"
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

            {/* Simple Add Modal Overlay (CSS only for speed) */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-[#131921] w-full max-w-2xl rounded-3xl border border-white/10 overflow-hidden shadow-3xl"
                        >
                            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                <h2 className="text-2xl font-black text-white tracking-tight">New Wholesale Listing</h2>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                                    <Trash2 size={24} />
                                </button>
                            </div>

                            <div className="p-8 grid grid-cols-2 gap-6">
                                <div className="col-span-2 space-y-2">
                                    <label className="text-[11px] font-black text-white/30 uppercase tracking-widest">Product Name</label>
                                    <input className="w-full h-14 bg-white/5 rounded-xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-white/30 uppercase tracking-widest">Base Price ($)</label>
                                    <input className="w-full h-14 bg-white/5 rounded-xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-white/30 uppercase tracking-widest">Initial Stock</label>
                                    <input className="w-full h-14 bg-white/5 rounded-xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium" />
                                </div>
                                <div className="col-span-2 p-10 bg-white/5 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3">
                                    <Camera size={40} className="text-white/10" />
                                    <p className="text-[11px] font-black text-white/20 uppercase tracking-widest">Upload High-Res Product Image</p>
                                </div>
                            </div>

                            <div className="p-8 bg-black/20 flex gap-4">
                                <button onClick={() => setIsAddModalOpen(false)} className="flex-1 h-14 bg-white/5 text-white font-bold rounded-xl border border-white/5">Cancel</button>
                                <button className="flex-2 h-14 bg-primary text-[#131921] font-black rounded-xl px-12 shadow-xl shadow-primary/10">Publish Listing</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
