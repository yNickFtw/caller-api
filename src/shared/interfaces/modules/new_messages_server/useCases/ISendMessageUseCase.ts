export interface ISendMessageUseCase {
    execute(token: string, channelId: string, serverId: string): Promise<void>;
}
