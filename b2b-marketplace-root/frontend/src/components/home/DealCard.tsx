'use client';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/ToastProvider';
import { useCart } from '@/context/CartContext';

interface DealCardProps {
    id: string;
    title: string;
    image: string;
    originalPrice: number;
    offerPrice: number;
    savings: number;
    unitPrice: number;
    minOrder: number;
    stock: number;
    endsIn: string; // e.g., "02:14:36"
    badgeText: string;
}

export default function DealCard({
    id,
    title,
    image,
    originalPrice,
    offerPrice,
    savings,
    unitPrice,
    minOrder,
    stock,
    endsIn,
    badgeText
}: DealCardProps) {
    const { showToast } = useToast();
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addItem({
            id,
            name: title,
            price: offerPrice,
            quantity: minOrder,
            supplierId: 'sup-1',
        });

        showToast(`Added deal to cart`, 'success');
    };

    const discountPercentage = Math.round(((originalPrice - offerPrice) / originalPrice) * 100);

    return (
        <article className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full relative">
            <Link href={`/products/${id}`} className="flex flex-col h-full">

                {/* Badge */}
                <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded shadow-sm">
                    {badgeText || `-${discountPercentage}%`}
                </div>

                {/* Image Block */}
                <div className="relative aspect-square w-full bg-white p-4 flex items-center justify-center border-b border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">

                    {/* Title */}
                    <h3 className="text-[14px] font-medium text-slate-900 leading-[1.4] mb-2 line-clamp-2 h-[2.8em]" title={title}>
                        {title}
                    </h3>

                    {/* Price Section */}
                    <div className="mb-2">
                        <div className="flex items-baseline gap-2">
                            <span className="text-xs text-slate-400 font-normal line-through">${originalPrice.toFixed(2)}</span>
                            <span className="text-[18px] font-bold text-slate-900">${offerPrice.toFixed(2)}</span>
                        </div>
                        <div className="text-[11px] text-green-600 font-medium">
                            Save ${savings.toFixed(2)}/unit
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                            ${unitPrice.toFixed(3)} / unit • Full pallet only
                        </div>
                    </div>

                    {/* Urgency / Stock */}
                    <div className="mt-auto pt-3 border-t border-slate-100">
                        <div className="flex justify-between items-center text-[11px] font-medium mb-1.5">
                            <span className="text-red-600">Ends in {endsIn}</span>
                            <span className="text-slate-500">Only {stock} Left</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-orange-500 h-full rounded-full w-[70%]" />
                        </div>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={handleAddToCart}
                        className="mt-3 w-full bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-medium py-2 rounded flex items-center justify-center gap-2 transition-colors"
                    >
                        <ShoppingCart size={14} />
                        Request Offer
                    </button>
                </div>
            </Link>
        </article>
    );
}
