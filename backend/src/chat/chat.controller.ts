import { Controller, Get, Post, Body, UseGuards, Request, Param, Patch } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  async sendMessage(@Request() req, @Body() data: { content?: string; imageUrl?: string; receiverId?: string }) {
    return this.chatService.sendMessage(req.user.sub, data);
  }

  @Get('messages')
  async getMyMessages(@Request() req) {
    return this.chatService.getMessagesForUser(req.user.sub);
  }

  @Get('admin/conversations')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SUPPORT, Role.DEVELOPER, Role.LOGISTICS)
  async getConversations(@Request() req) {
    return this.chatService.getConversations(req.user.role?.toUpperCase());
  }

  @Get('admin/messages/:userId')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SUPPORT, Role.DEVELOPER, Role.LOGISTICS)
  async getUserMessages(@Param('userId') userId: string) {
    return this.chatService.getMessagesForUser(userId);
  }

  @Patch('read')
  async markRead(@Body() data: { ids: string[] }) {
    return this.chatService.markAsRead(data.ids);
  }
}
