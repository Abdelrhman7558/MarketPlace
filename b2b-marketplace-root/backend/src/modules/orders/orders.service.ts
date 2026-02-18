import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name);

    constructor(
        private prisma: PrismaService,
        private httpService: HttpService
    ) { }

    async create(userId: string, createOrderDto: CreateOrderDto) {
        const { items } = createOrderDto;

        // 1. Group items by Supplier
        // We need to fetch products first to know the supplierId
        const itemsWithProduct = await Promise.all(items.map(async (item) => {
            const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
            if (!product) throw new BadRequestException(`Product ${item.productId} not found`);
            if (product.stock < item.quantity) throw new BadRequestException(`Insufficient stock for product ${product.name}`);
            return { ...item, product };
        }));

        const ordersBySupplier: Record<string, typeof itemsWithProduct> = {};

        for (const item of itemsWithProduct) {
            const supplierId = item.product.supplierId;
            if (!ordersBySupplier[supplierId]) ordersBySupplier[supplierId] = [];
            ordersBySupplier[supplierId].push(item);
        }

        const createdOrders = [];

        await this.prisma.$transaction(async (prisma) => {
            for (const [supplierId, supplierItems] of Object.entries(ordersBySupplier)) {
                let totalAmount = 0;
                const orderItemsData = [];

                for (const item of supplierItems) {
                    totalAmount += Number(item.product.price) * item.quantity;
                    orderItemsData.push({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price
                    });

                    // Decrement Stock
                    await prisma.product.update({
                        where: { id: item.productId },
                        data: { stock: item.product.stock - item.quantity }
                    });
                }

                // Create Order
                const order = await prisma.order.create({
                    data: {
                        buyerId: userId,
                        supplierId: supplierId,
                        totalAmount: totalAmount,
                        status: 'PENDING',
                        items: {
                            create: orderItemsData
                        }
                    },
                    include: { items: true, buyer: true }
                });
                createdOrders.push(order);
            }
        });

        // 4. Send to N8N Webhook
        for (const order of createdOrders) {
            this.sendOrderToWebhook(order);
        }

        return createdOrders;
    }

    private async sendOrderToWebhook(order: any) {
        const webhookUrl = process.env.N8N_WEBHOOK_URL || 'https://n8n.srv1385704.hstgr.cloud/webhook-test/orders';
        try {
            await firstValueFrom(this.httpService.post(webhookUrl, order));
            this.logger.log(`Order ${order.id} sent to N8N webhook successfully`);
        } catch (error) {
            this.logger.error(`Failed to send order ${order.id} to N8N webhook`, error);
        }
    }

    async findAll(userId: string, role: string) {
        if (role === 'SUPPLIER') {
            const user = await this.prisma.user.findUnique({ where: { id: userId }, include: { supplierProfile: true } });
            if (!user?.supplierProfile) return [];

            return this.prisma.order.findMany({
                where: {
                    items: {
                        some: {
                            product: {
                                supplierId: user.supplierProfile.id
                            }
                        }
                    }
                },
                include: { items: { include: { product: true } }, buyer: true }
            });
        } else {
            return this.prisma.order.findMany({
                where: { buyerId: userId },
                include: { items: { include: { product: true } } }
            });
        }
    }

    async findOne(id: string) {
        return this.prisma.order.findUnique({
            where: { id },
            include: { items: { include: { product: true } } },
        });
    }
}
