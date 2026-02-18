'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// eslint-disable-next-line @next/next/no-img-element
// Using standard img for MVP mock images

interface ProductGalleryProps {
    images: string[];
    title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div
                className="relative bg-white rounded-xl border border-slate-200 aspect-square flex items-center justify-center overflow-hidden cursor-zoom-in"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
            >
                <motion.div
                    className="w-full h-full flex items-center justify-center p-8"
                    animate={{ scale: isZoomed ? 1.5 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <img
                        src={images[activeIndex]}
                        alt={title}
                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                    />
                </motion.div>

                {/* Badges could go here */}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`
              relative w-20 h-20 flex-shrink-0 bg-white rounded-lg border-2 p-2
              ${activeIndex === idx ? 'border-primary' : 'border-transparent hover:border-slate-300'}
              transition-colors
            `}
                    >
                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                    </button>
                ))}
            </div>
        </div>
    );
}
