import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import ClientLayout from "@/components/layout/ClientLayout";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "BevMarket — Premium Beverage Distribution",
    description: "Your trusted B2B marketplace for Pepsi, Coca-Cola, Red Bull, Lipton and more. Wholesale beverage distribution for businesses.",
    keywords: "beverages, wholesale, B2B, Pepsi, Coca-Cola, Red Bull, Lipton, distribution",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`h-full ${poppins.variable} ${inter.variable}`}>
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
