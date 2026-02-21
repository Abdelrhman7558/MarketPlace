'use client';

import Link from 'next/link';
import { ShieldAlert, Lock, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-surface border border-border/50 p-12 md:p-20 rounded-[4rem] text-center space-y-8 shadow-2xl relative overflow-hidden">
                {/* Abstract background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-destructive/5 rounded-full blur-3xl -mr-20 -mt-20" />

                <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto text-destructive mb-6 animate-bounce-in">
                    <Lock className="w-10 h-10" />
                </div>

                <div className="space-y-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-poppins font-black tracking-tight uppercase">Restricted Area</h1>
                    <p className="text-xl text-foreground/60 leading-relaxed max-w-md mx-auto">
                        You don't have the necessary clearance (Role) to access this part of the distribution warehouse.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
                    <Link href="/auth/login" className="w-full sm:w-auto">
                        <Button size="lg" className="rounded-full w-full h-14 px-12 font-black gap-2 bg-destructive border-none shadow-xl shadow-destructive/20 text-white">
                            Log in with Permissions
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="/" className="w-full sm:w-auto">
                        <Button variant="ghost" size="lg" className="rounded-full w-full h-14 px-10 font-bold hover:bg-muted/30">
                            Return Home
                        </Button>
                    </Link>
                </div>

                <p className="text-xs font-black text-foreground/20 uppercase tracking-[0.4em] pt-8">Security Protocol Active</p>
            </div>
        </div>
    );
}
