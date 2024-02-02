import { IServersDTO } from "../../../../../modules/server/useCases/find-all-of-community-useCase";

export interface IFindAllOfCommunityUseCase {
    execute(): Promise<IServersDTO[] | []>;
}
