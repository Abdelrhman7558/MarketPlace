import { Injectable } from '@nestjs/common';

@Injectable()
export class SecurityService {
    private agentState: 'IDLE' | 'ANALYZING' | 'PATCHING' | 'RESOLVED' = 'IDLE';
    private isLockedDown = false;
    private mockErrors = [];

    getSecurityStatus() {
        return {
            score: this.isLockedDown ? 100 : 92,
            isLockedDown: this.isLockedDown,
            recentLogs: [
                {
                    id: '1',
                    level: 'WARN',
                    eventType: 'AUTH_FAIL',
                    description: 'Failed login attempt detected from new IP',
                    ip: '192.168.1.105',
                    path: '/auth/login',
                    method: 'POST',
                    createdAt: new Date().toISOString()
                }
            ],
            blockedIps: [
                { ip: '10.0.0.55', reason: 'Brute force attack', expiresAt: new Date(Date.now() + 86400000).toISOString() }
            ],
            timestamp: new Date().toISOString()
        };
    }

    getAgentStatus() {
        // Randomly simulate errors appearing if idle long enough
        if (this.agentState === 'IDLE' && Math.random() > 0.8 && this.mockErrors.length === 0) {
            this.mockErrors = [
                { id: 1, msg: 'Detected hydration mismatch on /categories', time: new Date().toISOString() }
            ];
        }
        return {
            state: this.agentState,
            errors: this.mockErrors
        };
    }

    async runAgentFix() {
        if (this.agentState !== 'IDLE' && this.agentState !== 'RESOLVED') return { success: false };
        this.agentState = 'ANALYZING';

        setTimeout(() => {
            this.agentState = 'PATCHING';
            setTimeout(() => {
                this.mockErrors = [];
                this.agentState = 'RESOLVED';
                setTimeout(() => {
                    this.agentState = 'IDLE';
                }, 4000);
            }, 3000);
        }, 2000);

        return { success: true };
    }

    toggleLockdown(enabled: boolean) {
        this.isLockedDown = enabled;
        return { success: true, isLockedDown: this.isLockedDown };
    }

    unblockIp(ip: string) {
        return { success: true };
    }
}
