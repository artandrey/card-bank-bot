import { Collection } from 'discord.js';
import Command from '../structures/Command';
import createBank from './create-bank';
import deleteBank from './delete-bank';
import updateBank from './update-bank';

const commands: Record<string, Command> = {
    createBank,
    updateBank,
    deleteBank,
};

export const commandsCollection = new Collection<string, Command>();

Object.values(commands).forEach((command) =>
    commandsCollection.set(command.data.name, command)
);

export default commands;
