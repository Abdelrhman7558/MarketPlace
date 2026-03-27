import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ViesService {
    private readonly apiUrl = 'https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number';

    async validateVat(countryCode: string, vatNumber: string): Promise<any> {
        try {
            const response = await axios.post(this.apiUrl, {
                countryCode,
                vatNumber,
            }, { timeout: 8000 });

            if (response.data.valid) {
                return {
                    valid: true,
                    name: response.data.name,
                    address: response.data.address,
                    vatNumber: response.data.vatNumber,
                    countryCode: response.data.countryCode,
                };
            } else {
                return { valid: false };
            }
        } catch (error) {
            console.error('VIES API Error:', error.response?.data || error.message);
            // Instead of throwing, return a soft "unverified" state so the user is not blocked
            return {
                valid: true,
                name: '(VIES temporarily unavailable — manual review needed)',
                address: '',
                manualReview: true,
            };
        }
    }
}

