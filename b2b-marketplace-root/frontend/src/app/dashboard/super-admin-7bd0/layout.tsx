'use client';

import Link from 'next/link';
import { LayoutDashboard, Package, LogOut, Settings, Users, Tag, Moon, Sun, Upload, User, ArrowLeft, Bell, Search, Menu, ChevronLeft, ShoppingBag } from 'lucide-react';
import NotificationDropdown from '@/components/dashboard/NotificationDropdown';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const { data: session } = useSession();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Avatar & Profile State
    const [avatar, setAvatar] = useState<string>('');
    const [profile, setProfile] = useState({ name: '', email: '' });

    // Load profile on mount and listen for updates
    // Force HMR Update
    useEffect(() => {
        const loadProfile = () => {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem('adminProfile');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    setAvatar(parsed.avatar || '');
                    setProfile({ name: parsed.name, email: parsed.email });
                }
            }
        };

        loadProfile();
        window.addEventListener('profileUpdated', loadProfile);
        return () => window.removeEventListener('profileUpdated', loadProfile);
    }, []);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const userName = profile.name || session?.user?.name || "Manager";
    const userEmail = profile.email || session?.user?.email || "manager@example.com";

    const navigation = [
        { name: 'Dashboard', href: '/dashboard/super-admin-7bd0', icon: LayoutDashboard },
        { name: 'Products', href: '/dashboard/super-admin-7bd0/products', icon: Package },
        { name: 'Orders', href: '/dashboard/super-admin-7bd0/orders', icon: ShoppingBag },
        { name: 'Users', href: '/dashboard/super-admin-7bd0/users', icon: Users },
        { name: 'Offers', href: '/dashboard/super-admin-7bd0/offers', icon: Tag },
        { name: 'Settings', href: '/dashboard/super-admin-7bd0/settings', icon: Settings },
    ];

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const newAvatar = event.target.result as string;
                    setAvatar(newAvatar);

                    // Update localStorage
                    const saved = localStorage.getItem('adminProfile');
                    const currentProfile = saved ? JSON.parse(saved) : { name: userName, email: userEmail, phone: '' };
                    localStorage.setItem('adminProfile', JSON.stringify({ ...currentProfile, avatar: newAvatar }));
                    window.dispatchEvent(new Event('profileUpdated'));
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-200 font-sans">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white shadow-xl flex flex-col transition-all duration-300 z-20 fixed h-full md:relative`}>
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-center border-b border-slate-800">
                    {isSidebarOpen ? (
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">MARKETPLACE</h1>
                    ) : (
                        <span className="text-xl font-bold text-blue-400">M</span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-6 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                                title={!isSidebarOpen ? item.name : ''}
                            >
                                <item.icon size={22} className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} transition-colors`} />
                                {isSidebarOpen && <span className="ml-3 font-medium text-sm">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="flex items-center justify-center w-full p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        {isSidebarOpen ? (
                            <div className="flex items-center"><ChevronLeft size={18} className="mr-2" /> <span>Collapse</span></div>
                        ) : (
                            <Menu size={20} />
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Header */}
                <header className="bg-white dark:bg-slate-900 h-16 shadow-sm border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-10 transition-colors duration-200">
                    {/* Left: Back to Home */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium">
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Home
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        {/* Notifications (Mock) */}
                        <NotificationDropdown />

                        {/* User Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-3 focus:outline-none"
                            >
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{userName}</p>
                                    <p className="text-xs text-slate-400">Manager</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-600">
                                    {avatar ? (
                                        <img src={avatar} alt="User" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                                            <span className="text-lg font-bold">{userName.charAt(0)}</span>
                                        </div>
                                    )}
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <>
                                    <div className="fixed inset-0 z-0" onClick={() => setIsProfileOpen(false)}></div>
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-1 border border-slate-100 dark:border-slate-700 ring-1 ring-black ring-opacity-5 z-50">
                                        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                                            <p className="text-sm text-slate-900 dark:text-white font-medium">Signed in as</p>
                                            <p className="text-xs text-slate-500 truncate">{userEmail}</p>
                                        </div>
                                        <div className="py-1">
                                            <Link href="/dashboard/super-admin-7bd0/settings" className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700" onClick={() => setIsProfileOpen(false)}>
                                                <Settings size={16} className="mr-2" /> Settings
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    fileInputRef.current?.click();
                                                    setIsProfileOpen(false);
                                                }}
                                                className="flex w-full items-center text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                                            >
                                                <Upload size={16} className="mr-2" /> Change Avatar
                                            </button>
                                        </div>
                                        <div className="py-1 border-t border-slate-100 dark:border-slate-700">
                                            <button
                                                onClick={() => signOut({ callbackUrl: '/' })}
                                                className="flex w-full items-center text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            >
                                                <LogOut size={16} className="mr-2" /> Sign out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                            />
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 md:p-8 transition-colors duration-200">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
