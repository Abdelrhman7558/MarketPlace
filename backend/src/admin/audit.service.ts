import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AuditService {
    constructor(private prisma: PrismaService) { }

    async logAction(adminId: string, action: string, entityType: string, entityId: string, details?: any) {
        return this.prisma.adminActionLog.create({
            data: {
                adminId,
                action,
                entityType,
                entityId,
                details: details || {},
            },
        });
    }

    async getLogs() {
        return this.prisma.adminActionLog.findMany({
            include: {
                admin: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
