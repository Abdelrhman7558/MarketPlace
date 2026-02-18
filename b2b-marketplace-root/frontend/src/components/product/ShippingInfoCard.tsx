import { Truck, ShieldCheck, CalendarRange } from 'lucide-react';

export default function ShippingInfoCard() {
    return (
        <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-4">
            <div className="flex items-start gap-3">
                <Truck className="text-primary mt-1" size={20} />
                <div>
                    <h4 className="font-bold text-sm text-slate-900">Free Shipping</h4>
                    <p className="text-xs text-slate-500">On bulk orders over $500</p>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <CalendarRange className="text-primary mt-1" size={20} />
                <div>
                    <h4 className="font-bold text-sm text-slate-900">Estimated Delivery</h4>
                    <p className="text-xs text-slate-500">3-5 Business Days</p>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <ShieldCheck className="text-primary mt-1" size={20} />
                <div>
                    <h4 className="font-bold text-sm text-slate-900">Supplier Verified</h4>
                    <p className="text-xs text-slate-500">Member since 2024</p>
                </div>
            </div>
        </div>
    );
}
