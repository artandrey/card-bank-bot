import https from 'https';
import StandartCardsService from '../services/StandartCards.service';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const createCardFromTwitterLink = async (link: string) => {
    // https.get(link, (res) => {
    //     if (res.statusCode === 301) {
    //         console.log(res.headers);
    //         const location = res.headers.location!;
    //         https.get(location, (res) => {
    //             let data = '';
    //             // A chunk of data has been received.
    //             res.on('data', (chunk) => {
    //                 data += chunk;
    //             });
    //             // The whole response has been received. Print out the result.
    //             res.on('end', () => {
    //                 const dom = new JSDOM(data);
    //                 const img = dom.window.document.querySelector('img');
    //             });
    //         });
    //     }
    // });
    // https://pic.twitter.com/KMSHfr1Vko
};

export default createCardFromTwitterLink;
