import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class FinanceService {
    constructor(private prisma: PrismaService) {}

    // ─── Credit Terms ──────────────────────────────────────

    async setCreditTerm(data: {
        userId: string;
        creditLimit: number;
        paymentTermDays: number;
        approvedBy?: string;
        notes?: string;
    }) {
        const existing = await this.prisma.creditTerm.findUnique({ where: { userId: data.userId } });
        if (existing) {
            return this.prisma.creditTerm.update({
                where: { id: existing.id },
                data: {
                    creditLimit: data.creditLimit,
                    paymentTermDays: data.paymentTermDays,
                    approvedBy: data.approvedBy,
                    notes: data.notes,
                },
            });
        }
        return this.prisma.creditTerm.create({ data });
    }

    async getCreditTerm(userId: string) {
        return this.prisma.creditTerm.findUnique({ where: { userId } });
    }

    async getAllCreditTerms() {
        return this.prisma.creditTerm.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async deleteCreditTerm(id: string) {
        return this.prisma.creditTerm.delete({ where: { id } });
    }

    async checkCreditAvailability(userId: string, orderAmount: number) {
        const term = await this.prisma.creditTerm.findUnique({ where: { userId } });
        if (!term || term.status !== 'ACTIVE') {
            return { allowed: false, reason: 'No active credit terms', available: 0 };
        }
        const available = term.creditLimit - term.usedCredit;
        if (orderAmount > available) {
            return { allowed: false, reason: 'Exceeds credit limit', available };
        }
        return { allowed: true, available, paymentTermDays: term.paymentTermDays };
    }

    async useCredit(userId: string, amount: number) {
        const term = await this.prisma.creditTerm.findUnique({ where: { userId } });
        if (!term) throw new NotFoundException('No credit terms for this user');
        return this.prisma.creditTerm.update({
            where: { id: term.id },
            data: { usedCredit: term.usedCredit + amount },
        });
    }

    // ─── Tax Exemptions ────────────────────────────────────

    async createTaxExemption(data: {
        userId: string;
        certificateUrl: string;
        certificateType?: string;
        validFrom?: Date;
        validUntil?: Date;
    }) {
        return this.prisma.taxExemption.create({ data });
    }

    async getTaxExemptions(userId?: string) {
        const where = userId ? { userId } : {};
        return this.prisma.taxExemption.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }

    async reviewTaxExemption(id: string, status: string, reviewedBy: string, notes?: string) {
        const exemption = await this.prisma.taxExemption.findUnique({ where: { id } });
        if (!exemption) throw new NotFoundException('Tax exemption not found');
        return this.prisma.taxExemption.update({
            where: { id },
            data: { status, reviewedBy, notes },
        });
    }

    async hasActiveExemption(userId: string): Promise<boolean> {
        const exemption = await this.prisma.taxExemption.findFirst({
            where: {
                userId,
                status: 'APPROVED',
                OR: [
                    { validUntil: null },
                    { validUntil: { gte: new Date() } },
                ],
            },
        });
        return !!exemption;
    }

    // ─── Warehouses ────────────────────────────────────────

    async createWarehouse(data: {
        name: string;
        address: string;
        city: string;
        country: string;
        zipCode?: string;
        latitude?: number;
        longitude?: number;
        supplierId: string;
        isDefault?: boolean;
    }) {
        // If this is the default, unset others
        if (data.isDefault) {
            await this.prisma.warehouse.updateMany({
                where: { supplierId: data.supplierId },
                data: { isDefault: false },
            });
        }
        return this.prisma.warehouse.create({ data });
    }

    async getWarehousesBySupplier(supplierId: string) {
        return this.prisma.warehouse.findMany({
            where: { supplierId },
            orderBy: { isDefault: 'desc' },
        });
    }

    async getAllWarehouses() {
        return this.prisma.warehouse.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async updateWarehouse(id: string, data: any) {
        return this.prisma.warehouse.update({ where: { id }, data });
    }

    async deleteWarehouse(id: string) {
        return this.prisma.warehouse.delete({ where: { id } });
    }
}
