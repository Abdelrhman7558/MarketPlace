import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductStatus } from '@prisma/client';
import { EanService } from './ean.service';

@Injectable()
export class ProductsService {
    private prisma = new PrismaClient();
    constructor(private eanService: EanService) { }

    async create(createProductDto: CreateProductDto, isAdmin: boolean = false) {
        // Fetch markup setting
        const config = await this.prisma.appConfig.findUnique({
            where: { key: 'MARKUP_PERCENTAGE' }
        });

        // Default markup is 5% if config not found
        const markupPercentage = config && config.value ? parseFloat(config.value) : 1.05;

        // Make sure it's valid (e.g. 1.05 for 5% markup)
        const finalMarkup = isNaN(markupPercentage) ? 1.05 : markupPercentage;

        // Fetch EAN image if ean is provided and no images are uploaded
        let productImages = createProductDto.images || [];
        if (createProductDto.ean && productImages.length === 0) {
            const fetchedImage = await this.eanService.fetchImageUrlByEan(createProductDto.ean);
            if (fetchedImage) {
                productImages = [fetchedImage];
            }
        }

        return this.prisma.product.create({
            data: {
                ...createProductDto,
                status: isAdmin ? ProductStatus.APPROVED : ProductStatus.PENDING,
                price: createProductDto.price * finalMarkup,
                images: productImages,
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
