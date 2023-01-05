import { SlashCommandBuilder } from 'discord.js';
import CardBankController from '../controllers/card-bank-controller';
import CommandDeployController from '../controllers/command-deploy-controller';
import CommandsController from '../controllers/commands-controller';
import Command from '../structures/Command';
import scrapImagesWithLinksByUsername from '../twitter-scrapper/twitter-scrapper';

const command = new SlashCommandBuilder()
    .setName('create-bank')
    .addStringOption((option) =>
        option
            .setName('command')
            .setDescription('Command name (without /)')
            .setRequired(true)
            .setMaxLength(14)
    )
    .addStringOption((option) =>
        option
            .setName('twitter_username')
            .setDescription('Username of account with cards')
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName('description')
            .setDescription('Command description')
            .setRequired(false)
            .setMaxLength(40)
    )
    .setDescription('Create bank');

export default new Command(command, async (interaction) => {
    const command = interaction.options.get('command', true).value as string;
    const twitterUsername = interaction.options.get('twitter_username', true)
        .value as string;
    const description = interaction.options.get('description')?.value as string;
    if (!interaction.inGuild()) {
        return await interaction.reply(
            'This command is only allowed in guilds'
        );
    }
    try {
        await interaction.reply(
            'Started downloading (this may take a few minutes)'
        );
        const commandReference = await CommandsController.findOne({
            commandTitle: command,
            serverID: interaction.guildId,
        });
        if (commandReference) {
            return await interaction.editReply(
                'This command is already exists'
            );
        }

        const posts = await scrapImagesWithLinksByUsername(twitterUsername);

        const createdCommand = await CommandsController.createCommand({
            commandTitle: command,
            commandDescription: description,
            serverID: interaction.guildId,
            isGlobal: false,
        });

        await CardBankController.createBank(posts, createdCommand.id);
        await CommandDeployController.deployGuildCommands(interaction.guildId);
    } catch (error) {
        console.error(error);

        return await interaction.editReply('Failed to add this command');
    }
    await interaction.editReply('Ready!');
});
