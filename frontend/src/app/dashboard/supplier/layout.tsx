import Sidebar from '@/components/dashboard/Sidebar';

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar role="supplier" />
            <main className="flex-1 overflow-y-auto">
                <div className="container-wide p-8 pb-20">
                    {children}
                </div>
            </main>
        </div>
    );
}
