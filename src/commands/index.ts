import { Collection } from 'discord.js';
import Command from '../structures/Command';
import createBank from './create-bank';
import getCard from './get-card';

const commands: Record<string, Command> = {
    getCard,
    createBank,
};

export const commandsCollection = new Collection<string, Command>();

Object.values(commands).forEach((command) =>
    commandsCollection.set(command.data.name, command)
);

export default commands;
