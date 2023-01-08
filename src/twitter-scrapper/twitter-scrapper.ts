import puppeteer, { Page } from 'puppeteer';
import collectAllLinks from './autoscroll';
import PagesWorker from './pages-worker';
import prompt from './prompt';
import scrapPage, { PageData } from './scrap-page';

const BROWSER_CONFIG = {
    userDataDir: './browser-data',
    headless: false,
    executablePath: process.env.CHROME_PATH,
    args: ['--disable-notifications', '--no-sandbox'],
};

const checkIsUsernameRequired = (page: Page): Promise<boolean> => {
    return new Promise((resolve) => {
        page.waitForSelector('[data-testid="ocfEnterTextTextInput"]').then(() =>
            resolve(true)
        );
        page.waitForSelector('[type="password"]').then(() => resolve(false));
    });
};

const checkIsCodeRequired = (page: Page): Promise<boolean> => {
    return new Promise((resolve) => {
        page.waitForSelector('[data-testid="ocfEnterTextTextInput"]').then(() =>
            resolve(true)
        );
        page.waitForNavigation().then(() => resolve(false));
    });
};

export const authorize = async () => {
    const browser = await puppeteer.launch(BROWSER_CONFIG);
    const page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 768,
    });
    const url = 'https://twitter.com/login';
    page.goto(url, {
        timeout: 0,
        waitUntil: 'networkidle0',
    });
    await page.waitForNavigation();
    await page.waitForSelector('[autocomplete="username"]');
    await page.type('[autocomplete="username"]', 'cagec81034@dewareff.com');
    await page.keyboard.press('Enter');
    const usernameIsRequired = await checkIsUsernameRequired(page);
    if (usernameIsRequired) {
        await page.type(
            '[data-testid="ocfEnterTextTextInput"]',
            'scrapper_xplr'
        );
        await page.keyboard.press('Enter');
    }
    await page.waitForSelector('[type="password"]');
    await page.type('[type="password"]', process.env.PASSWORD!, { delay: 100 });
    await page.keyboard.press('Enter');
    const codeIsRequired = await checkIsCodeRequired(page);
    if (codeIsRequired) {
        const code = await prompt('Code is required, enter it');
        await page.type('[data-testid="ocfEnterTextTextInput"]', code);
        await page.keyboard.press('Enter');
    }
};

const checkIsAuthorised = async (page: Page) => {
    try {
        await page.goto('https://twitter.com/');
        await page.waitForNavigation();

        const url = page.url();

        return url.includes('home');
    } catch (error) {
        console.error(error);
        return false;
    }
};

const scrapImagesWithLinksByUsername = async (
    username: string,
    ignorePostIDs: string[] = []
) => {
    const browser = await puppeteer.launch(BROWSER_CONFIG);
    const page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 768,
    });
    const authResult = await checkIsAuthorised(page);
    console.log(authResult);

    if (!authResult) {
        throw Error('Not authorised');
    }
    await page.goto('https://twitter.com/' + username, {
        timeout: 0,
        waitUntil: 'networkidle2',
    });

    const links = (await collectAllLinks(page)).filter(
        (link) => !ignorePostIDs.includes(link)
    );

    const pagesWorker = new PagesWorker<string, PageData>(
        browser,
        {
            width: 1366,
            height: 768,
        },
        scrapPage
    );

    await pagesWorker.createPages(1);
    pagesWorker.registerTasks(...links);
    const result = await pagesWorker.run();
    await browser.close();
    return result;
};
export default scrapImagesWithLinksByUsername;
