"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../commands");
const handleCommand = async (interaction) => {
    const { commandName } = interaction;
    const commandInstance = commands_1.commandsCollection.get(commandName);
    if (!commandInstance)
        return console.error('Command was not foud');
    try {
        await commandInstance.execute(interaction);
    }
    catch (error) {
        console.error(error);
        await interaction.reply('Something went wrong during executing this command');
    }
};
exports.default = handleCommand;
