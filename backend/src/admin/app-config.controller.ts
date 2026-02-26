import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('admin/config')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AppConfigController {
    constructor(private readonly appConfigService: AppConfigService) { }

    @Get('markup')
    async getMarkup() {
        const markup = await this.appConfigService.getMarkupPercentage();
        return { markup };
    }

    @Post('markup')
    async setMarkup(@Body('percentage') percentage: number) {
        await this.appConfigService.setMarkupPercentage(percentage);
        return { message: 'Markup percentage updated', percentage };
    }

    @Get('all-products')
    async getAllProducts() {
        return this.appConfigService.getAllProducts();
    }

    @Get('pending-products')
    async getPendingProducts() {
        return this.appConfigService.getPendingProducts();
    }

    @Put('products/:id/approve')
    async approveProduct(@Param('id') id: string) {
        return this.appConfigService.approveProduct(id);
    }

    @Put('products/:id/reject')
    async rejectProduct(@Param('id') id: string, @Body('reason') reason: string) {
        return this.appConfigService.rejectProduct(id, reason);
    }

    @Post('homepage-categories')
    async setHomepageCategories(@Body() data: any) {
        await this.appConfigService.setHomepageCategories(data);
        return { message: 'Homepage categories updated successfully' };
    }
}
