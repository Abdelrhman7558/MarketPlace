import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private prisma = new PrismaClient();

    async findOne(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async create(data: any) {
        const existing = await this.findOne(data.email);
        if (existing) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
                role: (data.role as Role) || Role.CUSTOMER,
            },
        });
    }

    async findAll() {
        return this.prisma.user.findMany();
    }
}
