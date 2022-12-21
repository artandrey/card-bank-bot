import {
    ActionRowBuilder,
    AttachmentBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    SlashCommandBuilder,
} from 'discord.js';
import StandartCardsService from '../services/StandartCards.service';
import Command from '../structures/Command';
import fs from 'fs/promises';
import path from 'path';
import TwitterLinkBuilder from '../twitter-link-builder/twitter-link-builder';

const command = new SlashCommandBuilder()
    .setName('gm')
    .setDescription('Sends a card');

export default new Command(command, async (interaction) => {
    const card = await StandartCardsService.getRandomCard();
    const { filename, twitterID } = card;

    const imgPath = path.join(
        './src/assets/standart-bank-prebuilt/' + filename
    );

    const image = new AttachmentBuilder(imgPath);

    const exampleEmbed = new EmbedBuilder().setImage(
        'attachment://' + filename
    );

    const row = new ActionRowBuilder<ButtonBuilder>();
    if (twitterID) {
        const twitterShareLink = new TwitterLinkBuilder()
            .addImage(twitterID)
            .getLink();
        row.addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel('Share on Twitter')
                .setURL(twitterShareLink)
        );
    }

    interaction.reply({
        embeds: [exampleEmbed],
        files: [image],
        components: [row],
    });
});
