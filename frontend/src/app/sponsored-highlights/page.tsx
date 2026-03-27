import * as React from 'react';
import { AdPlacements } from '@/components/marketplace/AdPlacements';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function SponsoredHighlightsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f5f5f5] dark:bg-[#111]">
            <Navbar />
            <main className="flex-1 py-12 pt-28">
                <div className="container mx-auto px-4 mb-8">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Atlantis Highlights</h1>
                    <p className="text-sm text-gray-500 mt-2">Discover premium placements from our top partners.</p>
                </div>
                {/* Reusing existing AdPlacements component for the page */}
                <AdPlacements />
            </main>
            <Footer />
        </div>
    );
}
