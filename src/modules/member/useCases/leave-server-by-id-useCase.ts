import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ILeaveServerByIdUseCase } from "../../../shared/interfaces/modules/member/useCases/ILeaveServerByIdUseCase";
import { IServerRepository } from "../../../shared/interfaces/modules/server/repository/IServerRepository";
import { IMemberRepository } from "../../../shared/interfaces/modules/member/repository/IMemberRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";

@injectable()
export default class LeaveServerByIdUseCase implements ILeaveServerByIdUseCase, IAppError {
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

    public async execute(token: string, serverId: string): Promise<void> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const server = await this.ServerRepository.findById(serverId);

        if(!server) {
            const error: IAppError = {
                statusCode: 404,
                message: "Servidor não encontrado."
            };

            throw error;
        }

        const memberAlreadyLeavesTheServer = await this.MemberRepository.findByUserIdAndServerId(userId, serverId);

        if(!memberAlreadyLeavesTheServer) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não está nesse servidor mais."
            };

            throw error;
        }

        await this.MemberRepository.removeByUserIdAndServerId(userId, serverId);

        return
    }
}
