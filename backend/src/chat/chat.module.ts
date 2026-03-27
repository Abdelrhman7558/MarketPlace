import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { BotService } from './bot.service';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from '../common/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [ChatController],
  providers: [ChatService, BotService, ChatGateway],
  exports: [ChatService, ChatGateway],
})
export class ChatModule {}
