import { SlashCommandBuilder } from 'discord.js';
import CommandDeployController from '../controllers/command-deploy-controller';
import CommandsController from '../controllers/commands-controller';
import scrappingController from '../controllers/scrapping-controller';
import Command from '../structures/Command';

const command = new SlashCommandBuilder()
    .setName('delete-bank')
    .addStringOption((option) =>
        option
            .setName('command')
            .setDescription('Command name (without /)')
            .setRequired(true)
            .setMaxLength(14)
    )
    .setDescription('Delete bank');

export default new Command(command, async (interaction) => {
    const command = interaction.options.get('command', true).value as string;
    if (!interaction.inGuild()) {
        return await interaction.reply(
            'This command is only allowed in guilds'
        );
    }
    if (scrappingController.checkIsBusy(interaction.guildId)) {
        return await interaction.reply(
            'Only one bank can be added or removed at the moment on server'
        );
    }
    scrappingController.setBusy(interaction.guildId);
    try {
        await interaction.reply('Started removing');

        const commandReference = await CommandsController.deleteCommand({
            commandTitle: command,
            serverID: interaction.guildId,
        });
        if (!commandReference) {
            scrappingController.release(interaction.guildId);

            return await interaction.editReply('This command didn`t exists');
        }

        await CommandDeployController.deployGuildCommands(interaction.guildId);
    } catch (error) {
        console.error(error);
        scrappingController.release(interaction.guildId);

        return await interaction.editReply('Failed to delete this command');
    }
    scrappingController.release(interaction.guildId);
    await interaction.editReply('Deleted!');
});
