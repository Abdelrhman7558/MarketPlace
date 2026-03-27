import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

export enum AdPlacement {
    SPONSORED_PRODUCT = 'SPONSORED_PRODUCT',
    SPONSORED_BRAND = 'SPONSORED_BRAND',
    SPONSORED_DISPLAY = 'SPONSORED_DISPLAY',
}

export interface AdConfiguration {
    id: string; // unique ID
    productId: string; // The product being advertised
    placement: AdPlacement; // Which slot it occupies
    status: 'ACTIVE' | 'PAUSED';
    createdAt: string;
}

@Injectable()
export class AdsService {
    constructor(private prisma: PrismaService) { }

    private async getAdsConfig(): Promise<AdConfiguration[]> {
        const config = await this.prisma.appConfig.findUnique({
            where: { key: 'ACTIVE_ADS' }
        });
        if (!config || !config.value) return [];
        return config.value as unknown as AdConfiguration[];
    }

    private async saveAdsConfig(ads: AdConfiguration[]): Promise<void> {
        await this.prisma.appConfig.upsert({
            where: { key: 'ACTIVE_ADS' },
            update: { value: ads as unknown as any },
            create: { key: 'ACTIVE_ADS', value: ads as unknown as any }
        });
    }

    async getAdsByPlacement(placement: AdPlacement): Promise<any[]> {
        const allAds = await this.getAdsConfig();
        const activeAds = allAds.filter(ad => ad.status === 'ACTIVE' && ad.placement === placement);

        if (activeAds.length === 0) return [];

        // Fetch the corresponding products with supplier info
        const productIds = activeAds.map(ad => ad.productId);
        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds }, status: 'APPROVED' },
            include: { supplier: { select: { name: true, id: true } } }
        });

        // Map back to maintain ad id and placement info
        return activeAds.map(ad => {
            const product = products.find(p => p.id === ad.productId);
            if (!product) return null;
            return {
                adId: ad.id,
                placement: ad.placement,
                product
            };
        }).filter(Boolean);
    }

    async getAllAdsAdmin(): Promise<any[]> {
        const allAds = await this.getAdsConfig();
        const productIds = allAds.map(ad => ad.productId);

        let products = [];
        if (productIds.length > 0) {
            products = await this.prisma.product.findMany({
                where: { id: { in: productIds } },
                include: { supplier: { select: { name: true } } }
            });
        }

        return allAds.map(ad => ({
            ...ad,
            productName: products.find(p => p.id === ad.productId)?.name || 'Unknown',
            supplierName: products.find(p => p.id === ad.productId)?.supplier?.name || 'Unknown'
        }));
    }

    async addAd(productId: string, placement: AdPlacement): Promise<AdConfiguration> {
        const ads = await this.getAdsConfig();

        // Prevent duplicate product in same placement
        const existing = ads.find(a => a.productId === productId && a.placement === placement);
        if (existing) {
            existing.status = 'ACTIVE';
            await this.saveAdsConfig(ads);
            return existing;
        }

        const newAd: AdConfiguration = {
            id: Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
            productId,
            placement,
            status: 'ACTIVE',
            createdAt: new Date().toISOString()
        };

        ads.push(newAd);
        await this.saveAdsConfig(ads);
        return newAd;
    }

    async removeAd(adId: string): Promise<void> {
        const ads = await this.getAdsConfig();
        const newAds = ads.filter(a => a.id !== adId);
        await this.saveAdsConfig(newAds);
    }

    async updateAdStatus(adId: string, status: 'ACTIVE' | 'PAUSED'): Promise<void> {
        const ads = await this.getAdsConfig();
        const ad = ads.find(a => a.id === adId);
        if (ad) {
            ad.status = status;
            await this.saveAdsConfig(ads);
        }
    }
}
