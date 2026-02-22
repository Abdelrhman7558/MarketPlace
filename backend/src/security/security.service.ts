import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service'; // Assuming PrismaService exists in common

@Injectable()
export class SecurityService {
    private readonly logger = new Logger('SecurityAgent');

    constructor(private prisma: PrismaService) { }

    async logEvent(data: {
        level: 'INFO' | 'WARN' | 'CRITICAL';
        eventType: string;
        description: string;
        ip?: string;
        userId?: string;
        path?: string;
        method?: string;
        payload?: any;
        headers?: any;
        metadata?: any;
    }) {
        this.logger.log(`[${data.level}] ${data.eventType}: ${data.description}`);

        try {
            // Try to persist to DB, but don't crash if DB is down
            await this.prisma.securityLog.create({
                data: {
                    ...data,
                    payload: data.payload || {},
                    headers: data.headers || {},
                    metadata: data.metadata || {},
                },
            });
        } catch (error) {
            this.logger.error('Failed to persist security log to database', error);
        }
    }

    async isIpBlocked(ip: string): Promise<boolean> {
        try {
            const blocked = await this.prisma.blockedIp.findUnique({
                where: { ip },
            });

            if (!blocked) return false;
            if (blocked.isPermanent) return true;
            if (blocked.expiresAt && blocked.expiresAt < new Date()) {
                await this.prisma.blockedIp.delete({ where: { ip } });
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    async blockIp(ip: string, reason: string, durationMinutes?: number) {
        const expiresAt = durationMinutes ? new Date(Date.now() + durationMinutes * 60000) : null;
        try {
            await this.prisma.blockedIp.upsert({
                where: { ip },
                update: { reason, expiresAt },
                create: { ip, reason, expiresAt },
            });
        } catch (error) {
            this.logger.error(`Failed to block IP ${ip}`, error);
        }
    }
}
