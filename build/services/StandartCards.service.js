"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StandartBankCard_model_1 = __importDefault(require("../models/StandartBankCard.model"));
class StandartCardsService {
    static async getAllCards() {
        const result = await StandartBankCard_model_1.default.findAll();
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
    static async addNewCard(filename, twitterID) {
        return await StandartBankCard_model_1.default.create({ filename, twitterID });
    }
}
exports.default = StandartCardsService;
