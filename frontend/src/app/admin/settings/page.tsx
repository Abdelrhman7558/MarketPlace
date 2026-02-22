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
    Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';

export default function AdminSettingsPage() {
    const { user, updateUser } = useAuth();
    const [avatar, setAvatar] = React.useState<string | null>(null);
    const [name, setName] = React.useState(user?.name || 'Admin');
    const [phone, setPhone] = React.useState(user?.phone || '+20 100 000 0000');
    const [email] = React.useState(user?.email || 'admin@marketplace.com');

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [oldPass, setOldPass] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [confirmPass, setConfirmPass] = React.useState('');
    const [showPass, setShowPass] = React.useState(false);

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
                updateUser({ avatar: base64String } as any); // Type cast since avatar might not be in User interface yet but we want to store it
                showToast('success', 'Avatar updated!');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Update global auth state
        updateUser({ name, phone });

        // Simulate API call
        await new Promise(r => setTimeout(r, 800));
        setIsSaving(false);
        showToast('success', 'Profile settings updated successfully!');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-3xl font-black text-white tracking-tight">Account Settings</h1>
                <p className="text-white/40 font-medium">Manage your professional profile and security preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left: Profile Information */}
                <div className="lg:col-span-2 space-y-8">
                    <form onSubmit={handleSave} className="bg-[#131921] border border-white/5 rounded-[32px] overflow-hidden p-8 space-y-8">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <User size={16} className="text-primary" />
                            Personal Information
                        </h3>

                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="relative group shrink-0">
                                <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-black text-primary overflow-hidden">
                                    {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : name[0]}
                                </div>
                                <button type="button" className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-[#131921] shadow-lg hover:scale-110 transition-transform">
                                    <Camera size={14} strokeWidth={3} />
                                </button>
                            </div>
                            <div className="space-y-1 flex-1">
                                <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.2em]">Avatar Upload</p>
                                <p className="text-xs text-white/40 font-medium leading-relaxed max-w-xs">
                                    Pick a professional photo. Recommended size 400x400px. JPG or PNG allowed.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-white/30 uppercase tracking-widest ml-1">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full h-14 bg-white/5 rounded-2xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-white/30 uppercase tracking-widest ml-1">Business Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                    className="w-full h-14 bg-white/[0.02] rounded-2xl border border-white/5 px-6 text-white/20 font-medium cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[11px] font-black text-white/30 uppercase tracking-widest ml-1">Phone Number</label>
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
                                className="h-12 px-8 bg-primary text-[#131921] font-black text-[11px] uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
                            >
                                {isSaving ? 'Processing...' : <><Save size={14} /> Save Profile Changes</>}
                            </button>
                        </div>
                    </form>

                    {/* Security */}
                    <div className="bg-[#131921] border border-white/5 rounded-[32px] p-8 space-y-8">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <Shield size={16} className="text-primary" />
                            Security & Password
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-white/30 uppercase tracking-widest ml-1">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        value={newPass}
                                        onChange={e => setNewPass(e.target.value)}
                                        placeholder="Leave blank to keep current"
                                        className="w-full h-14 bg-white/5 rounded-2xl border border-white/5 px-6 outline-none focus:border-primary/50 text-white font-medium placeholder:text-white/10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                                    >
                                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <button className="h-10 px-6 bg-white/5 border border-white/5 text-white/60 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                                <Lock size={12} /> Update Password
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Preferences */}
                <div className="space-y-6">
                    <div className="bg-[#131921] border border-white/5 rounded-[32px] p-8 space-y-6">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <Bell size={16} className="text-primary" />
                            Notifications
                        </h3>

                        <div className="space-y-4">
                            {[
                                { label: 'Order Alerts', desc: 'Get notified about new orders' },
                                { label: 'Market Updates', desc: 'Daily pricing trends' },
                                { label: 'Security Logins', desc: 'New device detection' },
                            ].map((pref, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div>
                                        <p className="text-xs font-black text-white group-hover:text-primary transition-colors">{pref.label}</p>
                                        <p className="text-[10px] text-white/20 font-medium">{pref.desc}</p>
                                    </div>
                                    <div className="w-10 h-5 bg-primary/20 rounded-full relative cursor-pointer border border-primary/20">
                                        <div className="absolute top-1 right-1 w-3 h-3 bg-primary rounded-full shadow-lg" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/10 rounded-[32px] p-8 space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                            <Check size={20} strokeWidth={3} />
                        </div>
                        <h4 className="text-sm font-black text-white uppercase tracking-widest">Enterprise Verified</h4>
                        <p className="text-[11px] text-white/40 font-medium leading-relaxed">
                            Your account is fully verified. You have maximum listing capacity and priority support access.
                        </p>
                    </div>
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div className={cn(
                    "fixed bottom-8 right-8 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 z-[100]",
                    toast.type === 'success' ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                )}>
                    {toast.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                    <span className="text-xs font-black uppercase tracking-widest">{toast.msg}</span>
                </div>
            )}
        </div>
    );
}
