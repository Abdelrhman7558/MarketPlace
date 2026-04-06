'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, ThumbsUp, Trash2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';

interface Review {
    id: string;
    rating: number;
    comment?: string;
    createdAt: string;
    user: { id: string; name: string; companyName?: string; avatar?: string };
}

const API_URL = '/api';

function StarRating({ value, onChange, size = 20 }: { value: number; onChange?: (v: number) => void; size?: number }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange?.(star)}
                    onMouseEnter={() => onChange && setHovered(star)}
                    onMouseLeave={() => onChange && setHovered(0)}
                    className={onChange ? 'cursor-pointer' : 'cursor-default'}
                    disabled={!onChange}
                >
                    <Star
                        size={size}
                        className={star <= (hovered || value) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}
                    />
                </button>
            ))}
        </div>
    );
}

export default function ReviewSection({ productId, onReviewSubmitted }: { productId: string; onReviewSubmitted?: (newRating: number, newCount: number) => void }) {
    const { user, isLoggedIn } = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [myRating, setMyRating] = useState(0);
    const [myComment, setMyComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const load = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/products/${productId}/reviews`);
            if (res.ok) setReviews(await res.json());
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => { load(); }, [load]);

    // Pre-fill if user already reviewed
    useEffect(() => {
        if (!user) return;
        const mine = reviews.find(r => r.user.id === user.id);
        if (mine) { setMyRating(mine.rating); setMyComment(mine.comment || ''); }
    }, [reviews, user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation: If no rating is selected, show an error and stop.
        if (!myRating) {
            setError('يرجى اختيار تقييم بالنجوم لإرسال مراجعتك'); 
            return; 
        }
        
        setError('');
        setSubmitting(true);
        
        try {
            const token = localStorage.getItem('bev-token');
            if (!token) {
                setError('يجب تسجيل الدخول لإضافة تقييم');
                return;
            }

            const res = await fetch(`${API_URL}/products/${productId}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ rating: myRating, comment: myComment }),
            });

            if (!res.ok) { 
                let msg = 'فشل إرسال التقييم';
                try {
                    const errorData = await res.json();
                    msg = errorData.message || msg;
                } catch (e) {}
                setError(msg); 
                return; 
            }

            // Successful submission: Reload reviews and notify parent
            await load();
            
            // Re-calculate totals from current reviews list after load() finishes
            // Note: reviews state might not be updated within the same function execution 
            // after load() completes due to React batching, so we fetch once more to be safe.
            const updatedRes = await fetch(`${API_URL}/products/${productId}/reviews`);
            if (updatedRes.ok) {
                const latestReviews = await updatedRes.json();
                const avg = latestReviews.length > 0 
                    ? latestReviews.reduce((s: any, r: any) => s + r.rating, 0) / latestReviews.length 
                    : 0;
                onReviewSubmitted?.(avg, latestReviews.length);
            }
            
        } catch (err) {
            console.error('Review submission error:', err);
            setError('حدث خطأ في الاتصال، يرجى المحاولة مرة أخرى');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (reviewId: string) => {
        const token = localStorage.getItem('bev-token');
        await fetch(`${API_URL}/products/${productId}/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        await load();
    };

    const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
    const dist = [5, 4, 3, 2, 1].map(s => ({ star: s, count: reviews.filter(r => r.rating === s).length }));

    return (
        <div className="mt-12 border-t border-slate-100 pt-10">
            <h2 className="text-2xl font-black text-[#0A1A2F] mb-8">التقييمات والمراجعات</h2>

            {/* Summary */}
            {reviews.length > 0 && (
                <div className="flex gap-10 mb-10 p-6 bg-slate-50 rounded-2xl">
                    <div className="text-center">
                        <div className="text-5xl font-black text-[#0A1A2F]">{avgRating.toFixed(1)}</div>
                        <StarRating value={Math.round(avgRating)} size={16} />
                        <div className="text-xs text-slate-400 mt-1">{reviews.length} تقييم</div>
                    </div>
                    <div className="flex-1 space-y-1.5">
                        {dist.map(({ star, count }) => (
                            <div key={star} className="flex items-center gap-2 text-xs">
                                <span className="w-4 text-slate-500">{star}</span>
                                <Star size={12} className="fill-amber-400 text-amber-400" />
                                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-amber-400 rounded-full transition-all"
                                        style={{ width: reviews.length ? `${(count / reviews.length) * 100}%` : '0%' }}
                                    />
                                </div>
                                <span className="w-4 text-slate-400">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Write Review */}
            {isLoggedIn ? (
                <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-2xl p-6 mb-8 shadow-sm">
                    <h3 className="font-black text-[#0A1A2F] mb-4">
                        {reviews.find(r => r.user.id === user?.id) ? 'تعديل تقييمك' : 'اكتب تقييمك'}
                    </h3>
                    {error && <p className="text-red-600 text-sm mb-3 font-bold">{error}</p>}
                    <div className="mb-4">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">تقييمك</label>
                        <StarRating value={myRating} onChange={setMyRating} size={28} />
                    </div>
                    <textarea
                        value={myComment}
                        onChange={e => setMyComment(e.target.value)}
                        placeholder="شاركنا رأيك في هذا المنتج... (اختياري)"
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm text-[#0A1A2F] outline-none focus:border-[#FF8A00]/40 transition resize-none mb-4"
                    />
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-8 py-3 bg-[#0A1A2F] hover:bg-[#FF8A00] text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                    >
                        {submitting ? 'جاري الإرسال...' : 'إرسال التقييم'}
                    </button>
                </form>
            ) : (
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 mb-8 text-center">
                    <p className="text-slate-600 font-bold mb-4">يرجى تسجيل الدخول لتتمكن من إضافة تقييم لهذا المنتج</p>
                    <button
                        onClick={() => window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)}
                        className="px-6 py-2 bg-[#0A1A2F] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#FF8A00] transition-all"
                    >
                        تسجيل الدخول
                    </button>
                </div>
            )}

            {/* Reviews List */}
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />)}
                </div>
            ) : reviews.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                    <ThumbsUp size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="font-bold">لا توجد تقييمات بعد — كن أول من يقيّم!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#0A1A2F]/10 flex items-center justify-center font-black text-[#0A1A2F] text-sm shrink-0">
                                        {review.user.name?.[0]?.toUpperCase() || '?'}
                                    </div>
                                    <div>
                                        <p className="font-black text-[#0A1A2F] text-sm">{review.user.companyName || review.user.name}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <StarRating value={review.rating} size={13} />
                                            <span className="text-xs text-slate-400">
                                                {new Date(review.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {user?.id === review.user.id && (
                                    <button onClick={() => handleDelete(review.id)} className="text-slate-300 hover:text-red-500 transition-colors shrink-0">
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                            {review.comment && (
                                <p className="mt-3 text-sm text-slate-600 leading-relaxed ps-13">{review.comment}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
