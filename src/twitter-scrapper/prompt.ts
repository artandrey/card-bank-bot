import { resolve } from 'path';
import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const prompt = (message: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(message, resolve);
    });
};

export default prompt;
