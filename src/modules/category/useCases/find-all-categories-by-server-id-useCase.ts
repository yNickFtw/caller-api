import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindAllCategoriesByServerIdUseCase } from "../../../shared/interfaces/modules/category/useCases/IFindAllCategoriesByServerIdUseCase";
import { ICategory } from "../../../shared/interfaces/modules/category/ICategory";
import { IServerRepository } from "../../../shared/interfaces/modules/server/repository/IServerRepository";
import { IMemberRepository } from "../../../shared/interfaces/modules/member/repository/IMemberRepository";
import { ICategoryRepository } from "../../../shared/interfaces/modules/category/repository/ICategoryRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";

@injectable()
export default class FindAllCategoriesByServerIdUseCase implements IFindAllCategoriesByServerIdUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("CategoryRepository")
        private CategoryRepository: ICategoryRepository,
        @inject("MemberRepository")
        private MemberRepository: IMemberRepository,
        @inject("ServerRepository")
        private ServerRepository: IServerRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, serverId: string): Promise<ICategory[] | []> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const isMember = await this.MemberRepository.findByUserIdAndServerId(userId, serverId);

        if(!isMember) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não é membro deste servidor."
            }

            throw error;
        }

        const server = await this.ServerRepository.findById(serverId);

        if(!server) {
            const error: IAppError = {
                statusCode: 404,
                message: "Server não encontrado."
            };

            throw error;
        }
        
        const categories = await this.CategoryRepository.findAllByServerId(serverId, userId) as any;

        return categories;
    }
}
