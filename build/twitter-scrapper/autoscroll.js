"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collectAllLinks = async function (page) {
    return await page.evaluate(async () => {
        const linkRegEx = /(https:\/\/[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[a-zA-Z0-9-]{2,}(\/[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]){1,})\/\d{19}$/;
        const result = new Set();
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            const distance = 300;
            const timer = setInterval(async () => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                const elements = Array.from(document.querySelectorAll(`a[href*="/status/"]`));
                elements.forEach((el) => result.add(el.href));
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve('');
                }
            }, 300);
        });
        return Array.from(result).filter((link) => linkRegEx.test(link));
    });
};
exports.default = collectAllLinks;
