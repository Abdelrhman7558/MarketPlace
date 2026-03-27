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

    @Expose()
    status: string;

    @Expose()
    phone?: string;

    @Expose()
    avatar?: string;

    @Expose()
    companyName?: string;

    @Expose()
    website?: string;

    @Expose()
    socialLinks?: string;

    @Exclude()
    password?: string;

    @Exclude()
    verificationToken?: string;

    @Exclude()
    resetPasswordToken?: string;

    @Exclude()
    resetPasswordExpires?: Date;

    // Strict scrubbing for billing data - NEVER expose to frontend
    @Exclude()
    vatNumber?: string;

    @Exclude()
    taxId?: string;

    @Exclude()
    country?: string;

    @Exclude()
    bankAddress?: string;

    @Exclude()
    iban?: string;

    @Exclude()
    swiftCode?: string;

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
