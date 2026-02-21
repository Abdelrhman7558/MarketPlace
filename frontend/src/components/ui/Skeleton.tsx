'use client';

import { cn } from "@/lib/utils"; // Assuming a utility exists, else I'll define a simple one

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'rectangular' | 'circle' | 'text' | 'card';
}

export const Skeleton = ({ className, variant = 'rectangular', ...props }: SkeletonProps) => {
    const baseStyles = "bg-border/50 animate-pulse-slow overflow-hidden relative";

    const variants = {
        rectangular: "rounded-lg",
        circle: "rounded-full",
        text: "rounded h-4 w-full",
        card: "rounded-xl h-64",
    };

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${className || ''}`}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent -translate-x-full animate-shimmer" />
        </div>
    );
};

// Specialized Variants as planned
export const ProductCardSkeleton = () => (
    <div className="space-y-4 w-full">
        <Skeleton variant="card" />
        <div className="space-y-2">
            <Skeleton variant="text" className="w-3/4" />
            <Skeleton variant="text" className="w-1/2" />
        </div>
        <div className="flex justify-between items-center">
            <Skeleton variant="text" className="w-20" />
            <Skeleton variant="rectangular" className="h-10 w-24" />
        </div>
    </div>
);

export const OrderRowSkeleton = () => (
    <div className="flex items-center gap-4 w-full p-4 border border-border rounded-lg">
        <Skeleton variant="rectangular" className="w-12 h-12 flex-shrink-0" />
        <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-1/4" />
            <Skeleton variant="text" className="w-1/3" />
        </div>
        <Skeleton variant="rectangular" className="w-24 h-8" />
    </div>
);
