import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PricingModule } from './pricing/pricing.module';
import { ProductsModule } from './products/products.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { CouponsModule } from './coupons/coupons.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

import { PrismaModule } from './common/prisma.module';
import { SecurityModule } from './security/security.module';
import { SecurityInterceptor } from './security/security.interceptor';

@Module({
    imports: [
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 10,
        }]),
        PrismaModule,
        SecurityModule,
        PricingModule,
        ProductsModule,
        AdminModule,
        AuthModule,
        UsersModule,
        OrdersModule,
        CouponsModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: SecurityInterceptor,
        },
    ],
})
export class AppModule { }
