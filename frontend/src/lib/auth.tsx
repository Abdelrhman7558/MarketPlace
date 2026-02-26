'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    role: string;
    status: 'PENDING_APPROVAL' | 'ACTIVE' | 'REJECTED' | 'BLOCKED';
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; user?: User; message?: string }>;
    register: (data: { name: string; email: string; phone?: string; companyName?: string; website?: string; socialLinks?: string; password: string; role: string }) => Promise<boolean | string>;
    updateUser: (data: Partial<User>) => void;
    logout: () => void;
    isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoggedIn: false,
    login: async () => ({ success: false }),
    register: async () => false,
    updateUser: () => { },
    logout: () => { },
    isAuthReady: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('bev-user');
                if (saved) {
                    setUser(JSON.parse(saved));
                }
            } catch (err) {
                console.error("Failed to parse auth user:", err);
                localStorage.removeItem('bev-user');
            }
            setIsAuthReady(true);
        }
    }, []);

    const register = async (data: { name: string; email: string; phone?: string; companyName?: string; website?: string; socialLinks?: string; password: string; role: string }): Promise<boolean | string> => {
        try {
            const res = await fetch('http://localhost:3005/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const error = await res.json().catch(() => ({}));
                let errorMessage = 'Registration failed.';
                if (Array.isArray(error.message)) {
                    errorMessage = error.message.join(', ');
                } else if (typeof error.message === 'string') {
                    errorMessage = error.message;
                }
                return errorMessage;
            }

            // Since they are pending approval, we do NOT log them in automatically.
            return true;
        } catch (err) {
            console.error("Registration failed:", err);
            return 'Server is currently unreachable. Please try again later.';
        }
    };

    const login = async (email: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> => {
        // Super Admin Shortcut with Backend Sync
        if ((email === '7bd0205@gmail.com' || email === '7bd02025@gmail.com') && password === 'Admin@2025!') {
            try {
                // First, try to seed the admin (creates if not exists, with ACTIVE status)
                await fetch('http://localhost:3005/auth/seed-admin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, name: 'Super Admin' }),
                });

                // Now login
                const res = await fetch('http://localhost:3005/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                if (res.ok) {
                    const result = await res.json();
                    if (result.access_token) {
                        const userData = { ...result.user, role: 'admin', status: 'ACTIVE' as const };
                        setUser(userData);
                        localStorage.setItem('bev-user', JSON.stringify(userData));
                        localStorage.setItem('bev-token', result.access_token);
                        return { success: true, user: userData };
                    }
                }
            } catch (err) {
                console.error("Super Admin backend sync failed, using local only", err);
            }
            // Fallback — local-only admin (no API access)
            const userData: User = { id: 'sa-7bd0', name: 'Super Admin', email, role: 'admin', status: 'ACTIVE' };
            setUser(userData);
            localStorage.setItem('bev-user', JSON.stringify(userData));
            return { success: true, user: userData };
        }

        try {
            const res = await fetch('http://localhost:3005/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const error = await res.json();
                return { success: false, message: error.message || 'Invalid email or password.' };
            }

            const result = await res.json();
            const userData = result.user;
            setUser(userData);
            localStorage.setItem('bev-user', JSON.stringify(userData));
            localStorage.setItem('bev-token', result.access_token);
            return { success: true, user: userData };
        } catch (err) {
            console.error("Login failed:", err);
            return { success: false, message: 'Server connection failed.' };
        }
    };

    const updateUser = (data: Partial<User>) => {
        if (!user) return;
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        if (typeof window !== 'undefined') {
            localStorage.setItem('bev-user', JSON.stringify(updatedUser));

            // Also update the persistent users list if necessary
            const usersRaw = localStorage.getItem('bev-users') || '[]';
            const users = JSON.parse(usersRaw);
            const index = users.findIndex((u: any) => u.email === user.email);
            if (index !== -1) {
                users[index] = { ...users[index], ...data };
                localStorage.setItem('bev-users', JSON.stringify(users));
            }
        }
    };

    const logout = () => {
        setUser(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('bev-user');
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, updateUser, logout, isAuthReady }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
