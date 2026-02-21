'use client';

import * as React from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
    persistent?: boolean;
}

interface ToastProps extends Toast {
    onClose: (id: string) => void;
}

export const ToastItem = ({ id, message, type, persistent, onClose }: ToastProps) => {
    const icons = {
        success: <CheckCircle className="w-5 h-5 text-success" />,
        error: <AlertCircle className="w-5 h-5 text-accent" />,
        info: <Info className="w-5 h-5 text-primary" />,
        warning: <AlertCircle className="w-5 h-5 text-secondary" />,
    };

    const bgColors = {
        success: "border-success/20 bg-success/5",
        error: "border-accent/20 bg-accent/5",
        info: "border-primary/20 bg-primary/5",
        warning: "border-secondary/20 bg-secondary/5",
    };

    return (
        <div
            className={`
        flex items-center gap-3 p-4 rounded-xl border shadow-lg 
        animate-fade-in-right max-w-md w-full backdrop-blur-md
        ${bgColors[type]}
      `}
            role="alert"
            aria-live="assertive"
        >
            <div className="flex-shrink-0">{icons[type]}</div>
            <div className="flex-1 text-sm font-medium text-foreground">
                {message}
            </div>
            <button
                onClick={() => onClose(id)}
                className="text-foreground/40 hover:text-foreground transition-colors"
                aria-label="Close notification"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};
