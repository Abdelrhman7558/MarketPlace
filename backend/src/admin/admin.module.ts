import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ProductsModule } from '../products/products.module';

@Module({
    imports: [ProductsModule],
    providers: [ExcelService],
    exports: [ExcelService],
})
export class AdminModule { }
