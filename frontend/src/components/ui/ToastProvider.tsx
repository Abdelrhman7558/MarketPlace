'use client';

import { createContext, useContext, useState } from 'react';

const ToastContext = createContext<any>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<any[]>([]);

    const showToast = (message: string, type: 'success' | 'error') => {
        console.log(type, message);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
