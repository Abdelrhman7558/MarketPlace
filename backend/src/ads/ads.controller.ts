import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AdsService, AdPlacement } from './ads.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('ads')
export class AdsController {
    constructor(private readonly adsService: AdsService) { }

    // Public endpoint for fetching ads based on frontend placement
    // Format: GET /ads?placement=SPONSORED_PRODUCT
    @Get()
    async getAds(@Query('placement') placement: AdPlacement) {
        if (!placement) {
            return [];
        }
        return this.adsService.getAdsByPlacement(placement);
    }

    // Admin endpoint
    @Get('admin/all')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async getAllAdsAdmin() {
        return this.adsService.getAllAdsAdmin();
    }

    // Admin endpoint
    @Post('admin/create')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async addAd(@Body() data: { productId: string; placement: AdPlacement }) {
        return this.adsService.addAd(data.productId, data.placement);
    }

    // Admin endpoint
    @Put('admin/:id/status')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async updateStatus(@Param('id') id: string, @Body('status') status: 'ACTIVE' | 'PAUSED') {
        await this.adsService.updateAdStatus(id, status);
        return { message: 'Status updated' };
    }

    // Admin endpoint
    @Delete('admin/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async removeAd(@Param('id') id: string) {
        await this.adsService.removeAd(id);
        return { message: 'Ad removed' };
    }
}
