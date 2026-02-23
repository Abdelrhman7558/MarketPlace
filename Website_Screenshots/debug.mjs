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

    const browser = await puppeteer.launch({ executablePath, headless: 'new' });
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

    try {
        const res = await axios.post('http://localhost:3005/auth/login', {
            email: 'admin@marketplace.com',
            password: 'password123'
        });
        const token = res.data.access_token;

        await page.goto('http://localhost:3000/');
        await page.evaluate((t) => localStorage.setItem('token', t), token);

        console.log("Navigating to Security page...");
        await page.goto('http://localhost:3000/admin/security', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 5000));
        console.log("Done checking.");
    } catch (e) {
        console.error("Script Error:", e);
    }

    await browser.close();
})();
