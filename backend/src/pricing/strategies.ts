import { PricingStrategy, PricingContext } from './pricing.interface';

export class ProductPricingStrategy implements PricingStrategy {
    calculate(context: PricingContext): number {
        // In a real app, this would fetch from a DB
        // Placeholder: base price is $10 for all products
        const basePrice = 10;
        return basePrice * (context.quantity || 1);
    }

    supports(context: PricingContext): boolean {
        return !!context.productId && !context.placementType;
    }
}

export class PlacementPricingStrategy implements PricingStrategy {
    private readonly rates: Record<string, number> = {
        HERO: 50,      // $50 per day
        FEATURED: 30,  // $30 per day
        BANNER: 20,    // $20 per day
        SIDEBAR: 10,   // $10 per day
    };

    calculate(context: PricingContext): number {
        const rate = this.rates[context.placementType || ''] || 0;
        return rate * (context.durationDays || 1);
    }

    supports(context: PricingContext): boolean {
        return !!context.placementType;
    }
}

export class BulkDiscountStrategy implements PricingStrategy {
    calculate(context: PricingContext): number {
        const qty = context.quantity || 0;
        if (qty >= 100) return -0.20; // 20% discount
        if (qty >= 50) return -0.10;  // 10% discount
        return 0;
    }

    supports(context: PricingContext): boolean {
        return !!context.quantity && context.quantity >= 50;
    }
}
