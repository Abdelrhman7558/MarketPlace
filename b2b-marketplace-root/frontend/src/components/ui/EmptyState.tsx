'use client';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
}

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-slate-200 border-dashed rounded-xl text-center">
            <div className="p-4 bg-slate-50 rounded-full mb-4">
                <Icon size={48} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 max-w-sm mb-6">{description}</p>

            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors"
                >
                    {actionLabel}
                </Link>
            )}
        </div>
    );
}
