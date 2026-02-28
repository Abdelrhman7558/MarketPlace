import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin/team')
@UseGuards(RolesGuard)
@Roles('ADMIN')
export class TeamController {
    constructor(private readonly adminService: AdminService) { }

    @Post('invite')
    async inviteMember(@Body() body: any) {
        return this.adminService.inviteTeamMember(body);
    }
}
