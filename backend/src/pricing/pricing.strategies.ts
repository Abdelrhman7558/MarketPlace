import { PlacementType } from '@prisma/client';

export interface PricingStrategy {
    calculatePrice(days: number): number;
}

export class HeroPricingStrategy implements PricingStrategy {
    calculatePrice(days: number): number {
        return 100 * days; // $100 per day
    }
}

export class FeaturedPricingStrategy implements PricingStrategy {
    calculatePrice(days: number): number {
        return 50 * days; // $50 per day
    }
}

export class ListingPricingStrategy implements PricingStrategy {
    calculatePrice(days: number): number {
        return 10 * days; // $10 per day
    }
}

export class BannerPricingStrategy implements PricingStrategy {
    calculatePrice(days: number): number {
        return 30 * days; // $30 per day
    }
}

export class PricingContext {
    private strategy: PricingStrategy;

    setStrategy(strategy: PricingStrategy) {
        this.strategy = strategy;
    }

    calculatePrice(days: number): number {
        return this.strategy.calculatePrice(days);
    }
}
