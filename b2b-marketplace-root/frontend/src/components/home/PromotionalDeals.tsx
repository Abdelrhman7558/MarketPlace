'use client';
import DealCard from './DealCard';

const DEALS = [
    {
        id: 'deal-1',
        title: 'Coca-Cola Zero Sugar, 330ml Can (Pallet Deal)',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=500',
        originalPrice: 18.50,
        offerPrice: 14.80,
        savings: 3.70,
        unitPrice: 0.61,
        minOrder: 50,
        stock: 3,
        endsIn: '04:12:00',
        badgeText: '-20% Pallet Deal'
    },
    {
        id: 'deal-2',
        title: 'Nestle Pure Life Water, 500ml (Truckload Special)',
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=500',
        originalPrice: 4.50,
        offerPrice: 3.85,
        savings: 0.65,
        unitPrice: 0.32,
        minOrder: 100,
        stock: 8,
        endsIn: '08:45:20',
        badgeText: 'Bulk Savings'
    },
    {
        id: 'deal-3',
        title: 'Red Bull Energy Drink, 250ml (Wholesale Pack)',
        image: 'https://images.unsplash.com/photo-1598614187854-26a60e982dc4?auto=format&fit=crop&q=80&w=500',
        originalPrice: 32.00,
        offerPrice: 28.50,
        savings: 3.50,
        unitPrice: 1.18,
        minOrder: 20,
        stock: 5,
        endsIn: '01:30:15',
        badgeText: 'Hot Offer'
    },
    {
        id: 'deal-4',
        title: 'Lipton Yellow Label Tea (Institutional Pack)',
        image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=500',
        originalPrice: 8.90,
        offerPrice: 7.10,
        savings: 1.80,
        unitPrice: 0.07,
        minOrder: 10,
        stock: 45,
        endsIn: '12:00:00',
        badgeText: '-18%'
    }
];

export default function PromotionalDeals() {
    return (
        <section className="py-8 bg-white border-y border-slate-100 mb-8">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <h2 className="text-2xl font-bold text-slate-900">Today&apos;s Wholesale Deals</h2>
                    <p className="text-sm text-slate-500">Special pallet pricing – Limited stock available</p>
                    <div className="sm:ml-auto">
                        <a href="/deals" className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                            View all deals &rarr;
                        </a>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {DEALS.map(deal => (
                        <DealCard key={deal.id} {...deal} />
                    ))}
                </div>

            </div>
        </section>
    );
}
