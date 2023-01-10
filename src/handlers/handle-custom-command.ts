import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    EmbedBuilder,
} from 'discord.js';
import CardBankController from '../controllers/card-bank-controller';
import CommandsController from '../controllers/commands-controller';
import CardsService from '../services/Cards.service';
import TwitterLinkBuilder from '../twitter-link-builder/twitter-link-builder';

const handleCustomCommand = async (interaction: CommandInteraction) => {
    const rawCommand = await CommandsController.findOne({
        commandTitle: interaction.commandName,
        serverID: interaction.guildId!,
    });

    if (!rawCommand) throw 'Command not found';

    const bankCard = await CardBankController.getRandomCard(rawCommand.id);

    const exampleEmbed = new EmbedBuilder().setImage(bankCard.imageUrl);

    console.log(bankCard.imageUrl);

    const row = new ActionRowBuilder<ButtonBuilder>();
    if (bankCard.twitterID) {
        const twitterShareLink = new TwitterLinkBuilder()
            .addImage(bankCard.twitterID)

            .addText('Write your message here ')
            .addAccount(rawCommand.twitterUsername)
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
};

export default handleCustomCommand;
