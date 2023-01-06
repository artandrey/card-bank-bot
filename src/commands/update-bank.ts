import { SlashCommandBuilder } from 'discord.js';
import CardBankController from '../controllers/card-bank-controller';
import CommandsController from '../controllers/commands-controller';
import scrappingController from '../controllers/scrapping-controller';
import Command from '../structures/Command';
import scrapImagesWithLinksByUsername from '../twitter-scrapper/twitter-scrapper';

const command = new SlashCommandBuilder()
    .setName('update-bank')
    .addStringOption((option) =>
        option
            .setName('command')
            .setDescription('Command name (without /)')
            .setRequired(true)
            .setMaxLength(14)
    )
    .setDescription('Edit bank');

export default new Command(command, async (interaction) => {
    const command = interaction.options.get('command', true).value as string;
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

        const commandReference = await CommandsController.findOne({
            commandTitle: command,
            serverID: interaction.guildId,
        });
        if (!commandReference) {
            scrappingController.release(interaction.guildId);

            return await interaction.editReply('This command didn`t exists');
        }

        const cards = await CardBankController.getAllCards(commandReference.id);

        const addedPostIDs = cards.map((card) => card.dataValues.postID);

        const posts = await scrapImagesWithLinksByUsername(
            commandReference.twitterUsername,
            addedPostIDs
        );

        if (!posts.length) {
            scrappingController.release(interaction.guildId);
            return await interaction.editReply('0 NEW cards was found');
        }
        await CardBankController.createBank(posts, commandReference.id);

        scrappingController.release(interaction.guildId);
    } catch (error) {
        console.error(error);
        scrappingController.release(interaction.guildId);

        return await interaction.editReply('Failed to update this command');
    }
    await interaction.editReply('Ready!');
});
