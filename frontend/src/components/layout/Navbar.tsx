'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';

const CATEGORIES = [
    { name: 'Beverages', items: ['Water', 'Juice', 'Soda'] },
    { name: 'Snacks', items: ['Chips', 'Nuts', 'Chocolates'] },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="font-bold text-xl text-primary">B2B Marketplace</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
