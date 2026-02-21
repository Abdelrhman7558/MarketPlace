'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastItem, ToastType } from './Toast';

interface ToastContextType {
    showToast: (message: string, options?: { type?: ToastType; duration?: number; persistent?: boolean }) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback((
        message: string,
        options: { type?: ToastType; duration?: number; persistent?: boolean } = {}
    ) => {
        const id = Math.random().toString(36).substring(2, 9);
        const { type = 'info', duration = 4000, persistent = false } = options;

        const newToast: Toast = { id, message, type, duration, persistent };

        setToasts((prev) => [...prev, newToast]);

        if (!persistent) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ showToast, removeToast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <ToastItem {...toast} onClose={removeToast} />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
