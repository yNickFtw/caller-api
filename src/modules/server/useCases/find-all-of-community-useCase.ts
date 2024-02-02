import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindAllOfCommunityUseCase } from "../../../shared/interfaces/modules/server/useCases/IFindAllOfCommunityUseCase";
import { IServerRepository } from "../../../shared/interfaces/modules/server/repository/IServerRepository";
import { IServer } from "../../../shared/interfaces/modules/server/IServer";

export interface IServersDTO extends IServer {
    memberCount: number;
}

@injectable()
export default class FindAllOfCommunityUseCase implements IFindAllOfCommunityUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("ServerRepository")
        private ServerRepository: IServerRepository,
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(): Promise<IServersDTO[] | []> {
        const servers = await this.ServerRepository.findAll();

        return servers;
    }
}
