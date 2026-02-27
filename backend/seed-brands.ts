import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const allowedBrands = [
    // Coffee
    'nescafe', 'lavazza', 'davidoff', 'tassimo', 'jacobs', 'tchibo', 'illy', 'starbucks', 'costa', "l'or", 'dallmayr', 'kimbo', 'segafredo',
    // Chips
    'doritos', 'tostitos', 'pringles', 'sun chips', 'funyuns', 'lay\'s', 'lays', 'takis', 'siete',
    // Chocolates
    'tony\'s', 'tonys', 'nuts', 'merci', 'twix', 'ghirardelli', 'oreo', 'dove', 'brandt', 'whittaker\'s', 'whittakers', 'snickers', 'kitkat', 'kit kat', 'wonka', 'mars', 'milky way', 'scharffen berger', 'guylian', 'lindt', 'nesquik', 'butterfinger', 'bounty', 'godiva', 'ferrero rocher', 'reese\'s', 'reeses', 'sublime', 'cadbury', 'toblerone', 'nestle', 'nestlé', 'milka', 'tootsie roll', 'ritter sport', 'theo', 'lake champlain', 'm&m', 'duc d\'o', 'kinder', 'russell stover', 'hershey', 'esthechoc', 'nutella', 'raaka', 'hu kitchen', 'la maison du chocolat',
    // Soft Drinks
    'coca-cola', 'coca cola', 'pepsi', 'dr pepper', 'fanta', 'sprite', 'red bull', 'redbull',
    // Unilever
    'persil', 'slim-fast', 'slim fast', 'lux', 'marmite', 'robijn', 'tresemme', 'tresemmé', 'axe', 'becel', 'bertolli', 'breyers', 'brooke bond', 'fissan', 'cif', 'closeup', 'close up', 'comfort', 'country crock', 'dawn', 'domestos', 'dove', 'knorr', 'unox', 'joko', 'knorrox', 'omo', 'bovril', 'impulse', 'biotex', 'lifebuoy', 'lipton', 'caress', 'clear', 'lysoform', 'zendium', 'signal', 'noxzema', 'pg tips', 'planta', 'pond\'s', 'ponds', 'radox', 'ragu', 'rama', 'rexona', 'simple', 'skip', 'st. ives', 'st ives', 'stork', 'suave', 'sunlight', 'sunsilk', 'surf', 'vaseline', 'vim', 'viso', 'vo5', 'wall\'s', 'walls', 'wish-bone', 'wish bone', 'hellmann\'s', 'hellmanns', 'skippy'
];

async function main() {
    console.log('Seeding initial ALLOWED_BRANDS to AppConfig...');

    await prisma.appConfig.upsert({
        where: { key: 'ALLOWED_BRANDS' },
        create: { key: 'ALLOWED_BRANDS', value: JSON.stringify(allowedBrands) },
        update: { value: JSON.stringify(allowedBrands) }
    });

    console.log('Seed completed successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
