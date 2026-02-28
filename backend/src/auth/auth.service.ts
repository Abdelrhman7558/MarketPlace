import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
    private prisma = new PrismaClient();

    constructor(
        private jwtService: JwtService,
        private emailService: EmailService
    ) { }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async updateAdmin(id: string, newPassword: string) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return this.prisma.user.update({
            where: { id },
            data: { password: hashedPassword, status: 'ACTIVE', role: 'ADMIN' },
        });
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        // Check password
        if (await bcrypt.compare(pass, user.password)) {
            // Check status
            if (user.status === 'PENDING_APPROVAL') {
                throw new UnauthorizedException('حسابك قيد المراجعة في انتظار موافقة الإدارة');
            }
            if (user.status === 'REJECTED' || user.status === 'BLOCKED') {
                throw new UnauthorizedException(`حسابك موقوف أو مرفوض: ${user.status}`);
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
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                phone: data.phone,
                companyName: data.companyName,
                website: data.website,
                socialLinks: data.socialLinks,
                role: data.role.toUpperCase(),
                status: data.status || 'PENDING_APPROVAL',
                verificationToken,
            },
        });

        await this.emailService.sendVerificationEmail(user.email, verificationToken);
        return user;
    }

    async verifyEmail(token: string) {
        const user = await this.prisma.user.findFirst({ where: { verificationToken: token } });
        if (!user) throw new UnauthorizedException('Invalid verification token');

        return this.prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: true, verificationToken: null },
        });
    }

    async forgotPassword(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return; // Don't reveal user existence

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpires = new Date(Date.now() + 3600000); // 1 hour

        await this.prisma.user.update({
            where: { id: user.id },
            data: { resetPasswordToken: resetToken, resetPasswordExpires: resetExpires },
        });

        await this.emailService.sendPasswordResetEmail(user.email, resetToken);
    }

    async resetPassword(token: string, newPass: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { gt: new Date() },
            },
        });

        if (!user) throw new UnauthorizedException('Invalid or expired reset token');

        const hashedPassword = await bcrypt.hash(newPass, 10);
        return this.prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
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
