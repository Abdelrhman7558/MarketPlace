'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
    Camera,
    Save,
    User,
    Mail,
    Phone,
    Lock,
    Eye,
    EyeOff,
    Check,
    AlertCircle,
    Bell,
    CreditCard,
    Building
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';

export default function SupplierSettingsPage() {
    const { user, updateUser } = useAuth();
    const [avatar, setAvatar] = React.useState<string | null>(null);
    const [name, setName] = React.useState(user?.name || 'Vendor');
    const [company, setCompany] = React.useState('Hellenic Beverages Ltd.');
    const [phone, setPhone] = React.useState(user?.phone || '+20 123 456 7890');
    const [email] = React.useState(user?.email || 'vendor@marketplace.com');

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [isSaving, setIsSaving] = React.useState(false);
    const [toast, setToast] = React.useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const showToast = (type: 'success' | 'error', msg: string) => {
        setToast({ type, msg });
        setTimeout(() => setToast(null), 3000);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setAvatar(base64String);
                updateUser({ avatar: base64String });
                showToast('success', 'Logo updated!');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        updateUser({ name, phone });

        await new Promise(r => setTimeout(r, 800));
        setIsSaving(false);
        showToast('success', 'Supplier settings updated!');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-1">
                <h1 className="text-3xl font-black text-white tracking-tight">Business Settings</h1>
                <p className="text-white/40 font-medium">Manage your vendor profile, company details, and billing.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <form onSubmit={handleSave} className="bg-[#131921] border border-white/5 rounded-[32px] p-8 space-y-8">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <Building size={16} className="text-primary" />
                            Company Profile
                        </h3>

                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="relative group shrink-0">
                                <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-black text-primary overflow-hidden">
                                    {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : company[0]}
                                </div>
                                <button type="button" className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-[#131921] shadow-lg">
                                    <Camera size={14} strokeWidth={3} />
                                </button>
                            </div>
                            <div className="space-y-1 flex-1">
                                <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.2em]">Company Logo</p>
                                <p className="text-xs text-white/40 font-medium leading-relaxed">
                                    This logo will be visible to all buyers on your product pages.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-white/30 uppercase tracking-widest ml-1">Company Name</label>
                                <input
                                    type="text"
                                    value={company}
                                    onChange={e => setCompany(e.target.value)}
                                    className="w-full h-14 bg-white/5 rounded-2xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-white/30 uppercase tracking-widest ml-1">Representative</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full h-14 bg-white/5 rounded-2xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-white/30 uppercase tracking-widest ml-1">Work Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                    className="w-full h-14 bg-white/[0.02] rounded-2xl border border-white/5 px-6 text-white/20 font-medium cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-white/30 uppercase tracking-widest ml-1">Direct Phone</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    className="w-full h-14 bg-white/5 rounded-2xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="h-12 px-8 bg-primary text-[#131921] font-black text-[11px] uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all flex items-center gap-2"
                            >
                                {isSaving ? 'Updating...' : <><Save size={14} /> Update Business Profile</>}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#131921] border border-white/5 rounded-[32px] p-8 space-y-6">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <CreditCard size={16} className="text-primary" />
                            Billing & Payouts
                        </h3>

                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Bank IBAN</p>
                            <p className="text-xs font-black text-white tracking-[0.2em]">•••• •••• •••• 9012</p>
                        </div>
                        <button className="w-full h-12 bg-white/5 text-white/60 font-black text-[10px] uppercase tracking-widest rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                            Manage Payout Details
                        </button>
                    </div>

                    <div className="bg-[#131921] border border-white/5 rounded-[32px] p-8 space-y-6">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <Bell size={16} className="text-primary" />
                            Notifications
                        </h3>
                        <div className="flex items-center justify-between group">
                            <p className="text-xs font-black text-white">Stock Alerts</p>
                            <div className="w-10 h-5 bg-primary/20 rounded-full border border-primary/20 relative cursor-pointer">
                                <div className="absolute top-1 right-1 w-3 h-3 bg-primary rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {toast && (
                <div className="fixed bottom-8 right-8 px-6 py-4 bg-emerald-500 text-white rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 z-[100]">
                    <Check size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">{toast.msg}</span>
                </div>
            )}
        </div>
    );
}
