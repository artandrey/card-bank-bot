import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { commandsCollection } from '../commands';
import CommandsController from '../controllers/commands-controller';
import handleCustomCommand from './handle-custom-command';

const checkCommandInstanceInDB = async (
    commandName: string,
    guildId: string
) => {
    const rawCommand = await CommandsController.findOne({
        commandTitle: commandName,
        serverID: guildId,
    });
    return !!rawCommand;
};

const handleCommand = async (interaction: ChatInputCommandInteraction) => {
    const { commandName } = interaction;
    const commandInstance = commandsCollection.get(commandName);

    const isInDB = !!(
        interaction.guildId &&
        (await checkCommandInstanceInDB(commandName, interaction.guildId))
    );
    if (!commandInstance && !isInDB)
        return console.error('Command was not found');

    try {
        if (commandInstance) {
            return await commandInstance.execute(interaction);
        } else if (isInDB) {
            return await handleCustomCommand(interaction);
        }
    } catch (error) {
        console.error(error);
        await interaction.channel?.send(
            'Something went wrong during executing this command'
        );
    }
};

export default handleCommand;
