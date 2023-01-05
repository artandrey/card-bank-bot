import { DataTypes, Model, InferAttributes } from 'sequelize';
import sequelize from '../db/db';
import BankCard from './BankCard.model';

export interface Command {
    id: number;
    commandTitle: string;
    commandDescription: string | null;
    serverID: string;
    isGlobal: boolean;
}

export interface CommandCreationProps {
    commandTitle: string;
    serverID: string;
    commandDescription?: string;
    isGlobal?: boolean;
}

const Command = sequelize.define<Model<Command, CommandCreationProps>>(
    'command',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        commandTitle: {
            type: DataTypes.STRING(14),
        },
        commandDescription: { type: DataTypes.STRING(60), allowNull: true },
        serverID: { type: DataTypes.STRING(10) },
        isGlobal: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }
);

export default Command;
