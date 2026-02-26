import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { SecurityService } from './security.service';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ThreatDetectionService implements OnModuleInit {
    private readonly logger = new Logger('ThreatDetection');

    constructor(
        private securityService: SecurityService,
        private prisma: PrismaService,
    ) { }

    onModuleInit() {
        // Start a periodic analysis job
        setInterval(() => this.analyzeThreats(), 60000); // Every minute
    }

    private readonly WHITELISTED_IPS = ['::1', '127.0.0.1', '::ffff:127.0.0.1'];

    async analyzeThreats() {
        this.logger.log('Running automated threat analysis...');

        // 1. Detect Brute Force (e.g., > 10 UNAUTHORIZED_ACCESS from same IP in 5 mins)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60000);

        try {
            const logs = await this.prisma.securityLog.groupBy({
                by: ['ip'],
                where: {
                    eventType: 'UNAUTHORIZED_ACCESS',
                    createdAt: { gte: fiveMinutesAgo },
                },
                _count: {
                    id: true,
                },
            });

            for (const log of logs) {
                // Never block localhost / whitelisted IPs
                if (log.ip && this.WHITELISTED_IPS.includes(log.ip)) continue;

                if (log._count.id > 10 && log.ip) {
                    this.logger.warn(`Potential brute force detected from IP: ${log.ip}`);
                    await this.securityService.blockIp(log.ip, 'Brute force detected', 60); // Block for 1 hour
                    await this.securityService.logEvent({
                        level: 'CRITICAL',
                        eventType: 'THREAT_REACTION',
                        description: `IP ${log.ip} blocked for brute force.`,
                        ip: log.ip,
                    });
                }
            }
        } catch (error) {
            this.logger.error('Threat analysis failed', error);
        }

        // 2. Detect Endpoint Scanning (e.g., > 20 NOT_FOUND_SCAN from same IP in 5 mins)
        try {
            const scanLogs = await this.prisma.securityLog.groupBy({
                by: ['ip'],
                where: {
                    eventType: 'NOT_FOUND_SCAN',
                    createdAt: { gte: fiveMinutesAgo },
                },
                _count: {
                    id: true,
                },
            });

            for (const log of scanLogs) {
                if (log._count.id > 20 && log.ip) {
                    this.logger.warn(`Potential endpoint scanning detected from IP: ${log.ip}`);
                    await this.securityService.blockIp(log.ip, 'Endpoint scanning detected', 1440); // Block for 24 hours
                }
            }
        } catch (error) { }
    }

    async checkLockdownStatus(): Promise<boolean> {
        try {
            const config = await this.prisma.securityConfig.findUnique({
                where: { key: 'EMERGENCY_LOCKDOWN' },
            });
            return config?.value === 'true';
        } catch (error) {
            return false;
        }
    }

    async toggleLockdown(status: boolean) {
        try {
            await this.prisma.securityConfig.upsert({
                where: { key: 'EMERGENCY_LOCKDOWN' },
                update: { value: status.toString() },
                create: { key: 'EMERGENCY_LOCKDOWN', value: status.toString(), description: 'System-wide emergency lockdown' },
            });

            await this.securityService.logEvent({
                level: 'CRITICAL',
                eventType: 'SYSTEM_LOCKDOWN',
                description: `Emergency lockdown ${status ? 'ENABLED' : 'DISABLED'}`,
            });
        } catch (error) { }
    }
}
