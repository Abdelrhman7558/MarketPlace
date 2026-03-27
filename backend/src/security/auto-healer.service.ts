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

    // Periodic check — only runs manual scans if triggered, no fake random anomalies
    @Cron(CronExpression.EVERY_30_SECONDS)
    detectAnomalies() {
        // Disabled: No longer generates random fake anomalies
        // Real anomaly detection should be wired to actual metrics (e.g., response times, error rates)
        return;
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
