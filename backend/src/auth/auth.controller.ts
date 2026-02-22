import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../common/dtos/base.dto';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() createUserDto: any) {
        const { password, ...userData } = createUserDto;
        // The service already handles hashing and duplicate checks
        const user = await this.authService.register(createUserDto);
        return this.authService.login(user);
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
