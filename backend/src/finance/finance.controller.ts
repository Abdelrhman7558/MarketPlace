import {
    Controller, Get, Post, Delete, Put, Body, Param, Query, UseGuards, Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FinanceService } from './finance.service';

@Controller('finance')
@UseGuards(AuthGuard('jwt'))
export class FinanceController {
    constructor(private readonly financeService: FinanceService) {}

    // ─── Credit Terms ──────────────────────────────────────

    @Get('credit-terms')
    getAllCreditTerms() {
        return this.financeService.getAllCreditTerms();
    }

    @Get('credit-terms/:userId')
    getCreditTerm(@Param('userId') userId: string) {
        return this.financeService.getCreditTerm(userId);
    }

    @Post('credit-terms')
    setCreditTerm(@Body() body: {
        userId: string;
        creditLimit: number;
        paymentTermDays: number;
        notes?: string;
    }, @Request() req) {
        return this.financeService.setCreditTerm({ ...body, approvedBy: req.user.sub });
    }

    @Delete('credit-terms/:id')
    deleteCreditTerm(@Param('id') id: string) {
        return this.financeService.deleteCreditTerm(id);
    }

    @Get('credit-check/:userId')
    checkCredit(@Param('userId') userId: string, @Query('amount') amount: string) {
        return this.financeService.checkCreditAvailability(userId, parseFloat(amount) || 0);
    }

    // ─── Tax Exemptions ────────────────────────────────────

    @Get('tax-exemptions')
    getAllTaxExemptions(@Query('userId') userId?: string) {
        return this.financeService.getTaxExemptions(userId);
    }

    @Post('tax-exemptions')
    createTaxExemption(@Body() body: {
        userId: string;
        certificateUrl: string;
        certificateType?: string;
        validFrom?: string;
        validUntil?: string;
    }) {
        return this.financeService.createTaxExemption({
            ...body,
            validFrom: body.validFrom ? new Date(body.validFrom) : undefined,
            validUntil: body.validUntil ? new Date(body.validUntil) : undefined,
        });
    }

    @Post('tax-exemptions/:id/review')
    reviewTaxExemption(
        @Param('id') id: string,
        @Body() body: { status: string; notes?: string },
        @Request() req,
    ) {
        return this.financeService.reviewTaxExemption(id, body.status, req.user.sub, body.notes);
    }

    // ─── Warehouses ────────────────────────────────────────

    @Get('warehouses')
    getAllWarehouses(@Query('supplierId') supplierId?: string) {
        if (supplierId) return this.financeService.getWarehousesBySupplier(supplierId);
        return this.financeService.getAllWarehouses();
    }

    @Post('warehouses')
    createWarehouse(@Body() body: any) {
        return this.financeService.createWarehouse(body);
    }

    @Put('warehouses/:id')
    updateWarehouse(@Param('id') id: string, @Body() body: any) {
        return this.financeService.updateWarehouse(id, body);
    }

    @Delete('warehouses/:id')
    deleteWarehouse(@Param('id') id: string) {
        return this.financeService.deleteWarehouse(id);
    }
}
