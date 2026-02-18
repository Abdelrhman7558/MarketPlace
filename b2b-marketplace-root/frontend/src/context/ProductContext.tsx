'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define Product Type
export type Product = {
    id: string;
    title: string;
    brand: string;
    price: number;
    stock: number;
    minOrder: number;
    description: string;
    category?: string;
    subcategory?: string;
    images?: string[]; // Array of strings for images
    image?: string;    // Fallback single image
    sku?: string;
    supplier?: {
        user: {
            email: string;
        }
    }
};

// Initial Mock Data
const INITIAL_PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Coca-Cola Original Taste, 330ml Can (Case of 24)',
        brand: 'Coca-Cola',
        category: 'Beverages',
        subcategory: 'Soft Drinks',
        price: 18.50,
        minOrder: 10,
        stock: 150,
        description: 'Enjoy the refreshing taste of Coca-Cola Original Taste. This 330ml can serves the perfect amount of refreshment for your customers. Ideal for restaurants, cafes, and vending machines.',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=500',
        images: ['https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=500'],
        sku: 'BEV-CC-330-24'
    },
    {
        id: '2',
        title: 'Red Bull Energy Drink, 250ml (Case of 24)',
        brand: 'Red Bull',
        category: 'Beverages',
        subcategory: 'Energy Drinks',
        price: 32.00,
        minOrder: 5,
        stock: 80,
        description: 'Red Bull Energy Drink is appreciated worldwide by top athletes, students, and in highly demanding professions as well as during long drives.',
        image: 'https://images.unsplash.com/photo-1598614187854-26a60e982dc4?auto=format&fit=crop&q=80&w=500',
        images: ['https://images.unsplash.com/photo-1598614187854-26a60e982dc4?auto=format&fit=crop&q=80&w=500'],
        sku: 'BEV-RB-250-24'
    },
    {
        id: '3',
        title: 'Pepsi Max No Sugar, 330ml Can (Case of 24)',
        brand: 'Pepsi',
        category: 'Beverages',
        subcategory: 'Soft Drinks',
        price: 17.50,
        minOrder: 10,
        stock: 200,
        description: 'Maximum Taste, No Sugar. Pepsi Max is the fizz-popping, taste-rocking, sugar-free soda that gets you on your way.',
        image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&q=80&w=500',
        images: ['https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&q=80&w=500'],
        sku: 'BEV-PM-330-24'
    },
    {
        id: '4',
        title: 'Nestle Pure Life Water, 500ml (Pack of 12)',
        brand: 'Nestle',
        category: 'Beverages',
        subcategory: 'Water',
        price: 4.50,
        minOrder: 20,
        stock: 500,
        description: 'Nestlé Pure Life Bottled Water comes in a convenient 500ml bottle, perfect for on-the-go hydration.',
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=500',
        images: ['https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=500'],
        sku: 'BEV-NP-500-12'
    },
    {
        id: '5',
        title: 'Lipton Yellow Label Tea Bags (Pack of 100)',
        brand: 'Lipton',
        category: 'Beverages',
        subcategory: 'Tea & Coffee',
        price: 8.90,
        minOrder: 5,
        stock: 100,
        description: 'Lipton Yellow Label Tea Bags are made from the finest tea leaves, delivering a rich and awakening taste.',
        image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=500',
        images: ['https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=500'],
        sku: 'BEV-LY-100-PK'
    },
    {
        id: '6',
        title: 'Monster Energy Green, 500ml (Case of 12)',
        brand: 'Monster',
        category: 'Beverages',
        subcategory: 'Energy Drinks',
        price: 22.00,
        minOrder: 5,
        stock: 40,
        description: 'Tear into a can of the meanest energy drink on the planet, Monster Energy.',
        image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&q=80&w=500',
        images: ['https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&q=80&w=500'],
        sku: 'BEV-ME-500-12'
    },
    {
        id: '7',
        title: 'Tropicana Orange Juice, 1L (Case of 6)',
        brand: 'Tropicana',
        category: 'Beverages',
        subcategory: 'Juices',
        price: 18.00,
        minOrder: 5,
        stock: 0,
        description: '100% Pure Orange Juice with no added sugar.',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=500',
        images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=500'],
        sku: 'BEV-TO-1L-6'
    },
    {
        id: '8',
        title: 'Evian Natural Mineral Water, 500ml (Case of 24)',
        brand: 'Evian',
        category: 'Beverages',
        subcategory: 'Water',
        price: 24.50,
        minOrder: 5,
        stock: 60,
        description: 'Evian Natural Mineral Water from the French Alps.',
        image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&q=80&w=500',
        images: ['https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&q=80&w=500'],
        sku: 'BEV-EV-500-24'
    },
];

type ProductContextType = {
    products: Product[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    getProduct: (id: string) => Product | undefined;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

    // Persist to local storage to simulate backend persistence in demo mode
    useEffect(() => {
        const stored = localStorage.getItem('demo_products');
        if (stored) {
            setProducts(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('demo_products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product: Omit<Product, 'id'>) => {
        const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
        setProducts(prev => [newProduct, ...prev]);
    };

    const updateProduct = (id: string, updatedData: Partial<Product>) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    };

    const deleteProduct = (id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const getProduct = (id: string) => {
        return products.find(p => p.id === id);
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}
