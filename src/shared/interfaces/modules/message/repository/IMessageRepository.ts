import { IMessage } from "../IMessage";

export interface IMessageRepository {
    create(message: Partial<IMessage>): Promise<void>;
    findAllMessagesByChannelId(channelId: string): Promise<IMessage[] | []>;
}