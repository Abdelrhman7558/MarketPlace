import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
            supplierId: user.supplierProfile?.id,
            buyerId: user.buyerProfile?.id
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: payload
        };
    }

    async register(data: any) {
        // Strict Role Logic
        if (data.email === '7bd02025@gmail.com') {
            data.role = 'MANAGER';
        } else {
            // Force everyone else to BUYER (or SUPPLIER if requested, but never MANAGER)
            if (data.role === 'MANAGER') {
                data.role = 'BUYER';
            }
            // Allow SUPPLIER if explicitly requested, otherwise default to BUYER
            if (!['BUYER', 'SUPPLIER'].includes(data.role)) {
                data.role = 'BUYER';
            }
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        try {
            const user = await this.usersService.create({
                ...data,
                password: hashedPassword,
            });
            const { password, ...result } = user;
            return result;
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new UnauthorizedException('Email already exists');
            }
            throw error;
        }
    }
}
