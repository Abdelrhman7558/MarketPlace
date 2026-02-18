import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }

        // Role-based Redirects
        // Role-based Redirects
        if (pathname.startsWith('/dashboard/super-admin-7bd0')) {
            if (token.email !== '7bd02025@gmail.com') {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }

        if (pathname === '/dashboard') {
            if (token.email === '7bd02025@gmail.com') {
                return NextResponse.redirect(new URL('/dashboard/super-admin-7bd0', req.url));
            }
            if (token.role === 'SUPPLIER') {
                return NextResponse.redirect(new URL('/dashboard/supplier', req.url));
            } else if (token.role === 'BUYER') {
                return NextResponse.redirect(new URL('/dashboard/buyer', req.url));
            } else if (token.role === 'SUPER_ADMIN') {
                return NextResponse.redirect(new URL('/dashboard/admin', req.url));
            } else if (token.role === 'MANAGER') {
                // Legacy manager redirect - blocking generic managers from the secure dash
                return NextResponse.redirect(new URL('/', req.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
