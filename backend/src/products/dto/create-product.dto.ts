import { IsString, IsNumber, IsOptional, Min, IsEnum } from 'class-validator';
import { ProductStatus } from '@prisma/client';

export class CreateProductDto {
    @IsString()
    name!: string;

    @IsString()
    description!: string;

    @IsNumber()
    @Min(0)
    price!: number;

    @IsNumber()
    @Min(0)
    stock!: number;

    @IsString()
    category!: string;

    @IsOptional()
    @IsString({ each: true })
    images?: string[];

    @IsOptional()
    @IsString()
    ean?: string;

    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus;

    @IsOptional()
    @IsString()
    adminNotes?: string;

    @IsString()
    supplierId: string = '';
}
