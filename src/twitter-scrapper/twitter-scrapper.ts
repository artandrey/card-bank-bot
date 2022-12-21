import { resolve } from 'path';
import puppeteer from 'puppeteer';
import autoScroll from './autoscroll';

const scrapImagesWithLinksByUsername = async () => {
    // const browser = await puppeteer.launch({
    //     headless: false,
    //     args: ['--disable-notifications'],
    // });
    // const page = await browser.newPage();
    // await page.setViewport({
    //     width: 1366,
    //     height: 768,
    // });
    // const url = 'https://twitter.com/' + 'ACbyXPLRS';
    // page.goto(url, {
    //     timeout: 0,
    //     waitUntil: 'networkidle0',
    // });
    // autoScroll(page);
};
export default scrapImagesWithLinksByUsername;
