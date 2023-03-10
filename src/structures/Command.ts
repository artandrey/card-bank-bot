import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
export default class Command {
    constructor(
        public data: SlashCommandBuilder,
        public execute: (interaction: CommandInteraction) => unknown
    ) {}
}
