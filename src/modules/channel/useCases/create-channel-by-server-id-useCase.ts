import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreateChannelByServerIdUseCase } from "../../../shared/interfaces/modules/channel/useCases/ICreateChannelByServerIdUseCase";
import { ICategoryRepository } from "../../../shared/interfaces/modules/category/repository/ICategoryRepository";
import { IChannelRepository } from "../../../shared/interfaces/modules/channel/repository/IChannelRepository";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IChannel } from "../../../shared/interfaces/modules/channel/IChannel";
import { IServerRepository } from "../../../shared/interfaces/modules/server/repository/IServerRepository";

@injectable()
export default class CreateChannelByServerIdUseCase implements ICreateChannelByServerIdUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("ChannelRepository")
        private ChannelRepository: IChannelRepository,
        @inject("CategoryRepository")
        private CategoryRepository: ICategoryRepository,
        @inject("ServerRepository")
        private ServerRepository: IServerRepository

    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, name: string, categoryId: string, serverId: string): Promise<IChannel> {
        if(!name) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha o nome do canal."
            };

            throw error;
        }
        
        if(!serverId || !categoryId) {
            const error: IAppError = {
                statusCode: 400,
                message: "Ocorreu um erro, tente novamente."
            };

            throw error;
        }

        const { userId } = this.JWTService.decodeToken(token, true);

        const server = await this.ServerRepository.findById(serverId);

        if(!server) {
            const error: IAppError = {
                statusCode: 404,
                message: "Servidor não encontrado."
            }

            throw error;
        }

        const category = await this.CategoryRepository.findById(categoryId);

        if(!category) {
            const error: IAppError = {
                statusCode: 404,
                message: "Categoria não encontrada."
            }

            throw error;
        }

        const channelObject: Partial<IChannel> = {
            name,
            userId,
            categoryId,
            serverId
        }

        const channelCreated = await this.ChannelRepository.create(channelObject);
        
        return channelCreated;
    }
}
