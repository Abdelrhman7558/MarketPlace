const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });
    console.log(`Found ${users.length} total users.`);
    const pending = users.filter(u => u.status === 'PENDING_APPROVAL');
    console.log(`Found ${pending.length} pending users.`);
    if (pending.length > 0) {
        console.log('Most recent pending:', pending[0].email, pending[0].name);
    } else {
        console.log('No pending users in DB!');
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
