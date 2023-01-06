"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const autoscroll_1 = __importDefault(require("./autoscroll"));
const pages_worker_1 = __importDefault(require("./pages-worker"));
const scrap_page_1 = __importDefault(require("./scrap-page"));
const checkIsUsernameRequired = (page) => {
    return new Promise((resolve) => {
        page.waitForSelector('[data-testid="ocfEnterTextTextInput"]').then(() => resolve(true));
        page.waitForSelector('[type="password"]').then(() => resolve(false));
    });
};
const authorize = async (page) => {
    const url = 'https://twitter.com/login';
    page.goto(url, {
        timeout: 0,
        waitUntil: 'networkidle0',
    });
    await page.waitForSelector('[autocomplete="username"]');
    await page.type('[autocomplete="username"]', 'artandrey777@ukr.net');
    await page.keyboard.press('Enter');
    const usernameIsRequired = await checkIsUsernameRequired(page);
    if (usernameIsRequired) {
        await page.type('[data-testid="ocfEnterTextTextInput"]', 'Artandrey2');
        await page.keyboard.press('Enter');
    }
    await page.waitForSelector('[type="password"]');
    await page.type('[type="password"]', process.env.PASSWORD, { delay: 100 });
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
};
const checkIsAuthorised = async (page) => {
    try {
        await page.goto('https://twitter.com/');
        await page.waitForNavigation();
        const url = page.url();
        return url.includes('home');
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
const scrapImagesWithLinksByUsername = async (username, ignorePostIDs = []) => {
    const browser = await puppeteer_1.default.launch({
        userDataDir: './browser-data',
        headless: true,
        args: ['--disable-notifications'],
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 768,
    });
    const authResult = await checkIsAuthorised(page);
    console.log(authResult);
    if (!authResult) {
        await authorize(page);
    }
    await page.goto('https://twitter.com/' + username, {
        timeout: 0,
        waitUntil: 'networkidle2',
    });
    const links = (await (0, autoscroll_1.default)(page)).filter((link) => !ignorePostIDs.includes(link));
    const pagesWorker = new pages_worker_1.default(browser, {
        width: 1366,
        height: 768,
    }, scrap_page_1.default);
    await pagesWorker.createPages(1);
    pagesWorker.registerTasks(...links);
    const result = await pagesWorker.run();
    await browser.close();
    return result;
};
exports.default = scrapImagesWithLinksByUsername;
