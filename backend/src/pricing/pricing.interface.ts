export interface PricingContext {
    productId?: string;
    quantity?: number;
    placementType?: string;
    durationDays?: number;
    userId?: string;
}

export interface PricingStrategy {
    calculate(context: PricingContext): number;
    supports(context: PricingContext): boolean;
}
