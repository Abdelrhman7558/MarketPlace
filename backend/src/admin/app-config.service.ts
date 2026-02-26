import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, ProductStatus } from '@prisma/client';

@Injectable()
export class AppConfigService {
    private prisma = new PrismaClient();

    async getMarkupPercentage(): Promise<number> {
        const config = await this.prisma.appConfig.findUnique({
            where: { key: 'MARKUP_PERCENTAGE' }
        });

        const markup = config?.value ? parseFloat(config.value) : 1.05;
        return isNaN(markup) ? 1.05 : markup;
    }

    async setMarkupPercentage(percentage: number): Promise<any> {
        return this.prisma.appConfig.upsert({
            where: { key: 'MARKUP_PERCENTAGE' },
            create: { key: 'MARKUP_PERCENTAGE', value: percentage.toString() },
            update: { value: percentage.toString() }
        });
    }

    async getAllProducts() {
        return this.prisma.product.findMany({
            include: { supplier: true },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getPendingProducts() {
        return this.prisma.product.findMany({
            where: { status: ProductStatus.PENDING },
            include: { supplier: true }
        });
    }

    async approveProduct(id: string) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) throw new NotFoundException('Product not found');

        return this.prisma.product.update({
            where: { id },
            data: { status: ProductStatus.APPROVED }
            // Note: price is already multiplied by markup during creation,
            // so we just approve it here. If markup changes later, we may need a recalculate endpoint.
        });
    }

    async rejectProduct(id: string, reason: string) {
        return this.prisma.product.update({
            where: { id },
            data: {
                status: ProductStatus.REJECTED,
                adminNotes: reason
            }
        });
    }

    async getHomepageCategories() {
        const config = await this.prisma.appConfig.findUnique({
            where: { key: 'HOMEPAGE_CATEGORIES' }
        });
        if (!config || !config.value) {
            return null;
        }
        try {
            return JSON.parse(config.value);
        } catch (e) {
            return null;
        }
    }

    async setHomepageCategories(data: any): Promise<any> {
        return this.prisma.appConfig.upsert({
            where: { key: 'HOMEPAGE_CATEGORIES' },
            create: { key: 'HOMEPAGE_CATEGORIES', value: JSON.stringify(data) },
            update: { value: JSON.stringify(data) }
        });
    }
}
