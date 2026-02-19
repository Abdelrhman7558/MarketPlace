'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const BRANDS = ['Pepsi', 'Coca-Cola', 'Red Bull', 'Lipton', 'Tropicana', 'Monster', 'Nestle', 'Sprite'];

const QUICK_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/' },
    { name: 'Bulk Deals', href: '/?bulk=true' },
    { name: 'About Us', href: '#' },
];

const SUPPORT_LINKS = [
    { name: 'Contact Us', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Shipping Policy', href: '#' },
    { name: 'Return Policy', href: '#' },
];

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const h = () => setShowScrollTop(window.scrollY > 500);
        window.addEventListener('scroll', h);
        return () => window.removeEventListener('scroll', h);
    }, []);

    return (
        <footer className="relative">
            {/* Brands Marquee */}
            <div className="bg-gray-50 border-y border-gray-200 py-6 overflow-hidden">
                <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
                    {[...BRANDS, ...BRANDS].map((brand, i) => (
                        <span key={i} className="text-gray-400 font-bold text-lg tracking-wide hover:text-brand-navy transition-colors cursor-pointer">
                            {brand}
                        </span>
                    ))}
                </div>
            </div>

            {/* Main Footer */}
            <div className="bg-brand-navy text-white">
                <div className="container-wide py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* About */}
                        <div className="space-y-5">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-brand-red rounded-xl flex items-center justify-center">
                                    <span className="text-white font-black text-lg">B</span>
                                </div>
                                <span className="font-extrabold text-xl">Bev<span className="text-brand-orange">Market</span></span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Your trusted wholesale beverage distribution platform. Premium brands at competitive prices for businesses.
                            </p>
                            <div className="flex gap-3">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 bg-white/10 hover:bg-brand-orange rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow-orange">
                                        <Icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-bold text-lg mb-5 relative">
                                Quick Links
                                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-orange rounded-full" />
                            </h3>
                            <ul className="space-y-3">
                                {QUICK_LINKS.map(link => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-gray-400 hover:text-brand-orange transition-colors duration-200 text-sm flex items-center gap-2 group">
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-brand-orange transition-all duration-200 rounded" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="font-bold text-lg mb-5 relative">
                                Support
                                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-orange rounded-full" />
                            </h3>
                            <ul className="space-y-3">
                                {SUPPORT_LINKS.map(link => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-gray-400 hover:text-brand-orange transition-colors duration-200 text-sm flex items-center gap-2 group">
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-brand-orange transition-all duration-200 rounded" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="font-bold text-lg mb-5 relative">
                                Stay Updated
                                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-orange rounded-full" />
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">Get the latest deals and product updates.</p>
                            <div className="flex rounded-xl overflow-hidden border border-white/10 focus-within:border-brand-orange transition-colors">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 bg-white/5 text-white placeholder:text-gray-500 px-4 py-3 outline-none text-sm"
                                />
                                <button className="bg-brand-orange hover:bg-brand-orange-hover px-5 transition-colors font-semibold text-sm whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3 text-gray-400 text-sm">
                                    <Phone className="w-4 h-4 text-brand-orange" />
                                    <span>+20 123 456 7890</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400 text-sm">
                                    <Mail className="w-4 h-4 text-brand-orange" />
                                    <span>support@bevmarket.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 py-5">
                    <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-xs">
                        <p>© 2026 BevMarket. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-6 right-6 w-12 h-12 bg-brand-orange text-white rounded-full shadow-glow-orange flex items-center justify-center transition-all duration-300 hover:scale-110 z-40 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            >
                <ArrowUp className="w-5 h-5" />
            </button>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
            `}</style>
        </footer>
    );
}
