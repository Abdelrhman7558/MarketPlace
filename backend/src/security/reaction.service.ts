import { Injectable, Logger } from '@nestjs/common';
import { SecurityService } from './security.service';

@Injectable()
export class ReactionService {
    private readonly logger = new Logger('ReactionService');

    constructor(private securityService: SecurityService) { }

    async blockIp(ip: string, reason: string, durationMinutes = 60) {
        this.logger.warn(`Triggering reactive block for IP: ${ip}. Reason: ${reason}`);
        await this.securityService.blockIp(ip, reason, durationMinutes);

        // In a real infrastructure, this could also call a Cloudflare/AWS API to block at the edge
    }

    async notifyAdmin(event: any) {
        this.logger.log(`Security Alert: ${event.description}`);
        // Here you would integrate with SendGrid, Twilio, or Discord/Slack Webhooks
    }
}
