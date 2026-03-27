import { Injectable } from '@nestjs/common';
import { PricingContext } from './pricing.interface';
import { ProductPricingStrategy, PlacementPricingStrategy, BulkDiscountStrategy } from './strategies';

@Injectable()
export class PricingService {
    private strategies = [
        new ProductPricingStrategy(),
        new PlacementPricingStrategy(),
        new BulkDiscountStrategy(),
    ];

    calculateTotal(context: PricingContext): number {
        let total = 0;
        let discountPercent = 0;

        // First pass: Calculate base sums
        for (const strategy of this.strategies) {
            if (strategy.supports(context)) {
                const result = strategy.calculate(context);
                if (result < 0) {
                    // It's a discount strategy
                    discountPercent += Math.abs(result);
                } else {
                    total += result;
                }
            }
        }

        // Apply cumulative discount
        return total * (1 - discountPercent);
    }
}
