'use client';

import { useState, useRef } from 'react';
import { useProducts, Product } from '@/context/ProductContext';
import { Plus, Trash2, Edit2, Search, X, Eye, Upload, Image as ImageIcon, Package } from 'lucide-react';
import { useToast } from '@/components/ui/ToastProvider';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ManagerProductsPage() {
    const { products, deleteProduct, addProduct, updateProduct } = useProducts();
    const { showToast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        brand: '',
        price: '',
        stock: '',
        description: '',
        images: [] as string[]
    });

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"? This will remove it from the Marketplace immediately.`)) {
            deleteProduct(id);
            showToast('Product deleted successfully', 'success');
        }
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setFormData({ title: '', brand: '', price: '', stock: '', description: '', images: [] });
        setIsModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title,
            brand: product.brand,
            price: product.price.toString(),
            stock: product.stock.toString(),
            description: product.description,
            images: product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : [])
        });
        setIsModalOpen(true);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImages: string[] = [];
            Array.from(e.target.files).forEach(file => {
                // Simulate Upload - Create local URL
                const objectUrl = URL.createObjectURL(file);
                newImages.push(objectUrl);
            });
            setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
        }
    };

    const handleRemoveImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title: formData.title,
            brand: formData.brand,
            description: formData.description || 'No description',
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            minOrder: 1,
            images: formData.images,
            image: formData.images[0] // Set main image as first one
        };

        if (editingProduct) {
            updateProduct(editingProduct.id, payload);
            showToast('Product updated successfully', 'success');
        } else {
            addProduct(payload);
            showToast('Product added to Marketplace', 'success');
        }

        setIsModalOpen(false);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Products Inventory</h1>
                    <p className="text-slate-500">Manage your catalog items. Changes reflect immediately.</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    <span>Add New Product</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-slate-100 flex items-center gap-4">
                <Search className="text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search by name or brand..."
                    className="flex-1 outline-none text-slate-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 text-sm border-b border-slate-200">
                                <th className="p-4 font-semibold uppercase tracking-wider">Product</th>
                                <th className="p-4 font-semibold uppercase tracking-wider">Brand</th>
                                <th className="p-4 font-semibold uppercase tracking-wider">Price</th>
                                <th className="p-4 font-semibold uppercase tracking-wider">Stock</th>
                                <th className="p-4 font-semibold uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-md bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                                            {product.image ? (
                                                <img src={product.image} alt="" className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-slate-300">
                                                    <Package size={16} /> // Assuming Package icon imported or use fallback
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{product.title}</p>
                                            <p className="text-xs text-slate-500">SKU: {product.id.slice(0, 6)}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-600">{product.brand}</td>
                                    <td className="p-4 font-medium text-slate-900">${product.price.toFixed(2)}</td>
                                    <td className="p-4">
                                        {product.stock > 0 ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {product.stock} in stock
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                Out of stock
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Preview Button */}
                                            <Link
                                                href={`/products/${product.id}`}
                                                target="_blank"
                                                className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                                                title="Preview Product"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <button
                                                onClick={() => openEditModal(product)}
                                                className="text-slate-400 hover:text-primary transition-colors p-1"
                                                title="Edit Product"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id, product.title)}
                                                className="text-slate-400 hover:text-red-600 transition-colors p-1"
                                                title="Delete Product"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal (Add or Edit) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Images Section */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Product Images</label>

                                <div className="grid grid-cols-4 gap-2 mb-3">
                                    {formData.images.map((img, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                                            <img src={img} alt="" className="h-full w-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(idx)}
                                                className="absolute top-1 right-1 bg-white/80 p-0.5 rounded-full text-red-500 hover:text-red-700 hover:bg-white"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-slate-300 text-slate-400 hover:border-primary hover:text-primary transition-colors bg-slate-50"
                                    >
                                        <Upload size={20} />
                                        <span className="text-xs mt-1">Upload</span>
                                    </button>
                                </div>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                />

                                <div className="flex items-center gap-2">
                                    <input
                                        type="url"
                                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="Or add Image URL..."
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                const val = e.currentTarget.value;
                                                if (val) {
                                                    setFormData(prev => ({ ...prev, images: [...prev.images, val] }));
                                                    e.currentTarget.value = '';
                                                }
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200"
                                        title="Paste URL"
                                    >
                                        <ImageIcon size={18} />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Product Title</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    placeholder="e.g. Mountain Dew 330ml"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Brand</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="e.g. PepsiCo"
                                        value={formData.brand}
                                        onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
                                    <input
                                        required
                                        type="number"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="0"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
                                <input
                                    required
                                    type="number"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none h-24 resize-none"
                                    placeholder="Product details..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark shadow-md"
                                >
                                    {editingProduct ? 'Save Changes' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
