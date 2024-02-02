import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindAllMessagesByChannelIdUseCase } from "../../../shared/interfaces/modules/message/useCases/IFindAllMessagesByChannelIdUseCase";
import { IMessageRepository } from "../../../shared/interfaces/modules/message/repository/IMessageRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IMessage } from "../../../shared/interfaces/modules/message/IMessage";
import { IMemberRepository } from "../../../shared/interfaces/modules/member/repository/IMemberRepository";

@injectable()
export default class FindAllMessagesByChannelIdUseCase implements IFindAllMessagesByChannelIdUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("MessageRepository")
        private MessageRepository: IMessageRepository,
        @inject("MemberRepository")
        private MemberRepository: IMemberRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, channelId: string, serverId: string): Promise<IMessage[] | []> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const isMember = await this.MemberRepository.findByUserIdAndServerId(userId, serverId);

        if(!isMember) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não é membro deste servidor."
            };

            throw error;
        }

        const messages = await this.MessageRepository.findAllMessagesByChannelId(channelId);

        return messages;
    }
}
