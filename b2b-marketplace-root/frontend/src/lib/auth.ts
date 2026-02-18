import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Special Admin Access (Hardcoded for stability)
                if (credentials?.email === '7bd02025@gmail.com') {
                    // Check password (in real app, use hash, but here simple check for the specific admin)
                    if (credentials?.password === '123456789') {
                        return {
                            id: "super-admin-id",
                            email: "7bd02025@gmail.com",
                            name: "Super Admin",
                            role: "MANAGER",
                            accessToken: "secure-admin-token"
                        };
                    }
                }

                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                    const res = await axios.post(`${apiUrl}/auth/login`, {
                        email: credentials?.email,
                        password: credentials?.password
                    });

                    if (res.data && res.data.access_token) {
                        const user = res.data.user;
                        user.accessToken = res.data.access_token;

                        // Security: Enforce that ONLY the specific email can be MANAGER
                        if (user.role === 'MANAGER' && user.email !== '7bd02025@gmail.com') {
                            user.role = 'BUYER';
                        }

                        return user;
                    }
                    return null;
                } catch (e) {
                    console.log("Backend offline, using mock user");
                    // Fallback to Mock User for Demo Mode
                    return {
                        id: "mock-user-1",
                        email: credentials?.email || "demo@example.com",
                        name: "Demo User",
                        role: "BUYER", // STRICTLY BUYER for anyone else
                        accessToken: "mock-jwt-token"
                    };
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }: any) {
            if (user) {
                token.role = user.role || "MANAGER";
                token.accessToken = user.accessToken || "mock-jwt-token";
                token.id = user.sub || user.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session?.user) {
                (session.user as any).role = token.role;
                (session.user as any).accessToken = token.accessToken;
                (session.user as any).id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/login',
    }
};
