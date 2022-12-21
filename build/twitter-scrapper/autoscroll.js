"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autoScroll = async function (page) {
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
                    resolve('');
                }
            }, 300);
        });
    });
};
exports.default = autoScroll;
