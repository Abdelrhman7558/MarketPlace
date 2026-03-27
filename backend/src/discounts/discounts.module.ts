import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';
import { PrismaModule } from '../common/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [DiscountsService],
    controllers: [DiscountsController],
    exports: [DiscountsService],
})
export class DiscountsModule {}
