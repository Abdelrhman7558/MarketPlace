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
    login: (email: string, password: string) => { success: boolean; user?: User; message?: string };
    register: (data: { name: string; email: string; phone?: string; password: string; role: string }) => boolean;
    updateUser: (data: Partial<User>) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoggedIn: false,
    login: () => ({ success: false }),
    register: () => false,
    updateUser: () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

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
        }
    }, []);

    const register = (data: { name: string; email: string; phone?: string; password: string; role: string }) => {
        if (typeof window === 'undefined') return false;
        // Save registered users list
        const usersRaw = localStorage.getItem('bev-users') || '[]';
        const users = JSON.parse(usersRaw);
        if (users.find((u: any) => u.email === data.email)) return false;

        // Use PENDING_APPROVAL by default
        const id = Math.random().toString(36).substring(2, 10);
        const newUser = {
            id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            role: data.role,
            status: 'PENDING_APPROVAL'
        };

        users.push(newUser);
        localStorage.setItem('bev-users', JSON.stringify(users));

        // Auto-login (but status will be PENDING_APPROVAL)
        const userData: User = {
            id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            role: data.role,
            status: 'PENDING_APPROVAL'
        };
        setUser(userData);
        localStorage.setItem('bev-user', JSON.stringify(userData));
        return true;
    };

    const login = (email: string, password: string): { success: boolean; user?: User; message?: string } => {
        if (typeof window === 'undefined') return { success: false };

        // Super Admin Shortcut
        if (email === '7bd0205@gmail.com' && password === '123456789') {
            const userData: User = { id: 'sa-7bd0', name: 'Super Admin', email, role: 'admin', status: 'ACTIVE' };
            setUser(userData);
            localStorage.setItem('bev-user', JSON.stringify(userData));
            return { success: true, user: userData };
        }

        // Previous Admin shortcut (Compatibility)
        if (email === '7bd02025@gmail.com') {
            const userData: User = { id: 'admin-legacy', name: 'Admin', email, role: 'admin', status: 'ACTIVE' };
            setUser(userData);
            localStorage.setItem('bev-user', JSON.stringify(userData));
            return { success: true, user: userData };
        }

        // Check registered users
        const usersRaw = localStorage.getItem('bev-users') || '[]';
        const users = JSON.parse(usersRaw);
        const found = users.find((u: any) => u.email === email && u.password === password);
        if (found) {
            // Check status
            if (found.status === 'REJECTED') {
                return { success: false, message: 'Your registration has been rejected.' };
            }
            if (found.status === 'BLOCKED') {
                return { success: false, message: 'Your account has been blocked.' };
            }

            const userData: User = {
                id: found.id || Math.random().toString(36).substring(2, 10),
                name: found.name,
                email: found.email,
                phone: found.phone,
                role: found.role,
                status: found.status
            };
            setUser(userData);
            localStorage.setItem('bev-user', JSON.stringify(userData));
            return { success: true, user: userData };
        }
        return { success: false, message: 'Invalid email or password.' };
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
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, updateUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
