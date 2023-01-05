import { Client, GatewayIntentBits, Events } from 'discord.js';
import './config';
import db from './db/db';
import handleCommand from './handlers/handle-command';

const { TOKEN } = process.env;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

db.sync();

client.once(Events.ClientReady, (c) => {
    console.log(`Started as @${c.user.tag}`);
});

// scrapImagesWithLinksByUsername('ACbyXPLRS');

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    handleCommand(interaction);
});

client.login(TOKEN);
