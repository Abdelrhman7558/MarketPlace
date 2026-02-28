import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import ClientLayout from "@/components/layout/ClientLayout";
import { Toaster } from 'react-hot-toast';

const inter = Inter({

    const inter = Inter({
        subsets: ["latin"],
        variable: "--font-inter",
        display: "swap",
    });

    const poppins = Poppins({
        subsets: ["latin"],
        weight: ["400", "500", "600", "700"],
        variable: "--font-poppins",
        display: "swap",
    });

    export const metadata: Metadata = {
        title: "Atlantis — Premium Beverage Distribution",
        description: "Your trusted B2B Atlantis for Pepsi, Coca-Cola, Red Bull, Lipton and more. Wholesale beverage distribution for businesses.",
    };

    export default function RootLayout({
        children,
    }: {
        children: React.ReactNode;
    }) {
    return(
        <html lang = "en" className = {`${inter.variable} ${poppins.variable} h-full`} suppressHydrationWarning >
<body className="flex flex-col min-h-screen font-sans bg-background text-foreground transition-colors duration-300">
    <Providers>
        <ClientLayout>
            {children}
        </ClientLayout>
    </Providers>
</body>
        </html >
    );
}
