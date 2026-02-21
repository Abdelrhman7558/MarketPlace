'use client';

import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label className="text-sm font-semibold text-foreground/80 ml-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`
            w-full bg-input border border-border rounded-lg px-4 py-2.5 
            text-sm text-foreground placeholder:text-foreground/40 
            focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring 
            transition-all duration-200
            ${error ? 'border-accent ring-accent/20' : ''}
            ${className || ''}
          `}
                    {...props}
                />
                {error ? (
                    <p className="text-xs font-medium text-accent ml-1 animate-fade-in">
                        {error}
                    </p>
                ) : helperText ? (
                    <p className="text-xs text-foreground/50 ml-1">
                        {helperText}
                    </p>
                ) : null}
            </div>
        );
    }
);

Input.displayName = "Input";
