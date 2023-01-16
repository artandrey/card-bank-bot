import { Page } from 'puppeteer';

export interface PageData {
    shareID: string;
    src: string;
}

const scrapPage = async (page: Page, url: string): Promise<PageData> => {
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.keyboard.press('r');
    console.log(url);
    try {
        await page.waitForSelector('img[src*="pbs.twimg.com/media"]');
    } catch (error) {
        console.log('error on url');

        console.log(url);
    }
    const src = await page.evaluate(() => {
        const img = document.querySelector<HTMLImageElement>(
            'img[src*="pbs.twimg.com/media"]'
        );
        return img?.src;
    });
    await page.keyboard.press('r');
    const shareLink = await page.evaluate(() => {
        const linkRegEx = /pic.twitter\.com\/[A-z0-9]{10}$/;
        const shareLinkContainer = Array.from(
            document.querySelectorAll<HTMLSpanElement>('span')
        ).find((span) => span.textContent && linkRegEx.test(span.textContent));
        return shareLinkContainer?.textContent;
    });
    console.log(shareLink, src);

    if (!shareLink || !src) throw Error('Failed to get info from page');

    const shareID = shareLink.split('/').at(-1)!;
    return { shareID, src };
};

export default scrapPage;
