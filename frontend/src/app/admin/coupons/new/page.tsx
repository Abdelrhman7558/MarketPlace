'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Ticket, ArrowLeft, Percent, Calendar, CheckCircle2, Box, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Placement {
    id: string;
    status: string;
    product: {
        id: string;
        name: string;
        price: number;
    };
    price: number;
    startDate: string;
    endDate: string;
}

export default function CreateCouponPage() {
    const router = useRouter();
    const [placements, setPlacements] = useState<Placement[]>([]);
    const [isLoadingPlacements, setIsLoadingPlacements] = useState(true);

    const [selectedPlacementId, setSelectedPlacementId] = useState('');
    const [code, setCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlacements = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const res = await fetch('http://localhost:3005/placements', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    setPlacements(data.filter((p: Placement) => p.status === 'ACTIVE'));
                }
            } catch (err) {
                console.error("Failed to fetch placements:", err);
            } finally {
                setIsLoadingPlacements(false);
            }
        };

        fetchPlacements();
    }, []);

    const handleGenerateRandomCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCode(result);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:3005/coupons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    placementId: selectedPlacementId,
                    code: code.toUpperCase(),
                    discountPercent: parseFloat(discountPercent),
                    expirationDate: expirationDate
                })
            });

            if (res.ok) {
                router.push('/admin/coupons');
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to create coupon.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-8">
            {/* Header */}
            <div>
                <Link href="/admin/coupons" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest">
                    <ArrowLeft size={16} /> Back to Coupons
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
                            <Ticket className="text-secondary w-10 h-10" />
                            Launch Coupon
                        </h1>
                        <p className="text-white/40 font-medium mt-2 text-lg">Attach exclusive discounts to your active Product Offers.</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#131921] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
                {/* Decorative background blur */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none -mr-40 -mt-40" />

                <div className="relative z-10 space-y-10">
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-medium flex justify-center items-center">
                            {error}
                        </div>
                    )}

                    {/* Offer Selection */}
                    <div className="space-y-4">
                        <label className="text-xs font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <Box size={14} /> Connect to Offer (Placement)
                        </label>
                        {isLoadingPlacements ? (
                            <div className="h-16 bg-white/5 animate-pulse rounded-2xl w-full border border-white/5" />
                        ) : (
                            <div className="relative group">
                                <select
                                    required
                                    value={selectedPlacementId}
                                    onChange={(e) => setSelectedPlacementId(e.target.value)}
                                    className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 text-white appearance-none outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium"
                                >
                                    <option value="" disabled className="bg-black text-white/50">Select an active offer...</option>
                                    {placements.map(p => (
                                        <option key={p.id} value={p.id} className="bg-[#131921] text-white py-2">
                                            {p.product?.name || 'Unknown Product'} - ${p.product?.price}
                                        </option>
                                    ))}
                                </select>
                                <Tag size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-secondary pointer-events-none transition-colors" />
                            </div>
                        )}
                        {placements.length === 0 && !isLoadingPlacements && (
                            <p className="text-sm text-red-400 mt-2">You don't have any active offers available right now.</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Coupon Code */}
                        <div className="space-y-4">
                            <label className="text-xs font-black text-white/40 uppercase tracking-widest flex justify-between items-center">
                                <span className="flex items-center gap-2"><Ticket size={14} /> Promotional Code</span>
                                <button type="button" onClick={handleGenerateRandomCode} className="text-secondary hover:text-white transition-colors">
                                    Generate Random
                                </button>
                            </label>
                            <div className="relative group">
                                <input
                                    required
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                                    className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 text-2xl font-black text-white uppercase outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                                    placeholder="SUMMER24"
                                />
                                <Ticket size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-secondary transition-colors" />
                            </div>
                        </div>

                        {/* Discount Percentage */}
                        <div className="space-y-4">
                            <label className="text-xs font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                                <Percent size={14} /> Discount Percentage
                            </label>
                            <div className="relative group">
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    max="100"
                                    step="1"
                                    value={discountPercent}
                                    onChange={(e) => setDiscountPercent(e.target.value)}
                                    className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 text-2xl font-black text-white outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                                    placeholder="20"
                                />
                                <Percent size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-secondary transition-colors" />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 font-bold">% OFF</span>
                            </div>
                        </div>
                    </div>

                    {/* Expiration Date */}
                    <div className="space-y-4">
                        <label className="text-xs font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <Calendar size={14} /> Expiration Date
                        </label>
                        <div className="relative group">
                            <input
                                required
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                                className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 text-white outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium custom-calendar-icon"
                            />
                            <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-secondary transition-colors pointer-events-none" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8 border-t border-white/5">
                        <button
                            type="submit"
                            disabled={isSubmitting || placements.length === 0}
                            className="w-full h-16 bg-secondary text-white font-black text-xl rounded-2xl hover:scale-[1.02] transition-transform shadow-2xl shadow-secondary/20 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                                    Generating...
                                </div>
                            ) : (
                                <>
                                    <CheckCircle2 size={24} />
                                    Publish Coupon
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.form>
        </div>
    );
}
