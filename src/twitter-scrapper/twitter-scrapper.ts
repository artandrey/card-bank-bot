import puppeteer, { Page } from 'puppeteer';
import collectAllLinks from './autoscroll';
import PagesWorker from './pages-worker';
import scrapPage, { PageData } from './scrap-page';

const checkIsUsernameRequired = (page: Page): Promise<boolean> => {
    return new Promise((resolve) => {
        page.waitForSelector('[data-testid="ocfEnterTextTextInput"]').then(() =>
            resolve(true)
        );
        page.waitForSelector('[type="password"]').then(() => resolve(false));
    });
};

const authorize = async (page: Page) => {
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
    await page.type('[type="password"]', process.env.PASSWORD!, { delay: 100 });
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
};

const checkIsAuthorised = async (page: Page) => {
    try {
        await page.goto('https://twitter.com/home');
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
    const browser = await puppeteer.launch({
        userDataDir: './browser-data',
        headless: true,
        executablePath: process.env.CHROME_PATH,
        args: ['--disable-notifications', '--no-sandbox'],
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
