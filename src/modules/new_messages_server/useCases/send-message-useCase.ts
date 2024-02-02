import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ISendMessageUseCase } from "../../../shared/interfaces/modules/new_messages_server/useCases/ISendMessageUseCase";
import { IChannelRepository } from "../../../shared/interfaces/modules/channel/repository/IChannelRepository";
import { INewMessagesServerRepository } from "../../../shared/interfaces/modules/new_messages_server/repository/INewMessagesRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { INewMessagesServer } from "../../../shared/interfaces/modules/new_messages_server/INewMessagesServer";

@injectable()
export default class SendMessageUseCase implements ISendMessageUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("NewMessagesServerRepository")
        private NewMessagesServerRepository: INewMessagesServerRepository,
        @inject("ChannelRepository")
        private ChannelRepository: IChannelRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, channelId: string, serverId: string): Promise<void> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const message: Partial<INewMessagesServer> = {
            userId,
            channelId
        }

        await this.NewMessagesServerRepository.sendNewMessage(message);

        return;
    }
}
