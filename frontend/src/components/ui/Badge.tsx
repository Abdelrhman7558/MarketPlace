'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'success' | 'destructive' | 'outline' | 'accent';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
    const variants = {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary/10 text-secondary border border-secondary/20",
        success: "bg-success/10 text-success border border-success/20",
        destructive: "bg-destructive/10 text-destructive border border-destructive/20",
        accent: "bg-accent/10 text-accent border border-accent/20",
        outline: "text-foreground border border-border",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-black uppercase tracking-tight transition-colors",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}

export { Badge };
