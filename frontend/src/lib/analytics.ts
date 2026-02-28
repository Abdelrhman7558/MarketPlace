'use client';

type Role = 'ADMIN' | 'SUPPLIER' | 'BUYER' | 'MANAGER' | 'GUEST';

interface AnalyticsEvent {
    event: string;
    category: string;
    label?: string;
    value?: number;
    metadata?: Record<string, any>;
}

class AnalyticsManager {
    private static instance: AnalyticsManager;
    private userRole: Role = 'GUEST';

    private constructor() { }

    public static getInstance(): AnalyticsManager {
        if (!AnalyticsManager.instance) {
            AnalyticsManager.instance = new AnalyticsManager();
        }
        return AnalyticsManager.instance;
    }

    public setRole(role: Role) {
        this.userRole = role;
        this.track('role_identified', 'system', role);
    }

    public track(event: string, category: string, label?: string, value?: number, metadata?: Record<string, any>) {
        const payload = {
            event,
            category,
            label,
            value,
            role: this.userRole,
            timestamp: new Date().toISOString(),
            ...metadata,
        };

        // Simulated tracking to console in DEV, would hit API in production
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics] [${this.userRole}] ${category}:${event}`, payload);
        }
    }

    public trackPlacementView(placementId: string, slot: string) {
        this.track('placement_view', 'atlantis', placementId, undefined, { slot });
    }

    public trackOrderSuccess(orderId: string, total: number, itemCount: number) {
        this.track('order_success', 'checkout', orderId, total, { itemCount });
    }

    public trackLogin(role: Role) {
        this.setRole(role);
        this.track('login_success', 'auth');
    }
}

export const analytics = AnalyticsManager.getInstance();
