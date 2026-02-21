import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuditService {
    private prisma = new PrismaClient();

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
