import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db';
import Command from './Command.model';

export interface BankCard {
    imageUrl: string;
    postID: string;
    twitterID: string | null;
    commandID: number;
}

export interface BankCardCreationProps {
    imageUrl: string;
    twitterID: string | null;
    commandID: number;
}

const BankCard = sequelize.define<Model<BankCard, BankCardCreationProps>>(
    'bank-card',
    {
        imageUrl: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        postID: {
            type: DataTypes.STRING(19),
        },
        twitterID: { type: DataTypes.STRING(10) },
        commandID: { type: DataTypes.INTEGER },
    }
);

BankCard.belongsTo(Command, {
    foreignKey: 'commandID',
    as: 'command',
});

export default BankCard;
