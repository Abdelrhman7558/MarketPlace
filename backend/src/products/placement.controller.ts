import {
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { PlacementService } from './placement.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role, PlacementType } from '@prisma/client';

@Controller('placements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PlacementController {
    constructor(private readonly placementService: PlacementService) { }

    @Post('request')
    @Roles(Role.SUPPLIER)
    async requestPlacement(
        @Body('productId') productId: string,
        @Body('type') type: PlacementType,
        @Body('durationDays') durationDays: number,
    ) {
        return this.placementService.createRequest(productId, type, durationDays);
    }

    @Get()
    @Roles(Role.ADMIN)
    async findAll() {
        return this.placementService.findAll();
    }

    @Get('my-placements')
    @Roles(Role.SUPPLIER)
    async findMyPlacements(@Request() req) {
        return this.placementService.findBySupplier(req.user.sub);
    }

    @Put(':id/approve')
    @Roles(Role.ADMIN)
    async approve(
        @Param('id') id: string,
        @Body('priorityOrder') priorityOrder: number,
        @Request() req,
    ) {
        return this.placementService.approvePlacement(id, req.user.sub, priorityOrder);
    }
}
