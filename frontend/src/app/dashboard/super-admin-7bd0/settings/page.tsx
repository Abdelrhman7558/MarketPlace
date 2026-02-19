'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, Save, User, Mail, Phone, Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [name, setName] = useState('Admin');
    const [email] = useState('7bd02025@gmail.com');
    const [phone, setPhone] = useState('+20 100 000 0000');
    const [editingName, setEditingName] = useState(false);
    const [editingPhone, setEditingPhone] = useState(false);

    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const [toast, setToast] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    // Load saved data
    useEffect(() => {
        const savedAvatar = localStorage.getItem('bev-admin-avatar');
        const savedName = localStorage.getItem('bev-admin-name');
        const savedPhone = localStorage.getItem('bev-admin-phone');
        if (savedAvatar) setAvatar(savedAvatar);
        if (savedName) setName(savedName);
        if (savedPhone) setPhone(savedPhone);
    }, []);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            setAvatar(result);
            localStorage.setItem('bev-admin-avatar', result);
            showToast('Avatar updated successfully!');
        };
        reader.readAsDataURL(file);
    };

    const saveName = () => {
        localStorage.setItem('bev-admin-name', name);
        setEditingName(false);
        showToast('Name updated successfully!');
    };

    const savePhone = () => {
        localStorage.setItem('bev-admin-phone', phone);
        setEditingPhone(false);
        showToast('Phone updated successfully!');
    };

    const handlePasswordChange = () => {
        if (!oldPass || !newPass || !confirmPass) {
            showToast('Please fill in all password fields');
            return;
        }
        if (newPass.length < 6) {
            showToast('New password must be at least 6 characters');
            return;
        }
        if (newPass !== confirmPass) {
            showToast('Passwords do not match');
            return;
        }
        setOldPass('');
        setNewPass('');
        setConfirmPass('');
        showToast('Password changed successfully!');
    };

    const passwordStrength = () => {
        if (!newPass) return 0;
        let s = 0;
        if (newPass.length >= 6) s++;
        if (newPass.length >= 8) s++;
        if (/[A-Z]/.test(newPass)) s++;
        if (/[0-9]/.test(newPass)) s++;
        if (/[^A-Za-z0-9]/.test(newPass)) s++;
        return s;
    };
    const strength = passwordStrength();
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-400', 'bg-green-500'];

    return (
        <div className="max-w-2xl space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-extrabold text-brand-navy">Settings</h2>
                <p className="text-text-muted text-sm">Manage your profile and account settings</p>
            </div>

            {/* Avatar Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 animate-fade-in-up">
                <h3 className="font-bold text-brand-navy mb-6">Profile Photo</h3>
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-orange to-brand-red flex items-center justify-center text-white font-bold text-3xl overflow-hidden border-4 border-white shadow-lg">
                            {avatar ? (
                                <img src={avatar} className="w-full h-full object-cover" alt="Avatar" />
                            ) : (
                                name[0]?.toUpperCase()
                            )}
                        </div>
                        <button
                            onClick={() => fileRef.current?.click()}
                            className="absolute bottom-0 right-0 w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform cursor-pointer"
                        >
                            <Camera className="w-4 h-4" />
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    </div>
                    <div>
                        <p className="font-semibold text-brand-navy">{name}</p>
                        <p className="text-text-muted text-sm">{email}</p>
                        <button
                            onClick={() => fileRef.current?.click()}
                            className="text-brand-orange text-sm font-semibold mt-2 hover:underline"
                        >
                            Upload new photo
                        </button>
                    </div>
                </div>
            </div>

            {/* Personal Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 animate-fade-in-up animation-delay-100">
                <h3 className="font-bold text-brand-navy mb-6">Personal Information</h3>
                <div className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                            <User className="w-4 h-4 text-brand-orange" />
                            Full Name
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                disabled={!editingName}
                                className={`flex-1 border rounded-xl px-4 py-3 text-sm outline-none transition-all ${editingName
                                    ? 'border-brand-orange ring-2 ring-brand-orange/10 bg-white'
                                    : 'border-gray-200 bg-gray-50 text-gray-700'
                                    }`}
                            />
                            {editingName ? (
                                <button onClick={saveName} className="btn-primary text-sm flex items-center gap-1.5">
                                    <Save className="w-4 h-4" /> Save
                                </button>
                            ) : (
                                <button onClick={() => setEditingName(true)} className="px-5 py-3 text-sm font-semibold text-brand-orange border border-brand-orange/30 rounded-xl hover:bg-brand-orange/5 transition-colors">
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Email (read-only) */}
                    <div>
                        <label className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-brand-orange" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            disabled
                            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-[11px] text-text-muted mt-1">Email cannot be changed</p>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-brand-orange" />
                            Phone Number
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="tel"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                disabled={!editingPhone}
                                className={`flex-1 border rounded-xl px-4 py-3 text-sm outline-none transition-all ${editingPhone
                                    ? 'border-brand-orange ring-2 ring-brand-orange/10 bg-white'
                                    : 'border-gray-200 bg-gray-50 text-gray-700'
                                    }`}
                            />
                            {editingPhone ? (
                                <button onClick={savePhone} className="btn-primary text-sm flex items-center gap-1.5">
                                    <Save className="w-4 h-4" /> Save
                                </button>
                            ) : (
                                <button onClick={() => setEditingPhone(true)} className="px-5 py-3 text-sm font-semibold text-brand-orange border border-brand-orange/30 rounded-xl hover:bg-brand-orange/5 transition-colors">
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 animate-fade-in-up animation-delay-200">
                <h3 className="font-bold text-brand-navy mb-6 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-brand-orange" />
                    Change Password
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-600 block mb-1.5">Current Password</label>
                        <div className="relative">
                            <input
                                type={showOld ? 'text' : 'password'}
                                value={oldPass}
                                onChange={e => setOldPass(e.target.value)}
                                placeholder="••••••••"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 pr-11 transition-all"
                            />
                            <button onClick={() => setShowOld(!showOld)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600 block mb-1.5">New Password</label>
                        <div className="relative">
                            <input
                                type={showNew ? 'text' : 'password'}
                                value={newPass}
                                onChange={e => setNewPass(e.target.value)}
                                placeholder="Min 6 characters"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 pr-11 transition-all"
                            />
                            <button onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {newPass && (
                            <div className="mt-2">
                                <div className="flex gap-1 mb-1">
                                    {[0, 1, 2, 3, 4].map(i => (
                                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i < strength ? strengthColors[strength - 1] : 'bg-gray-200'}`} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600 block mb-1.5">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPass}
                            onChange={e => setConfirmPass(e.target.value)}
                            placeholder="Repeat new password"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition-all"
                        />
                        {confirmPass && newPass && confirmPass !== newPass && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-fade-in">
                                <AlertCircle className="w-3 h-3" /> Passwords do not match
                            </p>
                        )}
                        {confirmPass && newPass && confirmPass === newPass && (
                            <p className="text-green-500 text-xs mt-1 flex items-center gap-1 animate-fade-in">
                                <Check className="w-3 h-3" /> Passwords match
                            </p>
                        )}
                    </div>

                    <button onClick={handlePasswordChange} className="btn-primary text-sm flex items-center gap-2 mt-2">
                        <Lock className="w-4 h-4" />
                        Update Password
                    </button>
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-6 right-6 bg-brand-navy text-white px-6 py-4 rounded-2xl shadow-float flex items-center gap-3 animate-slide-in-right z-50">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{toast}</span>
                </div>
            )}
        </div>
    );
}
