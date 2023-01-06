import BankCard, { BankCardCreationProps } from '../models/BankCard.model';

class CardsService {
    static async getAllCards(id?: number) {
        const result = await BankCard.findAll(
            id ? { where: { commandID: id } } : {}
        );
        return result;
    }
    static async getRandomCard(id?: number) {
        const cards = await this.getAllCards(id);
        cards.shift();
        const card = cards[Math.floor(Math.random() * cards.length)].get({
            plain: true,
        });
        return card;
    }
    static async addNewCard(options: BankCardCreationProps) {
        return await BankCard.create(options);
    }
    static async deleteCards(id?: number) {
        await BankCard.destroy({ where: { commandID: id } });
    }
}

export default CardsService;
