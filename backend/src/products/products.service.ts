import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    private prisma = new PrismaClient();

    async create(createProductDto: CreateProductDto) {
        return this.prisma.product.create({
            data: {
                ...createProductDto,
                images: createProductDto.images || [],
            },
        });
    }

    async findAll() {
        return this.prisma.product.findMany();
    }

    async findOne(id: string) {
        return this.prisma.product.findUnique({ where: { id } });
    }

    async findBySupplier(supplierId: string) {
        return this.prisma.product.findMany({ where: { supplierId } });
    }
}
