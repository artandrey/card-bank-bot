import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db';

export interface StandartBankCard {
    filename: string;
    twitterID: string | null;
}

export interface StandartBankCardCrationProps {
    filename: string;
    twitterID?: string;
}

const standartBankCard = sequelize.define<
    Model<StandartBankCard, StandartBankCardCrationProps>
>('standart-bank-card', {
    filename: { type: DataTypes.STRING(256), allowNull: false, unique: true },
    twitterID: { type: DataTypes.STRING(10), unique: true },
});

export default standartBankCard;
