import Sidebar from '@/components/dashboard/Sidebar';

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar role="buyer" />
            <main className="flex-1 overflow-y-auto">
                <div className="container-wide p-8 pb-20">
                    {children}
                </div>
            </main>
        </div>
    );
}
