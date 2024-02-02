import { IMessage } from "../IMessage";

export interface IFindAllMessagesByChannelIdUseCase {
    execute(token: string, channelId: string, serverId: string): Promise<IMessage[] | []>;
}
