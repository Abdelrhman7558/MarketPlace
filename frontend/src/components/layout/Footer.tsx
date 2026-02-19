'use client';

import Link from 'next/link';

const FOOTER_COLUMNS = [
    {
        title: 'Get to Know Us',
        links: [
            { name: 'About BevMarket', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Press Releases', href: '#' },
            { name: 'BevMarket Science', href: '#' },
        ],
    },
    {
        title: 'Make Money with Us',
        links: [
            { name: 'Sell on BevMarket', href: '/auth/register' },
            { name: 'Become a Supplier', href: '/auth/register' },
            { name: 'Advertise Your Products', href: '#' },
            { name: 'Become an Affiliate', href: '#' },
        ],
    },
    {
        title: 'BevMarket Payment',
        links: [
            { name: 'Business Credit Line', href: '#' },
            { name: 'Shop with Points', href: '#' },
            { name: 'Reload Your Balance', href: '#' },
            { name: 'Currency Converter', href: '#' },
        ],
    },
    {
        title: 'Let Us Help You',
        links: [
            { name: 'Your Account', href: '/auth/login' },
            { name: 'Your Orders', href: '#' },
            { name: 'Shipping Rates & Policies', href: '#' },
            { name: 'Returns & Replacements', href: '#' },
            { name: 'Help', href: '#' },
        ],
    },
];

export default function Footer() {
    return (
        <footer>
            {/* Back to top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full bg-amz-dark3 hover:bg-[#485769] text-white text-[13px] py-[15px] text-center cursor-pointer transition-colors"
            >
                Back to top
            </button>

            {/* Main Footer Links */}
            <div className="bg-amz-dark2 text-white">
                <div className="container-amz py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[900px] mx-auto">
                        {FOOTER_COLUMNS.map((col) => (
                            <div key={col.title}>
                                <h3 className="text-[16px] font-bold mb-3">{col.title}</h3>
                                <ul className="space-y-[6px]">
                                    {col.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-[#DDD] text-[13px] hover:underline hover:text-white"
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

                {/* Divider */}
                <div className="border-t border-[#3a4553]">
                    <div className="container-amz py-6 flex flex-col items-center gap-3">
                        <Link href="/" className="text-white font-bold text-[18px] hover:no-underline">
                            Bev<span className="text-amz-orange">Market</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-amz-dark text-[#999] text-[11px]">
                <div className="container-amz py-3 text-center space-y-1">
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <a href="#" className="hover:underline hover:text-white">Conditions of Use</a>
                        <a href="#" className="hover:underline hover:text-white">Privacy Notice</a>
                        <a href="#" className="hover:underline hover:text-white">Interest-Based Ads</a>
                    </div>
                    <p>© 2026, BevMarket.com, Inc. or its affiliates</p>
                </div>
            </div>
        </footer>
    );
}
