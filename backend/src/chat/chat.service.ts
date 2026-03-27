import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { BotService } from './bot.service';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private botService: BotService,
  ) {}

  async sendMessage(senderId: string, data: { content?: string; imageUrl?: string; receiverId?: string }) {
    const message = await this.prisma.supportMessage.create({
      data: {
        senderId,
        content: data.content,
        imageUrl: data.imageUrl,
        receiverId: data.receiverId || null,
      },
      include: {
        sender: {
          select: { name: true, role: true }
        }
      }
    });

    // Handle Notifications
    if (data.receiverId) {
      // Support replying to User
      await this.prisma.notification.create({
        data: {
          userId: data.receiverId,
          title: 'New Support Message',
          message: `Support replied to your inquiry: "${data.content?.substring(0, 50)}..."`,
          type: 'INFO'
        }
      });
    } else {
      // User sending to Support
      // Generate AI Response
      const aiResponse = await this.botService.getResponse(data.content || '');
      
      // Save Bot Message
      const botMessage = await this.prisma.supportMessage.create({
        data: {
          senderId: message.senderId, // Keep it linked to the thread
          content: aiResponse.content,
          receiverId: message.senderId, // Replying back to the user
          isBot: true,
          assignedTeam: aiResponse.assignedTeam,
        }
      });

      // Find all Support agents and Admins (and the assigned team)
      const rolesToNotify = ['ADMIN', 'SUPPORT'];
      if (aiResponse.assignedTeam) {
        rolesToNotify.push(aiResponse.assignedTeam);
      }

      const supportUsers = await this.prisma.user.findMany({
        where: {
          role: { in: rolesToNotify as any }
        },
        select: { id: true }
      });

      // Create notifications for relevant staff
      await Promise.all(supportUsers.map(staff => 
        this.prisma.notification.create({
          data: {
            userId: staff.id,
            title: aiResponse.assignedTeam ? `New ${aiResponse.assignedTeam} Inquiry` : 'New User Inquiry',
            message: `${message.sender.name} sent a message: "${data.content?.substring(0, 50)}..."`,
            type: 'INFO'
          }
        })
      ));
      
      return { userMessage: message, botMessage };
    }

    return message;
  }

  async getMessages(userId1: string, userId2: string | null) {
    // If userId2 is null, it means we're looking for messages between userId1 and general support
    return this.prisma.supportMessage.findMany({
      where: {
        OR: [
          { senderId: userId1, receiverId: userId2 },
          { senderId: userId2 || 'SUPPORT', receiverId: userId1 }, 
        ],
      },
      include: {
        sender: {
          select: { name: true, role: true }
        }
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getConversations(userRole: string) {
    // For support agents: get unique users who have sent messages
    const where: any = { receiverId: null };

    // Apply Team Filtering
    if (userRole === 'DEVELOPER') {
      where.assignedTeam = 'DEVELOPER';
    } else if (userRole === 'LOGISTICS') {
      where.assignedTeam = 'LOGISTICS';
    } else if (userRole !== 'ADMIN' && userRole !== 'SUPPORT') {
      // Non-support roles shouldn't access this
      return [];
    }

    const messages = await this.prisma.supportMessage.findMany({
      where,
      distinct: ['senderId'],
      orderBy: { createdAt: 'desc' },
      include: {
        sender: {
          select: { id: true, name: true, email: true, role: true }
        }
      }
    });
    return messages.map(m => m.sender);
  }

  async getMessagesForUser(userId: string) {
     // Get all messages where user is sender (to support) or receiver (from support)
     return this.prisma.supportMessage.findMany({
       where: {
         OR: [
           { senderId: userId, receiverId: null }, // User to Support
           { receiverId: userId } // Support to User
         ]
       },
       include: {
         sender: {
           select: { name: true, role: true }
         }
       },
       orderBy: { createdAt: 'asc' }
     });
  }

  async markAsRead(messageIds: string[]) {
    return this.prisma.supportMessage.updateMany({
      where: { id: { in: messageIds } },
      data: { isRead: true }
    });
  }
}
