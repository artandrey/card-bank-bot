"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require('puppeteer');
const fs = require('fs');
const downloader = require('./lib/downloader');
async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 300);
        });
    });
}
async function getTwitterImages(username) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-notifications'],
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 768,
    });
    const dir = `./images`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    let filename = '';
    page.on('response', async (response) => {
        let url = response.url();
        if (response.request().resourceType() === 'image') {
            /**
             * Filter to only collect tweet images and ignore profile pictures and banners.
             */
            if (url.match('(https://pbs.twimg.com/media/(.*))')) {
                /**
                 * Convert twitter image urls to high quality
                 */
                const urlcleaner = /(&name=([a-zA-Z0-9_]*$))\b/;
                let cleanurl = url.replace(urlcleaner, '&name=large');
                try {
                    const imageDetails = cleanurl.match('https://pbs.twimg.com/media/(.*)?format=(.*)&name=(.*)');
                    const imageName = imageDetails[1];
                    const imageExtension = imageDetails[2];
                    filename = await downloader(cleanurl, imageName, imageExtension, username);
                }
                catch (error) { }
            }
        }
    });
    const pageUrl = username;
    await page.goto(pageUrl, {
        timeout: 0,
        waitUntil: 'networkidle0',
    });
    await autoScroll(page);
    await browser.close();
    return filename;
}
exports.default = getTwitterImages;
