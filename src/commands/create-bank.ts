import { SlashCommandBuilder } from 'discord.js';
import CardBankController from '../controllers/card-bank-controller';
import CommandDeployController from '../controllers/command-deploy-controller';
import CommandsController from '../controllers/commands-controller';
import scrappingController from '../controllers/scrapping-controller';
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
            .setName('share_twitter_username')
            .setDescription('Username to show when sharing card')
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
    const twitterUsername = (
        interaction.options.get('twitter_username', true).value as string
    ).replace('@', '');
    const shareUsername = (
        interaction.options.get('share_twitter_username', true).value as string
    ).replace('@', '');
    const description = interaction.options.get('description')?.value as
        | string
        | undefined;
    if (!interaction.inGuild()) {
        return await interaction.reply(
            'This command is only allowed in guilds'
        );
    }
    if (scrappingController.checkIsBusy(interaction.guildId)) {
        return await interaction.reply(
            'Only one bank can be added at the moment on server'
        );
    }
    scrappingController.setBusy(interaction.guildId);
    try {
        await interaction.reply(
            'Started downloading (this may take a few minutes)'
        );

        new SlashCommandBuilder()
            .setName(command)
            .setDescription(description || 'Guild command');

        const commandReference = await CommandsController.findOne({
            commandTitle: command,
            serverID: interaction.guildId,
        });
        if (commandReference) {
            scrappingController.release(interaction.guildId);
            return await interaction.editReply(
                'This command is already exists'
            );
        }

        const posts = await scrapImagesWithLinksByUsername(twitterUsername);

        if (!posts.length) {
            scrappingController.release(interaction.guildId);
            return await interaction.editReply('0 cards was found');
        }

        const createdCommand = await CommandsController.createCommand({
            commandTitle: command,
            commandDescription: description,
            serverID: interaction.guildId,
            isGlobal: false,
            twitterUsername: shareUsername,
        });

        await CardBankController.createBank(posts, createdCommand.id);
        await CommandDeployController.deployGuildCommands(interaction.guildId);
        scrappingController.release(interaction.guildId);
    } catch (error) {
        console.error(error);
        scrappingController.release(interaction.guildId);

        return await interaction.editReply('Failed to add this command');
    }
    await interaction.editReply('Ready!');
});
