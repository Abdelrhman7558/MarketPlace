import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EanService {
    private readonly logger = new Logger(EanService.name);

    async fetchImageUrlByEan(ean: string): Promise<string | null> {
        try {
            // Using Open Food Facts API as a generic, free, no-auth EAN lookup for images (mostly food but works for many FMCG)
            // Another robust free tier option without keys is upcitemdb
            const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${ean}.json`, {
                timeout: 5000,
            });

            if (response.data?.status === 1 && response.data?.product?.image_url) {
                return response.data.product.image_url;
            }

            // Fallback to upcitemdb if OpenFoodFacts didn't find it
            const fallbackResponse = await axios.get(`https://api.upcitemdb.com/prod/trial/lookup?upc=${ean}`, {
                timeout: 5000,
            });

            if (fallbackResponse.data?.items?.length > 0 && fallbackResponse.data.items[0].images?.length > 0) {
                return fallbackResponse.data.items[0].images[0];
            }

            return null;
        } catch (error) {
            this.logger.warn(`Failed to fetch image for EAN ${ean}: ${error.message}`);
            return null;
        }
    }
}
