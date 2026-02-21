import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DashboardService {
    private prisma = new PrismaClient();

    async getAdminSnapshot() {
        const [totalRevenue, totalOrders, activePlacements, supplierCount] = await Promise.all([
            this.prisma.order.aggregate({ _sum: { totalAmount: true } }),
            this.prisma.order.count(),
            this.prisma.productPlacement.count({ where: { status: 'ACTIVE' } }),
            this.prisma.user.count({ where: { role: 'SUPPLIER' } }),
        ]);

        const recentOrders = await this.prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { buyer: { select: { name: true } } },
        });

        return {
            stats: {
                revenue: totalRevenue._sum.totalAmount || 0,
                orders: totalOrders,
                activePlacements,
                suppliers: supplierCount,
            },
            recentOrders,
        };
    }

    async getSupplierSnapshot(supplierId: string) {
        const [myProductsCount, myRevenue, myOrdersCount] = await Promise.all([
            this.prisma.product.count({ where: { supplierId } }),
            this.prisma.orderItem.aggregate({
                _sum: { price: true },
                where: { product: { supplierId } },
            }),
            this.prisma.order.count({
                where: { items: { some: { product: { supplierId } } } },
            }),
        ]);

        const recentPlacements = await this.prisma.productPlacement.findMany({
            where: { product: { supplierId } },
            take: 5,
            orderBy: { updatedAt: 'desc' },
            include: { product: { select: { name: true } } },
        });

        return {
            stats: {
                products: myProductsCount,
                revenue: myRevenue._sum.price || 0,
                orders: myOrdersCount,
            },
            recentPlacements,
        };
    }
}
