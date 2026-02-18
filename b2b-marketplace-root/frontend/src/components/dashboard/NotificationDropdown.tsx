'use client';

import { Bell, Check, Clock, AlertTriangle, Info } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'success' | 'warning' | 'info' | 'error';
    read: boolean;
}

const DEMO_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        title: 'New Order Received',
        message: 'Order #ORD-2024-001 has been placed by Safe Way Supermarket.',
        time: '5 min ago',
        type: 'success',
        read: false
    },
    {
        id: '2',
        title: 'Low Stock Alert',
        message: 'Coca-Cola Zero Sugar inventory is below 50 units.',
        time: '2 hours ago',
        type: 'warning',
        read: false
    },
    {
        id: '3',
        title: 'System Update',
        message: 'Platform maintenance scheduled for tonight at 2:00 AM.',
        time: '1 day ago',
        type: 'info',
        read: true
    }
];

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <Check size={16} className="text-emerald-500" />;
            case 'warning': return <AlertTriangle size={16} className="text-amber-500" />;
            case 'error': return <AlertTriangle size={16} className="text-red-500" />;
            default: return <Info size={16} className="text-blue-500" />;
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50 ring-1 ring-black ring-opacity-5">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllRead}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <div className="max-h-[300px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-slate-500 text-sm">
                                No notifications
                            </div>
                        ) : (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    onClick={() => markAsRead(notification.id)}
                                    className={`px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                                >
                                    <div className="flex gap-3">
                                        <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notification.type === 'success' ? 'bg-emerald-100' :
                                            notification.type === 'warning' ? 'bg-amber-100' : 'bg-blue-100'
                                            }`}>
                                            {getIcon(notification.type)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-0.5">
                                                <p className={`text-sm font-medium ${!notification.read ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                                                    {notification.title}
                                                </p>
                                                {!notification.read && <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></span>}
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-1.5">
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center text-[10px] text-slate-400">
                                                <Clock size={10} className="mr-1" />
                                                {notification.time}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <Link
                        href="/dashboard/super-admin-7bd0/notifications"
                        className="block px-4 py-2.5 text-center text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border-t border-slate-100 dark:border-slate-700 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        View all notifications
                    </Link>
                </div>
            )}
        </div>
    );
}
