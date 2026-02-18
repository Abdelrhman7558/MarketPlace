'use client';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
    items: {
        label: string;
        href?: string;
    }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex text-sm text-slate-500 my-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link href="/" className="hover:text-primary flex items-center">
                        <Home size={16} />
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <ChevronRight size={16} className="mx-2 text-slate-400" />
                        {item.href ? (
                            <Link href={item.href} className="hover:text-primary transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="font-medium text-slate-900">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
