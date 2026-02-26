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
    X,
    UploadCloud,
    FileSpreadsheet
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { PRODUCTS, CATEGORIES_LIST } from '@/lib/products';
import { cn } from '@/lib/utils';
import ProductEditorModal from '@/app/dashboard/supplier/ProductEditorModal';

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
    const [isBulkModalOpen, setIsBulkModalOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [bulkFile, setBulkFile] = React.useState<File | null>(null);
    const [bulkResults, setBulkResults] = React.useState<any>(null);
    const [previewProduct, setPreviewProduct] = React.useState<SupplierProduct | null>(null);
    const [editingProduct, setEditingProduct] = React.useState<SupplierProduct | null>(null);
    const [isEditorOpen, setIsEditorOpen] = React.useState(false);

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

    const handleSaveProduct = (productData: any) => {
        setIsSubmitting(true);

        setTimeout(() => {
            if (editingProduct) {
                // Update existing
                setMyProducts(myProducts.map(p => p.id === editingProduct.id ? {
                    ...p,
                    name: productData.name,
                    price: productData.price,
                    stock: productData.stock,
                    category: productData.category,
                    image: productData.image,
                } : p));
            } else {
                // Create new
                const newProduct: SupplierProduct = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: productData.name,
                    price: productData.price,
                    stock: productData.stock,
                    category: productData.category,
                    status: 'ACTIVE',
                    image: productData.image,
                    supplierId: user?.id || 'default-supplier'
                };
                setMyProducts([newProduct, ...myProducts]);
            }

            setIsSubmitting(false);
            setIsEditorOpen(false);
            setEditingProduct(null);
        }, 800);
    };

    const openEditModal = (product: SupplierProduct) => {
        setEditingProduct(product);
        setIsEditorOpen(true);
    };

    const handleBulkUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bulkFile) return;

        setIsSubmitting(true);
        // In a real app, this would use fetch or axios to call the backend endpoint
        // e.g. const formData = new FormData(); formData.append('file', bulkFile);
        // await fetch('/api/products/bulk-upload', { method: 'POST', body: formData, headers: { Authorization: 'Bearer ...' } });

        // Simulating the response for the UI
        setTimeout(() => {
            setBulkResults({
                totalRows: 5,
                successCount: 3,
                errorCount: 2,
                createdCount: 3,
                results: [
                    { success: true, data: { name: 'Bulk Product 1', price: 10, stock: 50, category: 'General' } },
                    { success: false, errors: ['Missing title or description.'] }
                ]
            });
            setIsSubmitting(false);

            // Add fake data to list
            const newProds = Array(3).fill(null).map((_, i) => ({
                id: Math.random().toString(36).substr(2, 9),
                name: `Bulk Upload Product ${i + 1}`,
                price: parseFloat((Math.random() * 50).toFixed(2)),
                stock: Math.floor(Math.random() * 200),
                category: CATEGORIES_LIST[i % CATEGORIES_LIST.length],
                status: 'PENDING' as any,
                image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400',
                supplierId: user?.id || 'default-supplier'
            }));
            setMyProducts([...newProds, ...myProducts]);
        }, 1500);
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
                        <h1 className="text-3xl font-black text-foreground tracking-tight">Inventory Manager</h1>
                    </div>
                    <p className="text-muted-foreground font-medium">Control your wholesale catalog and stock levels.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-12 pl-12 pr-6 bg-card rounded-xl border border-border/50 outline-none focus:border-primary/50 text-foreground text-sm w-[250px] transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setIsBulkModalOpen(true)}
                        className="h-12 px-6 bg-muted/50 text-foreground font-black text-sm rounded-xl hover:bg-muted transition-all flex items-center gap-2"
                    >
                        <UploadCloud size={18} strokeWidth={3} /> Bulk Upload
                    </button>
                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setIsEditorOpen(true);
                        }}
                        className="h-12 px-6 bg-primary text-primary-foreground font-black text-sm rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/20 flex items-center gap-2"
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
                            className="bg-card rounded-3xl border border-border/50 overflow-hidden group hover:border-primary/50 transition-all shadow-xl"
                        >
                            {/* Image Section */}
                            <div className="relative h-48 bg-muted/30 flex items-center justify-center p-8 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full object-contain mix-blend-multiply dark:mix-blend-normal transform transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4">
                                    <div className={cn(
                                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border backdrop-blur-md",
                                        product.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                            product.status === 'DRAFT' ? "bg-muted text-muted-foreground border-border/50" :
                                                product.status === 'OUT_OF_STOCK' ? "bg-destructive/10 text-destructive border-destructive/20" :
                                                    "bg-muted/50 text-muted-foreground border-border/50"
                                    )}>
                                        {product.status.replace(/_/g, ' ')}
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                                        <Tag size={10} className="text-primary" /> {product.category}
                                    </div>
                                    <h3 className="text-foreground font-bold group-hover:text-primary transition-colors truncate">{product.name}</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-muted/30 rounded-xl border border-border/50">
                                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">Price</p>
                                        <p className="text-lg font-black text-foreground">${product.price}</p>
                                    </div>
                                    <div className="p-3 bg-muted/30 rounded-xl border border-border/50">
                                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">Stock</p>
                                        <p className="text-lg font-black text-foreground">{product.stock}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <button onClick={() => openEditModal(product)} className="flex-1 h-10 bg-muted/50 hover:bg-muted text-foreground font-bold text-xs rounded-lg border border-border/50 flex items-center justify-center gap-2 transition-all">
                                        <Edit2 size={14} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="h-10 w-10 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg border border-destructive/20 flex items-center justify-center transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => setPreviewProduct(product)}
                                        className="h-10 w-10 bg-muted/50 hover:bg-primary hover:text-primary-foreground text-foreground rounded-lg border border-border/50 flex items-center justify-center transition-all"
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
                    onClick={() => {
                        setEditingProduct(null);
                        setIsEditorOpen(true);
                    }}
                    className="bg-card rounded-3xl border-2 border-dashed border-border/50 h-[410px] flex flex-col items-center justify-center gap-4 group hover:border-primary/50 hover:bg-muted/30 transition-all"
                >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary/50 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                        <Plus size={32} />
                    </div>
                    <div className="text-center">
                        <p className="text-foreground/60 font-black uppercase tracking-widest text-sm">Add New Product</p>
                        <p className="text-[10px] text-foreground/40 font-bold mt-1">List a new item to the store.</p>
                    </div>
                </button>
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
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
                        onClick={() => setPreviewProduct(null)}
                    >
                        <motion.div
                            onClick={e => e.stopPropagation()}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-card w-full max-w-5xl rounded-[40px] border border-border/50 overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
                        >
                            {/* Close Button placed absolutely */}
                            <button
                                onClick={() => setPreviewProduct(null)}
                                className="absolute top-6 right-6 z-50 w-12 h-12 bg-muted/50 backdrop-blur-md rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border border-border/50"
                            >
                                <X size={24} />
                            </button>

                            {/* Left Side: Product Image View */}
                            <div className="w-full md:w-1/2 p-12 border-b md:border-b-0 md:border-r border-border/50 bg-muted/10 flex items-center justify-center relative min-h-[400px]">
                                <img src={previewProduct.image} className="w-full h-full object-contain filter drop-shadow-xl mix-blend-multiply dark:mix-blend-normal" alt={previewProduct.name} />
                                <div className="absolute bottom-8 left-8">
                                    <div className={cn(
                                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md shadow-xl",
                                        previewProduct.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                            previewProduct.status === 'DRAFT' ? "bg-muted text-muted-foreground border-border/50" :
                                                previewProduct.status === 'OUT_OF_STOCK' ? "bg-destructive/10 text-destructive border-destructive/20" :
                                                    "bg-muted/50 text-muted-foreground border-border/50"
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
                                        <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-none">{previewProduct.name}</h2>
                                    </div>

                                    <div className="py-6 border-y border-border/50 flex items-center gap-8">
                                        <div>
                                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1 pb-1 border-b border-primary/20 inline-block">Wholesale Price</p>
                                            <p className="text-4xl font-black text-primary flex items-start gap-1">
                                                <span className="text-xl mt-1">$</span>
                                                {previewProduct.price.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="w-[1px] h-12 bg-border/50" />
                                        <div>
                                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1 pb-1">Available Stock</p>
                                            <div className="flex items-center gap-2 text-2xl font-black text-foreground">
                                                <Box size={24} className="text-muted-foreground" />
                                                {previewProduct.stock} Units
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4">
                                        <button className="w-full h-16 bg-card border border-border/50 text-foreground font-black text-lg rounded-2xl flex items-center justify-center gap-3 opacity-50 cursor-not-allowed">
                                            <DollarSign size={20} /> Preview Buy Button
                                        </button>
                                        <p className="text-center text-xs text-muted-foreground font-bold uppercase tracking-widest">
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
