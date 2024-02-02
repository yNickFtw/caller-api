import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreateServerUseCase } from "../../../shared/interfaces/modules/server/useCases/ICreateServerUseCase";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IServerRepository } from "../../../shared/interfaces/modules/server/repository/IServerRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IFirebaseService } from "../../../shared/services/FirebaseService/IFirebaseService";
import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';
import { IServer } from "../../../shared/interfaces/modules/server/IServer";
import { IMemberRepository } from "../../../shared/interfaces/modules/member/repository/IMemberRepository";
import { ICategoryRepository } from "../../../shared/interfaces/modules/category/repository/ICategoryRepository";
import { IChannelRepository } from "../../../shared/interfaces/modules/channel/repository/IChannelRepository";

@injectable()
export default class CreateServerUseCase implements ICreateServerUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("ServerRepository")
        private ServerRepository: IServerRepository,
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("FirebaseService")
        private FirebaseService: IFirebaseService,
        @inject("MemberRepository")
        private MemberRepository: IMemberRepository,
        @inject("CategoryRepository")
        private CategoryRepository: ICategoryRepository,
        @inject("ChannelRepository")
        private ChannelRepository: IChannelRepository,
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, file: any, name: string): Promise<IServer> {
        const { userId } = this.JWTService.decodeToken(token, true);

        if (!name) {
            const error: IAppError = {
                statusCode: 400,
                message: "Você precisa adicionar um nome para o servidor."
            };

            throw error;
        }

        if (!file) {
            const error: IAppError = {
                statusCode: 400,
                message: "Adicione uma imagem para prosseguir."
            }

            throw error
        }

        const pictureFilename = uuidv4();
        const compressedImageBuffer = await sharp(file.buffer).jpeg({ quality: 80 }).toBuffer();
        const picture = await this.FirebaseService.uploadImage(pictureFilename, 'servers', compressedImageBuffer, file.mimetype)

        const data: Partial<IServer> = {
            name: name,
            picture: picture,
            pictureFilename: pictureFilename,
            userId: userId
        }

        const serverCreated = await this.ServerRepository.create(data);

        await this.MemberRepository.add({ userId: userId, serverId: serverCreated.id, isOwner: true });
        const category = await this.CategoryRepository.create({ name: "Canais de texto", userId: userId, serverId: serverCreated.id });
        await this.ChannelRepository.create({ name: "geral", userId: userId, serverId: serverCreated.id, categoryId: category.id });

        return serverCreated;
    }
}