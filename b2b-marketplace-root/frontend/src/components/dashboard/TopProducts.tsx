'use client';

import { TrendingUp, ShoppingBag } from 'lucide-react';

const products = [
    { id: 1, name: 'Coca-Cola Zero 330ml', category: 'Beverages', sales: '1,240', revenue: 'EGP 12,400', trend: '+12%' },
    { id: 2, name: 'Juhayna Mix Choco', category: 'Dairy', sales: '850', revenue: 'EGP 4,250', trend: '+5%' },
    { id: 3, name: 'Molto Magnum', category: 'Snacks', sales: '620', revenue: 'EGP 3,100', trend: '+8%' },
    { id: 4, name: 'Crystal Oil 1L', category: 'Cooking', sales: '450', revenue: 'EGP 22,500', trend: '-2%' },
    { id: 5, name: 'Persil Gel 3L', category: 'Home Care', sales: '210', revenue: 'EGP 18,900', trend: '+15%' },
];

export default function TopProducts() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-full">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600">
                        <ShoppingBag size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Top Products</h3>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>

            <div className="flex-1 overflow-auto p-0">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 font-medium border-b border-slate-100 dark:border-slate-700">
                        <tr>
                            <th className="px-6 py-3">Product</th>
                            <th className="px-6 py-3 text-right">Revenue</th>
                            <th className="px-6 py-3 text-right">Trend</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-800 dark:text-slate-200">{product.name}</div>
                                    <div className="text-xs text-slate-500">{product.category} • {product.sales} sold</div>
                                </td>
                                <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                                    {product.revenue}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`text-xs px-2 py-1 rounded-full ${product.trend.startsWith('+')
                                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                        {product.trend}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
