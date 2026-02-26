import { Controller, Get, UseGuards, Post, Param, Body, Query, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { UserDto } from '../common/dtos/base.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @Roles(Role.ADMIN)
    async findAll(@Query('status') status?: string) {
        const users = await this.usersService.findAll(status);
        return plainToInstance(UserDto, users);
    }

    @Post(':id/status')
    @Roles(Role.ADMIN)
    async updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.usersService.updateStatus(id, status);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    async deleteUser(@Param('id') id: string) {
        await this.usersService.deleteUser(id);
        return { message: 'User deleted successfully' };
    }
}
