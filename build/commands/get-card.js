"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const StandartCards_service_1 = __importDefault(require("../services/StandartCards.service"));
const Command_1 = __importDefault(require("../structures/Command"));
const path_1 = __importDefault(require("path"));
const twitter_link_builder_1 = __importDefault(require("../twitter-link-builder/twitter-link-builder"));
const command = new discord_js_1.SlashCommandBuilder()
    .setName('get-card')
    .setDescription('Sends a card');
exports.default = new Command_1.default(command, async (interaction) => {
    const card = await StandartCards_service_1.default.getRandomCard();
    const { filename, twitterID } = card;
    const imgPath = path_1.default.join('./src/assets/standart-bank-prebuilt/' + filename);
    const image = new discord_js_1.AttachmentBuilder(imgPath);
    const exampleEmbed = new discord_js_1.EmbedBuilder().setImage('attachment://' + filename);
    const row = new discord_js_1.ActionRowBuilder();
    if (twitterID) {
        const twitterShareLink = new twitter_link_builder_1.default()
            .addImage(twitterID)
            .getLink();
        row.addComponents(new discord_js_1.ButtonBuilder()
            .setStyle(discord_js_1.ButtonStyle.Link)
            .setLabel('Share on Twitter')
            .setURL(twitterShareLink));
    }
    interaction.reply({
        embeds: [exampleEmbed],
        files: [image],
        components: [row],
    });
});
