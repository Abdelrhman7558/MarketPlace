import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export interface ValidationRow {
    rowNumber: number;
    success: boolean;
    data?: any;
    errors?: string[];
}

export interface ExcelReport {
    totalRows: number;
    successCount: number;
    errorCount: number;
    results: ValidationRow[];
}

@Injectable()
export class ExcelService {
    async processProductsExcel(buffer: Buffer, dtoClass: any): Promise<ExcelReport> {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        const results: ValidationRow[] = [];
        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < data.length; i++) {
            const row = data[i] as object;
            const instance = plainToInstance(dtoClass, row);
            const errors = await validate(instance as any);

            if (errors.length > 0) {
                errorCount++;
                results.push({
                    rowNumber: i + 2, // Excel rows are 1-indexed, +1 for header
                    success: false,
                    errors: errors.map(err => Object.values(err.constraints || {}).join(', ')),
                });
            } else {
                successCount++;
                results.push({
                    rowNumber: i + 2,
                    success: true,
                    data: instance,
                });
            }
        }

        return {
            totalRows: data.length,
            successCount,
            errorCount,
            results,
        };
    }
}
