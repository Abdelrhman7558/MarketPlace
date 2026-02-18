import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('password123', 10);

    // 1. Super Admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@b2b.com' },
        update: {},
        create: {
            email: 'admin@b2b.com',
            password,
            role: Role.SUPER_ADMIN,
        },
    });
    console.log({ admin });

    // 2. Supplier
    const supplierUser = await prisma.user.upsert({
        where: { email: 'supplier@b2b.com' },
        update: {},
        create: {
            email: 'supplier@b2b.com',
            password,
            role: Role.SUPPLIER,
            supplierProfile: {
                create: {
                    companyName: 'Acme Supplies Ltd',
                    taxId: 'TAX-123456',
                    isVerified: true
                }
            }
        },
    });
    console.log({ supplierUser });

    // 3. Buyer
    const buyerUser = await prisma.user.upsert({
        where: { email: 'buyer@b2b.com' },
        update: {},
        create: {
            email: 'buyer@b2b.com',
            password,
            role: Role.BUYER,
            buyerProfile: {
                create: {
                    companyName: 'Retail Corp',
                    creditLimit: 5000.00
                }
            }
        },
    });
    console.log({ buyerUser });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
