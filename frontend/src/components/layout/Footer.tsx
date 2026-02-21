'use client';

import Link from 'next/link';
import { ChevronRight, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const FOOTER_COLUMNS = [
    {
        title: 'Sourcing',
        links: [
            { name: 'Browse Catalog', href: '/catalog' },
            { name: 'Daily Deals', href: '/deals' },
            { name: 'Brand Spotlights', href: '/suppliers' },
            { name: 'Bulk Wholesale', href: '/wholesale' },
        ],
    },
    {
        title: 'For Suppliers',
        links: [
            { name: 'Register as Supplier', href: '/auth/register' },
            { name: 'Partner Program', href: '/auth/register' },
            { name: 'Supplier Dashboard', href: '/dashboard/supplier' },
            { name: 'Marketing Tools', href: '/auth/register' },
        ],
    },
    {
        title: 'Customer Support',
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
        <footer className="bg-[#050B18] text-white border-t border-white/5">
            {/* Back to top - Refined style */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full bg-[#111827] hover:bg-[#1a2130] text-gray-400 hover:text-white text-xs font-black py-4 text-center cursor-pointer transition-all border-b border-white/5"
            >
                BACK TO TOP
            </button>

            {/* Main Footer Content */}
            <div className="container-wide py-16 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="font-black text-3xl tracking-tighter">Market<span className="text-[#FF7A1A]">Place</span></span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            The premier B2B wholesale marketplace for beverages and consumer goods across the region.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF7A1A] hover:text-white transition-all text-gray-400">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Columns */}
                    {FOOTER_COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h3 className="text-lg font-black mb-6 text-white uppercase tracking-wider text-sm">{col.title}</h3>
                            <ul className="space-y-4">
                                {col.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 text-sm hover:text-[#FF7A1A] transition-colors flex items-center group"
                                        >
                                            <ChevronRight size={12} className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Legal Bar */}
            <div className="border-t border-white/5 py-8 bg-[#030712]">
                <div className="container-wide px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-500 text-[11px] font-medium">
                        © 2026 BevMarket Marketplace. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-8 text-[11px] font-bold text-gray-400">
                        <Link href="#" className="hover:text-white">Conditions of Use</Link>
                        <Link href="#" className="hover:text-white">Privacy Notice</Link>
                        <Link href="#" className="hover:text-white">Cookies</Link>
                        <Link href="#" className="hover:text-white">Interest-Based Ads</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
