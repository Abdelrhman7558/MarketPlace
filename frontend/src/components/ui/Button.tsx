'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'highlight';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

        const variants = {
            primary: "bg-primary text-primary-foreground hover:bg-primary/90 premium-shadow btn-hover",
            secondary: "bg-secondary text-secondary-foreground hover:brightness-110 premium-shadow btn-hover",
            highlight: "bg-highlight text-highlight-foreground hover:brightness-110 premium-shadow btn-hover",
            outline: "border-2 border-border bg-transparent hover:bg-muted text-foreground",
            ghost: "text-muted-foreground bg-transparent hover:bg-muted hover:text-foreground shadow-none",
        };

        const sizes = {
            sm: "px-4 py-2 text-xs rounded-xl",
            md: "px-6 py-3 text-sm rounded-2xl",
            lg: "px-8 py-4 text-base rounded-[20px] font-heading",
            xl: "px-10 py-5 text-lg rounded-[24px] font-heading",
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
