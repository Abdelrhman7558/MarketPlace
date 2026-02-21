import { Expose, Exclude, Type } from 'class-transformer';

export class UserDto {
    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    name: string;

    @Expose()
    role: string;

    @Exclude()
    password?: string;

    @Expose()
    createdAt: Date;
}

export class ProductDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    price: number;

    @Expose()
    stock: number;

    @Expose()
    category: string;

    @Expose()
    images: string[];

    @Exclude()
    supplierId: string;

    @Expose()
    createdAt: Date;
}
