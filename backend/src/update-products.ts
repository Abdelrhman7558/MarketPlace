import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const prisma = new PrismaClient();

const CATEGORIES_LIST = [
    'Soft Drinks', 'Energy Drinks', 'Coffee & Tea',
    'Snacks & Sweets', 'Personal Care', 'Home Care',
    'Makeup', 'Perfume'
];

async function fetchImageFromBing(query: string): Promise<string | null> {
    const url = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC3`;
    console.log(`[Bing Search] ${url}`);
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
            },
            timeout: 10000
        });
        const dom = new JSDOM(response.data);
        const imgTags = dom.window.document.querySelectorAll('a.iusc');

        for (const a of imgTags) {
            const mData = a.getAttribute('m');
            if (mData) {
                try {
                    const parsed = JSON.parse(mData);
                    if (parsed.murl && !parsed.murl.includes('coca-cola') && !parsed.murl.includes('placeholder')) {
                        return parsed.murl;
                    }
                } catch (e) { }
            }
        }
        return null;
    } catch (e) {
        console.error(`Error fetching image for ${query}:`, e.message);
        return null;
    }
}

function determineCategory(title: string): string {
    const lowerTitle = title.toLowerCase();

    // Perfume rules
    if (lowerTitle.includes('parfum') || lowerTitle.includes('toilette') || lowerTitle.includes('cologne') || lowerTitle.includes('edp') || lowerTitle.includes('edt')) {
        return 'Perfume';
    }

    // Makeup rules
    if (lowerTitle.includes('lipstick') || lowerTitle.includes('mascara') || lowerTitle.includes('concealer') || lowerTitle.includes('foundation') || lowerTitle.includes('eyeshadow')) {
        return 'Makeup';
    }

    // Soft Drinks & Energy
    if (lowerTitle.includes('energy') || lowerTitle.includes('red bull') || lowerTitle.includes('monster')) {
        return 'Energy Drinks';
    }

    // Default to Personal Care for skincare, haircare, etc.
    return 'Personal Care';
}

async function main() {
    const supplierEmail = 'supplier@parallelbroker.com';
    console.log(`Finding products for ${supplierEmail}...`);

    const supplier = await prisma.user.findUnique({
        where: { email: supplierEmail },
        include: { products: true }
    });

    if (!supplier || supplier.products.length === 0) {
        console.log('No products found to update.');
        return;
    }

    console.log(`Found ${supplier.products.length} products to map & update.`);

    let updatedCount = 0;

    for (const product of supplier.products) {
        console.log(`\nProcessing: ${product.name} (EAN: ${product.ean})`);

        // Determine the new category
        const originalTitle = product.description.split('\n')[1] || product.name; // extracted from "Original Title: X"
        const newCategory = determineCategory(originalTitle);

        console.log(`  -> Mapping to Category: ${newCategory}`);

        // Fetch the image
        const searchQuery = `${product.ean || ''} ${product.name}`.trim();
        const newImageUrl = await fetchImageFromBing(searchQuery);

        let imagesToSave = product.images;
        if (newImageUrl) {
            console.log(`  -> Found Image: ${newImageUrl}`);
            imagesToSave = [newImageUrl];
        } else {
            console.log(`  -> Could not find a new image, keeping existing.`);
        }

        // Update in DB
        await prisma.product.update({
            where: { id: product.id },
            data: {
                category: newCategory,
                images: imagesToSave
            }
        });

        updatedCount++;
        console.log(`  -> Saved! Progress: ${updatedCount}/${supplier.products.length}`);

        // Wait slightly to not get rate limited by Bing
        await new Promise(r => setTimeout(r, 1000));
    }

    console.log('\n==================================');
    console.log(`Successfully updated ${updatedCount} products!`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
