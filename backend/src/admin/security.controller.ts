import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SecurityService } from './security.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('admin/security')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SecurityController {
    constructor(private readonly securityService: SecurityService) { }

    @Get('status')
    @Roles(Role.ADMIN)
    getStatus() {
        return this.securityService.getSecurityStatus();
    }

    @Get('agent-status')
    @Roles(Role.ADMIN)
    getAgentStatus() {
        return this.securityService.getAgentStatus();
    }

    @Post('agent-fix')
    @Roles(Role.ADMIN)
    runAgentFix() {
        return this.securityService.runAgentFix();
    }

    @Post('lockdown')
    @Roles(Role.ADMIN)
    toggleLockdown(@Body() body: { enabled: boolean }) {
        return this.securityService.toggleLockdown(body.enabled);
    }

    @Post('unblock')
    @Roles(Role.ADMIN)
    unblockIp(@Body() body: { ip: string }) {
        return this.securityService.unblockIp(body.ip);
    }
}
