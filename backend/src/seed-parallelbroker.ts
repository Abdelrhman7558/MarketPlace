import { PrismaClient, Role, UserStatus, ProductStatus } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const scrapedFile = 'f:\\Marketplace\\scraped_products.json';

async function fetchImage(ean: string): Promise<string> {
    // Try OpenFoodFacts
    try {
        const offResponse = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${ean}.json`, { timeout: 5000 });
        if (offResponse.data && offResponse.data.status === 1 && offResponse.data.product && offResponse.data.product.image_url) {
            return offResponse.data.product.image_url;
        }
    } catch (e) {
        // ignore
    }

    // Fallback image
    return 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop';
}

async function main() {
    console.log('Reading scraped products...');
    const productsRaw = fs.readFileSync(scrapedFile, 'utf8');
    const products = JSON.parse(productsRaw);

    console.log(`Found ${products.length} products.`);

    // 1. Ensure Dummy Supplier exists
    const supplierEmail = 'supplier@parallelbroker.com';
    let supplier = await prisma.user.findUnique({ where: { email: supplierEmail } });

    if (!supplier) {
        console.log('Creating dummy supplier...');
        const hashedPassword = await bcrypt.hash('password123', 10);
        supplier = await prisma.user.create({
            data: {
                email: supplierEmail,
                password: hashedPassword,
                name: 'Parallel Broker Supplier',
                role: Role.SUPPLIER,
                status: UserStatus.ACTIVE,
                companyName: 'Parallel Broker',
                website: 'https://parallelbroker.com'
            }
        });
    }

    console.log(`Using supplier ID: ${supplier.id}`);

    // 2. Insert Products
    for (const p of products) {
        console.log(`Processing ${p.ean} - ${p.title} ...`);

        // Check if already exists
        const existing = await prisma.product.findFirst({
            where: { ean: p.ean }
        });

        if (existing) {
            console.log(`Product with EAN ${p.ean} already exists. Skipping.`);
            continue;
        }

        const imageUrl = await fetchImage(p.ean);

        // Parse category / brand logic
        let brand = 'Unknown';
        let name = p.title;
        if (p.title.includes('-')) {
            const parts = p.title.split('-');
            brand = parts[0].trim();
            brand = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
            name = parts.slice(1).join('-').trim();
        } else if (p.title.includes(' ')) {
            brand = p.title.split(' ')[0].trim();
        }

        let price = parseFloat(p.price);
        if (isNaN(price) || price === 0) price = 15.00 + (Math.random() * 20);

        const category = 'Personal Care';

        await prisma.product.create({
            data: {
                name: name,
                description: `Brand: ${brand}\nOriginal Title: ${p.title}`,
                price: price,
                stock: 100,
                category: category,
                images: [imageUrl],
                ean: p.ean,
                status: ProductStatus.APPROVED,
                supplierId: supplier.id
            }
        });

        // Sleep slightly to not overload the API if calling it
        await new Promise(r => setTimeout(r, 600));
    }

    console.log('Finished seeding products!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
