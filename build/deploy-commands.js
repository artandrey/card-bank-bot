"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const commands_1 = __importDefault(require("./commands"));
dotenv_1.default.config({ path: '.env', debug: true });
const { TOKEN, APP_ID } = process.env;
const commandsList = Object.values(commands_1.default).map((command) => command.data.toJSON());
const rest = new discord_js_1.REST({ version: '10' }).setToken(TOKEN);
try {
    console.log('Started commands deploying');
    (async () => {
        const data = await rest.put(discord_js_1.Routes.applicationCommands(APP_ID), {
            body: commandsList,
        });
        console.log('Successfully added commands!');
    })();
}
catch (error) {
    console.error(error);
}
