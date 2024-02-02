import { Sequelize } from "sequelize";
import { ICategory } from "../../../shared/interfaces/modules/category/ICategory";
import { ICategoryRepository } from "../../../shared/interfaces/modules/category/repository/ICategoryRepository";
import { Channel } from "../../channel/entity/channel.schema";
import { NewMessagesServer } from "../../new_messages_server/entity/new_messages_server.schema";
import { Category } from "../entity/category.schema";

export default class CategoryRepository implements ICategoryRepository {
    public async create(category: Partial<ICategory>): Promise<ICategory> {
        const categoryCreated = await Category.create({ ...category });

        return categoryCreated as unknown as ICategory
    }

    public async findAllByServerId(serverId: string, userId: string): Promise<ICategory[]> {
        const categories = await Category.findAll({
            where: { serverId: serverId },
            include: [{
                model: Channel,
                attributes: {
                    include: [[
                        Sequelize.literal(`(SELECT COUNT(*) FROM new_messages_servers WHERE new_messages_servers.channelId = Channels.id and new_messages_servers.userId = '${userId}')`),
                        "countMessages"
                    ]]
                }
            }],
            order: [[Channel, "createdAt", "ASC"]]
        });

        return categories as unknown as ICategory[];
    }

    public async findById(categoryId: string): Promise<ICategory | null> {
        const category = await Category.findOne({ where: { id: categoryId } });

        return category as unknown as ICategory;
    }
}