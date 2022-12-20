import { Collection } from 'discord.js';
import Command from '../structures/Command';
import getCard from './get-card';

const commands: Record<string, Command> = {
    getCard,
};

export const commandsCollection = new Collection<string, Command>();

Object.values(commands).forEach((command) =>
    commandsCollection.set(command.data.name, command)
);

export default commands;
