import { Browser, Page, Viewport } from 'puppeteer';

type Callback<T, R> = (page: Page, options: T) => Promise<R>;
class PagesWorker<T, R> {
    private pages: Page[] = [];
    private tasks: T[] = [];
    private results: R[] = [];
    constructor(
        private browser: Browser,
        private viewport: Viewport,
        private callback: Callback<T, R>
    ) {}

    async createPages(count: number) {
        for (let i = 0; i < count; i++) {
            const page = await this.browser.newPage();
            await page.setViewport(this.viewport);
            this.pages.push(page);
        }
    }

    registerTasks(...tasks: T[]) {
        this.tasks.push(...tasks);
    }

    async run() {
        while (this.tasks.length) {
            const tasks = this.tasks.splice(0, this.pages.length);
            this.results.push(
                ...(await Promise.all(
                    tasks.map((task, i) => this.callback(this.pages[i], task))
                ))
            );
        }
        return this.results;
    }
}

export default PagesWorker;
