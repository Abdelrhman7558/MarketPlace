'use client';

import { useState, useRef } from 'react';
import { Save, Upload, User, Bell, Lock, Shield, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/ToastProvider';

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState('profile');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Profile State
    const [profile, setProfile] = useState({
        name: 'Super Admin',
        email: '7bd02025@gmail.com',
        phone: '+1 234 567 890',
        avatar: ''
    });

    // Load from localStorage on mount
    useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('adminProfile');
            if (saved) {
                setProfile(JSON.parse(saved));
            }
        }
    });

    const handleSave = () => {
        localStorage.setItem('adminProfile', JSON.stringify(profile));
        window.dispatchEvent(new Event('profileUpdated'));
        showToast('Profile settings saved successfully', 'success');
    };

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const newProfile = { ...profile, avatar: event.target.result as string };
                    setProfile(newProfile);
                    // Auto-save on avatar change specific request
                    localStorage.setItem('adminProfile', JSON.stringify(newProfile));
                    window.dispatchEvent(new Event('profileUpdated'));
                    showToast('Profile picture updated', 'success');
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Account Settings</h1>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 space-x-6">
                {['profile', 'notifications', 'security'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-medium capitalize transition-colors relative ${activeTab === tab
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>
                        )}
                    </button>
                ))}
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Avatar Section */}
                    <div className="md:col-span-1">
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center text-center">
                            <div className="relative w-32 h-32 mb-4 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                                    {profile.avatar ? (
                                        <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                                            <User size={48} />
                                        </div>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Upload className="text-white" size={24} />
                                </div>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white">{profile.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Administrator</p>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="text-sm text-blue-600 font-medium hover:underline"
                            >
                                Change Picture
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                            />
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="md:col-span-2">
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Profile Information</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                        <div className="relative">
                                            <User size={18} className="absolute left-3 top-2.5 text-slate-400" />
                                            <input type="text" className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                                        <input type="text" className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-3 top-2.5 text-slate-400" />
                                        <input type="email" disabled className="w-full pl-10 pr-4 py-2 border rounded-lg bg-slate-50 dark:bg-slate-900 dark:border-slate-600 text-slate-500 cursor-not-allowed" value={profile.email} />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Shield size={10} /> This email is linked to your admin access.</p>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button onClick={handleSave} className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
                                        <Save size={18} /> Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Notifications Tab Placeholder */}
            {activeTab === 'notifications' && (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
                    <Bell size={48} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">Notification Preferences</h3>
                    <p className="text-slate-500">Manage how you receive alerts and updates.</p>
                </div>
            )}

            {/* Security Tab Placeholder */}
            {activeTab === 'security' && (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
                    <Lock size={48} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">Security Settings</h3>
                    <p className="text-slate-500">Update password and 2FA settings.</p>
                </div>
            )}
        </div>
    );
}
