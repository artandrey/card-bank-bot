"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db/db"));
const handle_command_1 = __importDefault(require("./handlers/handle-command"));
dotenv_1.default.config({ path: '.env', debug: true });
const { TOKEN } = process.env;
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages],
});
db_1.default.sync();
client.once(discord_js_1.Events.ClientReady, (c) => {
    console.log(`Started as @${c.user.tag}`);
});
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    (0, handle_command_1.default)(interaction);
});
client.login(TOKEN);
