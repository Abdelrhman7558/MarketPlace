import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
    title: "BevMarket — Premium Beverage Distribution",
    description: "Your trusted B2B marketplace for Pepsi, Coca-Cola, Red Bull, Lipton and more. Wholesale beverage distribution for businesses.",
    keywords: "beverages, wholesale, B2B, Pepsi, Coca-Cola, Red Bull, Lipton, distribution",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full overflow-x-hidden">
            <body className="flex flex-col min-h-screen font-sans">
                <Providers>
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </Providers>
            </body>
        </html>
    );
}
