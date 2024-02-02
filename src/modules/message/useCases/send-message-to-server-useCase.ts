import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ISendMessageToServerUseCase } from "../../../shared/interfaces/modules/message/useCases/ISendMessageToServerUseCase";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IChannelRepository } from "../../../shared/interfaces/modules/channel/repository/IChannelRepository";
import { IMessageRepository } from "../../../shared/interfaces/modules/message/repository/IMessageRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IFirebaseService } from "../../../shared/services/FirebaseService/IFirebaseService";
import { v4 as uuidv4 } from "uuid";
import { IMessage } from "../../../shared/interfaces/modules/message/IMessage";

@injectable()
export default class SendMessageToServerUseCase implements ISendMessageToServerUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("MessageRepository")
        private MessageRepository: IMessageRepository,
        @inject("ChannelRepository")
        private ChannelRepository: IChannelRepository,
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("FirebaseService")
        private FirebaseService: IFirebaseService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, text: string, file: Express.Multer.File | undefined, channelId: string): Promise<void> {
        const { userId } = this.JWTService.decodeToken(token, true);

        if(!text && !file) {
            const error: IAppError = {
                statusCode: 400,
                message: "Você precisa preencher o campo de texto ou enviar uma imagem."
            };

            throw error;
        }

        const channel = await this.ChannelRepository.findById(channelId);

        if(!channel) {
            const error: IAppError = {
                statusCode: 400,
                message: "Canal não encontrado."
            }

            throw error;
        }

        let image: string | null = null
        let imageFilename: string | null = null

        if(file) {
            imageFilename = uuidv4();
            image = await this.FirebaseService.uploadImage(imageFilename, 'messages', file.buffer, file.mimetype)
        }

        const messageCreated: Partial<IMessage> = {
            text: text,
            image: image,
            imageFilename: imageFilename,
            userId: userId,
            channelId: channelId
        }

        await this.MessageRepository.create(messageCreated)

        return;
    }
}
