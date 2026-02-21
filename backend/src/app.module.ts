import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PricingModule } from './pricing/pricing.module';
import { ProductsModule } from './products/products.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [PricingModule, ProductsModule, AdminModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
