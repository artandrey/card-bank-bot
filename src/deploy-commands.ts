import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import commands from './commands';

dotenv.config({ path: '.env', debug: true });

const { TOKEN, APP_ID } = process.env;

const commandsList = Object.values(commands).map((command) =>
    command.data.toJSON()
);

const rest = new REST({ version: '10' }).setToken(TOKEN!);

try {
    console.log('Started commands deploying');
    (async () => {
        const data = await rest.put(Routes.applicationCommands(APP_ID!), {
            body: commandsList,
        });
        console.log('Successfully added commands!');
    })();
} catch (error) {
    console.error(error);
}
