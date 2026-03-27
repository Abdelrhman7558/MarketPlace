import { Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvoiceService } from './invoice.service';

@Controller('invoices')
@UseGuards(AuthGuard('jwt'))
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}

    @Get()
    getAllInvoices() {
        return this.invoiceService.getAllInvoices();
    }

    @Get('my')
    getMyInvoices(@Request() req) {
        return this.invoiceService.getInvoicesByBuyer(req.user.sub);
    }

    @Get(':id')
    getInvoice(@Param('id') id: string) {
        return this.invoiceService.getInvoice(id);
    }

    @Post('generate/:orderId')
    generateInvoice(@Param('orderId') orderId: string) {
        return this.invoiceService.createInvoiceForOrder(orderId);
    }

    @Post(':id/pay')
    markAsPaid(@Param('id') id: string) {
        return this.invoiceService.markAsPaid(id);
    }
}
