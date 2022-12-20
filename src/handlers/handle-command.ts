import { ChatInputCommandInteraction } from 'discord.js';
import { commandsCollection } from '../commands';

const handleCommand = async (interaction: ChatInputCommandInteraction) => {
    const { commandName } = interaction;
    const commandInstance = commandsCollection.get(commandName);
    if (!commandInstance) return console.error('Command was not foud');

    try {
        await commandInstance.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply(
            'Something went wrong during executing this command'
        );
    }
};

export default handleCommand;
