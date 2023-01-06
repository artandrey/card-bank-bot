import deleteBank from '../commands/delete-bank';
import CardsService from '../services/Cards.service';
import { PageData } from '../twitter-scrapper/scrap-page';
import scrapImagesWithLinksByUsername from '../twitter-scrapper/twitter-scrapper';

class CardBankController {
    static async createBank(result: PageData[], commandID: number) {
        for (const post of result) {
            await CardsService.addNewCard({
                commandID,
                imageUrl: post.src,
                twitterID: post.shareID,
                postID: post.src.split('/').reverse()[0],
            });
        }
    }
    static async getAllCards(id?: number) {
        const result = await CardsService.getAllCards(id);
        return result;
    }
    static async getRandomCard(id?: number) {
        const cards = await CardBankController.getAllCards(id);
        cards.shift();
        const card = cards[Math.floor(Math.random() * cards.length)].get({
            plain: true,
        });
        return card;
    }
    static async deleteBank(id?: number) {
        await CardsService.deleteCards(id);
    }
}

export default CardBankController;
