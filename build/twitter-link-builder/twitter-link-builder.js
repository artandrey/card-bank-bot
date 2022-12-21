"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TwitterLinkBuilder {
    constructor() {
        this.text = '';
        this.immageID = '';
        this.account = '';
        this.link = new URL(TwitterLinkBuilder.TWIITER_SHARE_LINK_BASE);
    }
    addText(text) {
        this.text = text;
        return this;
    }
    addImage(twitterID) {
        this.immageID = twitterID;
        return this;
    }
    addAccount(account) {
        this.account = account;
        return this;
    }
    getLink() {
        const textQuerry = this.text +
            ' ' +
            TwitterLinkBuilder.TWITTER_PICTURE_LINK_BASE +
            this.immageID;
        this.link.searchParams.set('text', textQuerry);
        this.account && this.link.searchParams.set('via', this.account);
        return this.link.toString();
    }
}
TwitterLinkBuilder.TWIITER_SHARE_LINK_BASE = 'https://twitter.com/intent/tweet';
TwitterLinkBuilder.TWITTER_PICTURE_LINK_BASE = 'https://pic.twitter.com/';
exports.default = TwitterLinkBuilder;
