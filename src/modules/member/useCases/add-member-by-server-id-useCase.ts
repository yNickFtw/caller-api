import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IAddMemberByServerIdUseCase } from "../../../shared/interfaces/modules/member/useCases/IAddMemberByServerIdUseCase";
import { IMemberRepository } from "../../../shared/interfaces/modules/member/repository/IMemberRepository";
import { IServerRepository } from "../../../shared/interfaces/modules/server/repository/IServerRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IServer } from "../../../shared/interfaces/modules/server/IServer";

@injectable()
export default class AddMemberByServerIdUseCase implements IAddMemberByServerIdUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("ServerRepository")
        private ServerRepository: IServerRepository,
        @inject("MemberRepository")
        private MemberRepository: IMemberRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, serverId: string): Promise<IServer> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const server = await this.ServerRepository.findById(serverId);

        if(!server) {
            const error: IAppError = {
                statusCode: 404,
                message: "Servidor não encontrado."
            };

            throw error;
        }

        const alreadyIsOnServer = await this.MemberRepository.findByUserIdAndServerId(userId, serverId);

        if(alreadyIsOnServer) {
            const error: IAppError = {
                statusCode: 400,
                message: "Você já está neste servidor."
            };

            throw error;
        }

        await this.MemberRepository.add({ userId, serverId, isOwner: false });

        return server;
    }
}
