import puppeteer from 'puppeteer-core';
import fs from 'fs';
import axios from 'axios';

(async () => {
    const paths = [
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    ];
    let executablePath = paths.find(p => fs.existsSync(p));

    // We run this headed briefly to capture it properly
    const browser = await puppeteer.launch({ executablePath, headless: 'new', defaultViewport: { width: 1440, height: 900 } });
    const page = await browser.newPage();

    try {
        const res = await axios.post('http://localhost:3005/auth/login', {
            email: 'admin@marketplace.com',
            password: 'password123'
        });
        const token = res.data.access_token;

        await page.goto('http://localhost:3001/');
        await page.evaluate((t) => localStorage.setItem('token', t), token);

        console.log("Navigating to Admin page...");
        await page.goto('http://localhost:3001/admin', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: 'admin-css-check.png', fullPage: true });
        console.log("Screenshot saved.");
    } catch (e) {
        console.error("Script Error:", e);
    }

    await browser.close();
})();
