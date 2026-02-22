import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private prisma = new PrismaClient();

    constructor(private jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        // Check password
        if (await bcrypt.compare(pass, user.password)) {
            // Check status
            if (user.status === 'REJECTED' || user.status === 'BLOCKED') {
                throw new UnauthorizedException(`Account ${user.status.toLowerCase()}`);
            }
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async register(data: any) {
        const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (existing) {
            throw new UnauthorizedException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                phone: data.phone,
                role: data.role.toUpperCase(),
                status: 'PENDING_APPROVAL'
            },
        });
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
}
