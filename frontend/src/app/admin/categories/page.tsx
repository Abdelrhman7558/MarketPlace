'use client';

import React, { useState, useEffect } from 'react';
import { FolderTree, Plus, Trash2, Save, Loader2, Edit2, Check, X } from 'lucide-react';
import { fetchProducts } from '@/lib/api';
import { PRODUCTS } from '@/lib/products';

interface CategoryItem {
    name: string;
    productCount: number;
}

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setLoading(true);
        try {
            let products = await fetchProducts();
            // Fallback to local static data if API returns empty (backend offline)
            if (!products || products.length === 0) {
                products = PRODUCTS;
            }
            const categoryMap: Record<string, number> = {};
            products.forEach((p: any) => {
                const cat = p.category || 'Uncategorized';
                categoryMap[cat] = (categoryMap[cat] || 0) + 1;
            });
            const sorted = Object.entries(categoryMap)
                .map(([name, productCount]) => ({ name, productCount }))
                .sort((a, b) => b.productCount - a.productCount);
            setCategories(sorted);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        } finally {
            setLoading(false);
        }
    };

    const addCategory = () => {
        const trimmed = newCategory.trim();
        if (!trimmed) return;
        if (categories.some(c => c.name.toLowerCase() === trimmed.toLowerCase())) {
            setMessage({ type: 'error', text: 'This category already exists.' });
            return;
        }
        setCategories(prev => [...prev, { name: trimmed, productCount: 0 }]);
        setNewCategory('');
        setMessage({ type: 'success', text: `Category "${trimmed}" added. Don't forget to save!` });
    };

    const removeCategory = (index: number) => {
        if (categories[index].productCount > 0) {
            setMessage({ type: 'error', text: `Cannot delete "${categories[index].name}" — it has ${categories[index].productCount} products. Reassign products first.` });
            return;
        }
        setCategories(prev => prev.filter((_, i) => i !== index));
        setMessage({ type: 'success', text: 'Category removed.' });
    };

    const startEdit = (index: number) => {
        setEditingIndex(index);
        setEditValue(categories[index].name);
    };

    const confirmEdit = async (index: number) => {
        const trimmed = editValue.trim();
        if (!trimmed) return;
        const oldName = categories[index].name;
        if (oldName === trimmed) { setEditingIndex(null); return; }

        setSaving(true);
        try {
            const token = localStorage.getItem('bev-token');
            // Update all products with old category name to new name
            const res = await fetch('http://localhost:3005/products', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const products = await res.json();
                const toUpdate = products.filter((p: any) => p.category === oldName);
                for (const product of toUpdate) {
                    await fetch(`http://localhost:3005/products/${product.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ category: trimmed })
                    });
                }
            }
            setCategories(prev => prev.map((c, i) => i === index ? { ...c, name: trimmed } : c));
            setEditingIndex(null);
            setMessage({ type: 'success', text: `Renamed "${oldName}" → "${trimmed}" (${categories[index].productCount} products updated).` });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to rename category.' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-3xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#0F1111] flex items-center gap-2">
                    <FolderTree className="text-[#FF9900]" size={24} />
                    Categories Management
                </h1>
                <p className="text-sm text-[#555] mt-1">View, add, rename, or remove product categories.</p>
            </div>

            {/* Message */}
            {message && (
                <div className={`p-3 rounded-md border text-sm font-medium ${message.type === 'success' ? 'bg-[#F0FFF4] border-[#067D62]/30 text-[#067D62]' : 'bg-[#FCF4F4] border-[#C40000]/30 text-[#C40000]'}`}>
                    {message.text}
                </div>
            )}

            {/* Add New Category */}
            <div className="bg-white border border-[#DDD] rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-bold text-[#0F1111] mb-3">Add New Category</h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addCategory()}
                        placeholder="e.g. Beverages, Snacks..."
                        className="flex-1 border border-[#888] rounded-md px-3 py-2 text-sm outline-none focus:border-[#E77600] focus:shadow-[0_0_0_3px_rgba(228,121,17,0.5)] transition-all"
                    />
                    <button
                        onClick={addCategory}
                        className="bg-gradient-to-b from-[#F7DFA5] to-[#F0C14B] border border-[#A88734] rounded-md px-4 py-2 text-sm font-bold text-[#0F1111] hover:from-[#F5D78E] hover:to-[#EEB933] transition-all shadow-sm flex items-center gap-1.5"
                    >
                        <Plus size={16} /> Add
                    </button>
                </div>
            </div>

            {/* Categories List */}
            <div className="bg-white border border-[#DDD] rounded-lg shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-[#F3F3F3] border-b border-[#DDD]">
                    <h3 className="text-sm font-bold text-[#0F1111]">All Categories ({categories.length})</h3>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 text-[#FF9900] animate-spin" />
                    </div>
                ) : categories.length === 0 ? (
                    <div className="py-12 text-center text-[#888] text-sm">No categories found.</div>
                ) : (
                    <div className="divide-y divide-[#EAEDED]">
                        {categories.map((cat, i) => (
                            <div key={cat.name + i} className="flex items-center justify-between px-4 py-3 hover:bg-[#F9F9F9] transition-colors">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="w-8 h-8 bg-[#FEF8E8] border border-[#FF9900]/20 rounded-md flex items-center justify-center">
                                        <FolderTree size={14} className="text-[#FF9900]" />
                                    </div>
                                    {editingIndex === i ? (
                                        <input
                                            value={editValue}
                                            onChange={e => setEditValue(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && confirmEdit(i)}
                                            className="border border-[#E77600] rounded-md px-2 py-1 text-sm outline-none shadow-[0_0_0_3px_rgba(228,121,17,0.3)] flex-1 max-w-[300px]"
                                            autoFocus
                                        />
                                    ) : (
                                        <div>
                                            <span className="text-sm font-bold text-[#0F1111]">{cat.name}</span>
                                            <span className="text-xs text-[#888] ml-2">({cat.productCount} products)</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    {editingIndex === i ? (
                                        <>
                                            <button onClick={() => confirmEdit(i)} disabled={saving} className="p-1.5 rounded-md hover:bg-[#F0FFF4] text-[#067D62] transition-colors">
                                                <Check size={16} />
                                            </button>
                                            <button onClick={() => setEditingIndex(null)} className="p-1.5 rounded-md hover:bg-[#FCF4F4] text-[#C40000] transition-colors">
                                                <X size={16} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => startEdit(i)} className="p-1.5 rounded-md hover:bg-[#F3F3F3] text-[#555] transition-colors" title="Rename">
                                                <Edit2 size={14} />
                                            </button>
                                            <button onClick={() => removeCategory(i)} className="p-1.5 rounded-md hover:bg-[#FCF4F4] text-[#C40000] transition-colors" title="Delete">
                                                <Trash2 size={14} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
