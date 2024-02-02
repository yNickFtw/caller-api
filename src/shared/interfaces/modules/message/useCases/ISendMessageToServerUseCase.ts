export interface ISendMessageToServerUseCase {
    execute(token: string, text: string, file: Express.Multer.File | undefined, channelId: string): Promise<void>;
}
