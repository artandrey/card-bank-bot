"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandsCollection = void 0;
const discord_js_1 = require("discord.js");
const create_bank_1 = __importDefault(require("./create-bank"));
const delete_bank_1 = __importDefault(require("./delete-bank"));
const update_bank_1 = __importDefault(require("./update-bank"));
const commands = {
    createBank: create_bank_1.default,
    updateBank: update_bank_1.default,
    deleteBank: delete_bank_1.default,
};
exports.commandsCollection = new discord_js_1.Collection();
Object.values(commands).forEach((command) => exports.commandsCollection.set(command.data.name, command));
exports.default = commands;
