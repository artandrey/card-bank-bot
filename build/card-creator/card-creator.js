"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const StandartCards_service_1 = __importDefault(require("../services/StandartCards.service"));
const twitter_1 = __importDefault(require("./twitter-image-downloader/twitter"));
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const createCardFromTwitterLink = async (link) => {
    https_1.default.get(link, (res) => {
        if (res.statusCode === 301) {
            console.log(res.headers);
            const location = res.headers.location;
            https_1.default.get(location, (res) => {
                let data = '';
                // A chunk of data has been received.
                res.on('data', (chunk) => {
                    data += chunk;
                });
                // The whole response has been received. Print out the result.
                res.on('end', () => {
                    const dom = new JSDOM(data);
                    const img = dom.window.document.querySelector('img');
                });
                (0, twitter_1.default)(location).then((fileName) => {
                    StandartCards_service_1.default.addNewCard(fileName, link.split('/').reverse()[0]);
                });
            });
        }
    });
    // https://pic.twitter.com/KMSHfr1Vko
};
exports.default = createCardFromTwitterLink;
