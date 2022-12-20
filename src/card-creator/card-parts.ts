import { readdirSync } from 'fs';
import path from 'path';

class ListOfFiles {
    public filenames: string[] = [];
    constructor(public directory: string) {
        this.filenames = this.getListOfFilesInDir(directory);
    }
    private getListOfFilesInDir(dir: string) {
        return readdirSync(dir);
    }
}

const joinPath = (relativePath: string) => {
    return path.join(__filename, relativePath);
};

const LOCAL_PATH_TO_BANK_LAYERS = '../assets/standart-bank-layers/';

const cardsLayers = {
    background: new ListOfFiles(
        joinPath(LOCAL_PATH_TO_BANK_LAYERS + 'Background')
    ),
};
