import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ProductsPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <Link
                    href="/dashboard/supplier/products/add"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Add Product
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="p-4 text-center text-gray-500">
                    {/* Populate with real data later */}
                    No products found (Fetch logic to be added)
                </div>
            </div>
        </div>
    );
}
