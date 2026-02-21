'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Star, Plus, Minus, Check, Truck,
    ShieldCheck, RotateCcw, ChevronRight, Share2,
    Heart, Info, Package, Sparkles, ArrowLeft, ShoppingCart
} from 'lucide-react';
import { PRODUCTS, type Product } from '@/lib/products';
import { useCart } from '@/lib/cart';
import ProductCard from '@/components/product/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function ProductDetailClient() {
    const { id } = useParams();
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const router = useRouter();

    const product = PRODUCTS.find(p => p.id === id);
    const relatedProducts = PRODUCTS.filter(p => p.id !== id && p.category === product?.category).slice(0, 4);

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 bg-muted rounded-[32px] flex items-center justify-center mx-auto mb-8">
                        <Package className="text-muted-foreground" size={40} />
                    </div>
                    <h2 className="text-3xl font-heading font-black mb-4">Product Not Found</h2>
                    <p className="text-muted-foreground mb-8 text-lg">The product you're looking for might have been moved or discontinued.</p>
                    <Link href="/categories">
                        <Button size="lg" className="rounded-2xl font-black">
                            Back to Inventory
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const handleAdd = () => {
        addItem({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            unit: product.unit,
        }, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2500);
    };

    return (
        <div className="min-h-screen bg-background pb-24 overflow-x-hidden">
            {/* Upper Nav / Breadcrumbs */}
            <div className="bg-card border-b border-border/50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <nav className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={10} className="text-muted-foreground/30" />
                        <Link href="/categories" className="hover:text-primary transition-colors">Inventory</Link>
                        <ChevronRight size={10} className="text-muted-foreground/30" />
                        <span className="text-foreground truncate max-w-[150px]">{product.name}</span>
                    </nav>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-[10px] font-bold text-foreground uppercase tracking-widest hover:text-primary transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to browsing
                    </button>
                </div>
            </div>

            <main className="container mx-auto px-6 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left Column: Visuals */}
                    <div className="lg:col-span-7 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-card rounded-[48px] p-12 lg:p-20 border border-border/50 flex items-center justify-center relative group overflow-hidden min-h-[500px] md:min-h-[700px] premium-shadow"
                        >
                            {/* Background Effects */}
                            <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-colors duration-700" />
                            <div className="absolute bottom-10 left-10 w-48 h-48 bg-secondary/5 rounded-full blur-[80px]" />

                            <motion.img
                                layoutId={`product-img-${product.id}`}
                                src={product.image}
                                alt={product.name}
                                className="max-w-full max-h-[550px] object-contain relative z-10 transition-transform duration-1000 group-hover:scale-110 drop-shadow-2xl"
                            />

                            {/* Floating Badges */}
                            <div className="absolute top-12 left-12 flex flex-col gap-4 z-20">
                                {(product as any).isNew && (
                                    <span className="bg-primary text-primary-foreground text-[10px] font-black px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 tracking-widest uppercase">
                                        <Sparkles size={14} className="text-secondary" />
                                        Batch: New Arrival
                                    </span>
                                )}
                                {(product as any).bulkSave && (
                                    <span className="bg-highlight text-highlight-foreground text-[10px] font-black px-5 py-2.5 rounded-full shadow-xl tracking-widest uppercase flex items-center gap-2">
                                        <Truck size={14} />
                                        Wholesale Verified
                                    </span>
                                )}
                            </div>

                            <button className="absolute bottom-12 right-12 w-16 h-16 bg-card border border-border/50 rounded-3xl flex items-center justify-center shadow-xl text-muted-foreground hover:text-highlight hover:scale-110 transition-all z-20 hover:premium-shadow">
                                <Heart size={24} />
                            </button>
                        </motion.div>

                        {/* Thumbnails (Simulated) */}
                        <div className="grid grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="aspect-square bg-card rounded-3xl border border-border/50 p-6 hover:border-primary/50 cursor-pointer transition-all flex items-center justify-center group premium-shadow-sm overflow-hidden">
                                    <img src={product.image} className="max-h-full object-contain opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Info & Actions */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-10"
                        >
                            {/* Brand & Title */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 px-4 py-1.5 rounded-full flex items-center gap-2">
                                        <span className="text-primary font-black text-[10px] uppercase tracking-widest">Global Sourcing</span>
                                        <ShieldCheck size={14} className="text-accent" />
                                    </div>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-heading font-black text-foreground leading-[1.05] tracking-tight">{product.name}</h1>
                                <div className="flex items-center gap-6 text-[11px] font-bold text-muted-foreground tracking-widest uppercase">
                                    <span className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50 text-foreground">
                                        {product.brand} • Authorized Partner
                                    </span>
                                    <span className="flex items-center gap-1.5"><Star size={16} className="fill-secondary text-secondary" /> <span className="text-foreground">4.9</span> (5k+ Total Volume)</span>
                                </div>
                            </div>

                            {/* Pricing Card */}
                            <div className="bg-card rounded-[40px] p-10 border border-border/50 premium-shadow relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-[100px] transition-all group-hover:w-full group-hover:h-full group-hover:rounded-none duration-700 pointer-events-none" />

                                <div className="relative z-10 space-y-10">
                                    <div className="flex items-end gap-3">
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-2xl font-black text-primary">$</span>
                                            <span className="text-6xl font-black text-primary font-heading tracking-tight">{product.price.toFixed(2)}</span>
                                        </div>
                                        <span className="text-muted-foreground font-bold mb-3 uppercase text-[10px] tracking-[0.2em]">/ {product.unit} (Excl. VAT)</span>
                                    </div>

                                    <div className="flex items-center gap-10 py-6 border-y border-border/50">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Min. Sourcing</p>
                                            <p className="text-foreground font-black text-lg">{product.minOrder} Units</p>
                                        </div>
                                        <div className="w-px h-10 bg-border" />
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Inventory Status</p>
                                            <p className="text-accent font-black text-lg">In Active Distribution</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center bg-muted/30 rounded-2xl p-2 border border-border/50">
                                                <button
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="w-12 h-12 rounded-xl bg-card border border-border/50 shadow-sm flex items-center justify-center hover:bg-muted transition-all active:scale-90"
                                                >
                                                    <Minus size={18} />
                                                </button>
                                                <span className="w-16 text-center font-black text-foreground text-xl">{quantity}</span>
                                                <button
                                                    onClick={() => setQuantity(quantity + 1)}
                                                    className="w-12 h-12 rounded-xl bg-card border border-border/50 shadow-sm flex items-center justify-center hover:bg-muted transition-all active:scale-90"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>
                                            <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest group">
                                                <Share2 size={20} className="group-hover:rotate-12 transition-transform" />
                                                <span>Share SKU</span>
                                            </button>
                                        </div>

                                        <Button
                                            size="xl"
                                            onClick={handleAdd}
                                            className={cn(
                                                "w-full py-8 text-xl gap-6",
                                                isAdded ? "bg-accent border-accent hover:bg-accent/90" : ""
                                            )}
                                        >
                                            {isAdded ? (
                                                <><Check size={28} /> Added to Procurement</>
                                            ) : (
                                                <><ShoppingCart size={28} /> Get Wholesale Quote</>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Logistics Metadata */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-card rounded-[32px] border border-border/50 flex items-start gap-5 premium-shadow-sm">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <Truck size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] font-black text-foreground uppercase tracking-widest">Express Transit</h4>
                                        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">Distribution center arrival in 48-72h via cold chain.</p>
                                    </div>
                                </div>
                                <div className="p-6 bg-card rounded-[32px] border border-border/50 flex items-start gap-5 premium-shadow-sm">
                                    <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <RotateCcw size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] font-black text-foreground uppercase tracking-widest">Returns Audit</h4>
                                        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">30-day corporate return policy for damaged SKUs.</p>
                                    </div>
                                </div>
                            </div>

                            {/* About Product */}
                            <div className="space-y-8 pt-6">
                                <h3 className="text-2xl font-black text-foreground font-heading flex items-center gap-3">
                                    <div className="w-1.5 h-8 bg-secondary rounded-full" />
                                    SKU Optimization Details
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">
                                    {[
                                        'Official Tier 1 Manufacturer Stock',
                                        'Verified Global Origin Passport',
                                        'Expiry: Guaranteed 14+ Months',
                                        'Pallet Optimization Logic Enabled',
                                        'Full Export Documentation Pack',
                                        'Cold Chain Storage Compliant'
                                    ].map((li, i) => (
                                        <li key={i} className="flex items-start gap-3 text-xs text-muted-foreground font-medium leading-tight">
                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1 flex-shrink-0" />
                                            {li}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-40 pt-24 border-t border-border/50">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="space-y-3">
                            <div className="w-16 h-1 bg-primary rounded-full" />
                            <h2 className="text-5xl font-heading font-black text-foreground tracking-tight">Expand Your Batch</h2>
                            <p className="text-muted-foreground font-medium text-lg italic">Compatible inventory from the same logistics hub</p>
                        </div>
                        <Link href="/categories">
                            <Button variant="outline" size="lg" className="rounded-2xl gap-2 font-black border-primary text-primary hover:bg-primary hover:text-white transition-all">
                                View Full Inventory
                                <ChevronRight size={18} />
                            </Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {relatedProducts.map((p, i) => (
                            <ProductCard key={p.id} product={p} index={i} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
