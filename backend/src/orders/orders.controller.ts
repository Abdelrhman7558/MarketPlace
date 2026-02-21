import {
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { PolicyGuard } from '../auth/policy.guard';
import { Roles } from '../auth/roles.decorator';
import { CheckOwnership } from '../auth/check-ownership.decorator';
import { Role, OrderStatus } from '@prisma/client';
import { OrderDto } from '../common/dtos/order.dto';
import { plainToInstance } from 'class-transformer';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    @Roles(Role.CUSTOMER)
    async create(@Body() data: any, @Request() req) {
        const order = await this.ordersService.create(
            req.user.sub,
            data.totalAmount,
            data.items,
        );
        return plainToInstance(OrderDto, order);
    }

    @Get('my-orders')
    async findMyOrders(@Request() req) {
        if (req.user.role === Role.CUSTOMER) {
            const orders = await this.ordersService.findByBuyer(req.user.sub);
            return plainToInstance(OrderDto, orders);
        } else if (req.user.role === Role.SUPPLIER) {
            const orders = await this.ordersService.findBySupplier(req.user.sub);
            return plainToInstance(OrderDto, orders);
        }
    }

    @Get()
    @Roles(Role.ADMIN)
    async findAll() {
        const orders = await this.ordersService.findAll();
        return plainToInstance(OrderDto, orders);
    }

    @Put(':id/status')
    @Roles(Role.SUPPLIER, Role.ADMIN)
    @UseGuards(PolicyGuard)
    @CheckOwnership('ORDER')
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: OrderStatus,
        @Body('reason') reason: string,
        @Request() req,
    ) {
        const order = await this.ordersService.updateStatus(
            id,
            status,
            req.user.sub,
            reason,
        );
        return plainToInstance(OrderDto, order);
    }
}
