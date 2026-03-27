import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shipping')
export class ShippingController {
    constructor(private readonly shippingService: ShippingService) { }

    @Get('rates')
    // We optionally use guard if shipping rates require auth, but for public checkout it might be open. 
    // We'll leave it unguarded or add basic validation.
    async getRates(
        @Query('cartTotal') cartTotal: string,
        @Query('destination') destination: string,
    ) {
        const total = parseFloat(cartTotal) || 100;
        const dest = destination || 'Default';
        return this.shippingService.getRates(total, dest);
    }
}
