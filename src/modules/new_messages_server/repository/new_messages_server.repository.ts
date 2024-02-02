import { INewMessagesServer } from "../../../shared/interfaces/modules/new_messages_server/INewMessagesServer";
import { INewMessagesServerRepository } from "../../../shared/interfaces/modules/new_messages_server/repository/INewMessagesRepository";
import { NewMessagesServer } from "../entity/new_messages_server.schema";

export default class NewMessagesServerRepository implements INewMessagesServerRepository {
    public async sendNewMessage(message: Partial<INewMessagesServer>): Promise<void> {
        await NewMessagesServer.create({ ...message });

        return;
    }

    public async findByServerId(serverId: string): Promise<INewMessagesServer[] | []> {
        const newMessagesServer = await NewMessagesServer.findAll({ where: { serverId: serverId } });

        return newMessagesServer as unknown as INewMessagesServer[];
    }

    public async findAllByUserIdAndServerId(serverId: string, userId: string): Promise<INewMessagesServer[] | []> {
        const newMessagesServer = await NewMessagesServer.findAll({ where: { serverId, userId } });

        return newMessagesServer as unknown as INewMessagesServer[];
    }

}