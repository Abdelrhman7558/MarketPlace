'use client';

import Link from 'next/link';
import { ChevronRight, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, PackageSearch } from 'lucide-react';

const FOOTER_COLUMNS = [
    {
        title: 'Sourcing',
        links: [
            { name: 'Browse Categories', href: '/categories' },
            { name: 'Daily Deals', href: '/deals' },
            { name: 'Brand Spotlights', href: '/suppliers' },
            { name: 'Bulk Wholesale', href: '/wholesale' },
        ],
    },
    {
        title: 'For Suppliers',
        links: [
            { name: 'Register as Supplier', href: '/auth/register' },
            { name: 'Partner Program', href: '/auth/partner' },
            { name: 'Supplier Dashboard', href: '/dashboard/supplier' },
            { name: 'Marketing Tools', href: '/marketing' },
        ],
    },
    {
        title: 'Support',
        links: [
            { name: 'Help Center', href: '/help' },
            { name: 'Track My Order', href: '/orders' },
            { name: 'Shipping Policy', href: '/shipping' },
            { name: 'Returns & Refunds', href: '/returns' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-[#232F3E] text-white border-t border-white/10 mt-auto">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center premium-shadow group-hover:rotate-12 transition-transform duration-300">
                                <PackageSearch className="text-primary-foreground" size={24} />
                            </div>
                            <span className="font-heading font-bold text-2xl tracking-tight">
                                Atlan<span className="text-secondary">tis</span>
                            </span>
                        </Link>
                        <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                            The premier B2B wholesale platform for beverages and more, connecting global brands with local distributors as Atlantis.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Columns */}
                    {FOOTER_COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h3 className="font-heading font-bold text-sm uppercase tracking-widest mb-6 opacity-80">{col.title}</h3>
                            <ul className="space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-white/70 text-sm hover:text-primary hover:translate-x-1 transition-all flex items-center group"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 py-8 bg-[#131921]">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-white/60 text-xs font-medium">
                        © 2026 Atlantis. Built for Performance & Security.
                    </p>
                    <div className="flex items-center gap-6 text-xs font-semibold text-white/60">
                        <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
