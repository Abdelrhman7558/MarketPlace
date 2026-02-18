'use client';
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { slideInRight } from '@/lib/motion';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto dismiss
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-toast flex flex-col gap-2 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={slideInRight}
                            layout
                            className={`
                pointer-events-auto min-w-[300px] p-4 rounded-lg shadow-lg border-l-4
                bg-white text-slate-800 flex items-center justify-between
                ${toast.type === 'success' ? 'border-status-success' : ''}
                ${toast.type === 'error' ? 'border-status-error' : ''}
                ${toast.type === 'info' ? 'border-status-info' : ''}
              `}
                        >
                            <div className="flex items-center gap-3">
                                {/* Icon based on type */}
                                {toast.type === 'success' && <div className="h-2 w-2 rounded-full bg-status-success" />}
                                {toast.type === 'error' && <div className="h-2 w-2 rounded-full bg-status-error" />}
                                {toast.type === 'info' && <div className="h-2 w-2 rounded-full bg-status-info" />}
                                <span className="text-sm font-medium">{toast.message}</span>
                            </div>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="text-slate-400 hover:text-slate-600 ml-4"
                            >
                                ✕
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
