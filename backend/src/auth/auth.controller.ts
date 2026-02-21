import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../common/dtos/base.dto';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() createUserDto: any) {
        // Note: Registration logic should be in usersService, but I'll add a basic placeholder here
        // In a real app, we'd use a dedicated 'register' service method
        return this.authService.login(await this.authService.validateUser(createUserDto.email, createUserDto.password));
    }

    @Post('login')
    async login(@Body() loginDto: any) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            return { message: 'Invalid credentials' };
        }
        return this.authService.login(user);
    }
}
