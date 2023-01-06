import CommandModel, {
    CommandCreationProps,
    Command,
} from '../models/Command.model';

class CommandService {
    static async findOneBy(findOptions: Partial<Command>) {
        return (await CommandModel.findOne({ where: findOptions }))?.get({
            plain: true,
        });
    }
    static async findAllBy(findOptions: Partial<Command>) {
        return await CommandModel.findAll({ where: findOptions, raw: true });
    }
    static async create(options: CommandCreationProps) {
        return (await CommandModel.create(options)).get();
    }
    static async findAndDelete(options: Partial<Command>) {
        const command = await CommandModel.findOne({ where: options });

        if (command) {
            await command.destroy();
        }
        return command?.dataValues;
    }
}

export default CommandService;
