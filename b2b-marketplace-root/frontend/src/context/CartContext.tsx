'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    supplierId: string;
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) {
            setItems(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addItem = (newItem: CartItem) => {
        setItems((prev) => {
            const exists = prev.find((i) => i.id === newItem.id);
            if (exists) {
                return prev.map((i) =>
                    i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
                );
            }
            return [...prev, newItem];
        });
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
