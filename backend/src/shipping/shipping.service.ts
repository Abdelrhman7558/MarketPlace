import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ShippingService {
    constructor(private prisma: PrismaService) {}

    async getRates(cartTotal: number, destination: string, productIds?: string[]) {
        // Base cost calculation
        const baseWeight = cartTotal * 0.1;
        
        let distanceFactor = 1.0;
        let warehouseCity = '';

        // Try to find the nearest warehouse if productIds are provided
        if (productIds && productIds.length > 0) {
            const products = await this.prisma.product.findMany({
                where: { id: { in: productIds } },
                include: { warehouse: true }
            });

            const warehouses = products.map(p => p.warehouse).filter(Boolean);
            if (warehouses.length > 0) {
                // For simplicity, take the first warehouse and check if it matches the destination city
                const warehouse = warehouses[0];
                warehouseCity = warehouse.city.toLowerCase();
                const destinationLower = destination.toLowerCase();

                if (destinationLower.includes(warehouseCity)) {
                    distanceFactor = 0.5; // Same city = 50% discount on shipping
                } else if (destinationLower.includes(warehouse.country.toLowerCase())) {
                    distanceFactor = 1.0; // Same country = standard rate
                } else {
                    distanceFactor = 2.0; // International = double rate
                }
            }
        } else {
             distanceFactor = destination.length > 10 ? 1.5 : 1.0;
        }

        const schenkerBase = (45 + (baseWeight * 0.5)) * distanceFactor;
        const walterBase = (38 + (baseWeight * 0.6)) * distanceFactor;
        const rabenBase = (42 + (baseWeight * 0.55)) * distanceFactor;

        return [
            {
                id: 'db_schenker',
                name: 'DB SCHENKER',
                cost: parseFloat(schenkerBase.toFixed(2)),
                estimatedDays: distanceFactor < 1 ? '1-2' : (distanceFactor > 1.5 ? '7-10' : '3-5'),
                logoUrl: '/logos/db-schenker.png',
                note: warehouseCity ? `From: ${warehouseCity}` : null
            },
            {
                id: 'lkw_walter',
                name: 'LKW WALTER',
                cost: parseFloat(walterBase.toFixed(2)),
                estimatedDays: distanceFactor < 1 ? '2-3' : (distanceFactor > 1.5 ? '8-12' : '4-6'),
                logoUrl: '/logos/lkw-walter.png',
                note: warehouseCity ? `From: ${warehouseCity}` : null
            },
            {
                id: 'raben_group',
                name: 'Raben Group',
                cost: parseFloat(rabenBase.toFixed(2)),
                estimatedDays: distanceFactor < 1 ? '1-1' : (distanceFactor > 1.5 ? '5-7' : '2-4'),
                logoUrl: '/logos/raben-group.png',
                note: warehouseCity ? `From: ${warehouseCity}` : null
            }
        ];
    }
}
