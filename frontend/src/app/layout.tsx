import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import ClientLayout from "@/components/layout/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "B2B Marketplace",
    description: "A premium platform for B2B beverage transactions",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full">
            <body className={`${inter.className} flex flex-col min-h-screen`}>
                <Providers>
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </Providers>
            </body>
        </html>
    );
}
