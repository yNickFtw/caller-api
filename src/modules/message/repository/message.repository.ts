import { IMessage } from "../../../shared/interfaces/modules/message/IMessage";
import { IMessageRepository } from "../../../shared/interfaces/modules/message/repository/IMessageRepository";
import { User } from "../../user/entity/user.schema";
import { Message } from "../entity/message.schema";

export default class MessageRepository implements IMessageRepository {
    public async create(message: Partial<IMessage>): Promise<void> {
        await Message.create({ ...message });

        return;
    }

    public async findAllMessagesByChannelId(channelId: string): Promise<IMessage[] | []> {
        const messages = await Message.findAll({ where: { channelId: channelId }, include: [{ model: User, attributes: { exclude: ["password", "email"] } }], order: [["createdAt", "ASC"]] });

        return messages as unknown as IMessage[];
    }
}