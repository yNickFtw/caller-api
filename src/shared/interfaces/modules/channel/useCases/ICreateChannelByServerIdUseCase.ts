import { IChannel } from "../IChannel";

export interface ICreateChannelByServerIdUseCase {
    execute(token: string, name: string, categoryId: string, serverId: string): Promise<IChannel>;
}
