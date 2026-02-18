'use client';

import { useState } from 'react';
import { Plus, Tag, Calendar, X, Save, Trash2, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/ToastProvider';

interface Offer {
    id: number;
    title: string;
    discount: string;
    code: string;
    product: string;
    start: string;
    ends: string;
    placement: string;
}

export const dynamic = 'force-dynamic';

export default function OffersPage() {
    const { showToast } = useToast();
    const [showModal, setShowModal] = useState(false);

    // Mock Offers
    const [offers, setOffers] = useState<Offer[]>([
        { id: 1, title: 'Summer Sale', discount: '20% OFF', code: 'SUMMER20', product: 'All Products', start: '2023-06-01T09:00', ends: '2023-12-31T23:59', placement: 'Home Page' },
        { id: 2, title: 'Bulk Logic', discount: 'Buy 10 Get 1 Free', code: 'BULK10', product: 'Beverages', start: '2023-01-15T00:00', ends: '2023-11-15T23:59', placement: 'Catalog' },
    ]);

    const [formData, setFormData] = useState<Omit<Offer, 'id'>>({
        title: '', discount: '', product: '', code: '', start: '', ends: '', placement: 'Home Page'
    });

    const handleAddOffer = (e: React.FormEvent) => {
        e.preventDefault();
        setOffers([...offers, { id: Date.now(), ...formData }]);
        setShowModal(false);
        setFormData({ title: '', discount: '', product: '', code: '', start: '', ends: '', placement: 'Home Page' });
        showToast('Offer created successfully!', 'success');
    };

    const handleDeleteOffer = (id: number) => {
        if (confirm('Are you sure you want to delete this offer?')) {
            setOffers(offers.filter(o => o.id !== id));
            showToast('Offer deleted', 'success');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Offers & Promotions</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage special deals and discounts.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    <span>Create Offer</span>
                </button>
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <div key={offer.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg font-bold z-10">
                            {offer.code}
                        </div>

                        {/* Delete Button */}
                        <button
                            onClick={() => handleDeleteOffer(offer.id)}
                            className="absolute top-3 left-3 text-slate-400 hover:text-red-500 transition-colors bg-white/50 backdrop-blur rounded-full p-1"
                            title="Delete Offer"
                        >
                            <Trash2 size={16} />
                        </button>

                        <div className="flex items-center mb-4 text-primary">
                            <Tag size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{offer.title}</h3>
                        <p className="text-2xl font-bold text-green-600 mb-2">{offer.discount}</p>

                        <div className="space-y-1 text-sm text-slate-500 dark:text-slate-400 mb-4">
                            <p>Applies to: {offer.product}</p>
                            <p className="flex items-center gap-1.5"><MapPin size={14} /> {offer.placement}</p>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-3">
                            <div className="flex items-center gap-1">
                                <Clock size={12} /> Start: {new Date(offer.start).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar size={12} /> End: {new Date(offer.ends).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Offer Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md p-6 scale-100 transition-transform">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New Offer</h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddOffer} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Offer Title</label>
                                <input required type="text" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Discount</label>
                                    <input required type="text" placeholder="20% OFF" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none" value={formData.discount} onChange={e => setFormData({ ...formData, discount: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Promo Code</label>
                                    <input required type="text" placeholder="CODE123" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Target Product</label>
                                <input required type="text" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none" value={formData.product} onChange={e => setFormData({ ...formData, product: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Placement</label>
                                <select className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none" value={formData.placement} onChange={e => setFormData({ ...formData, placement: e.target.value })}>
                                    <option value="Home Page">Home Page</option>
                                    <option value="Catalog">Catalog</option>
                                    <option value="Checkout">Checkout</option>
                                    <option value="Popup">Popup</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                                    <input required type="datetime-local" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm" value={formData.start} onChange={e => setFormData({ ...formData, start: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                                    <input required type="datetime-local" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm" value={formData.ends} onChange={e => setFormData({ ...formData, ends: e.target.value })} />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark mt-4 flex justify-center items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                                <Save size={18} /> Save Offer
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
