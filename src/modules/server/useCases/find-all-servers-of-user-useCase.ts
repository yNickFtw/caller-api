import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindAllServersOfUserUseCase } from "../../../shared/interfaces/modules/server/useCases/IFindAllServersOfUserUseCase";
import { IServer } from "../../../shared/interfaces/modules/server/IServer";
import { IServerRepository } from "../../../shared/interfaces/modules/server/repository/IServerRepository";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IMemberRepository } from "../../../shared/interfaces/modules/member/repository/IMemberRepository";

@injectable()
export default class FindAllServersOfUserUseCase implements IFindAllServersOfUserUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("ServerRepository")
        private ServerRepository: IServerRepository,
        @inject("MemberRepository")
        private MemberRepository: IMemberRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string): Promise<IServer[] | []> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const user = await this.UserRepository.findById(userId)

        if(!userId || !user) {
            const error: IAppError = {
                statusCode: 401,
                message: "Sessão expirada, faça login novamente."
            };

            throw error;
        }

        const serversIds = await this.MemberRepository.findAllServers(userId);

        const servers = await this.ServerRepository.findAllWhereIdIn(serversIds);

        return servers;
    }
}
