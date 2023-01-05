import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import commands from '../commands';
import CommandsController from './commands-controller';

class CommandDeployController {
    static async deployGuildCommands(guildId: string) {
        const { TOKEN, APP_ID } = process.env;

        const commandsFromDB = await CommandsController.findAll({
            serverID: guildId,
        });
        const commandsList = commandsFromDB.map((rawCommand) => {
            console.log(rawCommand.commandTitle);

            const command = new SlashCommandBuilder()
                .setName(rawCommand.commandTitle)
                .setDescription(
                    rawCommand.commandDescription || 'Guild command'
                );
            return command.toJSON();
        });

        const rest = new REST({ version: '10' }).setToken(TOKEN!);

        try {
            console.log('Started commands deploying');
            (async () => {
                const data = await rest.put(
                    Routes.applicationGuildCommands(APP_ID!, guildId),
                    {
                        body: commandsList,
                    }
                );
                console.log('Successfully added commands!');
            })();
        } catch (error) {
            console.error(error);
        }
    }
}

export default CommandDeployController;
