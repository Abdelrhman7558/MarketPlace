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
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { PolicyGuard } from '../auth/policy.guard';
import { Roles } from '../auth/roles.decorator';
import { CheckOwnership } from '../auth/check-ownership.decorator';
import { Role } from '@prisma/client';
import { ProductDto } from '../common/dtos/base.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { plainToInstance } from 'class-transformer';
import { ExcelService } from '../admin/excel.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly excelService: ExcelService
    ) { }

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
        const isAdmin = req.user.role === Role.ADMIN;
        const supplierId = isAdmin ? createProductDto.supplierId : req.user.sub;

        const product = await this.productsService.create({
            ...createProductDto,
            supplierId,
        }, isAdmin);

        return plainToInstance(ProductDto, product);
    }

    @Post('bulk-upload')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.SUPPLIER, Role.ADMIN)
    @UseInterceptors(FileInterceptor('file'))
    async bulkUpload(@UploadedFile() file: any, @Request() req) {
        if (!file) throw new Error('File is required');

        const isAdmin = req.user.role === Role.ADMIN;
        const report = await this.excelService.processProductsExcel(file.buffer, CreateProductDto);

        const createdProducts = [];
        for (const result of report.results) {
            if (result.success && result.data) {
                const dto = result.data as CreateProductDto;
                const supplierId = isAdmin ? (dto.supplierId || req.user.sub) : req.user.sub;

                // Validate if title (name) or description is missing, normally dto might catch this, 
                // but if they are spaces or very short, we flag them.
                if (!dto.name || dto.name.trim() === '' || !dto.description || dto.description.trim() === '') {
                    dto.adminNotes = (dto.adminNotes ? dto.adminNotes + ' | ' : '') + 'Warning: Missing title or description.';
                }

                try {
                    const product = await this.productsService.create({
                        ...dto,
                        supplierId,
                    }, isAdmin);
                    createdProducts.push(product);
                } catch (e) {
                    result.success = false;
                    result.errors = result.errors || [];
                    result.errors.push(`Failed to create product via DB: ${e.message}`);
                    report.successCount--;
                    report.errorCount++;
                }
            }
        }

        return { ...report, createdCount: createdProducts.length };
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
