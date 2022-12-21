import { resolve } from 'path';
import puppeteer from 'puppeteer';
import autoScroll from './autoscroll';

const scrapImagesWithLinksByUsername = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-notifications'],
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 768,
    });

    const url = 'https://twitter.com/' + 'ACbyXPLRS';
    page.goto(url, {
        timeout: 0,
        waitUntil: 'networkidle0',
    });

    autoScroll(page);
};

// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// const getLinks = async () => {
//     let links = [];

//     for (const button of document.querySelectorAll('[data-testid="reply"]')) {
//         button.click();
//         await wait(1000);
//         const element = document.querySelector(
//             '[data-testid="tweetText"] span'
//         );
//         if (element) {
//             console.log(element.textContent);
//         }
//         await wait(1000);
//         window.history.back();
//     }
//     return links;
// };
export default scrapImagesWithLinksByUsername;
