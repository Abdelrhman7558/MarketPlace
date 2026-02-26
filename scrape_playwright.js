const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    console.log('Launching browser...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    console.log('Navigating to parallelbroker.com/marketplace...');
    await page.goto('https://parallelbroker.com/marketplace', { waitUntil: 'networkidle' });

    console.log('Scrolling to load all products...');
    let previousHeight = 0;
    while (true) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1500);
        const newHeight = await page.evaluate(() => document.body.scrollHeight);
        if (newHeight === previousHeight) {
            await page.waitForTimeout(3000);
            const checkHeight = await page.evaluate(() => document.body.scrollHeight);
            if (checkHeight === previousHeight) break;
        }
        previousHeight = await page.evaluate(() => document.body.scrollHeight);
    }

    console.log('Extracting data...');
    const products = await page.evaluate(() => {
        let prods = [];
        let cards = document.querySelectorAll('.bubble-element.GroupItem');
        if (cards.length === 0) cards = document.querySelectorAll('.bubble-element.Group');

        cards.forEach(el => {
            let text = el.innerText || '';
            let eanMatch = text.match(/[0-9]{8,14}/);
            if (text.length > 20 && eanMatch) {
                let img = el.querySelector('img');
                // Don't include if it's explicitly the default placeholder without a URL
                let imageSrc = img ? img.src : '';
                if (imageSrc.includes('assets/placeholder')) imageSrc = '';

                prods.push({
                    rawText: text,
                    ean: eanMatch[0],
                    image: imageSrc
                });
            }
        });

        // Remove duplicates by EAN
        return prods.filter((v, i, a) => a.findIndex(t => (t.ean === v.ean)) === i);
    });

    console.log(`Found ${products.length} unique products with EANs.`);
    fs.writeFileSync('f:\\Marketplace\\scraped_products_v2.json', JSON.stringify(products, null, 2));
    await browser.close();
    console.log('Done.');
})().catch(err => {
    console.error(err);
    process.exit(1);
});
