import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindAllIdServersOfUserUseCase } from "../../../shared/interfaces/modules/server/useCases/IFindAllIdServersOfUserUseCase";
import { IMemberRepository } from "../../../shared/interfaces/modules/member/repository/IMemberRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";

@injectable()
export default class FindAllIdServersOfUserUseCase implements IFindAllIdServersOfUserUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("MemberRepository")
        private MemberRepository: IMemberRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string): Promise<string[] | []> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const serverIds = await this.MemberRepository.findAllServerIdsByUserId(userId);

        return serverIds;
    }
}
