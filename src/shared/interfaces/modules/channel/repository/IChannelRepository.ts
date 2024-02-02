import { IChannel } from "../IChannel";

export interface IChannelRepository {
    create(channel: Partial<IChannel>): Promise<IChannel>;
    findById(id: string): Promise<IChannel | null>;
}