import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

(async () => {
    const paths = [
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    ];
    let executablePath = paths.find(p => fs.existsSync(p));

    if (!executablePath) {
        console.error("No valid chromium-based browser found on this system.");
        process.exit(1);
    }

    console.log(`Using browser: ${executablePath}`);
    const browser = await puppeteer.launch({
        executablePath,
        headless: 'new',
        defaultViewport: { width: 1440, height: 900 }
    });

    const page = await browser.newPage();

    const shot = async (url, name) => {
        console.log(`Capturing ${name}...`);
        await page.goto(url, { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({ path: `${name}.png`, fullPage: true });
    };

    // Public Routes
    await shot('http://localhost:3000/', '01_Home');
    await shot('http://localhost:3000/login', '02_Login');
    await shot('http://localhost:3000/categories/energy-drinks', '03_CategoryView');
    await shot('http://localhost:3000/checkout', '04_Checkout');

    // Admin Authenticated Routes
    try {
        console.log("Authenticating as Admin to capture dashboards...");
        const res = await axios.post('http://localhost:3005/auth/login', {
            email: 'admin@marketplace.com',
            password: 'password123'
        });
        const token = res.data.access_token;

        await page.goto('http://localhost:3000/');
        await page.evaluate((t) => localStorage.setItem('token', t), token);

        await shot('http://localhost:3000/admin', '05_Admin_Dashboard');
        await shot('http://localhost:3000/admin/orders', '06_Admin_Orders');
        await shot('http://localhost:3000/admin/coupons', '07_Admin_Coupons');
    } catch (e) {
        console.error("Could not login as admin", e.message);
    }

    await browser.close();
    console.log("Screenshots captured successfully in f:\\Marketplace\\Website_Screenshots\\");
})();
