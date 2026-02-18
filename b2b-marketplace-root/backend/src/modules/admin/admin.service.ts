import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async getStats() {
        // Note: If Role enum is used in prisma schema, use it. Else strings.
        // Assuming Role enum is "SUPPLIER", "BUYER" etc.
        const totalUsers = await this.prisma.user.count();
        const totalSuppliers = await this.prisma.user.count({ where: { role: 'SUPPLIER' } });
        const totalBuyers = await this.prisma.user.count({ where: { role: 'BUYER' } });
        const totalProducts = await this.prisma.product.count();
        const totalOrders = await this.prisma.order.count();
        const totalRevenue = await this.prisma.order.aggregate({
            _sum: { totalAmount: true }
        });

        return {
            totalUsers,
            totalSuppliers,
            totalBuyers,
            totalProducts,
            totalOrders,
            totalRevenue: totalRevenue._sum.totalAmount || 0
        };
    }
}
