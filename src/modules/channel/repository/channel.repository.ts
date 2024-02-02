import { IChannel } from "../../../shared/interfaces/modules/channel/IChannel";
import { IChannelRepository } from "../../../shared/interfaces/modules/channel/repository/IChannelRepository";
import { Channel } from "../entity/channel.schema";

export default class ChannelRepository implements IChannelRepository {
    public async create(channel: Partial<IChannel>): Promise<IChannel> {
        const channelCreated = await Channel.create({ ...channel });

        return channelCreated as unknown as IChannel;
    }

    public async findById(id: string): Promise<IChannel | null> {
        const channel = await Channel.findOne({ where: { id: id } });

        return channel as unknown as IChannel;
    }
}