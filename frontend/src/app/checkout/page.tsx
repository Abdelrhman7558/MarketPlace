'use client';

import { useState } from 'react';
import {
    ShieldCheck, ArrowRight, Truck, CreditCard,
    ChevronLeft, Info, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handlePlaceOrder = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setStep(4);
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-20">
            <div className="container-wide px-4">
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Link href="/cart">
                            <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-poppins font-black tracking-tight">Checkout</h1>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-2">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all",
                                    step >= i ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-surface border border-border text-foreground/40"
                                )}>
                                    {i}
                                </div>
                                {i < 3 && <div className={cn("w-8 h-[2px]", step > i ? "bg-primary" : "bg-border")} />}
                            </div>
                        ))}
                    </div>
                </div>

                {step === 4 ? (
                    <div className="max-w-2xl mx-auto bg-surface border border-border/50 p-12 rounded-[3rem] text-center space-y-6 shadow-2xl animate-fade-in-up">
                        <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto text-success mb-4 animate-bounce-in">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <h2 className="text-4xl font-poppins font-black tracking-tight">Order Confirmed!</h2>
                        <p className="text-lg text-foreground/60 leading-relaxed">
                            Your order <span className="text-foreground font-bold">#ORD-9901</span> has been placed successfully.
                            We've sent a detailed confirmation to your email.
                        </p>
                        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/dashboard/buyer">
                                <Button variant="outline" size="lg" className="rounded-full px-10 h-14 font-black">View My Orders</Button>
                            </Link>
                            <Link href="/">
                                <Button size="lg" className="rounded-full px-10 h-14 font-black">Continue Shopping</Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Main Form Area */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Step 1: Shipping */}
                            {step === 1 && (
                                <div className="bg-surface border border-border/50 p-10 rounded-[2.5rem] space-y-8 animate-fade-in">
                                    <div className="flex items-center gap-3">
                                        <Truck className="w-6 h-6 text-primary" />
                                        <h2 className="text-2xl font-bold">Shipping Information</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input label="First Name" placeholder="John" />
                                        <Input label="Last Name" placeholder="Doe" />
                                        <Input label="Business Address" placeholder="123 Logistics St" className="md:col-span-2" />
                                        <Input label="City" placeholder="Dubai" />
                                        <Input label="Postal Code" placeholder="00000" />
                                    </div>
                                    <Button onClick={handleNext} className="w-full rounded-2xl h-14 font-black text-lg gap-2">
                                        Continue to Payment
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </div>
                            )}

                            {/* Step 2: Payment */}
                            {step === 2 && (
                                <div className="bg-surface border border-border/50 p-10 rounded-[2.5rem] space-y-8 animate-fade-in">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="w-6 h-6 text-primary" />
                                        <h2 className="text-2xl font-bold">Payment Method</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-6 border-2 border-primary bg-primary/5 rounded-2xl flex items-center justify-between group cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-xl border border-border flex items-center justify-center font-bold italic text-blue-900">VISA</div>
                                                <div>
                                                    <p className="font-bold">Business Credit Card</p>
                                                    <p className="text-sm text-foreground/60">Ending in **** 8821</p>
                                                </div>
                                            </div>
                                            <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                                                <div className="w-3 h-3 bg-primary rounded-full" />
                                            </div>
                                        </div>
                                        <div className="p-6 border border-border rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-muted/30 transition-colors">
                                            <div className="flex items-center gap-4 opacity-60">
                                                <div className="w-12 h-12 bg-white rounded-xl border border-border flex items-center justify-center font-bold text-gray-400">NET</div>
                                                <p className="font-bold">Pay on Receipt (Net 30)</p>
                                            </div>
                                            <div className="w-6 h-6 rounded-full border-2 border-border" />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button variant="outline" onClick={handleBack} className="flex-1 rounded-2xl h-14 font-black">Back</Button>
                                        <Button onClick={handleNext} className="flex-[2] rounded-2xl h-14 font-black text-lg">Review Order</Button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Review */}
                            {step === 3 && (
                                <div className="bg-surface border border-border/50 p-10 rounded-[2.5rem] space-y-8 animate-fade-in">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="w-6 h-6 text-primary" />
                                        <h2 className="text-2xl font-bold">Review & Place Order</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between p-4 bg-muted/30 rounded-2xl border border-border/50 text-sm">
                                            <span className="text-foreground/60">Shipping to:</span>
                                            <span className="font-bold">John Doe, 123 Logistics St, Dubai</span>
                                        </div>
                                        <div className="flex justify-between p-4 bg-muted/30 rounded-2xl border border-border/50 text-sm">
                                            <span className="text-foreground/60">Payment:</span>
                                            <span className="font-bold">Visa ending in **** 8821</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button variant="outline" onClick={handleBack} className="flex-1 rounded-2xl h-14 font-black" disabled={isProcessing}>Back</Button>
                                        <Button
                                            onClick={handlePlaceOrder}
                                            className="flex-[2] rounded-2xl h-14 font-black text-lg"
                                            isLoading={isProcessing}
                                        >
                                            Place Wholesale Order
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar / Summary */}
                        <div className="space-y-6">
                            <div className="bg-surface border border-border/50 p-8 rounded-[2.5rem] shadow-sm space-y-6">
                                <h3 className="text-xl font-bold">Order Summary</h3>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-foreground/60">Subtotal (12 items)</span>
                                        <span className="font-bold">$1,250.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground/60">Bulk Discount (10%)</span>
                                        <span className="text-success font-bold">-$125.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground/60">Bulk Shipping</span>
                                        <span className="font-bold">FREE</span>
                                    </div>
                                    <div className="pt-4 border-t border-border flex justify-between text-lg">
                                        <span className="font-black">Total</span>
                                        <span className="font-black text-primary">$1,125.00</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-primary/5 rounded-2xl flex items-start gap-3">
                                    <Info className="w-5 h-5 text-primary shrink-0" />
                                    <p className="text-xs text-primary leading-relaxed">
                                        VAT will be calculated based on your business ID during invoice generation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
