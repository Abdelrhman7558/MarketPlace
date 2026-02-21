export type Role = 'ADMIN' | 'SUPPLIER' | 'BUYER' | 'MANAGER' | 'GUEST';

export const PERMISSIONS = {
    VIEW_DASHBOARD: ['ADMIN', 'SUPPLIER', 'BUYER', 'MANAGER'],
    MANAGE_PRODUCTS: ['ADMIN', 'SUPPLIER', 'MANAGER'],
    MANAGE_USERS: ['ADMIN', 'MANAGER'],
    PLACE_ORDERS: ['BUYER', 'ADMIN', 'MANAGER'],
    MANAGE_PLACEMENTS: ['ADMIN', 'MANAGER'],
    REQUEST_PLACEMENTS: ['SUPPLIER'],
    VIEW_AUDIT_LOGS: ['ADMIN', 'MANAGER'],
};

export function hasPermission(role: Role, permission: keyof typeof PERMISSIONS): boolean {
    return PERMISSIONS[permission].includes(role);
}

export function getDefaultRedirect(role: Role): string {
    switch (role) {
        case 'ADMIN': return '/dashboard/admin';
        case 'MANAGER': return '/dashboard/admin';
        case 'SUPPLIER': return '/dashboard/supplier';
        case 'BUYER': return '/dashboard/buyer';
        default: return '/';
    }
}
