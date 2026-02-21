import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, OrderStatus, Role } from '@prisma/client';

@Injectable()
export class OrdersService {
    private prisma = new PrismaClient();

    async create(buyerId: string, totalAmount: number, items: any[]) {
        return this.prisma.order.create({
            data: {
                buyerId,
                totalAmount,
                status: OrderStatus.PENDING,
                items: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
                history: {
                    create: {
                        newStatus: OrderStatus.PENDING,
                        changedById: buyerId,
                        reason: 'Order created',
                    },
                },
            },
            include: {
                items: true,
                history: true,
            },
        });
    }

    async findAll() {
        return this.prisma.order.findMany({
            include: {
                items: true,
                history: true,
            },
        });
    }

    async findByBuyer(buyerId: string) {
        return this.prisma.order.findMany({
            where: { buyerId },
            include: {
                items: true,
            },
        });
    }

    async findBySupplier(supplierId: string) {
        // Logic to find orders that contain products from this supplier
        return this.prisma.order.findMany({
            where: {
                items: {
                    some: {
                        product: {
                            supplierId,
                        },
                    },
                },
            },
            include: {
                items: {
                    where: {
                        product: {
                            supplierId,
                        },
                    },
                    include: {
                        product: true,
                    },
                },
            },
        });
    }

    async updateStatus(orderId: string, status: OrderStatus, changedById: string, reason?: string) {
        const order = await this.prisma.order.findUnique({ where: { id: orderId } });
        if (!order) throw new NotFoundException('Order not found');

        const previousStatus = order.status;

        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                status,
                history: {
                    create: {
                        previousStatus,
                        newStatus: status,
                        changedById,
                        reason,
                    },
                },
            },
        });
    }
}
