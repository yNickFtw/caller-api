import { INewMessagesServer } from "../INewMessagesServer";

export interface INewMessagesServerRepository {
    sendNewMessage(message: Partial<INewMessagesServer>): Promise<void>;
    findByServerId(serverId: string): Promise<INewMessagesServer[] | []>;
    findAllByUserIdAndServerId(serverId: string, userId: string): Promise<INewMessagesServer[] | []>;
}