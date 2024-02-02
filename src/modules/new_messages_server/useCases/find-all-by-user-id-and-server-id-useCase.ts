import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindAllByUserIdAndServerIdUseCase } from "../../../shared/interfaces/modules/new_messages_server/useCases/IFindAllByUserIdAndServerIdUseCase";
import { INewMessagesServerRepository } from "../../../shared/interfaces/modules/new_messages_server/repository/INewMessagesRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { INewMessagesServer } from "../../../shared/interfaces/modules/new_messages_server/INewMessagesServer";

@injectable()
export default class FindAllByUserIdAndServerIdUseCase implements IFindAllByUserIdAndServerIdUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("NewMessagesServerRepository")
        private NewMessagesServerRepository: INewMessagesServerRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, serverId: string): Promise<INewMessagesServer[] | []> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const messages = await this.NewMessagesServerRepository.findAllByUserIdAndServerId(serverId, userId);

        return messages;
    }
}
