import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ProductsModule } from '../products/products.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from '../common/dashboard.service';
import { AnalyticsService } from '../common/analytics.service';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';

@Module({
    imports: [ProductsModule],
    providers: [ExcelService, DashboardService, AnalyticsService, AuditService],
    controllers: [DashboardController, AuditController],
    exports: [ExcelService, DashboardService, AnalyticsService, AuditService],
})
export class AdminModule { }
