import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindAllMembersOfServerUseCase } from "../../../shared/interfaces/modules/member/useCases/IFindAllMembersOfServerUseCase";
import { IMemberRepository } from "../../../shared/interfaces/modules/member/repository/IMemberRepository";
import { IServerRepository } from "../../../shared/interfaces/modules/server/repository/IServerRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IMember } from "../../../shared/interfaces/modules/member/IMember";

@injectable()
export default class FindAllMembersOfServerUseCase implements IFindAllMembersOfServerUseCase, IAppError {
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

    public async execute(token: string, serverId: string): Promise<IMember[] | []> {
        
        if(!serverId) {
            const error: IAppError = {
                statusCode: 400,
                message: "Ocorreu um erro, tente novamente mais tarde."
            }
            
            throw error
        }
        
        const { userId } = this.JWTService.decodeToken(token, true);
        
        const isMember = await this.MemberRepository.findByUserIdAndServerId(userId, serverId)

        if(!isMember) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não é membro deste servidor."
            }

            throw error;
        }

        const members = await this.MemberRepository.findAllMembersByServerId(serverId);

        return members;
    }
}
