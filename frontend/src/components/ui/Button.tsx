'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

        const variants = {
            primary: "bg-primary text-primary-foreground hover:shadow-lg hover:brightness-110",
            secondary: "bg-secondary text-secondary-foreground hover:shadow-lg hover:brightness-110",
            outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/10",
            ghost: "text-primary bg-transparent hover:bg-primary/5 shadow-none",
        };

        const sizes = {
            sm: "px-4 py-1.5 text-xs",
            md: "px-6 py-2.5 text-sm",
            lg: "px-8 py-3 text-base font-bold",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
