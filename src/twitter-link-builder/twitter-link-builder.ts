class TwitterLinkBuilder {
    private link: URL;
    private text: string = '';
    private immageID: string = '';
    private account: string = '';
    static readonly TWIITER_SHARE_LINK_BASE: string =
        'https://twitter.com/intent/tweet';
    static readonly TWITTER_PICTURE_LINK_BASE: string =
        'https://pic.twitter.com/';
    constructor() {
        this.link = new URL(TwitterLinkBuilder.TWIITER_SHARE_LINK_BASE);
    }

    addText(text: string) {
        this.text = text;
        return this;
    }

    addImage(twitterID: string) {
        this.immageID = twitterID;
        return this;
    }

    addAccount(account: string) {
        this.account = account;
        return this;
    }

    getLink() {
        const textQuerry = [
            this.text,
            TwitterLinkBuilder.TWITTER_PICTURE_LINK_BASE + this.immageID,
            ,
            this.account,
        ].join(' ');
        this.link.searchParams.set('text', textQuerry);
        return this.link.toString();
    }
}

export default TwitterLinkBuilder;
