import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AdminService {
    private prisma = new PrismaClient();

    constructor(private emailService: EmailService) { }

    async inviteTeamMember(data: any) {
        const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (existing) {
            throw new UnauthorizedException('User already exists');
        }

        // Generate a random temporary password
        const tempPassword = crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                role: data.role.toUpperCase(),
                permissions: data.permissions || [],
                status: 'PENDING_APPROVAL',
                emailVerified: true, // Admin invited users are pre-verified or logic can vary
            },
        });

        await this.emailService.sendTeamInvitation(user.email, user.name, user.role);

        return {
            message: 'Invitation sent successfully',
            userId: user.id
        };
    }
}
