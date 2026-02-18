'use client';
import { Check, Clock, Package, Truck } from 'lucide-react';

const STEPS = [
    { id: 'placed', label: 'Order Placed', icon: Clock },
    { id: 'confirmed', label: 'Confirmed', icon: Check },
    { id: 'processing', label: 'Processing', icon: Package },
    { id: 'shipped', label: 'Shipped', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: Check },
];

interface OrderStatusProgressBarProps {
    currentStatus: 'placed' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
}

export default function OrderStatusProgressBar({ currentStatus }: OrderStatusProgressBarProps) {
    const currentIndex = STEPS.findIndex(s => s.id === currentStatus);

    return (
        <div className="w-full py-6">
            <div className="relative flex items-center justify-between">
                {/* Connecting Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10">
                    <div
                        className="h-full bg-primary ease-in-out transition-all duration-500"
                        style={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
                    />
                </div>

                {STEPS.map((step, idx) => {
                    const isCompleted = idx <= currentIndex;
                    const isCurrent = idx === currentIndex;
                    const Icon = step.icon;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
                            <div
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                    ${isCompleted ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' : 'bg-white border-slate-200 text-slate-300'}
                                    ${isCurrent ? 'scale-110' : ''}
                                `}
                            >
                                <Icon size={18} />
                            </div>
                            <span className={`text-xs font-bold ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
