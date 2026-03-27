import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class OrdersService {
    constructor(
        private prisma: PrismaService,
        private emailService: EmailService,
    ) { }

    async create(buyerId: string, totalAmount: number, items: any[], shippingCompany?: string, shippingCost?: number) {
        const order = await this.prisma.order.create({
            data: {
                buyerId,
                totalAmount,
                shippingCompany: shippingCompany ?? null,
                shippingCost: shippingCost ?? null,
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
                buyer: { select: { email: true, name: true } },
            },
        });

        // Send order confirmation email (non-blocking)
        if (order.buyer?.email) {
            this.emailService.sendOrderConfirmationEmail(
                order.buyer.email,
                order.buyer.name || 'Partner',
                order.id,
                totalAmount,
            ).catch(() => {});
        }

        return order;
    }

    async findAll() {
        const orders = await this.prisma.order.findMany({
            include: {
                buyer: {
                    select: { id: true, name: true, email: true, phone: true }
                },
                items: {
                    include: {
                        product: {
                            include: {
                                supplier: {
                                    select: { id: true, name: true, email: true }
                                }
                            }
                        }
                    }
                },
                history: true,
            },
        });

        // Map to format suitable for Admin Dashboard
        return orders.map(order => {
            const supplierNames = [...new Set(order.items.map(item => item.product.supplier.name))].join(', ');
            let supplierProfit = 0;
            order.items.forEach(item => {
                supplierProfit += (item.price * item.quantity);
            });
            // Assume 5% admin cut 
            const adminProfit = order.totalAmount * 0.05;

            return {
                id: order.id,
                customer: order.buyer.name,
                supplier: supplierNames,
                total: order.totalAmount,
                supplierProfit,
                adminProfit,
                status: order.status,
                date: order.createdAt.toISOString().split('T')[0],
                shippingCompany: order.shippingCompany,
                shippingCost: order.shippingCost,
                items: order.items.map(i => ({
                    product: i.product.name,
                    quantity: i.quantity,
                    price: i.price
                }))
            };
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
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { buyer: { select: { email: true, name: true } } },
        });
        if (!order) throw new NotFoundException('Order not found');

        const previousStatus = order.status;

        const updated = await this.prisma.order.update({
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

        // Send status update email (non-blocking)
        if (order.buyer?.email) {
            this.emailService.sendOrderStatusUpdateEmail(
                order.buyer.email,
                order.buyer.name || 'Partner',
                orderId,
                status,
            ).catch(() => {});
        }

        return updated;
    }
}
