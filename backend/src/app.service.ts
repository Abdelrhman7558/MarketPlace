import { Injectable } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) { }

    getHello(): string {
        return 'Marketplace API is healthy!';
    }

    async getHomepageCategories() {
        const config = await this.prisma.appConfig.findUnique({
            where: { key: 'HOMEPAGE_CATEGORIES' }
        });
        if (!config || !config.value) {
            return [];
        }
        try {
            return JSON.parse(config.value);
        } catch (e) {
            return [];
        }
    }

    async getPlatformCurrency() {
        const config = await this.prisma.appConfig.findUnique({
            where: { key: 'PLATFORM_CURRENCY' }
        });
        return { currency: config?.value || null };
    }
}
