"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
class ListOfFiles {
    constructor(directory) {
        this.directory = directory;
        this.filenames = [];
        this.filenames = this.getListOfFilesInDir(directory);
    }
    getListOfFilesInDir(dir) {
        return (0, fs_1.readdirSync)(dir);
    }
}
const joinPath = (relativePath) => {
    return path_1.default.join(__filename, relativePath);
};
const LOCAL_PATH_TO_BANK_LAYERS = '../assets/standart-bank-layers/';
const cardsLayers = {
    background: new ListOfFiles(joinPath(LOCAL_PATH_TO_BANK_LAYERS + 'Background')),
};
