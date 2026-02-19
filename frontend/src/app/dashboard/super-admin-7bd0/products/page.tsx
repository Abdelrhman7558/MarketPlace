'use client';

import { useState, useRef } from 'react';
import { Plus, Search, Edit3, Trash2, X, Package, Check, AlertTriangle, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { PRODUCTS as INITIAL_PRODUCTS } from '@/lib/products';
import { Product } from '@/components/product/ProductCard';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

    const [form, setForm] = useState({
        name: '', brand: '', price: '', unit: 'unit', minOrder: '', image: '', inStock: true, category: '', bulkSave: false
    });

    // Image upload
    const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        setForm({ name: '', brand: '', price: '', unit: 'unit', minOrder: '', image: '', inStock: true, category: '', bulkSave: false });
        setImagePreview(null);
        setImageMode('upload');
    };

    const openAdd = () => { resetForm(); setEditProduct(null); setShowModal(true); };

    const openEdit = (p: Product) => {
        setEditProduct(p);
        setForm({
            name: p.name, brand: p.brand, price: String(p.price), unit: p.unit,
            minOrder: String(p.minOrder), image: p.image, inStock: p.inStock, category: p.category, bulkSave: p.bulkSave || false
        });
        setImagePreview(p.image);
        setImageMode('url');
        setShowModal(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setImagePreview(result);
            setForm(f => ({ ...f, image: result }));
        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        if (!form.name || !form.brand || !form.price || !form.category) return;

        const productData: Product = {
            id: editProduct?.id || Date.now().toString(),
            name: form.name, brand: form.brand, price: Number(form.price), unit: form.unit,
            minOrder: Number(form.minOrder) || 1, image: form.image || 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=400&fit=crop',
            inStock: form.inStock, category: form.category, bulkSave: form.bulkSave
        };

        if (editProduct) {
            setProducts(prev => prev.map(p => p.id === editProduct.id ? productData : p));
        } else {
            setProducts(prev => [...prev, productData]);
        }
        setShowModal(false);
        resetForm();
    };

    const handleDelete = (id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
        setShowDeleteConfirm(null);
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold text-amz-text">Products</h2>
                    <p className="text-amz-text2 text-sm">{products.length} total products</p>
                </div>
                <button
                    onClick={openAdd}
                    className="btn-amz flex items-center gap-2 text-sm !py-2.5 !px-5 !rounded-lg font-bold"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </button>
            </div>

            {/* Search */}
            <div className="flex items-center bg-white border border-[#d5d9d9] rounded-[4px] px-4 py-3 focus-within:border-amz-orange focus-within:ring-2 focus-within:ring-amz-orange/10 transition-all shadow-amz-card">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                    type="text"
                    placeholder="Search products by name or brand..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="flex-1 outline-none text-sm text-gray-700"
                />
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-[4px] border border-[#d5d9d9] shadow-amz-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs text-amz-text2 uppercase tracking-wider border-b border-[#e7e7e7] bg-[#f7f7f7]">
                                <th className="px-6 py-3 font-semibold">Product</th>
                                <th className="px-6 py-3 font-semibold">Brand</th>
                                <th className="px-6 py-3 font-semibold">Category</th>
                                <th className="px-6 py-3 font-semibold">Price</th>
                                <th className="px-6 py-3 font-semibold">Stock</th>
                                <th className="px-6 py-3 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((p, i) => (
                                <tr key={p.id} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#f7f7f7] transition-colors" style={{ animationDelay: `${i * 50}ms` }}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-[4px] bg-gray-100 overflow-hidden flex-shrink-0">
                                                <img src={p.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-sm font-medium text-amz-text truncate max-w-[200px]">{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-amz-text2">{p.brand}</td>
                                    <td className="px-6 py-4 text-sm text-amz-text2">{p.category}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-amz-text">${p.price.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {p.inStock ? 'In Stock' : 'Out'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-[4px] hover:bg-blue-50 text-gray-400 hover:text-blue-500 flex items-center justify-center transition-all">
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => setShowDeleteConfirm(p.id)} className="w-8 h-8 rounded-[4px] hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-amz-text2">
                        <Package className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm">No products found</p>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="p-5 border-b border-[#e7e7e7] flex items-center justify-between">
                            <h3 className="font-bold text-amz-text text-lg">{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-[4px] transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-5 space-y-4">
                            {[
                                { label: 'Product Name *', key: 'name', placeholder: 'e.g. Coca-Cola 330ml Case of 24' },
                                { label: 'Brand *', key: 'brand', placeholder: 'e.g. Coca-Cola' },
                                { label: 'Category *', key: 'category', placeholder: 'e.g. Soft Drinks' },
                                { label: 'Price ($) *', key: 'price', placeholder: '18.50', type: 'number' },
                                { label: 'Min Order', key: 'minOrder', placeholder: '10', type: 'number' },
                            ].map(field => (
                                <div key={field.key}>
                                    <label className="text-sm font-semibold text-amz-text block mb-1.5">{field.label}</label>
                                    <input
                                        type={field.type || 'text'}
                                        value={(form as any)[field.key]}
                                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                                        placeholder={field.placeholder}
                                        className="w-full border border-[#d5d9d9] rounded-[4px] px-3 py-2.5 text-sm outline-none focus:border-amz-orange focus:ring-2 focus:ring-amz-orange/10 transition-all"
                                    />
                                </div>
                            ))}

                            {/* Image Upload / URL Section */}
                            <div>
                                <label className="text-sm font-semibold text-amz-text block mb-2">Product Image</label>

                                {/* Mode Toggle */}
                                <div className="flex mb-3 bg-[#f0f2f2] rounded-[4px] p-0.5">
                                    <button
                                        onClick={() => setImageMode('upload')}
                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[13px] font-medium rounded-[3px] transition-all ${imageMode === 'upload'
                                            ? 'bg-white text-amz-text shadow-sm'
                                            : 'text-amz-text2 hover:text-amz-text'
                                            }`}
                                    >
                                        <Upload className="w-3.5 h-3.5" />
                                        Upload
                                    </button>
                                    <button
                                        onClick={() => setImageMode('url')}
                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[13px] font-medium rounded-[3px] transition-all ${imageMode === 'url'
                                            ? 'bg-white text-amz-text shadow-sm'
                                            : 'text-amz-text2 hover:text-amz-text'
                                            }`}
                                    >
                                        <LinkIcon className="w-3.5 h-3.5" />
                                        URL
                                    </button>
                                </div>

                                {imageMode === 'upload' ? (
                                    <div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-2 border-dashed border-[#d5d9d9] rounded-lg p-6 text-center cursor-pointer hover:border-amz-orange hover:bg-amz-orange/5 transition-all group"
                                        >
                                            {imagePreview ? (
                                                <div className="relative">
                                                    <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-md mx-auto mb-2" />
                                                    <p className="text-[12px] text-amz-text2">Click to change image</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <ImageIcon className="w-10 h-10 mx-auto mb-2 text-gray-300 group-hover:text-amz-orange transition-colors" />
                                                    <p className="text-[13px] font-medium text-amz-text2">Click to upload image</p>
                                                    <p className="text-[11px] text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <input
                                            type="text"
                                            value={form.image}
                                            onChange={e => {
                                                setForm(f => ({ ...f, image: e.target.value }));
                                                setImagePreview(e.target.value);
                                            }}
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full border border-[#d5d9d9] rounded-[4px] px-3 py-2.5 text-sm outline-none focus:border-amz-orange focus:ring-2 focus:ring-amz-orange/10 transition-all"
                                        />
                                        {imagePreview && form.image && (
                                            <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-md mt-2 border border-[#e7e7e7]"
                                                onError={() => setImagePreview(null)} />
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={form.inStock} onChange={e => setForm(f => ({ ...f, inStock: e.target.checked }))} className="w-4 h-4 accent-amz-orange" />
                                    <span className="text-sm font-medium text-gray-700">In Stock</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={form.bulkSave} onChange={e => setForm(f => ({ ...f, bulkSave: e.target.checked }))} className="w-4 h-4 accent-amz-orange" />
                                    <span className="text-sm font-medium text-gray-700">Bulk Save</span>
                                </label>
                            </div>
                        </div>
                        <div className="p-5 border-t border-[#e7e7e7] flex gap-3 justify-end">
                            <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-[4px] transition-colors border border-[#d5d9d9]">Cancel</button>
                            <button onClick={handleSave} className="btn-amz text-sm flex items-center gap-2 !py-2.5 !px-5 !rounded-lg font-bold">
                                <Check className="w-4 h-4" />
                                {editProduct ? 'Save Changes' : 'Add Product'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteConfirm(null)}>
                    <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full p-6 text-center" onClick={e => e.stopPropagation()}>
                        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-7 h-7 text-red-500" />
                        </div>
                        <h3 className="font-bold text-amz-text text-lg mb-2">Delete Product?</h3>
                        <p className="text-amz-text2 text-sm mb-6">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 px-4 py-2.5 text-sm font-medium border border-[#d5d9d9] rounded-[4px] hover:bg-gray-50 transition-colors">Cancel</button>
                            <button onClick={() => handleDelete(showDeleteConfirm)} className="flex-1 bg-red-600 text-white text-sm font-bold py-2.5 rounded-[4px] hover:bg-red-700 transition-colors">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
