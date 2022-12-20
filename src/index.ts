import { Client, GatewayIntentBits, Events } from 'discord.js';
import dotenv from 'dotenv';
import createCardFromTwitterLink from './card-creator/card-creator';
import db from './db/db';
import handleCommand from './handlers/handle-command';
import standartBankCard from './models/StandartBankCard.model';

dotenv.config({ path: '.env', debug: true });

const { TOKEN } = process.env;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

db.sync();

client.once(Events.ClientReady, (c) => {
    console.log(`Started as @${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    handleCommand(interaction);
});

client.login(TOKEN);
