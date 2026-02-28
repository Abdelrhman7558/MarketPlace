import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EanService {
    private readonly logger = new Logger(EanService.name);

    async fetchImageUrlByEan(ean: string): Promise<string | null> {
        try {
            // 1. Try Open Food Facts (Best for FMCG/Food)
            const offResponse = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${ean}.json`, {
                timeout: 3000,
                headers: { 'User-Agent': 'MarketplaceApp/1.0' }
            });

            if (offResponse.data?.status === 1 && offResponse.data?.product?.image_url) {
                return offResponse.data.product.image_url;
            }

            // 2. Try UPCItemDB (Good general coverage)
            const upcResponse = await axios.get(`https://api.upcitemdb.com/prod/trial/lookup?upc=${ean}`, {
                timeout: 3000,
            });

            if (upcResponse.data?.items?.[0]?.images?.[0]) {
                // Return the first image but prefer high-res if possible
                const images = upcResponse.data.items[0].images;
                return images.find((img: string) => img.includes('https')) || images[0];
            }

            // 3. Fallback: Search-based lookup (Mocking a slightly better generic source)
            // In a real prod environment, we would use a dedicated API like SerpApi or Brandfetch
            // For now, let's try one more reliable public source: Barcode Lookup (Requires key usually, so we stick to robust public ones)

            return null;
        } catch (error) {
            this.logger.warn(`Failed to fetch image for EAN ${ean}: ${error.message}`);
            return null;
        }
    }
}
