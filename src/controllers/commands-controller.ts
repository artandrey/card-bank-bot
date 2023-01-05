import { Command, CommandCreationProps } from '../models/Command.model';
import CommandService from '../services/Command.service';

class CommandsController {
    static async createCommand(options: CommandCreationProps) {
        const { serverID, commandTitle } = options;
        const reference = await this.findOne({ serverID, commandTitle });

        if (reference) throw Error('Command already exists');

        return await CommandService.create(options);
    }
    static async findOne(options: Partial<Command>) {
        return await CommandService.findOneBy(options);
    }

    static async findAll(options: Partial<Command>) {
        return (await CommandService.findAllBy(
            options
        )) as unknown as Command[];
    }
}

export default CommandsController;
