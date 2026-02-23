import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

export interface AgentError {
    id: string;
    msg: string;
    time: string;
}

@Injectable()
export class AutoHealerService {
    private readonly logger = new Logger('AutoHealerAgent');

    private agentState: 'IDLE' | 'ANALYZING' | 'PATCHING' | 'RESOLVED' = 'IDLE';
    private activeErrors: AgentError[] = [];
    private lastResolvedTime: Date | null = null;

    // Simulate detecting new errors periodically
    @Cron(CronExpression.EVERY_30_SECONDS)
    detectAnomalies() {
        // If we are already working, do not interrupt
        if (this.agentState !== 'IDLE' && this.agentState !== 'RESOLVED') return;

        // Randomly simulate finding anomalies (e.g., latency spikes, 500 errors)
        if (Math.random() > 0.6 && this.activeErrors.length === 0) {
            this.logger.warn('Anomaly Detected! Waking up Auto Healer Agent...');
            this.activeErrors = [
                { id: `ERR-${Math.floor(Math.random() * 999)}`, msg: 'Memory Heap Anomaly Detected (Possible Leak)', time: new Date().toLocaleTimeString() },
                { id: `ERR-${Math.floor(Math.random() * 999)}`, msg: 'Unusual spike in DB Transaction Time', time: new Date().toLocaleTimeString() }
            ];

            // Start the patching sequence autonomously
            this.runPatchSequence();
        }
    }

    private async runPatchSequence() {
        this.agentState = 'ANALYZING';
        this.logger.log('Agent State: ANALYZING Root Cause...');

        await this.delay(4000); // Analyze for 4s

        this.agentState = 'PATCHING';
        this.logger.log('Agent State: PATCHING Vulnerability / Issue...');

        await this.delay(5000); // Patch for 5s

        this.agentState = 'RESOLVED';
        this.activeErrors = [];
        this.lastResolvedTime = new Date();
        this.logger.log('Agent State: RESOLVED. System is healthy again.');

        await this.delay(3000); // Stay in resolved for 3s
        this.agentState = 'IDLE';
        this.logger.log('Agent State: IDLE. Returning to background monitoring.');
    }

    // Manual trigger if the Admin wants to force a scan
    async forceScanAndFix() {
        if (this.agentState !== 'IDLE' && this.agentState !== 'RESOLVED') return false;

        if (this.activeErrors.length === 0) {
            this.activeErrors = [
                { id: 'FORCED-SCAN', msg: 'Admin initiated deep heuristic scan...', time: new Date().toLocaleTimeString() }
            ];
        }

        this.runPatchSequence(); // intentionally async
        return true;
    }

    getAgentState() {
        return {
            state: this.agentState,
            errors: this.activeErrors,
            lastResolvedTime: this.lastResolvedTime
        };
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
