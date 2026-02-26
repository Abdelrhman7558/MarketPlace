import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../common/dtos/base.dto';
import { plainToInstance } from 'class-transformer';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() createUserDto: RegisterDto) {
        const { password, ...userData } = createUserDto;
        // The service already handles hashing, duplicate checks, and setting status to PENDING_APPROVAL
        const user = await this.authService.register(createUserDto);

        // Do not log in the user immediately, tell them to wait for approval.
        return {
            message: 'تم التسجيل بنجاح. حسابك الآن قيد المراجعة بواسطة الإدارة، ستتمكن من تسجيل الدخول فور الموافقة عليه.',
            userId: user.id
        };
    }

    @Post('login')
    async login(@Body() loginDto: any) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            return { message: 'Invalid credentials' };
        }
        return this.authService.login(user);
    }

    @Post('seed-admin')
    async seedAdmin(@Body() body: any) {
        // Bypasses DTO validation — used only for initial super admin creation/update
        try {
            const existing = await this.authService.findByEmail(body.email);
            if (existing) {
                // Update the password hash and ensure ACTIVE status
                await this.authService.updateAdmin(existing.id, body.password);
                return { message: 'Admin updated', userId: existing.id };
            }
            const user = await this.authService.register({
                email: body.email,
                password: body.password,
                name: body.name || 'Super Admin',
                role: 'ADMIN',
                status: 'ACTIVE',
            });
            return { message: 'Admin seeded successfully', userId: user.id };
        } catch (err) {
            return { message: 'Seed admin failed', error: (err as any).message };
        }
    }
}
