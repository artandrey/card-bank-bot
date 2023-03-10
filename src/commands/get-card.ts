import {
    ActionRowBuilder,
    AttachmentBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    SlashCommandBuilder,
} from 'discord.js';
import CardsService from '../services/Cards.service';
import Command from '../structures/Command';
import path from 'path';
import TwitterLinkBuilder from '../twitter-link-builder/twitter-link-builder';

const command = new SlashCommandBuilder()
    .setName('gm')
    .setDescription('Sends a card');

export default new Command(command, async (interaction) => {
    const card = await CardsService.getRandomCard();
    const { imageUrl, twitterID } = card;

    const exampleEmbed = new EmbedBuilder().setImage(imageUrl);

    const row = new ActionRowBuilder<ButtonBuilder>();
    if (twitterID) {
        const twitterShareLink = new TwitterLinkBuilder()
            .addImage(twitterID)

            .addText('Write your message here ')
            .addAccount(process.env.SHARE_ACCOUNT!)
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
        components: [row],
    });
});
