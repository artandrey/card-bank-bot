import standartBankCard from '../models/StandartBankCard.model';

class StandartCardsService {
    static async getAllCards() {
        const result = await standartBankCard.findAll();
        return result;
    }
    static async getRandomCard() {
        const cards = await this.getAllCards();
        cards.shift();
        const card = cards[Math.floor(Math.random() * cards.length)].get({
            plain: true,
        });
        return card;
    }
    static async addNewCard(filename: string, twitterID: string) {
        return await standartBankCard.create({ filename, twitterID });
    }
}

export default StandartCardsService;
