"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const request = require('request');
const uuid_1 = require("uuid");
function download(uri, name, extension, twitterUsername) {
    return new Promise((resolve, reject) => {
        request.head(uri, function (err, res, body) {
            const filePath = (0, uuid_1.v4)() + '.jpg';
            request(uri)
                .pipe(fs.createWriteStream('/Projects/discord-cards-bank/src/assets/standart-bank-prebuilt/' +
                filePath))
                .on('close', () => resolve(filePath));
        });
    });
}
module.exports = download;
