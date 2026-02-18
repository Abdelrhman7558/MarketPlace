'use client';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/ui/Hero';

export const dynamic = 'force-dynamic';

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <Hero />

            <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                        <p>&copy; {new Date().getFullYear()} B2B Marketplace. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
