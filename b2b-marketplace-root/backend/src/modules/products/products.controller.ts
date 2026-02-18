import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request, UnauthorizedException, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPPLIER', 'SUPER_ADMIN')
    @Post()
    create(@Request() req, @Body() createProductDto: any) {
        const supplierId = req.user.supplierId;
        if (!supplierId && req.user.role !== 'SUPER_ADMIN') {
            throw new UnauthorizedException('User is not linked to a supplier profile');
        }
        return this.productsService.create({
            ...createProductDto,
            supplier: { connect: { id: supplierId } }
        });
    }

    @Get()
    findAll(@Query() query) {
        const { skip, take, search } = query;
        return this.productsService.findAll({
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
            where: search ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                ]
            } : undefined
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }
}
