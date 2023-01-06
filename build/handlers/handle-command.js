"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../commands");
const commands_controller_1 = __importDefault(require("../controllers/commands-controller"));
const handle_custom_command_1 = __importDefault(require("./handle-custom-command"));
const checkCommandInstanceInDB = async (commandName, guildId) => {
    const rawCommand = await commands_controller_1.default.findOne({
        commandTitle: commandName,
        serverID: guildId,
    });
    return !!rawCommand;
};
const handleCommand = async (interaction) => {
    const { commandName } = interaction;
    const commandInstance = commands_1.commandsCollection.get(commandName);
    const isInDB = !!(interaction.guildId &&
        (await checkCommandInstanceInDB(commandName, interaction.guildId)));
    if (!commandInstance && !isInDB)
        return console.error('Command was not foud');
    try {
        if (commandInstance) {
            return await commandInstance.execute(interaction);
        }
        else if (isInDB) {
            return await (0, handle_custom_command_1.default)(interaction);
        }
    }
    catch (error) {
        console.error(error);
        await interaction.reply('Something went wrong during executing this command');
    }
};
exports.default = handleCommand;
