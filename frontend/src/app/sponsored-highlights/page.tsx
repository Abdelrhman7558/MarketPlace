import * as React from 'react';
import { AdPlacements } from '@/components/marketplace/AdPlacements';
import AmazonNavbar from '@/components/layout/AmazonNavbar';
import Footer from '@/components/layout/Footer';

export default function SponsoredHighlightsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f5f5f5] dark:bg-[#111]">
            <AmazonNavbar />
            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 mb-8">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white">Sponsored Highlights</h1>
                    <p className="text-sm text-gray-500 mt-2">Discover premium placements from our top partners.</p>
                </div>
                {/* Reusing existing AdPlacements component for the page */}
                <AdPlacements />
            </main>
            <Footer />
        </div>
    );
}
