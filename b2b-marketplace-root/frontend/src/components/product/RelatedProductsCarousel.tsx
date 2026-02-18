'use client';
import ProductCard from '@/components/product/ProductCard';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RelatedProductsProps {
    products: any[]; // Using any for MVP mock data integration simplicity
}

export default function RelatedProductsCarousel({ products }: RelatedProductsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="py-12 border-t border-slate-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Related Products</h2>
                <div className="flex gap-2">
                    <button onClick={() => scroll('left')} className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => scroll('right')} className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {products.map((product) => (
                    <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-center">
                        <ProductCard {...product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
