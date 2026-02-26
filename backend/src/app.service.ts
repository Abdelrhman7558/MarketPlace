import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
    private prisma = new PrismaClient();

    getHello(): string {
        return 'Marketplace API is healthy!';
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
}
