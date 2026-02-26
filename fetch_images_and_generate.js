const fs = require('fs');
const https = require('https');

const scrapedFile = 'f:\\Marketplace\\scraped_products.json';
const outputFile = 'f:\\Marketplace\\frontend\\src\\lib\\products.ts';

const products = JSON.parse(fs.readFileSync(scrapedFile, 'utf8'));

// Helper to fetch JSON from a URL
function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', err => resolve(null));
    });
}

async function fetchImage(ean) {
    // Try OpenFoodFacts
    const offData = await fetchJson(`https://world.openfoodfacts.org/api/v0/product/${ean}.json`);
    if (offData && offData.status === 1 && offData.product && offData.product.image_url) {
        return offData.product.image_url;
    }
    // Try upcitemdb
    const upcData = await fetchJson(`https://api.upcitemdb.com/prod/trial/lookup?upc=${ean}`);
    if (upcData && upcData.items && upcData.items.length > 0 && upcData.items[0].images && upcData.items[0].images.length > 0) {
        return upcData.items[0].images[0];
    }
    // Fallback image
    return 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop';
}

async function run() {
    console.log('Fetching images for ' + products.length + ' products...');
    const generatedProducts = [];
    let idCounter = 1;

    for (const p of products) {
        console.log(`Fetching image for ${p.ean} - ${p.title.substring(0, 30)}...`);
        const imageUrl = await fetchImage(p.ean);

        // Extract brand name roughly (before the dash if exists)
        let brand = 'Unknown';
        let name = p.title;
        if (p.title.includes('-')) {
            const parts = p.title.split('-');
            brand = parts[0].trim();
            // Capitalize brand properly
            brand = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
            name = parts.slice(1).join('-').trim();
        } else if (p.title.includes(' ')) {
            brand = p.title.split(' ')[0].trim();
        }

        const category = 'Personal Care'; // Defaulting for FMCG cosmetics/care

        generatedProducts.push({
            id: idCounter.toString(),
            name: name,
            brand: brand,
            price: 15.00 + (Math.random() * 20), // random price since parallelbroker didn't give one
            unit: 'unit',
            minOrder: 10,
            image: imageUrl,
            inStock: true,
            category: category,
            ean: p.ean
        });
        idCounter++;

        // Sleep a bit to avoid rate limits
        await new Promise(r => setTimeout(r, 500));
    }

    // Read current products.ts to keep BRANDS and CATEGORIES lists but replace PRODUCTS
    let content = fs.readFileSync(outputFile, 'utf8');

    // We can replace the PRODUCTS array in the file
    // The array goes from `export const PRODUCTS: Product[] = [` to `// --- HOME CARE ---` and beyond until `];`

    // Just rewrite the whole file to make it clean
    const newContent = `export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    unit: string;
    minOrder: number;
    image: string;
    inStock: boolean;
    category: string;
    ean?: string;
    bulkSave?: boolean;
    rating?: number;
    reviews?: number;
}

export const PRODUCTS: Product[] = ${JSON.stringify(generatedProducts, null, 4)};

export const BRANDS = Array.from(new Set(PRODUCTS.map(p => p.brand)));

export const CATEGORIES_LIST = [
    'Soft Drinks', 'Energy Drinks', 'Coffee & Tea',
    'Snacks & Sweets', 'Personal Care', 'Home Care',
    'Makeup', 'Perfume'
];
`;

    fs.writeFileSync(outputFile, newContent);
    console.log('Successfully updated ' + outputFile);
}

run();
