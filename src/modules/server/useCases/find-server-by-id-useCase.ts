import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindServerByIdUseCase } from "../../../shared/interfaces/modules/server/useCases/IFindServerByIdUseCase";
import { IServerRepository } from "../../../shared/interfaces/modules/server/repository/IServerRepository";
import { IMemberRepository } from "../../../shared/interfaces/modules/member/repository/IMemberRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IServer } from "../../../shared/interfaces/modules/server/IServer";

@injectable()
export default class FindServerByIdUseCase implements IFindServerByIdUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("MemberRepository")
        private MemberRepository: IMemberRepository,
        @inject("ServerRepository")
        private ServerRepository: IServerRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, serverId: string): Promise<IServer | null> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const isMember = await this.MemberRepository.findByUserIdAndServerId(userId, serverId);

        if(!isMember) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não é membro deste servidor."
            };

            throw error;
        }

        const server = await this.ServerRepository.findById(serverId);

        if(!server) {
            const error: IAppError = {
                statusCode: 404,
                message: "Servidor não encontrado."
            };

            throw error;
        }

        return server;
    }
}
