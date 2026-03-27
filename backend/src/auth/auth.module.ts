import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ViesService } from './vies.service';
import { TwoFaService } from './twofa.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { EmailModule } from '../email/email.module';

import { PrismaModule } from '../common/prisma.module';

@Module({
    imports: [
        PassportModule,
        EmailModule,
        PrismaModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secretKey',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, ViesService, TwoFaService],
    exports: [AuthService, TwoFaService],
})
export class AuthModule { }
