'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowRight, ShieldCheck, Zap, Package,
    TrendingUp, Globe, Users, BarChart3,
    ChevronRight, Star
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';

const FEATURES = [
    {
        title: "Direct Sourcing",
        description: "Connect directly with global beverage brands and authorized regional distributors.",
        icon: Package,
        color: "primary"
    },
    {
        title: "Secure Payments",
        description: "Enterprise-grade escrow and secure transaction handling for all bulk orders.",
        icon: ShieldCheck,
        color: "accent"
    },
    {
        title: "Fast Logistics",
        description: "Optimized supply chain routes ensuring your stock arrives on time, every time.",
        icon: Zap,
        color: "secondary"
    },
    {
        title: "Market Insights",
        description: "Real-time pricing data and demand trends to help you make better buying decisions.",
        icon: BarChart3,
        color: "highlight"
    }
];

const BRANDS = [
    { name: "Pepsi", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pepsi_logo_2014.svg/2000px-Pepsi_logo_2014.svg.png" },
    { name: "Coca-Cola", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/2560px-Coca-Cola_logo.svg.png" },
    { name: "Red Bull", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Red_Bull_new_logo.svg/1200px-Red_Bull_new_logo.svg.png" },
    { name: "Lipton", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Lipton_logo.svg/1200px-Lipton_logo.svg.png" },
    { name: "Nestle", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nestle_logo.svg/2560px-Nestle_logo.svg.png" }
];

export default function Home() {
    return (
        <div className="flex flex-col gap-24 pb-24">
            {/* ========== HERO SECTION ========== */}
            <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-primary overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 20, repeat: Infinity }}
                        className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
                        transition={{ duration: 25, repeat: Infinity }}
                        className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[100px]"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                            <span className="text-sm font-bold text-white uppercase tracking-widest">Global Wholesale Platform</span>
                        </div>

                        <h1 className="text-white leading-[1.05]">
                            Digitizing the <span className="text-secondary">Beverage</span> Supply Chain
                        </h1>

                        <p className="text-xl text-white/70 max-w-xl leading-relaxed">
                            BevMarket is the premier B2B marketplace for global beverage brands. Connect with verified suppliers, secure bulk pricing, and optimize your inventory in one platform.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button className="h-16 px-10 rounded-2xl bg-secondary hover:bg-secondary/90 text-secondary-foreground font-black text-lg btn-hover premium-shadow">
                                Explore Marketplace <ArrowRight className="ml-2" size={20} />
                            </Button>
                            <Button variant="outline" className="h-16 px-10 rounded-2xl border-white/20 text-white hover:bg-white/10 font-bold text-lg">
                                Become a Supplier
                            </Button>
                        </div>

                        <div className="flex items-center gap-8 pt-8">
                            <div className="flex flex-col">
                                <span className="text-3xl font-black text-white">50k+</span>
                                <span className="text-sm text-white/50 font-bold uppercase tracking-wider">Suppliers</span>
                            </div>
                            <div className="h-10 w-px bg-white/10" />
                            <div className="flex flex-col">
                                <span className="text-3xl font-black text-white">$2B+</span>
                                <span className="text-sm text-white/50 font-bold uppercase tracking-wider">Volume</span>
                            </div>
                            <div className="h-10 w-px bg-white/10" />
                            <div className="flex items-center gap-1">
                                <Star className="text-secondary fill-secondary" size={20} />
                                <span className="text-xl font-black text-white mx-1">4.9</span>
                                <span className="text-sm text-white/50 font-medium">Rating</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        className="hidden lg:block relative"
                    >
                        <div className="relative z-10 bg-white dark:bg-card p-4 rounded-[40px] premium-shadow border border-white/20 max-w-[500px] mx-auto">
                            <img
                                src="https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800"
                                className="rounded-[32px] w-full h-[600px] object-cover"
                                alt="Wholesale Distribution"
                            />

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -right-12 top-20 bg-white/90 dark:bg-card/90 backdrop-blur-md p-6 rounded-3xl border border-border premium-shadow max-w-[200px]"
                            >
                                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center mb-3">
                                    <TrendingUp className="text-white" size={20} />
                                </div>
                                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Weekly Growth</p>
                                <p className="text-2xl font-black text-foreground">+28.5%</p>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                                className="absolute -left-12 bottom-20 bg-white/90 dark:bg-card/90 backdrop-blur-md p-6 rounded-3xl border border-border premium-shadow"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                                                <Users size={16} className="m-auto mt-2 opacity-50" />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-sm font-bold leading-tight">Join 2,400+<br /><span className="text-muted-foreground font-medium">distributors</span></p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ========== BRAND SPOTLIGHT ========== */}
            <section className="container mx-auto px-6 overflow-hidden">
                <div className="flex flex-col gap-12 text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-primary">Trusted by Global Brand Leaders</h2>
                    <p className="text-muted-foreground text-lg">Direct partnerships with the world's most recognized beverage manufacturers and authorized distributors.</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                    {BRANDS.map(brand => (
                        <img key={brand.name} src={brand.logo} alt={brand.name} className="h-10 lg:h-14 object-contain" />
                    ))}
                </div>
            </section>

            {/* ========== FEATURES SECTION ========== */}
            <section className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURES.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 rounded-3xl bg-muted/30 border border-transparent hover:border-primary/10 hover:bg-white dark:hover:bg-card hover:premium-shadow transition-all duration-300"
                        >
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300",
                                feature.color === 'primary' && "bg-primary/10 text-primary",
                                feature.color === 'secondary' && "bg-secondary/10 text-secondary",
                                feature.color === 'accent' && "bg-accent/10 text-accent",
                                feature.color === 'highlight' && "bg-highlight/10 text-highlight"
                            )}>
                                <feature.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ========== PRODUCT PREVIEW ========== */}
            <section className="bg-muted/30 py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div className="space-y-4">
                            <h2 className="text-primary uppercase tracking-tighter text-sm font-black italic">Collection 2026</h2>
                            <h2 className="max-w-xl">Premium Beverage Catalog</h2>
                        </div>
                        <Link href="/categories" className="flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all">
                            View Entire Collection <ChevronRight size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {PRODUCTS.slice(0, 5).map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== FINAL CTA ========== */}
            <section className="container mx-auto px-6">
                <div className="relative bg-primary rounded-[48px] p-12 md:p-24 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-white rounded-full blur-[120px]" />
                    </div>

                    <div className="relative z-10 max-w-3xl space-y-8">
                        <h2 className="text-white text-4xl md:text-6xl font-black leading-tight">Ready to scale your supply chain?</h2>
                        <p className="text-white/70 text-xl leading-relaxed">
                            Join the fastest growing B2B marketplace for beverages. Verified suppliers, direct pricing, and enterprise security.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button className="h-16 px-12 rounded-2xl bg-secondary text-secondary-foreground font-black text-xl btn-hover">
                                Join BevMarket
                            </Button>
                            <Button variant="outline" className="h-16 px-12 rounded-2xl border-white/20 text-white hover:bg-white/10 font-bold text-xl">
                                Contact Sales
                            </Button>
                        </div>
                    </div>

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -right-20 -bottom-20 w-80 h-80 opacity-5 hidden lg:block"
                    >
                        <Globe size={320} className="text-white" />
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
