import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { PrismaModule } from '../common/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [ShippingService, ShipmentService],
    controllers: [ShippingController, ShipmentController],
    exports: [ShippingService, ShipmentService]
})
export class ShippingModule { }
