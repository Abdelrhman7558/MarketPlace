import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('coupons')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class CouponsController {
    constructor(private readonly couponsService: CouponsService) { }

    @Post()
    async create(
        @Body() body: { code: string; discountPercent: number; expirationDate: string; placementId: string }
    ) {
        return this.couponsService.create({
            code: body.code,
            discountPercent: Number(body.discountPercent),
            expirationDate: new Date(body.expirationDate),
            placementId: body.placementId,
        });
    }

    @Get()
    async findAll() {
        return this.couponsService.findAll();
    }
}
