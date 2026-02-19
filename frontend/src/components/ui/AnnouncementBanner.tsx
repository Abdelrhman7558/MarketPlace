'use client';

import { useState } from 'react';
import { X, Zap, Truck, Tag, Gift } from 'lucide-react';

const announcements = [
    { icon: <Zap className="w-4 h-4" />, text: "🔥 Flash Sale: 25% OFF on all Energy Drinks — Limited Time!" },
    { icon: <Truck className="w-4 h-4" />, text: "🚚 FREE Shipping on Orders Over $500 — No Code Needed" },
    { icon: <Tag className="w-4 h-4" />, text: "💰 New Bulk Pricing: Save up to 40% on Case Orders" },
    { icon: <Gift className="w-4 h-4" />, text: "🎁 First Order? Get $50 OFF with Code: WELCOME50" },
];

export default function AnnouncementBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="announcement-banner relative py-2.5">
            <div className="announcement-text">
                {[...announcements, ...announcements].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 text-white font-semibold text-sm">
                        {item.icon}
                        {item.text}
                    </span>
                ))}
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 bg-white/10 rounded-full p-1"
                aria-label="Dismiss"
            >
                <X className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}
