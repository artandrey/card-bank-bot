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
}

export default CommandService;
