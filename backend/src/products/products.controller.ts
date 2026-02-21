import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { PolicyGuard } from '../auth/policy.guard';
import { Roles } from '../auth/roles.decorator';
import { CheckOwnership } from '../auth/check-ownership.decorator';
import { Role } from '@prisma/client';
import { ProductDto } from '../common/dtos/base.dto';
import { plainToInstance } from 'class-transformer';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async findAll() {
        const products = await this.productsService.findAll();
        return plainToInstance(ProductDto, products);
    }

    @Get('my-products')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.SUPPLIER)
    async findMyProducts(@Request() req) {
        const products = await this.productsService.findBySupplier(req.user.sub);
        return plainToInstance(ProductDto, products);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const product = await this.productsService.findOne(id);
        return plainToInstance(ProductDto, product);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.SUPPLIER, Role.ADMIN)
    async create(@Body() createProductDto: any, @Request() req) {
        const supplierId = req.user.role === Role.ADMIN ? createProductDto.supplierId : req.user.sub;
        const product = await this.productsService.create({
            ...createProductDto,
            supplierId,
        });
        return plainToInstance(ProductDto, product);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard, PolicyGuard)
    @Roles(Role.SUPPLIER, Role.ADMIN)
    @CheckOwnership('PRODUCT')
    async update(@Param('id') id: string, @Body() updateProductDto: any) {
        // Implementation for update would go here
        return { message: 'Product updated' };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard, PolicyGuard)
    @Roles(Role.SUPPLIER, Role.ADMIN)
    @CheckOwnership('PRODUCT')
    async remove(@Param('id') id: string) {
        // Implementation for delete would go here
        return { message: 'Product deleted' };
    }
}
