import Link from 'next/link';
import { ShieldCheck, Truck, CreditCard, HelpCircle } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 pt-12 pb-6 mt-12">
            {/* Trust Signals */}
            <div className="container mx-auto px-4 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                        <ShieldCheck className="text-accent h-8 w-8" />
                        <div>
                            <h4 className="font-bold text-slate-900">Secure Payments</h4>
                            <p className="text-xs text-slate-500">100% protected transactions</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                        <Truck className="text-accent h-8 w-8" />
                        <div>
                            <h4 className="font-bold text-slate-900">Fast Shipping</h4>
                            <p className="text-xs text-slate-500">Reliable logistics partners</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                        <CreditCard className="text-accent h-8 w-8" />
                        <div>
                            <h4 className="font-bold text-slate-900">Flexible Credit</h4>
                            <p className="text-xs text-slate-500">Net 30/60 terms available</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                        <HelpCircle className="text-accent h-8 w-8" />
                        <div>
                            <h4 className="font-bold text-slate-900">24/7 Support</h4>
                            <p className="text-xs text-slate-500">Dedicated account managers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Links */}
            <div className="container mx-auto px-4 border-t border-slate-100 pt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h5 className="font-bold text-slate-900 mb-4">Marketplace</h5>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="/catalog" className="hover:text-primary">Browse All</Link></li>
                            <li><Link href="/brands" className="hover:text-primary">Top Brands</Link></li>
                            <li><Link href="/deals" className="hover:text-primary">Bulk Deals</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-slate-900 mb-4">Account</h5>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="/dashboard" className="hover:text-primary">My Dashboard</Link></li>
                            <li><Link href="/orders" className="hover:text-primary">Order History</Link></li>
                            <li><Link href="/settings" className="hover:text-primary">Settings</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-slate-900 mb-4">Support</h5>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="/help" className="hover:text-primary">Help Center</Link></li>
                            <li><Link href="/returns" className="hover:text-primary">Returns Policy</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-slate-900 mb-4">Legal</h5>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-xs text-slate-400 pt-8 border-t border-slate-100">
                    &copy; {new Date().getFullYear()} B2B Marketplace. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
