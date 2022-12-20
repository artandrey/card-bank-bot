"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db/db"));
const standartBankCard = db_1.default.define('standart-bank-card', {
    filename: { type: sequelize_1.DataTypes.STRING(256), allowNull: false, unique: true },
    twitterID: { type: sequelize_1.DataTypes.STRING(10), unique: true },
});
exports.default = standartBankCard;
