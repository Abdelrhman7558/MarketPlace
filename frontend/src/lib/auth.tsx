'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    name: string;
    email: string;
    phone?: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => boolean;
    register: (data: { name: string; email: string; phone?: string; password: string; role: string }) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoggedIn: false,
    login: () => false,
    register: () => false,
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
        users.push({ name: data.name, email: data.email, phone: data.phone, password: data.password, role: data.role });
        localStorage.setItem('bev-users', JSON.stringify(users));

        // Auto-login after register
        const userData: User = { name: data.name, email: data.email, phone: data.phone, role: data.role };
        setUser(userData);
        localStorage.setItem('bev-user', JSON.stringify(userData));
        return true;
    };

    const login = (email: string, password: string) => {
        if (typeof window === 'undefined') return false;

        // Super Admin Shortcut
        if (email === '7bd0205@gmail.com' && password === '123456789') {
            const userData: User = { name: 'Super Admin', email, role: 'admin' };
            setUser(userData);
            localStorage.setItem('bev-user', JSON.stringify(userData));
            return true;
        }

        // Previous Admin shortcut (Compatibility)
        if (email === '7bd02025@gmail.com') {
            const userData: User = { name: 'Admin', email, role: 'admin' };
            setUser(userData);
            localStorage.setItem('bev-user', JSON.stringify(userData));
            return true;
        }
        // Check registered users
        const usersRaw = localStorage.getItem('bev-users') || '[]';
        const users = JSON.parse(usersRaw);
        const found = users.find((u: any) => u.email === email && u.password === password);
        if (found) {
            const userData: User = { name: found.name, email: found.email, phone: found.phone, role: found.role };
            setUser(userData);
            localStorage.setItem('bev-user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('bev-user');
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
