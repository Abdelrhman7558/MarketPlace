import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { EmailService } from '../email/email.service';
import { CryptoService } from '../security/crypto.service';

import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private emailService: EmailService,
        private cryptoService: CryptoService
    ) { }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({ where: { id }, select: { twoFactorSecret: true, twoFactorEnabled: true } });
    }

    async updateAdmin(id: string, newPassword: string) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return this.prisma.user.update({
            where: { id },
            data: { password: hashedPassword, status: 'ACTIVE', role: 'ADMIN', emailVerified: true },
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
            // Strict scrubbing: NEVER expose passwords or billing data to the frontend
            const {
                password, iban, swiftCode, taxId, bankAddress, vatNumber,
                verificationToken, resetPasswordToken, resetPasswordExpires,
                ...safeResult
            } = user;

            return safeResult;
        }
        return null;
    }

    async register(data: any) {
        console.log(`[AUTH] Registration attempt for email: ${data.email}, role: ${data.role}`);
        
        const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (existing) {
            console.warn(`[AUTH] Registration failed: User ${data.email} already exists.`);
            throw new UnauthorizedException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // If user is registering via invite link, we activate them immediately 
        // as requested by the user, bypassing the manual approval queue.
        const isInvited = !!data.inviteToken;
        const status = (isInvited || data.status === 'ACTIVE') ? 'ACTIVE' : (data.status || 'PENDING_APPROVAL');

        try {
            console.log(`[AUTH] Attempting database creation for ${data.email}`);
            const user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    name: data.name,
                    phone: data.phone,
                    companyName: data.companyName,
                    website: data.website,
                    socialLinks: data.socialLinks,
                    vatNumber: data.vatNumber,
                    taxId: data.taxId ? this.cryptoService.encrypt(data.taxId) : null,
                    country: data.country,
                    bankAddress: data.bankAddress,
                    iban: data.iban ? this.cryptoService.encrypt(data.iban) : null,
                    swiftCode: data.swiftCode ? this.cryptoService.encrypt(data.swiftCode) : null,
                    role: data.role.toUpperCase(),
                    status,
                    verificationToken: isInvited ? null : verificationToken,
                    emailVerified: isInvited || data.status === 'ACTIVE'
                },
            });

            console.log(`[AUTH] User created successfully: ${user.id} (${user.email})`);

            if (user.status === 'PENDING_APPROVAL') {
                try {
                    if (user.verificationToken) {
                        await this.emailService.sendVerificationEmail(user.email, user.verificationToken);
                    }
                    await this.emailService.sendRegistrationConfirmationEmail(user.email, user.name, data.locale);
                } catch (emailError) {
                    console.error('[AUTH] Email sending failed but user was created:', emailError);
                    require('fs').appendFileSync('/tmp/auth_errors.log', `[${new Date().toISOString()}] Email failed for ${data.email}: ${emailError.message}\n`);
                }
            } else if (user.status === 'ACTIVE') {
                 await this.emailService.sendWelcomeEmail(user.email, user.name, user.role);
            }

            // Strict scrubbing before returning the newly registered user
            const {
                password, iban, swiftCode, taxId, bankAddress, vatNumber,
                verificationToken: vt, resetPasswordToken, resetPasswordExpires,
                ...safeUser
            } = user;

            return { ...safeUser, isInvited };
        } catch (error) {
            console.error('[AUTH] Registration database error:', error);
            require('fs').appendFileSync('/tmp/auth_errors.log', `[${new Date().toISOString()}] Database error for ${data.email}: ${error.message}\n`);
            throw error;
        }
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
        if (!user) {
            console.log(`[AUTH] forgotPassword: no user found for email ${email} — silently ignoring`);
            return; // Don't reveal user existence
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpires = new Date(Date.now() + 3600000); // 1 hour

        await this.prisma.user.update({
            where: { id: user.id },
            data: { resetPasswordToken: resetToken, resetPasswordExpires: resetExpires },
        });

        console.log(`[AUTH] forgotPassword: token generated for ${email}, sending reset email...`);
        console.log(`[AUTH] forgotPassword: FRONTEND_URL = ${process.env.FRONTEND_URL}`);

        try {
            await this.emailService.sendPasswordResetEmail(user.email, resetToken);
            console.log(`[AUTH] forgotPassword: reset email sent successfully to ${email}`);
        } catch (emailError: any) {
            // Log the error but don't throw — we don't want to reveal email system details to the client
            console.error(`[AUTH] forgotPassword: SMTP error sending reset email to ${email}:`, emailError.message);
            require('fs').appendFileSync('/tmp/auth_errors.log',
                `[${new Date().toISOString()}] Password reset email failed for ${email}: ${emailError.message}\n`
            );
        }
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
        const isTeamRole = ['ADMIN', 'MODERATOR', 'SUPPORT', 'EDITOR'].includes(user.role);
        return this.prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
                ...(isTeamRole ? { status: 'ACTIVE', emailVerified: true } : {}),
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

    async googleLogin(data: { email: string; name: string; avatar?: string; googleId?: string }) {
        let user = await this.prisma.user.findUnique({ where: { email: data.email } });

        if (!user) {
            // New user via Google — create with PENDING_APPROVAL (B2B platform requires admin review)
            const randomPassword = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10);
            user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    password: randomPassword,
                    avatar: data.avatar,
                    role: 'CUSTOMER',
                    status: 'PENDING_APPROVAL',
                    emailVerified: true, // Google verified the email
                },
            });
            try {
                await this.emailService.sendRegistrationConfirmationEmail(user.email, user.name, 'en');
            } catch { }
            return { pendingApproval: true, email: user.email };
        }

        if (user.status === 'BLOCKED' || user.status === 'REJECTED') {
            throw new UnauthorizedException(`Your account has been ${user.status.toLowerCase()}`);
        }

        if (user.status === 'PENDING_APPROVAL') {
            throw new UnauthorizedException('Your account is pending admin approval');
        }

        const {
            password, iban, swiftCode, taxId, bankAddress, vatNumber,
            verificationToken, resetPasswordToken, resetPasswordExpires,
            ...safeUser
        } = user;

        return this.login(safeUser);
    }
}
