"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Cards_service_1 = __importDefault(require("../services/Cards.service"));
const Command_1 = __importDefault(require("../structures/Command"));
const twitter_link_builder_1 = __importDefault(require("../twitter-link-builder/twitter-link-builder"));
const command = new discord_js_1.SlashCommandBuilder()
    .setName('gm')
    .setDescription('Sends a card');
exports.default = new Command_1.default(command, async (interaction) => {
    const card = await Cards_service_1.default.getRandomCard();
    const { imageUrl, twitterID } = card;
    const exampleEmbed = new discord_js_1.EmbedBuilder().setImage(imageUrl);
    const row = new discord_js_1.ActionRowBuilder();
    if (twitterID) {
        const twitterShareLink = new twitter_link_builder_1.default()
            .addImage(twitterID)
            .addText('Write your message here ')
            .addAccount(process.env.SHARE_ACCOUNT)
            .getLink();
        row.addComponents(new discord_js_1.ButtonBuilder()
            .setStyle(discord_js_1.ButtonStyle.Link)
            .setLabel('Share on Twitter')
            .setURL(twitterShareLink));
    }
    interaction.reply({
        embeds: [exampleEmbed],
        components: [row],
    });
});
